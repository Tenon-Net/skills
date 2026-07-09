#!/usr/bin/env node
// Zero-dependency installer: copies selected `<name>/SKILL.md` folders in this
// package into an agent's skills directory. Re-running upgrades in place (overwrite).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);

// A skill = a top-level folder here that contains a SKILL.md.
const available = fs.readdirSync(pkgRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(pkgRoot, e.name, 'SKILL.md')))
  .map((e) => e.name);

if (argv.includes('-h') || argv.includes('--help')) {
  console.log(`Install agent skills.

Usage:
  npx github:Tenon-Net/skills [names...] [--project | --dir DIR]

  (no names)        install ALL skills
  <name> [name...]  install only the named skill(s)
  --list            list available skills, install nothing
  --project         install into ./.claude/skills
  --dir DIR         install into DIR (any location / other agent)

Examples:
  npx github:Tenon-Net/skills --list
  npx github:Tenon-Net/skills loop-prompt
  npx github:Tenon-Net/skills loop-prompt --project
`);
  process.exit(0);
}

if (argv.includes('--list')) {
  console.log(`Available skills (${available.length}):`);
  for (const n of available) console.log(`  ${n}`);
  console.log(`\nInstall one:  npx github:Tenon-Net/skills <name>`);
  process.exit(0);
}

// Parse flags; every non-flag arg is a requested skill name.
let target = null;
const names = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--dir') target = path.resolve(argv[++i] ?? '');
  else if (a === '--project') target = path.resolve(process.cwd(), '.claude', 'skills');
  else if (a.startsWith('-')) continue; // ignore unknown flags
  else names.push(a);
}
if (!target) {
  target = path.join(process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'), 'skills');
}

const unknown = names.filter((n) => !available.includes(n));
if (unknown.length) {
  console.error(`Unknown skill(s): ${unknown.join(', ')}`);
  console.error(`Available: ${available.join(', ') || '(none)'}`);
  process.exit(1);
}

const toInstall = names.length ? names : available;
if (toInstall.length === 0) {
  console.error('No skills found (no <name>/SKILL.md in this package).');
  process.exit(1);
}

fs.mkdirSync(target, { recursive: true });
for (const name of toInstall) {
  const dest = path.join(target, name);
  fs.cpSync(path.join(pkgRoot, name), dest, { recursive: true });
  console.log(`✓ installed ${name} -> ${dest}`);
}

console.log(`\nDone (${toInstall.length}). Restart Claude Code, then use /${toInstall[0]}.`);
