# Workflow: Update

> Add, modify, or deprecate rules in an existing `docs/ba/common-rules.md`.

## Step 1 — Load Existing File

1. Read `docs/ba/common-rules.md`
2. If file does not exist, report error: _"No common rules file found. Run `common-rules init` first."_ — stop
3. Parse existing rules: extract all `COMMON-NNN` IDs, categories, and current max ID number

## Step 2 — Parse User Intent

Determine action from user's invocation. Three actions supported:

| Action | Trigger Phrases | Example |
|--------|----------------|---------|
| `add` | "add a rule", "new rule", "create rule" | `common-rules update add` |
| `modify` | "modify COMMON-005", "update COMMON-005", "change rule" | `common-rules update modify COMMON-005` |
| `deprecate` | "remove COMMON-003", "deprecate", "disable rule" | `common-rules update deprecate COMMON-003` |

If action is unclear, ask via `AskUserQuestion`:
_"What would you like to do? **add** (new rule) / **modify** COMMON-NNN / **deprecate** COMMON-NNN?"_

## Step 3a — ADD Action

1. Determine next available `COMMON-NNN` ID (max existing + 1)
2. Ask via `AskUserQuestion`:

   _"New rule details:_
   _- **Category**: {list existing categories, or 'new category'}?_
   _- **Rule description**: What is the rule?_
   _- **Rationale** (optional): Why this rule?"_

   Suggested default category: most recently used category

3. If user specifies a new category, create new category section in the file
4. Append rule row to the appropriate category table:
   `| COMMON-{NNN} | {description} | {rationale} | User-defined | Active |`
5. Update summary table counts
6. Append changelog entry

## Step 3b — MODIFY Action

1. Locate `COMMON-NNN` in the file by ID
2. If ID not found, report error: _"COMMON-{NNN} not found in common-rules.md"_ — stop
3. Display current rule to user:
   _"Current rule COMMON-{NNN}: {current description}. Category: {category}"_
4. Ask via `AskUserQuestion`:
   _"What should the updated rule be?"_

   Suggested default: current description (for minor edits)

5. Replace rule description in-place, preserving ID, category, and source
6. Update Status column if needed (e.g., remains "Active")
7. Append changelog entry: `Modified | COMMON-{NNN} | {change summary}`

## Step 3c — DEPRECATE Action

1. Locate `COMMON-NNN` in the file by ID
2. If ID not found, report error — stop
3. Confirm with user via `AskUserQuestion`:
   _"Deprecate COMMON-{NNN}: '{current description}'? This will mark it as deprecated (not delete). Confirm? (yes/no)"_

   Suggested default: _"yes"_

4. Apply strikethrough to rule description: `~~{description}~~`
5. Set Status column to `Deprecated`
6. Append changelog entry: `Deprecated | COMMON-{NNN} | {reason}`

## Step 4 — Write Changes

1. Write updated content back to `docs/ba/common-rules.md`
2. Preserve all unchanged rules exactly as-is
3. Ensure summary table counts are updated

## Step 5 — Report

Report to user:
- Action performed (add/modify/deprecate)
- Rule ID(s) affected
- Current total rule count (active / deprecated)
- File path updated
