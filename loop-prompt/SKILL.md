---
name: loop-prompt
description: Turn a vague, half-formed task into a ready-to-paste, resumable /loop prompt. Use when the user says "write me a loop prompt", "帮我写个 loop 提示词", "帮我想个 loop 提示词", or has a fuzzy task they want to run repeatedly via /loop but doesn't know how to phrase it.
argument-hint: "<vague task description>"
---

# loop-prompt

Turn a vague sentence into a prompt that runs correctly under `/loop`.

## What this produces

A single copy-paste **prompt string** the user pastes into `/loop`. It implements the
file-ledger pattern (below) so the loop is stateful, resumable, and self-terminating.

This skill **outputs prompt text only.** Do NOT invoke `/loop`, `ScheduleWakeup`, or the
`loop` skill yourself — the user runs the loop when they choose.

## How `/loop` works (why the pattern exists)

`/loop [interval] <prompt>` re-injects the **same prompt** on every iteration. Each round
starts with essentially fresh context — **nothing carries across rounds except the
filesystem.** A loop prompt that says "continue where you left off" fails, because there
is no remembered "left off."

So every prompt this skill generates must be:

- **Self-contained** — it works with zero memory of previous rounds.
- **Stateful via a file** — it reads/writes a ledger file that IS the memory.
- **Idempotent + guarded** — re-running it does the *next* unit of work, and it refuses to
  keep going once done or once a round cap is hit.

The ledger file is both the "don't lose the task on interruption" file the user wants and
the cross-round memory channel. One file does both jobs.

## Workflow (what you do when this skill runs)

1. **Understand the request.** Parse `{{ARGUMENTS}}`. If it references the codebase (files,
   tests, a feature), do light exploration first (Glob/Grep, or an `Explore` agent) so your
   questions are informed — never ask what the code already tells you.

2. **Ask up to 3 clarifying questions** via `AskUserQuestion`. Only ask what you genuinely
   can't infer. Aim the questions at the three things a good loop prompt needs:
   - **Goal** — what does "done" actually look like?
   - **One round** — what is a single iteration's unit of work? (one file? one test? one
     item from a list? one fix?)
   - **Done-condition** — the concrete, checkable signal that ends the loop.
   Skip any question the input already answers. If the request is already clear, skip
   straight to step 3.

3. **Plan the loop.** Decide:
   - a short `slug` (kebab-case) for the ledger filename,
   - how the work decomposes into rounds (the task list),
   - the per-round unit of work,
   - a **concrete done-condition**,
   - a **max-round cap** `N` — a hard backstop enforced from the ledger counter, so it works
     in both interval and self-paced modes (the guard lives in the prompt, not the harness).
     Pick a number comfortably above the expected round count; e.g. tasks×2, min 5.

4. **Emit the loop prompt** in a fenced code block, filled in from the template below.
   **Mirror the user's language** (if they wrote Chinese, generate a Chinese prompt).
   Then add one line telling them how to run it:
   > 运行方式：`/loop 10m <粘贴上面的提示词>`（固定间隔），或省略间隔 `/loop <提示词>` 让它自己控制节奏。

## The prompt template

The generated prompt MUST instruct the loop agent to do these steps **in this order**
every round. Fill the `{...}` placeholders from your plan.

````
You are running inside `/loop`. The same prompt re-runs each round with fresh context, so
ALL state lives in the ledger file `.loop/{slug}.md`. Do exactly one round, then stop.

GOAL: {one-sentence goal}
DONE-CONDITION: {concrete, checkable signal that the whole job is finished}

Each round:
1. Read `.loop/{slug}.md`.
   - If it does not exist, create it with this content and treat it as round 1:
     ```
     # Goal: {goal}
     Done-condition: {done-condition}
     round: 0 / max: {N}

     ## Tasks
     - [ ] {task 1}
     - [ ] {task 2}
     - [ ] {task 3}

     ## Round log
     ```
2. GUARD (check before doing any work):
   - If the done-condition is already met, OR `round >= max`, then announce
     "✅ DONE — {reason}", do NO further work, and stop. If this loop is self-paced,
     end it; if it is on a fixed interval, tell the user they can run `/loop cancel`.
3. Otherwise, pick the FIRST unchecked task in `## Tasks` (or, if a prior round wrote a
   "NEXT:" note in the log, do that).
4. Do that one unit of work. If it reveals new sub-tasks, add them to `## Tasks`.
5. Update `.loop/{slug}.md`:
   - Check off `[x]` the task you completed (or leave `[ ]` and note the blocker if it
     failed).
   - Append to `## Round log`: `### Round {round+1} — {what you did} → {result}. NEXT: {what
     the next round should do}`.
   - Increment `round:` by 1.
6. Stop this round. The next `/loop` iteration re-reads the ledger and continues.

Never rely on memory of previous rounds — the ledger is the only source of truth.
````

## Guidelines

- The **done-condition must be concrete and checkable** ("all tests in `pytest` pass", "no
  files left in `todo/`"), not vague ("the code is good").
- One ledger file per task, `.loop/{slug}.md` — project-relative so it survives restarts.
  Reuse the same slug to resume; use a new slug for a new job. Suggest the user add
  `.loop/` to `.gitignore` (operational state).
- Keep the generated prompt tight. It's re-sent every round, so every extra line is paid
  for repeatedly.

## Worked example

**Input:** `/loop-prompt 把 src 里的 console.log 都清理掉`

**You ask (≤3):** (1) 清理范围只 `src/` 还是含子目录/测试？ (2) 一轮处理一个文件还是一个目录？
(3) "完成" = grep 不到任何 `console.log`？

**Answers:** 只 `src/` 及子目录、一轮一个文件、grep 为空即完成。

**You output** the template above with the placeholders filled and each step specialized —
same preamble and same 6-step body, only these specifics change:

````
GOAL: 删除 src/ 及子目录下所有 console.log 调用。
DONE-CONDITION: `grep -rn "console.log" src/` 无任何输出。
slug: strip-console-log · max: 20

- Step 1 create: populate `## Tasks` via `grep -rl "console.log" src/` — one checkbox per file.
- Step 2 GUARD: done when `grep -rn "console.log" src/` is empty.
- Step 4 work: remove console.log lines from the first unchecked file, leave console.error/warn, save.
- Step 5 log: `### Round {n} — cleaned <file> (<k> removed). NEXT: <next file or "verify grep">`.
````

> 运行方式：`/loop 2m <粘贴上面的提示词>`，或省略间隔让它自己控制节奏。

Task: {{ARGUMENTS}}
