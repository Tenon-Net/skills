# skills

[English](README.md) | [中文](README.zh-CN.md) | **日本語**

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
