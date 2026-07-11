# skills

**English** | [中文](README.zh-CN.md) | [日本語](README.ja.md)

A collection of agent skills with a zero-dependency `npx` installer.

## Install

**Recommended — interactive picker** (the [`skills`](https://skills.sh) CLI by Vercel Labs):

```bash
# Pick which skills to install + which agent (Claude Code / Cursor / Codex …)
npx skills@latest add Tenon-Net/skills

# …or install one directly, resolved by skill name
npx skills@latest add Tenon-Net/skills/ship
```

The `skills` CLI works on any public GitHub repo: it scans this repo's `SKILL.md` files,
lists them so you can choose, and installs the selected ones into the agent you pick.

**Zero-dependency fallback** — the repo's own installer, for offline use or when you'd rather not pull an external CLI:

```bash
npx github:Tenon-Net/skills --list           # list available skills, install nothing
npx github:Tenon-Net/skills ship             # install the named skill(s)
npx github:Tenon-Net/skills                  # no name = install ALL (no prompt)
npx github:Tenon-Net/skills ship --project   # into ./.claude/skills (or --dir <path>)
```

No name installs everything; it overwrites the same-named folder (re-running is safe). Default location is `~/.claude/skills`; `--project` / `--dir <path>` change it.

After installing, **restart Claude Code** and use e.g. `/ship`.

## Update / pin a version

Re-running either installer upgrades in place. To pin a tagged version, use the fallback installer:

```bash
npx github:Tenon-Net/skills            # re-run = upgrade to latest
npx github:Tenon-Net/skills#v0.3.1     # pin to a tagged version
```

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
