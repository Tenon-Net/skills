# skills

[English](README.md) | **中文** | [日本語](README.ja.md)

一组 agent skill，附带一个零依赖的 `npx` 安装器。

## 安装

**推荐 —— 交互式选择器**（Vercel Labs 的 [`skills`](https://skills.sh) CLI）：

```bash
# 勾选要装哪些 skill + 装到哪个 agent（Claude Code / Cursor / Codex …）
npx skills@latest add Tenon-Net/skills

# …或直接装某一个（按 skill 名解析）
npx skills@latest add Tenon-Net/skills/ship
```

`skills` CLI 对任意公开 GitHub 仓库都生效：它扫描本仓库的 `SKILL.md`，列出来让你挑，再装进你选的 agent。

**零依赖后备** —— 仓库自带的安装器，离线或不想装外部 CLI 时用：

```bash
npx github:Tenon-Net/skills --list           # 只列出可用 skill，不安装
npx github:Tenon-Net/skills ship             # 装指定的 skill
npx github:Tenon-Net/skills                  # 不带名字 = 全装（无交互）
npx github:Tenon-Net/skills ship --project   # 装到 ./.claude/skills（或 --dir <path>）
```

不带名字即全装；覆盖同名目录（重复运行安全）。默认装到 `~/.claude/skills`，用 `--project` / `--dir <path>` 改位置。

装完**重启 Claude Code**，即可用如 `/ship`。

## 更新 / 固定版本

两种安装器重新跑都会原地升级。要固定到某个 tag 版本，用后备安装器：

```bash
npx github:Tenon-Net/skills            # 重新跑 = 升级到最新
npx github:Tenon-Net/skills#v0.3.1     # 固定到某个 tag 版本
```

## 包含的 skill

| Skill | 作用 |
|-------|------|
| `loop-prompt` | 把一句模糊的话变成可直接粘进 `/loop` 的提示词。它会分析、提问、规划，产出一个带「任务台账文件」的循环提示词——每轮把任务写进 `.loop/<slug>.md`，中断也不丢、能自动收尾。 |
| `ship` | 一条命令跑完整条交付链：`/ship <任务>` 依次串起 一次可选的 **grilling** → **to-spec** → **implement**（TDD）→ **code-review main**，任务描述贯穿全程，不用逐条打命令。会拦住在 `main` 上直接干活，并在 spec 阶段停下等你确认（`--yolo` 可跳过）。 |

> 注：`loop-prompt` 依赖 Claude Code 专属的 `/loop` 命令，其它没有 `/loop` 的 agent 用不了这个 skill 本身（但安装器和仓库结构是通用的）。
>
> 注：`ship` 只是编排器，它调用一个 grilling skill（默认 `grill-me`，值得沉淀文档时才用 `grill-with-docs`）再加 `to-spec`、`implement`、`code-review`（Matt Pocock 的工程 skill，用 `/setup-matt-pocock-skills` 安装），这些**不在**本仓库。先装好它们，否则 `/ship` 没东西可串。

## 加新 skill

在仓库根新建 `<skill-name>/SKILL.md` 即可，安装器会自动扫描并安装所有含 `SKILL.md` 的一级目录，无需改脚本。

## License

MIT
