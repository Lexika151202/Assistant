# Workflow: Init

> Interactively create `docs/ba/common-rules.md` from scratch by guiding the user through category selection and rule definition.

## Step 1 — Pre-check

1. Check if `docs/ba/common-rules.md` already exists
2. If exists, ask via `AskUserQuestion`: _"Common rules file already exists. **Overwrite** (start fresh) or switch to **update** mode?"_
3. If overwrite declined, switch to `references/workflow-update.md`
4. Ensure `docs/ba/` directory exists; create if missing

## Step 2 — Category Selection

1. Load category catalog from `references/rule-categories-and-suggestions.md`
2. Present full category list with descriptions to user
3. Ask via `AskUserQuestion`:

   _"Select categories to include in your common rules (comma-separated numbers or 'all'):"_

   ```
   1. Input Constraints — Field lengths, required markers, input types
   2. UI/UX Behaviors — Modals, loading states, toasts, pagination
   3. Data Standards — Email, phone, date, currency formats
   4. Error Handling — Validation messages, API error format, fallback pages
   5. File Upload — Accepted formats, size limits, count limits
   6. Security & Authentication — Password policy, session, rate limiting
   7. Accessibility — Contrast, keyboard nav, screen readers
   8. Pagination & Lists — Page size, sorting, empty states
   9. Notifications — Channels, templates, retry policies
   10. Approval & Workflow — Approval steps, remarks, status tracking
   ```

   Suggested default: _"1, 2, 3, 4, 5"_ (most common for typical projects)

4. Record selected categories

## Step 3 — Rule Definition per Category

For each selected category (in order):

1. Load suggested rules from `references/rule-categories-and-suggestions.md`
2. Present suggestions as numbered list
3. Ask via `AskUserQuestion`:

   _"For **{Category Name}**, here are suggested rules:_
   _{numbered list}_
   _Options: **accept all** / **select** (comma-separated numbers) / **skip** category / **add custom** rules"_

   Suggested default: _"accept all"_

4. If user selects "add custom":
   - Ask: _"Enter custom rule description(s), one per line:"_
   - Append to accepted rules for this category
5. Assign sequential `COMMON-NNN` IDs to all accepted rules (continue numbering across categories)

## Step 4 — Custom Categories

After processing all selected standard categories:

Ask via `AskUserQuestion`:
_"Any additional custom categories to define? Enter category name(s) comma-separated, or 'none'."_

Suggested default: _"none"_

If user provides custom categories:
1. For each custom category, ask for rule descriptions
2. Assign continuing `COMMON-NNN` IDs

## Step 5 — Generate Output

1. Write `docs/ba/common-rules.md` using template from `references/output-template.md`
2. Include:
   - File header with generation date
   - Summary table with counts per category
   - All category sections with rule tables
   - Initial changelog entry: `{date} | Initialized | COMMON-001 to COMMON-{max} | Initial rule set created | common-rules init`

## Step 6 — Report

Report to user:
- Total rules created
- Counts per category
- File path: `docs/ba/common-rules.md`
- Suggested next steps:
  - _"Review the generated rules and run `common-rules update` to add/modify as needed"_
  - _"Reference COMMON-NNN IDs in user stories and specifications for traceability"_
