# Update Changelog Template

> Append this section to the bottom of each BA document updated during Update Mode.

## Format

```markdown
## Changelog

| Date | Source | Changes | QA Resolved |
|------|--------|---------|-------------|
| {DATE} | {FEEDBACK_FILE} | Added RULE-051, RULE-052; Modified BP-004 flow | QA-001, QA-002, QA-008 |
```

## Field Descriptions

| Field | Description |
|-------|-------------|
| Date | Date the update was applied (YYYY-MM-DD) |
| Source | Filename of the feedback input (e.g., `meeting-transcript-1104.md`) |
| Changes | Brief summary of what was added, modified, or removed |
| QA Resolved | Comma-separated list of QA item IDs resolved by this update |
