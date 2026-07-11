# skills

[English](README.md) | [中文](README.zh-CN.md) | **日本語**

ゼロ依存の `npx` インストーラーを備えた agent skill 集。

## インストール

**推奨 — インタラクティブなピッカー**（Vercel Labs の [`skills`](https://skills.sh) CLI）：

```bash
# インストールする skill と対象 agent（Claude Code / Cursor / Codex …）を選択
npx skills@latest add Tenon-Net/skills

# …または 1つを直接インストール（skill 名で解決）
npx skills@latest add Tenon-Net/skills/ship
```

`skills` CLI は任意の公開 GitHub リポジトリで動作します：本リポジトリの `SKILL.md` をスキャンし、一覧から選ばせ、選んだ agent へインストールします。

**ゼロ依存フォールバック** — リポジトリ同梱のインストーラー。オフライン時や外部 CLI を入れたくない場合に：

```bash
npx github:Tenon-Net/skills --list           # 利用可能な skill を一覧表示（インストールしない）
npx github:Tenon-Net/skills ship             # 指定した skill をインストール
npx github:Tenon-Net/skills                  # 名前なし = すべてインストール（非対話）
npx github:Tenon-Net/skills ship --project   # ./.claude/skills へ（または --dir <path>）
```

名前なしですべてインストールし、同名フォルダを上書きします（再実行は安全）。既定のインストール先は `~/.claude/skills`。`--project` / `--dir <path>` で変更できます。

インストール後は **Claude Code を再起動** し、例えば `/ship` を使います。

## 更新 / バージョン固定

どちらのインストーラーも再実行すればその場で更新されます。タグ付きバージョンに固定するにはフォールバックのインストーラーを使います：

```bash
npx github:Tenon-Net/skills            # 再実行 = 最新へアップグレード
npx github:Tenon-Net/skills#v0.3.1     # タグ付きバージョンに固定
```

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
