# Github Uploader

把文件、图片、文本或剪贴板内容上传到 GitHub 仓库，并返回下载链接的 Apple 快捷指令。

[下载已签名的 `.shortcut`](./Github%20Uploader.shortcut)

## 这份快捷指令现在实际会做什么

- 支持作为分享扩展接收输入，也支持手动运行后再选择上传来源。
- 手动运行时会弹出 4 个入口：`文件`、`图片`、`输入文字`、`使用剪贴板`。
- 分享扩展模式下只取第一个输入项，不做批量上传。
- 上传成功后，会把 GitHub API 返回的 `content.download_url` 复制到剪贴板，并把这个链接作为快捷指令输出。
- 上传失败时，会弹出通知，并输出 GitHub 返回的 `message / errors / documentation_url`。

## 首次导入需要填写

导入时会弹出 5 个问题，这些值会直接写进快捷指令里：

| 项目           | 说明                                                                         | 默认值    |
| -------------- | ---------------------------------------------------------------------------- | --------- |
| `GitHub Token` | 会作为 `Authorization: Bearer <token>` 发给 GitHub；需要对目标仓库有读写权限 | 空        |
| `GitHub User`  | 仓库所属用户或组织                                                           | 空        |
| `GitHub Repo`  | 目标仓库名                                                                   | `assets`  |
| `仓库内文件夹` | 上传目录；可留空。留空时上传到仓库根目录                                     | `uploads` |
| `分支名`       | 提交目标分支                                                                 | `main`    |

## 上传方式

### 1. 从分享面板触发

适合从文件 App、照片、Safari、备忘录等地方直接分享内容到这个快捷指令。

- 只处理第一个分享项。
- 支持的输入类型以当前快捷指令声明为准：文件、图片、富文本、纯文本。

### 2. 直接运行快捷指令

直接运行时会先让你选来源：

- `文件`：弹出系统文件选择器。
- `图片`：也是文件选择器，本质上仍然选择一个文件。
- `输入文字`：手动输入一段文本后上传。
- `使用剪贴板`：读取当前剪贴板内容，当前流程主要按文本或图片使用。

## 已知限制

- 不是批量上传工具，一次只处理一个项目。
- 分享扩展只会取第一个输入项。
- 成功后返回的是 GitHub 响应里的 `download_url`，不是仓库页面链接。
- 如果 GitHub 响应里没有 `download_url`，快捷指令会走失败分支。
- 剪贴板入口当前主要围绕文本和图片设计，其他类型没有专门分支处理。

## 本地构建

这个目录下的 `.shortcut` 不是手工维护的，而是由脚本生成。

相关文件：

- [build.js](./build.js)：组装快捷指令动作并生成产物
- [workflow-template.js](./workflow-template.js)：快捷指令模板
- [../tools/shortcuts-sign.js](../tools/shortcuts-sign.js)：签名辅助脚本

常用命令：

```bash
bun run build:github-uploader
bun run build:github-uploader:unsigned
bun run sign:github-uploader
bun run verify:github-uploader
```

当前构建流程依赖：

- `bun`
- macOS 自带的 `/usr/bin/plutil`
- macOS 自带的 `/usr/bin/shortcuts sign`

产物位置：

- 未签名：`github-uploader/.build/github-uploader-unsigned.shortcut`
- 已签名：`github-uploader/Github Uploader.shortcut`
