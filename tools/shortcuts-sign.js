import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SHORTCUTS_CLI = '/usr/bin/shortcuts';

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

export function signShortcut({ inputPath, outputPath, mode = 'anyone' }) {
  if (!existsSync(inputPath)) {
    throw new Error(`Unsigned shortcut not found: ${inputPath}`);
  }

  mkdirSync(dirname(outputPath), { recursive: true });

  run(SHORTCUTS_CLI, [
    'sign',
    '--mode',
    mode,
    '--input',
    inputPath,
    '--output',
    outputPath,
  ]);

  return outputPath;
}
