export const DEFAULT_REPO = "assets";
export const DEFAULT_FOLDER = "uploads";
export const DEFAULT_BRANCH = "main";

// Shortcuts uses U+FFFC as the inline attachment placeholder for WFTextTokenString values.
export const SHORTCUT_TOKEN = "\uFFFC";

export const WORKFLOW_METADATA = {
  WFWorkflowMinimumClientVersionString: "900",
  WFWorkflowMinimumClientVersion: 900,
  WFWorkflowIcon: {
    WFWorkflowIconStartColor: 946986751,
    WFWorkflowIconGlyphNumber: 61530,
  },
  WFWorkflowClientVersion: "4528.0.4.2",
  WFWorkflowHasOutputFallback: false,
  WFWorkflowOutputContentItemClasses: [],
  WFWorkflowInputContentItemClasses: [
    "WFGenericFileContentItem",
    "WFImageContentItem",
    "WFRichTextContentItem",
    "WFStringContentItem",
  ],
  WFWorkflowImportQuestions: [
    {
      ParameterKey: "WFTextActionText",
      Category: "Parameter",
      ActionIndex: 0,
      Text: "GitHub Token（需要有权限读写仓库）",
      DefaultValue: "",
    },
    {
      ParameterKey: "WFTextActionText",
      Category: "Parameter",
      ActionIndex: 2,
      Text: "GitHub User",
      DefaultValue: "",
    },
    {
      ParameterKey: "WFTextActionText",
      Category: "Parameter",
      ActionIndex: 4,
      Text: "GitHub Repo",
      DefaultValue: "assets",
    },
    {
      ParameterKey: "WFTextActionText",
      Category: "Parameter",
      ActionIndex: 6,
      Text: "仓库内文件夹（可留空，默认是 uploads）",
      DefaultValue: "uploads",
    },
    {
      ParameterKey: "WFTextActionText",
      Category: "Parameter",
      ActionIndex: 8,
      Text: "分支名",
      DefaultValue: "main",
    },
  ],
  WFWorkflowTypes: ["ActionExtension"],
  WFQuickActionSurfaces: [],
  WFWorkflowHasShortcutInputVariables: true,
};

export const TEMPLATE_CONFIG_ACTIONS = [
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: "",
      UUID: "D6A8EE01-B188-4EC4-B0E4-32CB3A0327E6",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "D6A8EE01-B188-4EC4-B0E4-32CB3A0327E6",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "token",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: "",
      UUID: "97E7D001-96B4-4944-9624-830E6ABF0FB2",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "97E7D001-96B4-4944-9624-830E6ABF0FB2",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "owner",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: "",
      UUID: "4F8A5489-796C-434F-A6FE-75723E69260D",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "4F8A5489-796C-434F-A6FE-75723E69260D",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "repo",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: "uploads",
      UUID: "C2B024A8-2CCC-4173-AE1C-20E4E24511CD",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "C2B024A8-2CCC-4173-AE1C-20E4E24511CD",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "folder",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: "main",
      UUID: "AE31D8A3-ABF7-403B-AE41-741C87BCB9E7",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "AE31D8A3-ABF7-403B-AE41-741C87BCB9E7",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "branch",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.date",
    WFWorkflowActionParameters: {
      WFDateActionMode: "Current Date",
      UUID: "5FF51B81-A795-49DC-AAB1-37EEA57BF5EA",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "5FF51B81-A795-49DC-AAB1-37EEA57BF5EA",
          Type: "ActionOutput",
          OutputName: "日期",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "currentDate",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.format.date",
    WFWorkflowActionParameters: {
      WFDateFormatStyle: "Custom",
      UUID: "A640C845-49F5-4F2B-A1FD-0B05290A8967",
      WFDateFormat: "yyyy-MM-dd HH:mm:ss",
      WFDate: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "currentDate", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "A640C845-49F5-4F2B-A1FD-0B05290A8967",
          Type: "ActionOutput",
          OutputName: "格式化后的日期",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "timestampHuman",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.format.date",
    WFWorkflowActionParameters: {
      WFDateFormatStyle: "Custom",
      UUID: "932757B4-3849-48DE-A8B5-FEA2F2016952",
      WFDateFormat: "yyyyMMdd-HHmmss",
      WFDate: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "currentDate", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "932757B4-3849-48DE-A8B5-FEA2F2016952",
          Type: "ActionOutput",
          OutputName: "格式化后的日期",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "timestampCompact",
    },
  },
];

export const TEMPLATE_EXTENSION_PICK_ACTION = {
  WFWorkflowActionIdentifier: "is.workflow.actions.getitemfromlist",
  WFWorkflowActionParameters: {
    WFInput: {
      Value: { Type: "ExtensionInput" },
      WFSerializationType: "WFTextTokenAttachment",
    },
    UUID: "ACF99CB0-48E6-4BB3-A3C2-900CA641A5FF",
    WFItemSpecifier: "First Item",
  },
};

export const TEMPLATE_EXTENSION_SET_SHARED_ITEM_ACTION = {
  WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
  WFWorkflowActionParameters: {
    WFInput: {
      Value: {
        OutputUUID: "ACF99CB0-48E6-4BB3-A3C2-900CA641A5FF",
        Type: "ActionOutput",
        OutputName: "来自列表的项目",
      },
      WFSerializationType: "WFTextTokenAttachment",
    },
    WFVariableName: "sharedItem",
  },
};

export const TEMPLATE_MIDDLE_ACTIONS = [
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFInput: {
        Type: "Variable",
        Variable: {
          Value: { VariableName: "sharedItem", Type: "Variable" },
          WFSerializationType: "WFTextTokenAttachment",
        },
      },
      WFControlFlowMode: 0,
      GroupingIdentifier: "09B4592F-41C8-46F3-B717-5E44C5E58BCF",
      WFCondition: 101,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.notification",
    WFWorkflowActionParameters: {
      WFNotificationActionBody:
        "未获得要上传的内容，请重新选择文件、图片、输入文字，或确认剪贴板中有图像/文字。",
      UUID: "37194CDE-B2E9-43EB-A7CD-192DAB349783",
      WFNotificationActionTitle: "GitHub 上传失败",
      WFNotificationActionSound: false,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.output",
    WFWorkflowActionParameters: {
      WFOutput: {
        Value: {
          string:
            "未获得要上传的内容，请重新选择文件、图片、输入文字，或确认剪贴板中有图像/文字。",
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "7DC348D9-1D1F-45E1-BFF0-FD149203FCA8",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      UUID: "7D9DBAFC-6504-4429-9E08-EFCB713E3157",
      GroupingIdentifier: "09B4592F-41C8-46F3-B717-5E44C5E58BCF",
      WFControlFlowMode: 2,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.getitemtype",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "41F77916-FEA6-43E7-8A57-B54D8A99FE31",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "41F77916-FEA6-43E7-8A57-B54D8A99FE31",
          Type: "ActionOutput",
          OutputName: "类型",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "inputType",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.getitemname",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "3C06B779-4B2A-4BC2-9729-866F3C46C423",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "3C06B779-4B2A-4BC2-9729-866F3C46C423",
          Type: "ActionOutput",
          OutputName: "名称",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "rawName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: true,
      WFReplaceTextReplace: "-",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "rawName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "721497A9-8C37-45C0-8047-5E582B02185F",
      WFReplaceTextFind: '[\\\\/:*?\\"<>|\\r\\n]+',
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "721497A9-8C37-45C0-8047-5E582B02185F",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "sanitizedName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.match",
    WFWorkflowActionParameters: {
      WFMatchTextPattern: "\\S",
      text: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "sanitizedName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "00009C1A-3D9C-435D-8109-A379F4EF184D",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.count",
    WFWorkflowActionParameters: {
      WFCountType: "Items",
      Input: {
        Value: {
          OutputUUID: "00009C1A-3D9C-435D-8109-A379F4EF184D",
          Type: "ActionOutput",
          OutputName: "匹配",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "864DA9C1-BE2C-498E-B9F1-23788C5EBDE5",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "864DA9C1-BE2C-498E-B9F1-23788C5EBDE5",
          Type: "ActionOutput",
          OutputName: "计数",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "sanitizedNameMatchCount",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.match",
    WFWorkflowActionParameters: {
      WFMatchTextPattern: "\\.[A-Za-z0-9]{1,10}$",
      text: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "sanitizedName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "23634AC3-AE00-4732-869F-35252B712C30",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.count",
    WFWorkflowActionParameters: {
      WFCountType: "Items",
      Input: {
        Value: {
          OutputUUID: "23634AC3-AE00-4732-869F-35252B712C30",
          Type: "ActionOutput",
          OutputName: "匹配",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "1BB0052A-BE82-4541-AECA-A1E8D6E449B0",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "1BB0052A-BE82-4541-AECA-A1E8D6E449B0",
          Type: "ActionOutput",
          OutputName: "计数",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "nameHasExtensionCount",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.match",
    WFWorkflowActionParameters: {
      WFMatchTextPattern:
        "(?i)^(图像|图片|照片|image|photo|img)(\\.[A-Za-z0-9]{1,10})?$",
      text: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "sanitizedName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "A0DB5EAC-71D4-4744-B251-06881A8DBE6D",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.count",
    WFWorkflowActionParameters: {
      WFCountType: "Items",
      Input: {
        Value: {
          OutputUUID: "A0DB5EAC-71D4-4744-B251-06881A8DBE6D",
          Type: "ActionOutput",
          OutputName: "匹配",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "B063A862-E45B-47B0-9EAA-A8BBD4613047",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "B063A862-E45B-47B0-9EAA-A8BBD4613047",
          Type: "ActionOutput",
          OutputName: "计数",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "genericImageNameCount",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFNumberValue: 0,
      WFInput: {
        Type: "Variable",
        Variable: {
          Value: { VariableName: "sanitizedNameMatchCount", Type: "Variable" },
          WFSerializationType: "WFTextTokenAttachment",
        },
      },
      WFControlFlowMode: 0,
      GroupingIdentifier: "99B712F9-0A7B-4BBE-A51D-3D3FB23E0E02",
      WFCondition: 4,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "upload-\uFFFC",
          attachmentsByRange: {
            "{7, 1}": { VariableName: "timestampCompact", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "73B2C394-5C96-40A2-8580-14679356EF07",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "73B2C394-5C96-40A2-8580-14679356EF07",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "baseName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: "99B712F9-0A7B-4BBE-A51D-3D3FB23E0E02",
      WFControlFlowMode: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "sanitizedName", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "baseName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      UUID: "644EA09B-F7A1-494B-88C3-D54629260742",
      GroupingIdentifier: "99B712F9-0A7B-4BBE-A51D-3D3FB23E0E02",
      WFControlFlowMode: 2,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.match",
    WFWorkflowActionParameters: {
      WFMatchTextPattern: "(?i)^(text|rich text|文本|富文本)$",
      text: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "inputType", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "623067CF-362C-4706-B2FB-D123B436F2AE",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.count",
    WFWorkflowActionParameters: {
      WFCountType: "Items",
      Input: {
        Value: {
          OutputUUID: "623067CF-362C-4706-B2FB-D123B436F2AE",
          Type: "ActionOutput",
          OutputName: "匹配",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "60B3D98D-3BFB-4C82-8C12-EE4F8C1B279F",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "60B3D98D-3BFB-4C82-8C12-EE4F8C1B279F",
          Type: "ActionOutput",
          OutputName: "计数",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "textTypeMatchCount",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.match",
    WFWorkflowActionParameters: {
      WFMatchTextPattern: "(?i)(image|图像|图片|photo|照片)",
      text: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "inputType", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "B65241A3-49F3-4111-9A84-BA80C9560034",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.count",
    WFWorkflowActionParameters: {
      WFCountType: "Items",
      Input: {
        Value: {
          OutputUUID: "B65241A3-49F3-4111-9A84-BA80C9560034",
          Type: "ActionOutput",
          OutputName: "匹配",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "EBFAB493-164A-48AB-AB93-273BF3137A4B",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "EBFAB493-164A-48AB-AB93-273BF3137A4B",
          Type: "ActionOutput",
          OutputName: "计数",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "imageTypeMatchCount",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: "6BAA41DF-C20B-4294-B27D-DD58CA26CADC",
      WFInput: {
        Type: "Variable",
        Variable: {
          Value: { VariableName: "textTypeMatchCount", Type: "Variable" },
          WFSerializationType: "WFTextTokenAttachment",
        },
      },
      WFControlFlowMode: 0,
      WFNumberValue: 1,
      WFCondition: 4,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.detect.text",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "9A346A59-7FB4-4FE5-B7D1-375AD04C714D",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "9A346A59-7FB4-4FE5-B7D1-375AD04C714D",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "textContent",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.base64encode",
    WFWorkflowActionParameters: {
      WFBase64LineBreakMode: "None",
      WFInput: {
        Value: { VariableName: "textContent", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "EED98261-C11F-4229-B71F-64EF8DF7F4E7",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "EED98261-C11F-4229-B71F-64EF8DF7F4E7",
          Type: "ActionOutput",
          OutputName: "Base64已编码内容",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "contentBase64",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: true,
      WFReplaceTextReplace: "",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "baseName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "8E855F3B-9659-44BB-9683-C78244CEE62E",
      WFReplaceTextFind: "\\.[^./]+$",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "8E855F3B-9659-44BB-9683-C78244CEE62E",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "textBaseName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "\uFFFC.txt",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "textBaseName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "AC282978-8059-4BDE-90A9-E5602E818DD6",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "AC282978-8059-4BDE-90A9-E5602E818DD6",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "finalFileName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: "6BAA41DF-C20B-4294-B27D-DD58CA26CADC",
      WFControlFlowMode: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFCondition: 4,
      WFInput: {
        Type: "Variable",
        Variable: {
          Value: { VariableName: "imageTypeMatchCount", Type: "Variable" },
          WFSerializationType: "WFTextTokenAttachment",
        },
      },
      WFControlFlowMode: 0,
      GroupingIdentifier: "EDD2A5F7-37F2-419D-A329-FCC5CD4B7CC5",
      WFNumberValue: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFCondition: 4,
      WFInput: {
        Type: "Variable",
        Variable: {
          Value: { VariableName: "genericImageNameCount", Type: "Variable" },
          WFSerializationType: "WFTextTokenAttachment",
        },
      },
      WFControlFlowMode: 0,
      GroupingIdentifier: "36EF596B-80C5-436D-A213-A0BD8D26E6B1",
      WFNumberValue: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettypeaction",
    WFWorkflowActionParameters: {
      WFFileType: "public.png",
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "56A6E7B3-2599-41CD-BDD7-160A22F2C266",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "56A6E7B3-2599-41CD-BDD7-160A22F2C266",
          Type: "ActionOutput",
          OutputName: "特定类型的文件",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "uploadItem",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "image-\uFFFC.png",
          attachmentsByRange: {
            "{6, 1}": { VariableName: "timestampCompact", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "8689C673-1165-4434-9384-52E3CBBD941E",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "8689C673-1165-4434-9384-52E3CBBD941E",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "finalFileName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: "36EF596B-80C5-436D-A213-A0BD8D26E6B1",
      WFControlFlowMode: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFCondition: 4,
      WFInput: {
        Type: "Variable",
        Variable: {
          Value: { VariableName: "nameHasExtensionCount", Type: "Variable" },
          WFSerializationType: "WFTextTokenAttachment",
        },
      },
      WFControlFlowMode: 0,
      WFNumberValue: 0,
      GroupingIdentifier: "A1708D5A-C5AA-430C-88EC-9D5D04835820",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettypeaction",
    WFWorkflowActionParameters: {
      WFFileType: "public.png",
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "32CB89B0-530A-4C9D-A355-7B2DFCAEB08C",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "32CB89B0-530A-4C9D-A355-7B2DFCAEB08C",
          Type: "ActionOutput",
          OutputName: "特定类型的文件",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "uploadItem",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "image-\uFFFC.png",
          attachmentsByRange: {
            "{6, 1}": { VariableName: "timestampCompact", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "B437253A-A104-4F3E-97BC-4C47BBCCB0A8",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "B437253A-A104-4F3E-97BC-4C47BBCCB0A8",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "finalFileName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: "A1708D5A-C5AA-430C-88EC-9D5D04835820",
      WFControlFlowMode: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "uploadItem",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "baseName", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "finalFileName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFControlFlowMode: 2,
      GroupingIdentifier: "A1708D5A-C5AA-430C-88EC-9D5D04835820",
      UUID: "177A850E-C88F-41C1-9C8A-80E4C603F2A1",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      UUID: "CAF851F3-8B84-4660-84C5-134CADE4807F",
      GroupingIdentifier: "36EF596B-80C5-436D-A213-A0BD8D26E6B1",
      WFControlFlowMode: 2,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: "EDD2A5F7-37F2-419D-A329-FCC5CD4B7CC5",
      WFControlFlowMode: 1,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "sharedItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "uploadItem",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: { VariableName: "baseName", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "finalFileName",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      WFControlFlowMode: 2,
      GroupingIdentifier: "EDD2A5F7-37F2-419D-A329-FCC5CD4B7CC5",
      UUID: "DD845A12-A9C0-4132-8E07-73D24481E956",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.base64encode",
    WFWorkflowActionParameters: {
      WFBase64LineBreakMode: "None",
      WFInput: {
        Value: { VariableName: "uploadItem", Type: "Variable" },
        WFSerializationType: "WFTextTokenAttachment",
      },
      UUID: "77C1661F-B5EC-408B-8018-2B8FCC28EBBF",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "77C1661F-B5EC-408B-8018-2B8FCC28EBBF",
          Type: "ActionOutput",
          OutputName: "Base64已编码内容",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "contentBase64",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      UUID: "6FFC6FB9-1A82-4C92-9BD1-B35CC8050F1D",
      GroupingIdentifier: "6BAA41DF-C20B-4294-B27D-DD58CA26CADC",
      WFControlFlowMode: 2,
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: true,
      WFReplaceTextReplace: "/",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "folder", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "508CC5DA-F783-48EA-AEE9-8DE2E62FEE4E",
      WFReplaceTextFind: "[\\\\]+",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "508CC5DA-F783-48EA-AEE9-8DE2E62FEE4E",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "folderSlashes",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: true,
      WFReplaceTextReplace: "",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "folderSlashes", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "ACC93BC2-7D49-4714-B141-C1421F6DC8B7",
      WFReplaceTextFind: "^/+|/+$",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "ACC93BC2-7D49-4714-B141-C1421F6DC8B7",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "folderNormalized",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "\uFFFC/\uFFFC",
          attachmentsByRange: {
            "{2, 1}": { VariableName: "finalFileName", Type: "Variable" },
            "{0, 1}": { VariableName: "folderNormalized", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "7C270518-8FAF-4AB9-A135-1A50E439CFF0",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "7C270518-8FAF-4AB9-A135-1A50E439CFF0",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "repoPathMaybe",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: true,
      WFReplaceTextReplace: "",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "repoPathMaybe", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "3408F920-5111-42A8-938E-15D9247E846E",
      WFReplaceTextFind: "^/+",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "3408F920-5111-42A8-938E-15D9247E846E",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "repoPathNoLeading",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: true,
      WFReplaceTextReplace: "/",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "repoPathNoLeading", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "CC88644C-D9ED-426F-9782-8BD3529BA356",
      WFReplaceTextFind: "/+",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "CC88644C-D9ED-426F-9782-8BD3529BA356",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "repoPath",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.urlencode",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "repoPath", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "F47F13ED-37AD-4828-A930-6A2A8D1B0B1A",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "F47F13ED-37AD-4828-A930-6A2A8D1B0B1A",
          Type: "ActionOutput",
          OutputName: "URL编码后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "encodedRepoPath",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: false,
      WFReplaceTextReplace: "/",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "encodedRepoPath", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "9D644663-58E1-45BE-86DE-1F4EDEBBD028",
      WFReplaceTextFind: "%2F",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "9D644663-58E1-45BE-86DE-1F4EDEBBD028",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "encodedRepoPathForUrl",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.urlencode",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "branch", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "9F092EF1-F741-4D21-AD6A-B3E952818B65",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "9F092EF1-F741-4D21-AD6A-B3E952818B65",
          Type: "ActionOutput",
          OutputName: "URL编码后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "encodedBranch",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.text.replace",
    WFWorkflowActionParameters: {
      WFReplaceTextRegularExpression: false,
      WFReplaceTextReplace: "/",
      WFReplaceTextCaseSensitive: false,
      WFInput: {
        Value: {
          string: "\uFFFC",
          attachmentsByRange: {
            "{0, 1}": { VariableName: "encodedBranch", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "858B66EB-211F-4C9A-8B4B-3DBC0BB617F5",
      WFReplaceTextFind: "%2F",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "858B66EB-211F-4C9A-8B4B-3DBC0BB617F5",
          Type: "ActionOutput",
          OutputName: "更新后的文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "encodedBranchForUrl",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "Upload \uFFFC @ \uFFFC",
          attachmentsByRange: {
            "{11, 1}": { VariableName: "timestampHuman", Type: "Variable" },
            "{7, 1}": { VariableName: "finalFileName", Type: "Variable" },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "64186979-AA51-48DB-ABBC-A300AF0A1454",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "64186979-AA51-48DB-ABBC-A300AF0A1454",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "commitMessage",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.gettext",
    WFWorkflowActionParameters: {
      WFTextActionText: {
        Value: {
          string: "https://api.github.com/repos/\uFFFC/\uFFFC/contents/\uFFFC",
          attachmentsByRange: {
            "{29, 1}": { VariableName: "owner", Type: "Variable" },
            "{31, 1}": { VariableName: "repo", Type: "Variable" },
            "{42, 1}": {
              VariableName: "encodedRepoPathForUrl",
              Type: "Variable",
            },
          },
        },
        WFSerializationType: "WFTextTokenString",
      },
      UUID: "C1CA6A34-8BE9-4BCC-81C8-2DC13440A8C0",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.setvariable",
    WFWorkflowActionParameters: {
      WFInput: {
        Value: {
          OutputUUID: "C1CA6A34-8BE9-4BCC-81C8-2DC13440A8C0",
          Type: "ActionOutput",
          OutputName: "文本",
        },
        WFSerializationType: "WFTextTokenAttachment",
      },
      WFVariableName: "uploadUrl",
    },
  },
  {
    WFWorkflowActionIdentifier: "is.workflow.actions.dictionary",
    WFWorkflowActionParameters: {
      WFItems: {
        Value: {
          WFDictionaryFieldValueItems: [
            {
              WFKey: {
                Value: { string: "message" },
                WFSerializationType: "WFTextTokenString",
              },
              WFItemType: 0,
              WFValue: {
                Value: {
                  string: "\uFFFC",
                  attachmentsByRange: {
                    "{0, 1}": {
                      VariableName: "commitMessage",
                      Type: "Variable",
                    },
                  },
                },
                WFSerializationType: "WFTextTokenString",
              },
            },
            {
              WFKey: {
                Value: { string: "content" },
                WFSerializationType: "WFTextTokenString",
              },
              WFItemType: 0,
              WFValue: {
                Value: {
                  string: "\uFFFC",
                  attachmentsByRange: {
                    "{0, 1}": {
                      VariableName: "contentBase64",
                      Type: "Variable",
                    },
                  },
                },
                WFSerializationType: "WFTextTokenString",
              },
            },
            {
              WFKey: {
                Value: { string: "branch" },
                WFSerializationType: "WFTextTokenString",
              },
              WFItemType: 0,
              WFValue: {
                Value: {
                  string: "\uFFFC",
                  attachmentsByRange: {
                    "{0, 1}": { VariableName: "branch", Type: "Variable" },
                  },
                },
                WFSerializationType: "WFTextTokenString",
              },
            },
          ],
        },
        WFSerializationType: "WFDictionaryFieldValue",
      },
      CustomOutputName: "Upload Body",
      UUID: "7263FA59-CF52-410E-B98B-E683377E0B96",
    },
  },
];

export const TEMPLATE_UPLOAD_ACTION = {
  WFWorkflowActionIdentifier: "is.workflow.actions.downloadurl",
  WFWorkflowActionParameters: {
    WFHTTPHeaders: {
      Value: {
        WFDictionaryFieldValueItems: [
          {
            WFKey: {
              Value: { string: "Accept" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: { string: "application/vnd.github+json" },
              WFSerializationType: "WFTextTokenString",
            },
          },
          {
            WFKey: {
              Value: { string: "Authorization" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: {
                string: "Bearer \uFFFC",
                attachmentsByRange: {
                  "{7, 1}": { VariableName: "token", Type: "Variable" },
                },
              },
              WFSerializationType: "WFTextTokenString",
            },
          },
          {
            WFKey: {
              Value: { string: "X-GitHub-Api-Version" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: { string: "2026-03-10" },
              WFSerializationType: "WFTextTokenString",
            },
          },
          {
            WFKey: {
              Value: { string: "User-Agent" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: { string: "ios-github-upload-shortcut" },
              WFSerializationType: "WFTextTokenString",
            },
          },
          {
            WFKey: {
              Value: { string: "Content-Type" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: { string: "application/json" },
              WFSerializationType: "WFTextTokenString",
            },
          },
        ],
      },
      WFSerializationType: "WFDictionaryFieldValue",
    },
    ShowHeaders: true,
    UUID: "F86CBE98-8FF7-46A2-BB33-2F745E696B02",
    WFURL: {
      Value: {
        string: "\uFFFC",
        attachmentsByRange: {
          "{0, 1}": { VariableName: "uploadUrl", Type: "Variable" },
        },
      },
      WFSerializationType: "WFTextTokenString",
    },
    WFJSONValues: {
      Value: {
        WFDictionaryFieldValueItems: [
          {
            WFKey: {
              Value: { string: "message" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: {
                string: "\uFFFC",
                attachmentsByRange: {
                  "{0, 1}": { VariableName: "commitMessage", Type: "Variable" },
                },
              },
              WFSerializationType: "WFTextTokenString",
            },
          },
          {
            WFKey: {
              Value: { string: "content" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: {
                string: "\uFFFC",
                attachmentsByRange: {
                  "{0, 1}": { VariableName: "contentBase64", Type: "Variable" },
                },
              },
              WFSerializationType: "WFTextTokenString",
            },
          },
          {
            WFKey: {
              Value: { string: "branch" },
              WFSerializationType: "WFTextTokenString",
            },
            WFItemType: 0,
            WFValue: {
              Value: {
                string: "\uFFFC",
                attachmentsByRange: {
                  "{0, 1}": { VariableName: "branch", Type: "Variable" },
                },
              },
              WFSerializationType: "WFTextTokenString",
            },
          },
        ],
      },
      WFSerializationType: "WFDictionaryFieldValue",
    },
    WFHTTPMethod: "PUT",
  },
};
