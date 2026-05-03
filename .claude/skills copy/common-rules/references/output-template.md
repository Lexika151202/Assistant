# Output Template

> Template for generating `docs/ba/common-rules.md`. Replace `{placeholders}` with actual values.

## File Structure

```markdown
# Common Rules

> Generated: {generation_date}
> Last Updated: {last_updated_date}
> Managed by: common-rules skill

---

## Summary

| Category | Active | Deprecated | Total |
|----------|--------|------------|-------|
| {category_1} | {n} | {n} | {n} |
| {category_2} | {n} | {n} | {n} |
| ... | ... | ... | ... |
| **Total** | **{N}** | **{N}** | **{N}** |

---

## Rules by Category

### {Category Name}

> {Brief category description from rule-categories-and-suggestions.md}

| ID | Rule | Rationale | Source | Status |
|----|------|-----------|--------|--------|
| COMMON-{NNN} | {Rule description} | {Why this rule exists} | {Source reference or "Initialized"} | Active |
| COMMON-{NNN} | ~~{Deprecated rule}~~ | {Original rationale} | {Source} | Deprecated |

(Repeat for each category)

---

## Changelog

| Date | Action | IDs Affected | Description | Source |
|------|--------|-------------|-------------|--------|
| {YYYY-MM-DD} | Initialized | COMMON-001 to COMMON-{max} | Initial rule set created | `common-rules init` |
| {YYYY-MM-DD} | Added | COMMON-{NNN} | {What was added} | `common-rules update` |
| {YYYY-MM-DD} | Modified | COMMON-{NNN} | {What changed} | `common-rules update` |
| {YYYY-MM-DD} | Deprecated | COMMON-{NNN} | {Why deprecated} | `common-rules update` |
```

## Column Definitions

| Column | Description |
|--------|-------------|
| **ID** | Unique identifier `COMMON-NNN`. Permanent — never reused or renumbered |
| **Rule** | Clear, actionable rule statement. Use imperative form: "Must...", "Shall...", "Maximum..." |
| **Rationale** | Brief justification. Why this rule exists. Can be "Standard practice" if self-evident |
| **Source** | Where the rule originated: "Initialized", document reference, meeting transcript, or user-defined |
| **Status** | `Active` or `Deprecated`. Deprecated rules retain their row with ~~strikethrough~~ |

## Formatting Rules

- Keep rule descriptions concise — one sentence preferred, two max
- Use consistent units (e.g., always "characters" not "chars" for length constraints)
- Use specific values, not vague terms (e.g., "255 characters" not "short text")
- Deprecated rules: apply ~~strikethrough~~ to Rule column only, keep other columns readable
- Categories ordered alphabetically after initial generation
- Within each category, rules ordered by COMMON-NNN ID (ascending)
