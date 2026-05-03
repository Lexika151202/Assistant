# Workflow: Generate

> Generate `docs/ba/usecase-list.md` from scratch by analyzing business processes and requirements.

## Step 1 — Read Input Files

Load both source files:
- `docs/ba/business-processes.md` — all BP-NNN sections
- `docs/ba/requirement-traceability.md` — BR, RULE, COMMON tables

If either file is missing, report error and stop.

## Step 2 — Extract BP Inventory

For each BP-NNN section, extract:
- BP ID and name (e.g., BP-001: Vendor Onboarding & Verification)
- Objective statement
- Actors involved
- Related BRs (from `**Related BRs:**` line)
- Related Rules (from `**Related Rules:**` line)
- Activity flow steps (from Activity Detail table)
- State lifecycle transitions (from State Detail table, if present)

Build an inventory list of all BPs with their metadata.

## Step 3 — Derive Category Codes

For each BP, generate a 3-char uppercase category code from the BP name:

1. Parse BP heading (e.g., `## BP-003: Customer Order & Checkout`)
2. Extract category name after the colon (e.g., `Customer Order & Checkout`)
3. Apply code derivation heuristics (in priority order):
   - **Acronym** — first letter of each significant word (skip: &, and, of, the, to, for, in, on, at, by, with, via). If ≥3 letters, use first 3.
   - **Consonants** — if acronym yields <3 chars, use first 3 consonants of combined name.
   - **First chars** — final fallback, first 3 uppercase characters.
4. **Collision resolution** — if code collides with an already-assigned code, replace the last char with the next available letter.

Build a mapping: `{ BP-NNN → (category_name, 3-char code) }`.

> These codes are locked once written to `usecase-list.md`. The `update` workflow will preserve them.

## Step 4 — Decompose Each BP into Use Cases

For each BP, apply decomposition heuristics from `references/decomposition-heuristics.md`:

1. **Parse activity detail table** — each row is a candidate UC
2. **Parse state transitions** — each transition = potential UC (approve, reject, suspend, etc.)
3. **Check for CRUD patterns** — if BP manages an entity, ensure Create, View List, View Detail, Update, Archive/Deactivate UCs exist
4. **Check for system-triggered actions** — scheduled jobs, auto-transitions, notifications = separate UCs
5. **Check for configuration actions** — Admin config of rules, schedules, limits = separate UCs
6. **Check for bulk operations** — CSV import/export, batch processing = separate UCs
7. **Merge duplicates** — if multiple BP steps map to same UC, consolidate

## Step 5 — Assign UC Metadata

For each identified UC, determine:

| Field | How to Derive |
|-------|---------------|
| UC ID | `UC-{CAT}-{NNN}` — use category code derived in Step 3, sequential numbering |
| Name | Short imperative verb phrase from activity step description |
| Description | 1-2 sentences summarizing what the UC accomplishes |
| Pre-condition | What must be true before — derive from activity flow entry conditions, state prerequisites |
| Post-condition | System state after success — derive from activity flow exit conditions, state transitions |
| Trigger | What initiates — user action (navigates, clicks), system event (schedule, threshold), external event |
| Business Req | BR-NNN IDs — match from BP's related BRs + activity detail table's Rule column |
| Business Rules | RULE-NNN IDs — match from BP's related Rules + activity detail table's Rule column |

## Step 6 — Identify Cross-References

For each UC, check:
- Does this UC include an action that is itself another UC? → add `→ UC-XXX` to Description
- Does this UC serve as a trigger for another UC? → note in Description

Examples:
- "View Vendor Detail" screen includes Approve/Reject buttons → Description: "Admin views vendor profile and documents. Actions: Approve (→ UC-VOB-003), Suspend (→ UC-VOB-005)"
- "Submit Registration" triggers "System Validation" → Description may reference the automated UC

## Step 7 — Group by Category

Organize all UCs under category headers:
- One category per BP (use category names and codes derived in Step 3)
- Within each category, order UCs by logical flow (creation first, then view/edit, then state changes, then system actions)
- Add category header with source BP reference and actors

## Step 8 — Generate Output

Write `docs/ba/usecase-list.md` using template from `references/output-template.md`:
1. File header with generation date and source links
2. Summary table with UC counts per category
3. Category sections with UC tables
4. Changelog with initial generation entry

## Step 9 — Coverage Check

Verify completeness:
- Every BR mentioned in any BP's `**Related BRs:**` line appears in ≥1 UC's Business Req column
- Every RULE mentioned in any BP's `**Related Rules:**` line appears in ≥1 UC's Business Rules column
- Flag orphan BRs/Rules that couldn't be mapped — list in report

If orphan BRs exist, consider:
- Is there a missing UC? → create it
- Is the BR already covered but not linked? → add the link
- Is the BR out of scope for UC decomposition? → note in report

## Step 10 — Report to User

Summary output:
- Total UCs generated
- Counts per category
- Files written (path)
- Orphan BRs/Rules (if any)
- Suggested next steps (review, run `update` after changes, write specs from UC list)
