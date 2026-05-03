# Workflow: Update

> Incrementally sync `docs/ba/usecase-list.md` when business processes or requirements change.

## Step 1 — Read Existing UC List

Load `docs/ba/usecase-list.md`. If file does not exist, redirect to `generate` workflow instead.

Parse:
- All existing UC IDs, names, and metadata per row
- Category structure (category name, 3-char code, BP source)
- Summary table
- Changelog entries

Build an inventory of existing UCs keyed by UC ID.

**Extract existing category code mapping** from section headers (e.g., `## 1. Vendor Onboarding & Verification` with UC IDs like `UC-VOB-001` → code = `VOB`). Build a locked mapping: `{ category_name → 3-char code }`.

## Step 2 — Read Updated Source Docs

Load the latest versions of:
- `docs/ba/business-processes.md`
- `docs/ba/requirement-traceability.md`

## Step 3 — Detect Changes

Compare current source docs against existing UC list:

**New BPs:**
- BP sections not represented in any UC category → need new UCs
- Derive category code for new BP using the algorithm in SKILL.md (acronym → consonants → first chars), checking for collisions against the locked mapping from Step 1

**Modified BPs:**
- New activity steps added → may need new UCs
- Activity steps removed → mark corresponding UCs for removal
- New BRs/Rules in `**Related BRs:**` or `**Related Rules:**` lines → update existing UCs or add new ones
- State transitions added/removed → add/remove corresponding UCs

**Removed BPs:**
- Entire BP section removed → mark all UCs in category as removed

**New/Modified BRs or Rules:**
- New BR-NNN entries in traceability matrix → check if covered; if not, flag
- Modified RULE descriptions → update UC Business Rules references if affected

## Step 4 — Apply Changes

**Adding new UCs:**
- Assign next available sequential number within the category (e.g., if last is UC-VOB-006, next = UC-VOB-007)
- Follow same metadata assignment as `workflow-generate.md` Step 5
- Insert into correct category section

**Updating existing UCs:**
- Modify only the affected columns (description, pre/post-conditions, BRs, Rules)
- Preserve UC ID and Name unless the underlying BP step fundamentally changed
- Update cross-references if related UCs were added/removed

**Removing UCs:**
- Strike through the UC row with `~~text~~` markers and add `[REMOVED]` note
- Do NOT delete the row — preserve for traceability
- Do NOT reuse the UC ID

**New categories (from new BPs):**
- Derive 3-char code using SKILL.md algorithm; resolve collisions against existing codes
- Create new category section with derived code
- Add to summary table

## Step 5 — Preserve ID Integrity

Critical rules:
- NEVER renumber existing UC IDs
- NEVER reorder UC rows within a category (append new ones at end)
- NEVER reuse a removed UC's ID number
- New UCs get the next sequential number in their category

## Step 6 — Cross-Reference Integrity

After all changes:
- Verify all `→ UC-XXX` references in Descriptions still point to valid UC IDs
- If a referenced UC was removed, update the referencing UC's description
- Add new cross-references for newly added UCs where applicable

## Step 7 — Update Summary and Changelog

- Recalculate summary table counts (exclude removed UCs from counts)
- Append changelog entry:

```markdown
| {DATE} | Added: UC-XXX, UC-YYY; Modified: UC-ZZZ; Removed: UC-AAA |
```

## Step 8 — Report to User

Summary output:
- UCs added (list IDs and names)
- UCs modified (list IDs and what changed)
- UCs removed (list IDs)
- New orphan BRs/Rules (if any)
- Total UC count (before → after)
