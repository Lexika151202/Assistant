# Output Template

Template for `docs/ba/entity-model.md`. Replace `{PLACEHOLDERS}` with actual values.

---

## File Structure

```markdown
# Entity Model

> Generated: {DATE}
> Last Updated: {DATE}
> Source: [business-processes.md](./business-processes.md), [requirement-traceability.md](./requirement-traceability.md), [usecase-list.md](./usecase-list.md), [common-rules.md](./common-rules.md)

---

## Summary

| # | Entity | Description | Attribute Count | Source BPs |
|---|--------|-------------|----------------|------------|
| 1 | {Entity Name} | {One-line description} | {N} | {BP-NNN, BP-NNN} |
| **Total** | **{N} entities** | — | **{N} attributes** | — |

---

## Entity Relationship Diagram

​```mermaid
erDiagram
    ENTITY_A ||--o{ ENTITY_B : "has many"
    ENTITY_B }o--|| ENTITY_C : "belongs to"
    ...
​```

---

## ENT-001: {Entity Name}

> Source: {BP-NNN, BR-NNN} | Related UCs: {UC-XXX-NNN, UC-XXX-NNN}

**Description:** {One-line description of entity's business purpose}

### Attributes

| # | Attribute | Type | Required | Unique | Default | Constraints | Source |
|---|-----------|------|----------|--------|---------|-------------|--------|
| 1 | {attributeName} | {Type} | {Yes/No} | {Yes/No} | {value or —} | {validation rules} | {BR-NNN, RULE-NNN} |
| 2 | ... | ... | ... | ... | ... | ... | ... |

### State Lifecycle

> Include ONLY if entity has a status/state attribute with defined transitions in BPs.

​```mermaid
stateDiagram-v2
    [*] --> {InitialState} : {trigger}
    {State1} --> {State2} : {actor action}
    ...
​```

| State | Description | Entry Condition | Exit Condition |
|-------|-------------|----------------|----------------|
| {State} | {Description} | {How to enter} | {How to exit} |

### Business Rules

| Rule ID | Description |
|---------|-------------|
| {RULE-NNN} | {Rule text relevant to this entity} |

### Common Rules Applied

| Rule ID | Description |
|---------|-------------|
| {COMMON-NNN} | {Common rule relevant to this entity's attributes} |

---

## ENT-002: {Next Entity Name}

> ...same structure...

---

## Relationships

| From Entity | Cardinality | To Entity | Description | Source |
|-------------|-------------|-----------|-------------|--------|
| {Entity A} | {1:1 / 1:N / N:M} | {Entity B} | {Relationship description} | {BR-NNN, BP-NNN} |

---

## Traceability Matrix

| BR ID | Mapped Entities | Coverage |
|-------|----------------|----------|
| {BR-NNN} | {ENT-NNN (attr), ENT-NNN (attr)} | ✅ / ⚠️ partial |

---

## Changelog

| Date | Action | Entities Affected | Description | Source |
|------|--------|-------------------|-------------|--------|
| {DATE} | Generated | All | Initial generation from BA documents | entity-model generate |
```

---

## Column Specifications

### Entity Header

| Field | Format |
|-------|--------|
| Entity ID | `ENT-NNN` — zero-padded 3-digit sequential |
| Entity Name | PascalCase singular noun (e.g., User, Project, Invoice, Ticket) |
| Description | 1 sentence — the entity's business purpose |
| Source | Comma-separated BP-NNN and BR-NNN IDs |
| Related UCs | Comma-separated UC-XXX-NNN IDs that create/read/update/delete this entity |

### Attribute Table

| Column | Content Rules |
|--------|---------------|
| # | Sequential number within entity, for readability |
| Attribute | camelCase name. Should be self-descriptive (e.g., `fullName`, `unitPrice`, `expiryDate`) |
| Type | BA-friendly type from extraction heuristics type mapping table. NOT database types (no VARCHAR, INT, DECIMAL) |
| Required | `Yes` or `No`. Derive from RULE/COMMON constraints or UC pre-conditions. Default: `No` unless explicitly stated |
| Unique | `Yes` or `No`. Derive from RULE constraints (e.g., code or email uniqueness). Default: `No` |
| Default | Literal default value or `—` if none. Derive from BRs or state lifecycle initial states |
| Constraints | Validation rules, format rules, min/max, enum values. Cite RULE/COMMON IDs. Use semicolons to separate multiple constraints |
| Source | Comma-separated BR-NNN, RULE-NNN, COMMON-NNN, or UC-XXX-NNN IDs that define this attribute |

### State Lifecycle

Include state lifecycle section only when:
- The entity has a `status` or `state` attribute
- The BA docs define explicit state transitions (e.g., BP state diagrams)

Copy the state diagram and state detail table from `business-processes.md` for the relevant entity.

### Relationships Table

| Column | Content Rules |
|--------|---------------|
| From Entity | Entity name that holds the FK or initiates the relationship |
| Cardinality | `1:1`, `1:N`, or `N:M`. Derive from BP activity flows and UC descriptions |
| To Entity | Target entity |
| Description | Business-language relationship description (e.g., "Department has Employees") |
| Source | BR-NNN or BP-NNN that establishes this relationship |

### Removed Entity Format

```markdown
## ~~ENT-003: {Removed Entity}~~

> **[REMOVED]** — {reason, e.g., "merged into ENT-001" or "requirement BR-074 removed"}
```
