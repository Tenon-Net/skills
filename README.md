# skills

**English** | [中文](README.zh-CN.md) | [日本語](README.ja.md)

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
