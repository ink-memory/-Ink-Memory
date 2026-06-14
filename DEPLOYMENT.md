# 部署说明

本仓库通过 GitHub Actions 构建 Vite 应用，并把 `dist/` 发布到 GitHub Pages 仓库：

- 源仓库：`ink-memory/-Ink-Memory`
- 目标仓库：`ink-memory/ink-memory.github.io`
- 目标分支：`main`
- 访问地址：https://ink-memory.github.io/

## 自动部署

工作流文件：`.github/workflows/deploy.yml`

触发条件：

- 推送到源仓库 `main` 分支
- 手动在 GitHub Actions 页面点击 `Run workflow`

会触发部署的文件路径：

- `src/**`
- `index.html`
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `.github/workflows/deploy.yml`

## 需要配置的 Secrets

在源仓库配置：

https://github.com/ink-memory/-Ink-Memory/settings/secrets/actions

### `DEPLOY_TOKEN`

用于把构建产物写入 `ink-memory/ink-memory.github.io`。

因为这是跨仓库部署，token 必须对目标仓库有写权限。

Classic token 配置：

1. 打开 https://github.com/settings/tokens
2. 选择 `Generate new token (classic)`
3. 勾选 `repo`
4. 如果目标仓库有 workflow 保护或需要更新 workflow，再勾选 `workflow`
5. 生成后添加到源仓库 secret，名称为 `DEPLOY_TOKEN`

Fine-grained token 配置：

1. 打开 https://github.com/settings/tokens
2. 选择 `Generate new token (fine-grained)`
3. Repository access 选择并授权：
   - `ink-memory/-Ink-Memory`
   - `ink-memory/ink-memory.github.io`
4. Permissions 至少设置：
   - Contents: Read and write
   - Workflows: Read and write（如果目标仓库需要）
5. 生成后添加到源仓库 secret，名称为 `DEPLOY_TOKEN`

### `GEMINI_API_KEY`

如果构建或运行时需要 Gemini API 配置，在源仓库 secrets 中添加 `GEMINI_API_KEY`。

## 本地验证

```bash
npm install
npm run build -- --outDir=./dist
```

## 手动触发部署

1. 打开 https://github.com/ink-memory/-Ink-Memory/actions
2. 选择 `Build and Deploy to GitHub Pages`
3. 点击 `Run workflow`

## 常见问题

### 403 Permission denied

通常是 `DEPLOY_TOKEN` 没有目标仓库写权限。

检查项：

- Fine-grained token 是否授权了 `ink-memory/ink-memory.github.io`
- token 是否有 `Contents: Read and write`
- 当前账号是否对目标仓库有 Write 或 Admin 权限
- 目标仓库 `main` 分支是否启用了会阻止 bot 直接写入的分支保护

### npm ci 失败

当前仓库没有提交 `package-lock.json`，所以 workflow 使用 `npm install`。

如果后续提交了 `package-lock.json`，可以把安装步骤改成：

```yaml
- name: Install dependencies
  run: npm ci
```

### 构建成功但页面没有更新

检查目标仓库：

https://github.com/ink-memory/ink-memory.github.io

确认最新提交是否来自 GitHub Actions，并确认 GitHub Pages 正在从目标仓库 `main` 分支发布。
