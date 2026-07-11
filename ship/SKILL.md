---
name: ship
description: One-command delivery pipeline — chains grill-with-docs (optional) → to-spec → implement (TDD) → code-review main, carrying one task description end-to-end. Use when the user types /ship <task> or asks to run the whole spec-to-review flow without typing each command.
disable-model-invocation: true
---

Run the full delivery pipeline for the task given in the `/ship` arguments, in order. Invoke each sub-skill via the Skill tool (if a `disable-model-invocation` skill can't be invoked that way, read its `SKILL.md` and follow it directly). Carry the task description — and everything discussed so far — into every phase; don't make the user restate it.

`--yolo` in the args skips the phase-2 human gate (build straight through). Without it, keep the gate.

## Phases

### 0. Branch guard — before anything
Run `git status --short --branch`. Phase 4 diffs against `main`, so work must live on another branch. If on `main`, stop and offer to create `feat/<slug>` first.

### 1. Align — grill-with-docs (conditional)
Judge the task honestly:
- **Fuzzy / large / design-open** → invoke `grill-with-docs` to sharpen it and capture ADRs + glossary along the way.
- **Small / well-understood / one obvious implementation** → skip it, and say in one line why. Don't ceremony a one-liner.

### 2. Spec — to-spec
Invoke `to-spec` to synthesize the discussion into a spec and publish it to the issue tracker (a GitHub issue, per `docs/agents/issue-tracker.md`).

**GATE (the one deliberate human checkpoint):** show the user the issue link + a short spec summary and stop for a "go" before building — the spec is the alignment artifact. Skip this gate only when `--yolo` was passed.

### 3. Build — implement
Invoke `implement` to build the spec test-first (TDD at pre-agreed seams). Typecheck and run affected test files as you go; run the full suite once at the end.

### 4. Review — code-review main
Invoke `code-review` with `main` as the fixed point. Report the Standards + Spec findings side by side.

## Output
End with: branch name, issue link, what was built, test result, review verdict. If any phase failed or was skipped, say so plainly — a skipped phase or failing test is a reported outcome, never silently swallowed.
