# Workflow: Update

> Incrementally update `docs/ba/entity-model.md` when BA documents change (new/modified BRs, BPs, UCs, RULEs, COMMONs).

## Step 1 — Read Existing Entity Model

Load `docs/ba/entity-model.md` and parse:
- All existing `ENT-NNN` IDs → **lock these** (never renumber)
- Entity names, attributes, constraints, relationships
- Current changelog entries

If `docs/ba/entity-model.md` does not exist, inform user and suggest running `generate` instead.

## Step 2 — Read Current BA Documents

Load all source files from `docs/ba/`:
- `business-processes.md`
- `requirement-traceability.md`
- `usecase-list.md`
- `common-rules.md`

## Step 3 — Detect Changes

Compare current BA docs against what's reflected in the existing entity model:

### 3.1 New BRs/RULEs/COMMONs
- Check `requirement-traceability.md` changelog for entries newer than entity model's last update date
- Check `common-rules.md` changelog for newer entries
- Identify new BR-NNN, RULE-NNN, COMMON-NNN IDs not referenced in existing entity model

### 3.2 Modified BRs/RULEs
- Check for ~~strikethrough~~ (removed) items
- Check changelogs for "Modified" entries

### 3.3 New BPs/UCs
- Check `business-processes.md` for new BP-NNN sections
- Check `usecase-list.md` changelog for new UC categories or UCs

### 3.4 Changed State Lifecycles
- Compare state diagrams in BPs with entity status enums in entity model
- Detect added/removed states

## Step 4 — Determine Impact

For each detected change, categorize impact:

| Change Type | Impact |
|-------------|--------|
| New BR describing new data fields | May need new entity or new attributes on existing entity |
| New RULE with constraints | Add constraint to existing attribute or add new attribute |
| New COMMON rule | Apply cross-cutting constraint to matching attribute types |
| New BP with new entities | Add new entity sections |
| New UC with new fields mentioned | Add new attributes to existing entities |
| Removed BR (strikethrough) | Mark affected entity/attributes; do NOT auto-remove (flag for user review) |
| Modified RULE | Update constraint text on affected attributes |
| Changed state lifecycle | Update status enum values and state detail tables |

## Step 5 — Apply Changes

### 5.1 New Entities
- Assign next available `ENT-NNN` ID (continue from highest existing ID)
- Follow same attribute extraction process from `references/extraction-heuristics.md`
- Add full entity section per output template

### 5.2 New Attributes on Existing Entities
- Add new rows to the entity's attribute table
- Maintain sequential numbering within entity
- Add Source column references

### 5.3 Updated Constraints
- Modify the Constraints column for affected attributes
- Update Source references if needed
- Update Business Rules table if new RULE applies to entity

### 5.4 Updated State Lifecycles
- Update the Mermaid stateDiagram for affected entity
- Update the state detail table
- Update the status attribute's enum values in the attribute table

### 5.5 New Relationships
- Add rows to the Relationships table
- Update the Mermaid ER diagram

### 5.6 Removed Items
- Do NOT auto-remove entities or attributes
- Flag removals with `> [!WARNING]` annotation for user review
- If user confirms removal, apply ~~strikethrough~~ with `[REMOVED]` tag

## Step 6 — Preserve Integrity

Critical preservation rules:
- **NEVER** renumber existing ENT-NNN IDs
- **NEVER** reorder existing entities
- **NEVER** modify entity sections not impacted by the detected changes
- **NEVER** change existing attribute numbering within an entity (append new attributes at end)
- Preserve all existing Source references — only add new ones

## Step 7 — Update Supporting Sections

1. **Summary table** — recalculate entity counts and attribute counts
2. **ER diagram** — regenerate to reflect new entities and relationships
3. **Traceability matrix** — add new BRs, update coverage markers
4. **Common Rules Applied** — apply new COMMON rules to existing matching attributes

## Step 8 — Append Changelog

Add entry to changelog:

```markdown
| {DATE} | Updated | {ENT-NNN, ENT-NNN} | {Description of changes} | entity-model update |
```

Format:
- Date: current date
- Action: `Updated`, `Added`, or `Added + Updated`
- Entities Affected: list of impacted ENT-NNN IDs
- Description: concise summary of what changed and why
- Source: `entity-model update`

## Step 9 — Report to User

Summary output:
- Changes detected (new BRs, new RULEs, new BPs, etc.)
- Entities added (with ENT-NNN IDs)
- Entities modified (with change summary)
- Attributes added/modified (count per entity)
- Constraints updated
- Flagged removals (if any, requiring user confirmation)
- Files written (path)
- Suggested next steps (review changes, confirm removals if any)
