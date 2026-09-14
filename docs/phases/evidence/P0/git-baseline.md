# P0 Git Baseline Evidence

## Repository identity

- Workspace: `E:\AI\WeChatMiniProgram\tdesign-miniprogram-starter-retail`
- Remote: `https://github.com/Tencent/tdesign-miniprogram-starter-retail.git`
- Branch: `main`
- Commit: `4280f410121c75775c4b1fd15c3849031f830cd7`
- Refreshed `origin/main`: `4280f410121c75775c4b1fd15c3849031f830cd7`
- Ahead / behind after `git fetch origin`: `0 / 0`
- Checkout type: normal repository checkout, not a linked worktree and not a submodule
- Tracked upstream files: 407

## Required-path gate

All required paths existed before P0 continued:

- `.git/`
- `pages/`
- `components/`
- `model/`
- `services/`
- `app.js`
- `app.json`
- `package.json`
- `package-lock.json`
- `project.config.json`
- `outputs/多平台服装聚合比价导购微信小程序项目计划.md`

## Pre-existing user state

Before P0 documentation was created, Git reported:

```text
M project.config.json
?? outputs/
```

The tracked configuration difference changes the upstream AppID to a local developer AppID. The local identifier is not copied into P0 documents. The untracked `outputs/` directory contains the approved Markdown plan and its DOCX form. Both changes predate this audit and were preserved.

## Generated and ignored local state

The upstream `.gitignore` excludes:

- `node_modules/`
- `package-lock.json`
- `miniprogram_npm/`
- `project.private.config.json`
- `.eslintcache`

Consequently, the installed dependency tree, generated lockfile, Developer Tools npm build output, and private Developer Tools settings do not appear in the upstream Git baseline. Their existence was audited separately.

## Commands used

```text
git fetch origin
git status --porcelain=v2 --branch
git remote -v
git rev-parse HEAD
git rev-parse origin/main
git rev-list --left-right --count HEAD...origin/main
git fsck --full
```

`git fsck --full` returned exit code 0. No reset, clean, checkout, deletion, commit, or business-source edit was performed.

