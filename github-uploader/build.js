#!/usr/bin/env bun

import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { signShortcut } from '../tools/shortcuts-sign.js';
import {
  DEFAULT_BRANCH,
  DEFAULT_FOLDER,
  DEFAULT_REPO,
  SHORTCUT_TOKEN,
  TEMPLATE_CONFIG_ACTIONS,
  TEMPLATE_EXTENSION_PICK_ACTION,
  TEMPLATE_EXTENSION_SET_SHARED_ITEM_ACTION,
  TEMPLATE_MIDDLE_ACTIONS,
  TEMPLATE_UPLOAD_ACTION,
  WORKFLOW_METADATA,
} from './workflow-template.js';

const WORKDIR = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(WORKDIR, '.build');
const WORKFLOW_NAME = 'Github Uploader';
const UNSIGNED_PATH = join(BUILD_DIR, 'github-uploader-unsigned.shortcut');
const SIGNED_PATH = join(WORKDIR, `${WORKFLOW_NAME}.shortcut`);
const PLUTIL = '/usr/bin/plutil';

function newUuid() {
  return randomUUID().toUpperCase();
}

function deepCopy(value) {
  return structuredClone(value);
}

function tokenAttachmentValue(value) {
  return {
    Value: value,
    WFSerializationType: 'WFTextTokenAttachment',
  };
}

function variableValue(variableName) {
  return {
    VariableName: variableName,
    Type: 'Variable',
  };
}

function actionOutputValue(outputUuid, outputName, aggrandizements) {
  const value = {
    OutputUUID: outputUuid,
    Type: 'ActionOutput',
    OutputName: outputName,
  };

  if (aggrandizements?.length) {
    value.Aggrandizements = aggrandizements;
  }

  return value;
}

function extensionInputValue() {
  return { Type: 'ExtensionInput' };
}

function tokenAttachmentFromVariable(variableName) {
  return tokenAttachmentValue(variableValue(variableName));
}

function tokenAttachmentFromAction(outputUuid, outputName, aggrandizements) {
  return tokenAttachmentValue(actionOutputValue(outputUuid, outputName, aggrandizements));
}

function tokenAttachmentFromExtensionInput() {
  return tokenAttachmentValue(extensionInputValue());
}

function tokenString(text, attachments) {
  const value = { string: text };

  if (attachments && Object.keys(attachments).length > 0) {
    value.attachmentsByRange = attachments;
  }

  return {
    Value: value,
    WFSerializationType: 'WFTextTokenString',
  };
}

function singleVariableTokenString(variableName) {
  return tokenString(SHORTCUT_TOKEN, {
    '{0, 1}': variableValue(variableName),
  });
}

function conditionalVariableInput(valueAttachment) {
  return {
    Type: 'Variable',
    Variable: valueAttachment,
  };
}

function action(identifier, parameters = {}) {
  return {
    WFWorkflowActionIdentifier: identifier,
    WFWorkflowActionParameters: parameters,
  };
}

function setVariableAction(sourceAttachment, variableName) {
  return action('is.workflow.actions.setvariable', {
    WFInput: sourceAttachment,
    WFVariableName: variableName,
  });
}

function getTextAction(text, uuidValue) {
  const parameters = { WFTextActionText: text };

  if (uuidValue) {
    parameters.UUID = uuidValue;
  }

  return action('is.workflow.actions.gettext', parameters);
}

function textMatchAction(inputText, pattern) {
  return action('is.workflow.actions.text.match', {
    WFMatchTextPattern: pattern,
    text: inputText,
    UUID: newUuid(),
  });
}

function countItemsAction(inputAttachment) {
  return action('is.workflow.actions.count', {
    WFCountType: 'Items',
    Input: inputAttachment,
    UUID: newUuid(),
  });
}

function literalVariableActions(text, variableName) {
  const textAction = getTextAction(text, newUuid());

  return [
    textAction,
    setVariableAction(tokenAttachmentFromAction(textAction.WFWorkflowActionParameters.UUID, '文本'), variableName),
  ];
}

function notificationAction(title, body) {
  return action('is.workflow.actions.notification', {
    UUID: newUuid(),
    WFNotificationActionTitle: title,
    WFNotificationActionBody: body,
    WFNotificationActionSound: false,
  });
}

function outputAction(value) {
  return action('is.workflow.actions.output', {
    UUID: newUuid(),
    WFOutput: value,
  });
}

function getValueForKeyAction(inputAttachment, key) {
  return action('is.workflow.actions.getvalueforkey', {
    WFInput: inputAttachment,
    WFDictionaryKey: key,
    WFGetDictionaryValueType: 'Value',
    UUID: newUuid(),
  });
}

function chooseFromMenuStart(groupId, prompt, items) {
  return action('is.workflow.actions.choosefrommenu', {
    GroupingIdentifier: groupId,
    WFControlFlowMode: 0,
    WFMenuItems: items,
    WFMenuPrompt: prompt,
  });
}

function chooseFromMenuItem(groupId, title) {
  return action('is.workflow.actions.choosefrommenu', {
    GroupingIdentifier: groupId,
    WFControlFlowMode: 1,
    WFMenuItemTitle: title,
  });
}

function chooseFromMenuEnd(groupId) {
  return action('is.workflow.actions.choosefrommenu', {
    GroupingIdentifier: groupId,
    WFControlFlowMode: 2,
    UUID: newUuid(),
  });
}

function conditionalStart(condition, inputValueAttachment, groupId, numberValue) {
  const parameters = {
    WFInput: conditionalVariableInput(inputValueAttachment),
    WFControlFlowMode: 0,
    GroupingIdentifier: groupId,
    WFCondition: condition,
  };

  if (numberValue !== undefined) {
    parameters.WFNumberValue = numberValue;
  }

  return action('is.workflow.actions.conditional', parameters);
}

function conditionalElse(groupId) {
  return action('is.workflow.actions.conditional', {
    GroupingIdentifier: groupId,
    WFControlFlowMode: 1,
  });
}

function conditionalEnd(groupId) {
  return action('is.workflow.actions.conditional', {
    GroupingIdentifier: groupId,
    WFControlFlowMode: 2,
    UUID: newUuid(),
  });
}

function fileSelectAction() {
  return action('is.workflow.actions.file.select', {
    UUID: newUuid(),
  });
}

function askTextAction(prompt) {
  return action('is.workflow.actions.ask', {
    UUID: newUuid(),
    WFAskActionPrompt: prompt,
  });
}

function clipboardAction() {
  return action('is.workflow.actions.getclipboard', {
    UUID: newUuid(),
  });
}

function sanitizeTemplateConfigActions(actions) {
  const replacements = new Map([
    [0, ''],
    [2, ''],
    [4, DEFAULT_REPO],
    [6, DEFAULT_FOLDER],
    [8, DEFAULT_BRANCH],
  ]);

  for (const [index, value] of replacements) {
    actions[index].WFWorkflowActionParameters.WFTextActionText = value;
  }
}

function buildNoInputEntryActions({
  extensionPickAction,
  extensionSetSharedItemAction,
  sharedItemVariableName,
  inputSourceVariableName,
}) {
  const noInputGroup = newUuid();
  const menuGroup = newUuid();
  const missingInputGroup = newUuid();

  const filePick = fileSelectAction();
  const imagePick = fileSelectAction();
  const textInput = askTextAction('请输入要上传的文字内容');
  const clipboardPick = clipboardAction();

  const missingInputText = '未获得要上传的内容，请重新选择文件、图片、输入文字，或确认剪贴板中有图像/文字。';

  return [
    conditionalStart(101, tokenAttachmentFromExtensionInput(), noInputGroup),
    chooseFromMenuStart(menuGroup, '请选择上传来源', ['文件', '图片', '输入文字', '使用剪贴板']),
    chooseFromMenuItem(menuGroup, '文件'),
    ...literalVariableActions('manual-file', inputSourceVariableName),
    filePick,
    setVariableAction(
      tokenAttachmentFromAction(filePick.WFWorkflowActionParameters.UUID, '文件'),
      sharedItemVariableName,
    ),
    chooseFromMenuItem(menuGroup, '图片'),
    ...literalVariableActions('manual-image', inputSourceVariableName),
    imagePick,
    setVariableAction(
      tokenAttachmentFromAction(imagePick.WFWorkflowActionParameters.UUID, '文件'),
      sharedItemVariableName,
    ),
    chooseFromMenuItem(menuGroup, '输入文字'),
    ...literalVariableActions('manual-text', inputSourceVariableName),
    textInput,
    setVariableAction(
      tokenAttachmentFromAction(textInput.WFWorkflowActionParameters.UUID, '提供的输入'),
      sharedItemVariableName,
    ),
    chooseFromMenuItem(menuGroup, '使用剪贴板'),
    ...literalVariableActions('clipboard', inputSourceVariableName),
    clipboardPick,
    setVariableAction(
      tokenAttachmentFromAction(clipboardPick.WFWorkflowActionParameters.UUID, '剪贴板'),
      sharedItemVariableName,
    ),
    chooseFromMenuEnd(menuGroup),
    conditionalElse(noInputGroup),
    deepCopy(extensionPickAction),
    deepCopy(extensionSetSharedItemAction),
    ...literalVariableActions('share-extension', inputSourceVariableName),
    conditionalEnd(noInputGroup),
    conditionalStart(101, tokenAttachmentFromVariable(sharedItemVariableName), missingInputGroup),
    notificationAction('GitHub 上传失败', missingInputText),
    outputAction(tokenString(missingInputText)),
    conditionalEnd(missingInputGroup),
  ];
}

function buildSuccessErrorTailActions(uploadResponseAction) {
  const errorGroup = newUuid();

  const uploadResponseVar = 'uploadResponse';
  const responseContentVar = 'responseContent';
  const downloadUrlVar = 'downloadUrl';
  const responseMessageVar = 'responseMessage';
  const responseErrorsVar = 'responseErrors';
  const responseDocumentationUrlVar = 'responseDocumentationUrl';
  const errorTextVar = 'errorText';

  const setUploadResponse = setVariableAction(
    tokenAttachmentFromAction(uploadResponseAction.WFWorkflowActionParameters.UUID, 'URL的内容'),
    uploadResponseVar,
  );

  const getContent = getValueForKeyAction(tokenAttachmentFromVariable(uploadResponseVar), 'content');
  const setContent = setVariableAction(
    tokenAttachmentFromAction(getContent.WFWorkflowActionParameters.UUID, '字典值'),
    responseContentVar,
  );

  const getDownloadUrl = getValueForKeyAction(tokenAttachmentFromVariable(responseContentVar), 'download_url');
  const setDownloadUrl = setVariableAction(
    tokenAttachmentFromAction(getDownloadUrl.WFWorkflowActionParameters.UUID, '字典值'),
    downloadUrlVar,
  );

  const getMessage = getValueForKeyAction(tokenAttachmentFromVariable(uploadResponseVar), 'message');
  const setMessage = setVariableAction(
    tokenAttachmentFromAction(getMessage.WFWorkflowActionParameters.UUID, '字典值'),
    responseMessageVar,
  );

  const getErrors = getValueForKeyAction(tokenAttachmentFromVariable(uploadResponseVar), 'errors');
  const setErrors = setVariableAction(
    tokenAttachmentFromAction(getErrors.WFWorkflowActionParameters.UUID, '字典值'),
    responseErrorsVar,
  );

  const getDocumentationUrl = getValueForKeyAction(
    tokenAttachmentFromVariable(uploadResponseVar),
    'documentation_url',
  );
  const setDocumentationUrl = setVariableAction(
    tokenAttachmentFromAction(getDocumentationUrl.WFWorkflowActionParameters.UUID, '字典值'),
    responseDocumentationUrlVar,
  );

  const errorTextAction = getTextAction(
    tokenString(
      `GitHub 上传失败\nmessage: ${SHORTCUT_TOKEN}\nerrors: ${SHORTCUT_TOKEN}\ndocumentation_url: ${SHORTCUT_TOKEN}\n提示: 如果提示文件已存在或冲突，请更换文件名/目录，或先删除仓库中的旧文件后重试；如果 message 为空，通常表示 GitHub 响应里没有返回 download_url。`,
      {
        '{21, 1}': variableValue(responseMessageVar),
        '{31, 1}': variableValue(responseErrorsVar),
        '{51, 1}': variableValue(responseDocumentationUrlVar),
      },
    ),
    newUuid(),
  );

  const setErrorText = setVariableAction(
    tokenAttachmentFromAction(errorTextAction.WFWorkflowActionParameters.UUID, '文本'),
    errorTextVar,
  );

  const successNotificationBody = tokenString(`已复制下载链接：${SHORTCUT_TOKEN}`, {
    '{8, 1}': variableValue(downloadUrlVar),
  });

  const errorNotificationBody = singleVariableTokenString(errorTextVar);

  return [
    setUploadResponse,
    getContent,
    setContent,
    getDownloadUrl,
    setDownloadUrl,
    conditionalStart(101, tokenAttachmentFromVariable(downloadUrlVar), errorGroup),
    getMessage,
    setMessage,
    getErrors,
    setErrors,
    getDocumentationUrl,
    setDocumentationUrl,
    errorTextAction,
    setErrorText,
    notificationAction('GitHub 上传失败', errorNotificationBody),
    outputAction(singleVariableTokenString(errorTextVar)),
    conditionalElse(errorGroup),
    action('is.workflow.actions.setclipboard', {
      UUID: newUuid(),
      WFInput: tokenAttachmentFromVariable(downloadUrlVar),
    }),
    notificationAction('GitHub 上传完成', successNotificationBody),
    outputAction(singleVariableTokenString(downloadUrlVar)),
    conditionalEnd(errorGroup),
  ];
}

function forceTimestampNamesForTextUploads(actions) {
  const textBaseNameSetIndex = actions.findIndex(
    (actionItem) =>
      actionItem.WFWorkflowActionIdentifier === 'is.workflow.actions.setvariable' &&
      actionItem.WFWorkflowActionParameters?.WFVariableName === 'textBaseName',
  );

  if (textBaseNameSetIndex <= 0) {
    throw new Error('Unable to locate textBaseName assignment in workflow template.');
  }

  const textBaseNameSourceAction = actions[textBaseNameSetIndex - 1];

  if (
    textBaseNameSourceAction.WFWorkflowActionIdentifier !== 'is.workflow.actions.text.replace' ||
    textBaseNameSourceAction.WFWorkflowActionParameters?.WFReplaceTextFind !== '\\.[^./]+$'
  ) {
    throw new Error('Unexpected textBaseName source action in workflow template.');
  }

  textBaseNameSourceAction.WFWorkflowActionParameters.WFInput = tokenString(`upload-${SHORTCUT_TOKEN}`, {
    '{7, 1}': variableValue('timestampCompact'),
  });
}

function forceClipboardNamesForClipboardUploads(actions) {
  const repoPathMaybeSetIndex = actions.findIndex(
    (actionItem) =>
      actionItem.WFWorkflowActionIdentifier === 'is.workflow.actions.setvariable' &&
      actionItem.WFWorkflowActionParameters?.WFVariableName === 'repoPathMaybe',
  );

  if (repoPathMaybeSetIndex <= 0) {
    throw new Error('Unable to locate repoPathMaybe assignment in workflow template.');
  }

  const clipboardSourceMatch = textMatchAction(singleVariableTokenString('inputSource'), '(?i)^clipboard$');
  const clipboardSourceCount = countItemsAction(
    tokenAttachmentFromAction(clipboardSourceMatch.WFWorkflowActionParameters.UUID, '匹配'),
  );
  const clipboardSourceCountVar = 'clipboardSourceMatchCount';
  const clipboardGroup = newUuid();
  const textGroup = newUuid();
  const imageGroup = newUuid();

  const clipboardTextName = getTextAction(
    tokenString(`clipboard-${SHORTCUT_TOKEN}.txt`, {
      '{10, 1}': variableValue('timestampCompact'),
    }),
    newUuid(),
  );

  const clipboardPngAction = action('is.workflow.actions.gettypeaction', {
    WFFileType: 'public.png',
    WFInput: tokenAttachmentFromVariable('sharedItem'),
    UUID: newUuid(),
  });

  const clipboardImageName = getTextAction(
    tokenString(`clipboard-${SHORTCUT_TOKEN}.png`, {
      '{10, 1}': variableValue('timestampCompact'),
    }),
    newUuid(),
  );

  const insertedActions = [
    clipboardSourceMatch,
    clipboardSourceCount,
    setVariableAction(
      tokenAttachmentFromAction(clipboardSourceCount.WFWorkflowActionParameters.UUID, '计数'),
      clipboardSourceCountVar,
    ),
    conditionalStart(4, tokenAttachmentFromVariable(clipboardSourceCountVar), clipboardGroup, 1),
    conditionalStart(4, tokenAttachmentFromVariable('textTypeMatchCount'), textGroup, 1),
    clipboardTextName,
    setVariableAction(
      tokenAttachmentFromAction(clipboardTextName.WFWorkflowActionParameters.UUID, '文本'),
      'finalFileName',
    ),
    conditionalElse(textGroup),
    conditionalStart(4, tokenAttachmentFromVariable('imageTypeMatchCount'), imageGroup, 1),
    clipboardPngAction,
    setVariableAction(
      tokenAttachmentFromAction(clipboardPngAction.WFWorkflowActionParameters.UUID, '特定类型的文件'),
      'uploadItem',
    ),
    clipboardImageName,
    setVariableAction(
      tokenAttachmentFromAction(clipboardImageName.WFWorkflowActionParameters.UUID, '文本'),
      'finalFileName',
    ),
    conditionalEnd(imageGroup),
    conditionalEnd(textGroup),
    conditionalEnd(clipboardGroup),
  ];

  actions.splice(repoPathMaybeSetIndex - 1, 0, ...insertedActions);
}

function buildActions() {
  const configActions = deepCopy(TEMPLATE_CONFIG_ACTIONS);
  sanitizeTemplateConfigActions(configActions);

  const uploadAction = deepCopy(TEMPLATE_UPLOAD_ACTION);
  const businessActions = deepCopy(TEMPLATE_MIDDLE_ACTIONS.slice(4));
  forceTimestampNamesForTextUploads(businessActions);
  forceClipboardNamesForClipboardUploads(businessActions);
  const entryActions = buildNoInputEntryActions({
    extensionPickAction: TEMPLATE_EXTENSION_PICK_ACTION,
    extensionSetSharedItemAction: TEMPLATE_EXTENSION_SET_SHARED_ITEM_ACTION,
    sharedItemVariableName: 'sharedItem',
    inputSourceVariableName: 'inputSource',
  });
  const tailActions = buildSuccessErrorTailActions(uploadAction);

  return [...configActions, ...entryActions, ...businessActions, uploadAction, ...tailActions];
}

function assembleWorkflow(actions) {
  return {
    ...deepCopy(WORKFLOW_METADATA),
    WFWorkflowName: WORKFLOW_NAME,
    WFWorkflowActions: actions,
  };
}

function run(command, args) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    throw new Error(
      [
        `Command failed: ${command} ${args.join(' ')}`,
        result.stdout?.trim(),
        result.stderr?.trim(),
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }

  return result;
}

async function withTempDir(prefix, callback) {
  const directory = mkdtempSync(join(tmpdir(), prefix));

  try {
    return await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

async function writeUnsignedShortcut(workflow, outPath) {
  mkdirSync(dirname(outPath), { recursive: true });

  await withTempDir('github-uploader-build-', async (directory) => {
    const jsonPath = join(directory, 'workflow.json');
    writeFileSync(jsonPath, JSON.stringify(workflow, null, 2));
    run(PLUTIL, ['-convert', 'binary1', '-o', outPath, jsonPath]);
  });
}

async function readWorkflow(shortcutPath) {
  return withTempDir('github-uploader-verify-', async (directory) => {
    const jsonPath = join(directory, 'workflow.json');
    run(PLUTIL, ['-convert', 'json', '-o', jsonPath, shortcutPath]);
    return JSON.parse(readFileSync(jsonPath, 'utf8'));
  });
}

async function verifyUnsignedShortcut(shortcutPath) {
  if (!existsSync(shortcutPath)) {
    throw new Error(`Unsigned shortcut not found: ${shortcutPath}`);
  }

  const workflow = await readWorkflow(shortcutPath);

  if (workflow.WFWorkflowName !== WORKFLOW_NAME) {
    throw new Error(`Unexpected workflow name: ${workflow.WFWorkflowName} (expected ${WORKFLOW_NAME})`);
  }

  return {
    workflowName: workflow.WFWorkflowName,
    actionCount: workflow.WFWorkflowActions.length,
  };
}

function signedSummary(shortcutPath) {
  if (!existsSync(shortcutPath)) {
    throw new Error(`Signed shortcut not found: ${shortcutPath}`);
  }

  const stats = statSync(shortcutPath);
  return {
    size: stats.size,
    modifiedAt: stats.mtime.toISOString(),
  };
}

function printUsage() {
  console.log('Usage: bun run github-uploader/build.js [--unsigned-only | --sign-only | --verify]');
}

async function main() {
  const flags = new Set(process.argv.slice(2));
  const selectedModes = ['--unsigned-only', '--sign-only', '--verify'].filter((flag) => flags.has(flag));

  if (flags.has('--help')) {
    printUsage();
    return 0;
  }

  if (selectedModes.length > 1) {
    throw new Error('Only one mode flag can be used at a time.');
  }

  if (flags.has('--verify')) {
    const unsigned = await verifyUnsignedShortcut(UNSIGNED_PATH);
    const signed = signedSummary(SIGNED_PATH);

    console.log(`Verified unsigned: ${unsigned.workflowName} (${unsigned.actionCount} actions)`);
    console.log(`Verified signed: ${SIGNED_PATH} (${signed.size} bytes, ${signed.modifiedAt})`);
    return 0;
  }

  if (flags.has('--sign-only')) {
    await verifyUnsignedShortcut(UNSIGNED_PATH);
    signShortcut({ inputPath: UNSIGNED_PATH, outputPath: SIGNED_PATH, mode: 'anyone' });
    const signed = signedSummary(SIGNED_PATH);
    console.log(`Signed: ${SIGNED_PATH} (${signed.size} bytes, ${signed.modifiedAt})`);
    return 0;
  }

  const workflow = assembleWorkflow(buildActions());
  await writeUnsignedShortcut(workflow, UNSIGNED_PATH);

  const unsigned = await verifyUnsignedShortcut(UNSIGNED_PATH);
  console.log(`Built unsigned: ${UNSIGNED_PATH} (${unsigned.workflowName}, ${unsigned.actionCount} actions)`);

  if (!flags.has('--unsigned-only')) {
    signShortcut({ inputPath: UNSIGNED_PATH, outputPath: SIGNED_PATH, mode: 'anyone' });
    const signed = signedSummary(SIGNED_PATH);
    console.log(`Signed: ${SIGNED_PATH} (${signed.size} bytes, ${signed.modifiedAt})`);
  }

  return 0;
}

main().then(
  (code) => {
    process.exit(code);
  },
  (error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  },
);
