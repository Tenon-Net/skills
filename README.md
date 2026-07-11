# skills

**English** | [中文](#中文) | [日本語](#日本語)

A collection of agent skills with a zero-dependency `npx` installer.

## Install

```bash
# See which skills the repo has
npx github:Tenon-Net/skills --list

# Install just one (recommended)
npx github:Tenon-Net/skills loop-prompt

# Install several
npx github:Tenon-Net/skills loop-prompt another-skill

# No name = install all
npx github:Tenon-Net/skills
```

Install location (combine with any of the above):

```bash
npx github:Tenon-Net/skills loop-prompt              # global: ~/.claude/skills
npx github:Tenon-Net/skills loop-prompt --project    # this project only: ./.claude/skills
npx github:Tenon-Net/skills loop-prompt --dir <path> # any directory / other agent
```

After installing, **restart Claude Code** and use `/loop-prompt`.

## Update / pin a version

```bash
npx github:Tenon-Net/skills            # re-run = upgrade to latest
npx github:Tenon-Net/skills#v0.3.1     # pin to a tagged version
```

The installer overwrites the same-named skill folder, so re-running is safe.

## Included skills

| Skill | What it does |
|-------|--------------|
| `loop-prompt` | Turns a vague sentence into a ready-to-paste `/loop` prompt. It analyzes, asks questions, plans, and outputs a loop prompt backed by a task-ledger file — each round writes its task to `.loop/<slug>.md`, so nothing is lost on interruption and the loop stops itself. |
| `ship` | One-command delivery pipeline: `/ship <task>` chains an optional **grilling** pass → **to-spec** → **implement** (TDD) → **code-review main**, carrying one task description end-to-end so you don't type each command. Guards against working on `main`, stops for a human "go" on the spec (skip with `--yolo`). |

> Note: `loop-prompt` relies on Claude Code's built-in `/loop` command; agents without `/loop` can't run the skill itself (but the installer and repo layout are agent-agnostic).
>
> Note: `ship` is only an orchestrator — it invokes a grilling skill (`grill-me`, or `grill-with-docs` when domain docs are worth keeping) plus `to-spec`, `implement`, and `code-review` (Matt Pocock's engineering skills, set up via `/setup-matt-pocock-skills`), which are **not** in this repo. Install those first, or `/ship` has nothing to chain.

## Adding a new skill

Create `<skill-name>/SKILL.md` at the repo root. The installer auto-scans and installs every top-level folder containing a `SKILL.md` — no script changes needed.

## License

MIT

---

# 中文

[English](#skills) | **中文** | [日本語](#日本語)

一组 agent skill，附带一个零依赖的 `npx` 安装器。

## 安装

```bash
# 先看仓库里有哪些 skill
npx github:Tenon-Net/skills --list

# 只装指定的一个（推荐）
npx github:Tenon-Net/skills loop-prompt

# 装多个
npx github:Tenon-Net/skills loop-prompt another-skill

# 不带名字 = 全装
npx github:Tenon-Net/skills
```

安装位置（可与上面任意组合）：

```bash
npx github:Tenon-Net/skills loop-prompt              # 全局：~/.claude/skills
npx github:Tenon-Net/skills loop-prompt --project    # 仅当前项目：./.claude/skills
npx github:Tenon-Net/skills loop-prompt --dir <path> # 任意目录 / 别的 agent
```

装完**重启 Claude Code**，即可用 `/loop-prompt`。

## 更新 / 固定版本

```bash
npx github:Tenon-Net/skills            # 重新跑 = 升级到最新
npx github:Tenon-Net/skills#v0.3.1     # 固定到某个 tag 版本
```

安装器会覆盖同名 skill 目录，重复运行是安全的。

## 包含的 skill

| Skill | 作用 |
|-------|------|
| `loop-prompt` | 把一句模糊的话变成可直接粘进 `/loop` 的提示词。它会分析、提问、规划，产出一个带「任务台账文件」的循环提示词——每轮把任务写进 `.loop/<slug>.md`，中断也不丢、能自动收尾。 |
| `ship` | 一条命令跑完整条交付链：`/ship <任务>` 依次串起 一次可选的 **grilling** → **to-spec** → **implement**（TDD）→ **code-review main**，任务描述贯穿全程,不用逐条打命令。会拦住在 `main` 上直接干活,并在 spec 阶段停下等你确认(`--yolo` 可跳过)。 |

> 注：`loop-prompt` 依赖 Claude Code 专属的 `/loop` 命令，其它没有 `/loop` 的 agent 用不了这个 skill 本身（但安装器和仓库结构是通用的）。
>
> 注：`ship` 只是编排器,它调用一个 grilling skill(默认 `grill-me`,值得沉淀文档时才用 `grill-with-docs`)再加 `to-spec`、`implement`、`code-review`(Matt Pocock 的工程 skill,用 `/setup-matt-pocock-skills` 安装),这些**不在**本仓库。先装好它们,否则 `/ship` 没东西可串。

## 加新 skill

在仓库根新建 `<skill-name>/SKILL.md` 即可，安装器会自动扫描并安装所有含 `SKILL.md` 的一级目录，无需改脚本。

## License

MIT

---

# 日本語

[English](#skills) | [中文](#中文) | **日本語**

ゼロ依存の `npx` インストーラーを備えた agent skill 集。

## インストール

```bash
# リポジトリにある skill を一覧表示
npx github:Tenon-Net/skills --list

# 1つだけインストール（推奨）
npx github:Tenon-Net/skills loop-prompt

# 複数インストール
npx github:Tenon-Net/skills loop-prompt another-skill

# 名前なし = すべてインストール
npx github:Tenon-Net/skills
```

インストール先（上記のいずれとも組み合わせ可能）：

```bash
npx github:Tenon-Net/skills loop-prompt              # グローバル：~/.claude/skills
npx github:Tenon-Net/skills loop-prompt --project    # このプロジェクトのみ：./.claude/skills
npx github:Tenon-Net/skills loop-prompt --dir <path> # 任意のディレクトリ / 他の agent
```

インストール後は **Claude Code を再起動** し、`/loop-prompt` を使います。

## 更新 / バージョン固定

```bash
npx github:Tenon-Net/skills            # 再実行 = 最新へアップグレード
npx github:Tenon-Net/skills#v0.3.1     # タグ付きバージョンに固定
```

インストーラーは同名の skill フォルダを上書きするため、再実行しても安全です。

## 含まれる skill

| Skill | 説明 |
|-------|------|
| `loop-prompt` | 曖昧な一文を、そのまま `/loop` に貼れるプロンプトに変換します。分析・質問・計画を行い、「タスク台帳ファイル」付きのループプロンプトを出力します——各ラウンドがタスクを `.loop/<slug>.md` に書き込むので、中断しても失われず、ループは自動で停止します。 |
| `ship` | ワンコマンドのデリバリーパイプライン：`/ship <タスク>` が 任意の **grilling** → **to-spec** → **implement**（TDD）→ **code-review main** を連結し、1つのタスク説明を最後まで引き継ぐので、コマンドを個別に打つ必要がありません。`main` 上での作業を防ぎ、spec の段階で人間の「GO」を待って停止します（`--yolo` でスキップ）。 |

> 注：`loop-prompt` は Claude Code 組み込みの `/loop` コマンドに依存します。`/loop` を持たない agent は skill 自体を実行できません（ただしインストーラーとリポジトリ構成は agent 非依存です）。
>
> 注：`ship` はオーケストレーターにすぎません——grilling skill（既定は `grill-me`、ドメイン文書を残す価値がある場合は `grill-with-docs`）に加えて `to-spec`、`implement`、`code-review`（Matt Pocock のエンジニアリング skill。`/setup-matt-pocock-skills` でセットアップ）を呼び出しますが、これらは本リポジトリには**含まれません**。先にそれらをインストールしないと `/ship` は連結する対象がありません。

## skill の追加

リポジトリのルートに `<skill-name>/SKILL.md` を作成するだけです。インストーラーは `SKILL.md` を含むトップレベルのフォルダをすべて自動でスキャンしてインストールするので、スクリプトの変更は不要です。

## License

MIT
