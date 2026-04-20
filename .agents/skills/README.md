# Local Skills Folder

This folder contains local, project-specific skills that are **not committed to git**.

## Structure

```
.agents/skills/
├── skill-name/
│   ├── SKILL.md          # Skill definition with frontmatter
│   ├── template.txt      # Optional: Templates/assets
│   └── script.sh         # Optional: Helper scripts
```

## Creating a Skill

Each skill needs a `SKILL.md` file with frontmatter:

```yaml
---
name: my-skill-name
description: "Use when: doing a specific task"
---

# My Skill

Explain what this skill does and when to use it.

## Usage

Instructions for using the skill...
```

## Notes

- Skills in `.agents/` are automatically discovered by the VS Code Copilot agent
- This folder is excluded from git (`.gitignore`)
- Keep skills focused on a specific workflow or domain
