#!/usr/bin/env node
// Zero-dependency installer: copies every `<name>/SKILL.md` folder in this package
// into an agent's skills directory. Re-running it upgrades in place (overwrite).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help')) {
  console.log(`Install agent skills.

Usage:
  npx github:DotNet-MoYu/skills            install globally (~/.claude/skills)
  npx github:DotNet-MoYu/skills --project  install into ./.claude/skills
  npx github:DotNet-MoYu/skills --dir DIR  install into DIR (any agent)
`);
  process.exit(0);
}

// Resolve target skills directory.
const dirIdx = args.indexOf('--dir');
const target = dirIdx !== -1 && args[dirIdx + 1]
  ? path.resolve(args[dirIdx + 1])
  : args.includes('--project')
    ? path.resolve(process.cwd(), '.claude', 'skills')
    : path.join(process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'), 'skills');

// A skill = a top-level folder here that contains a SKILL.md.
const skills = fs.readdirSync(pkgRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(pkgRoot, e.name, 'SKILL.md')))
  .map((e) => e.name);

if (skills.length === 0) {
  console.error('No skills found (no <name>/SKILL.md in this package).');
  process.exit(1);
}

fs.mkdirSync(target, { recursive: true });
for (const name of skills) {
  const dest = path.join(target, name);
  fs.cpSync(path.join(pkgRoot, name), dest, { recursive: true });
  console.log(`✓ installed ${name} -> ${dest}`);
}

console.log(`\nDone (${skills.length}). Restart Claude Code, then use /${skills[0]}.`);
