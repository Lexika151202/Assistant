# Output Template

Template for `docs/ba/usecase-list.md`. Replace `{PLACEHOLDERS}` with actual values.

---

## File Structure

```markdown
# Use Case List

> Generated: {DATE}
> Source: [business-processes.md](./business-processes.md), [requirement-traceability.md](./requirement-traceability.md)
> QA Backlog: [question-backlog.md](./question-backlog.md)

---

## Summary

| Category | UC Count |
|----------|----------|
| Vendor Onboarding & Verification | {N} |
| Product Listing & Approval | {N} |
| Customer Order & Checkout | {N} |
| Order Fulfillment & Status | {N} |
| Returns & Refunds | {N} |
| Commission & Settlement | {N} |
| Customer Loyalty | {N} |
| ERP Integration | {N} |
| **Total** | **{TOTAL}** |

---

## 1. {Category Name}

> Source: {BP-NNN} | Actors: {Actor1, Actor2, ...}

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| {UC-CAT-NNN} | {Name} | {Description with → UC-XXX cross-refs} | {Pre-condition} | {Post-condition} | {Trigger} | {BR-NNN, BR-NNN} | {RULE-NNN, RULE-NNN} |

---

## {N}. {Next Category Name}

> Source: {BP-NNN} | Actors: {Actor1, Actor2, ...}

| UC ID | Name | Description | Pre-condition | Post-condition | Trigger | Business Requirements | Business Rules |
|-------|------|-------------|---------------|----------------|---------|----------------------|----------------|
| ... | ... | ... | ... | ... | ... | ... | ... |

---

## Changelog

| Date | Changes |
|------|---------|
| {DATE} | {Description of changes} |
```

---

## Column Specifications

| Column | Max Length | Content Rules |
|--------|-----------|---------------|
| UC ID | 12 chars | Format: `UC-{CAT}-{NNN}`. CAT = 3-char category code. NNN = zero-padded 3-digit sequential number. |
| Name | ~40 chars | Short imperative verb phrase. Start with verb: Submit, Create, Upload, Review, Approve, View, List, Configure, Process, Track, Export, etc. |
| Description | ~150 chars | 1-2 sentences. What the UC accomplishes. Include `→ UC-XXX` for cross-references to action UCs. |
| Pre-condition | ~100 chars | System state required before UC starts. Use bullet-style semicolons for multiple: "Vendor exists; KYC approved" |
| Post-condition | ~100 chars | System state after successful completion. Describe the state change, not the action. |
| Trigger | ~80 chars | What initiates: user action ("Vendor clicks Submit"), system event ("Return window expires"), schedule ("Weekly settlement cycle") |
| Business Requirements | ~50 chars | Comma-separated BR-NNN IDs. Only IDs from `requirement-traceability.md`. Use "—" if no direct BR. |
| Business Rules | ~50 chars | Comma-separated RULE-NNN IDs. Only IDs from `requirement-traceability.md`. Use "—" if no direct Rule. |

## Cross-Reference Format

When a UC's description references another UC:
- Use arrow notation: `→ UC-{CAT}-{NNN}`
- Place after the action name: "Approve (→ UC-VOB-003)"
- Multiple refs: "Approve (→ UC-VOB-003), Suspend (→ UC-VOB-005)"

## Category Section Numbering

Sections numbered 1-N matching BP order:
1. Vendor Onboarding & Verification (BP-001)
2. Product Listing & Approval (BP-002)
3. Customer Order & Checkout (BP-003)
4. Order Fulfillment & Status (BP-004)
5. Returns & Refunds (BP-005)
6. Commission & Settlement (BP-006)
7. Customer Loyalty (BP-007)
8. ERP Integration (BP-008)

## Removed UC Format

Removed UCs use strikethrough and a note:
```markdown
| ~~UC-VOB-003~~ | ~~Approve Vendor KYC~~ | ~~[REMOVED — merged into UC-VOB-002]~~ | — | — | — | — | — |
```
