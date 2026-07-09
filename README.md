# skills

一组 agent skill，附带一个零依赖的 `npx` 安装器。

## 安装

```bash
# 先看仓库里有哪些 skill
npx github:DotNet-MoYu/skills --list

# 只装指定的一个（推荐）
npx github:DotNet-MoYu/skills loop-prompt

# 装多个
npx github:DotNet-MoYu/skills loop-prompt another-skill

# 不带名字 = 全装
npx github:DotNet-MoYu/skills
```

安装位置（可与上面任意组合）：

```bash
npx github:DotNet-MoYu/skills loop-prompt              # 全局：~/.claude/skills
npx github:DotNet-MoYu/skills loop-prompt --project    # 仅当前项目：./.claude/skills
npx github:DotNet-MoYu/skills loop-prompt --dir <path> # 任意目录 / 别的 agent
```

装完**重启 Claude Code**，即可用 `/loop-prompt`。

## 更新 / 固定版本

```bash
npx github:DotNet-MoYu/skills            # 重新跑 = 升级到最新
npx github:DotNet-MoYu/skills#v0.2.0     # 固定到某个 tag 版本
```

安装器会覆盖同名 skill 目录，重复运行是安全的。

## 包含的 skill

| Skill | 作用 |
|-------|------|
| `loop-prompt` | 把一句模糊的话变成可直接粘进 `/loop` 的提示词。它会分析、提问、规划，产出一个带「任务台账文件」的循环提示词——每轮把任务写进 `.loop/<slug>.md`，中断也不丢、能自动收尾。 |

> 注：`loop-prompt` 依赖 Claude Code 专属的 `/loop` 命令，其它没有 `/loop` 的 agent 用不了这个 skill 本身（但安装器和仓库结构是通用的）。

## 加新 skill

在仓库根新建 `<skill-name>/SKILL.md` 即可，安装器会自动扫描并安装所有含 `SKILL.md` 的一级目录，无需改脚本。

## License

MIT
