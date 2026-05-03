# Workflow: Generate

> Generate `docs/ba/entity-model.md` from scratch by analyzing all BA documents.

## Step 1 — Read Input Files

Load all source files from `docs/ba/`:
- `business-processes.md` — all BP-NNN sections with activity flows, state lifecycles
- `requirement-traceability.md` — BR table, RULE table, Stakeholder table
- `usecase-list.md` — all UC tables across categories
- `common-rules.md` — COMMON-NNN rules across all categories

If `business-processes.md` or `requirement-traceability.md` is missing, report error and stop.
If `usecase-list.md` or `common-rules.md` is missing, continue with reduced coverage (warn user).

## Step 2 — Identify Entities

Apply extraction heuristics from `references/extraction-heuristics.md` §1:

1. **State-bearing objects** — scan all `stateDiagram-v2` blocks in BPs. Each state machine subject = entity.
2. **Actors** — scan stakeholder table. Decide consolidation (e.g., multiple admin types → single User entity with roles, or separate entities based on attribute divergence).
3. **Transaction objects** — scan BP activity flows for nouns being created/processed/tracked.
4. **Catalog objects** — scan BRs for "Admin configures/manages/defines" patterns.
5. **Content objects** — scan for uploaded artifacts (documents, images, files).
6. **Junction objects** — identify N:M relationships that need bridging entities.
7. **Audit objects** — scan RULEs for immutability/logging requirements.

Build entity candidate list with:
- Candidate name (PascalCase)
- Source references (BP-NNN, BR-NNN)
- Why it qualifies (which heuristic matched)

## Step 3 — Deduplicate and Consolidate

Review candidate list for overlaps:
- Merge entities that represent the same business concept under different names
- Decide User vs separate actor entities based on attribute divergence
- Identify configuration entities that could be attributes vs standalone entities
- **Rule of thumb:** If it has ≥3 own attributes and is referenced by other entities → standalone entity. Otherwise → attribute on parent entity.

Assign final entity names (PascalCase, singular nouns).

## Step 4 — Assign Entity IDs

Assign `ENT-NNN` IDs in logical order:
1. Core actor entities first (e.g., User, Organization, Department)
2. Primary business objects (e.g., the domain's main transactional entities)
3. Supporting/reference entities (e.g., Category, Type, Status lookup tables)
4. Transaction/event entities (e.g., Payment, Notification, Log)
5. Configuration entities (e.g., Policy, Schedule, Template)
6. Audit/log entities last

## Step 5 — Extract Attributes per Entity

For each entity, apply `references/extraction-heuristics.md` §2:

1. Parse BRs for field lists mentioned in capability descriptions
2. Parse UC descriptions for detailed field enumerations
3. Parse UC pre/post-conditions for state attributes
4. Parse BP activity detail tables for mentioned fields
5. Parse RULEs for implied attributes (constraints imply attribute existence)
6. Parse state lifecycles for status enum values

For each attribute, determine:
- **Name:** camelCase, self-descriptive
- **Type:** From extraction heuristics §3 type mapping table
- **Required:** `Yes` only if explicitly stated in RULE, COMMON, or UC pre-condition
- **Unique:** `Yes` only if explicitly stated in RULE or BR
- **Default:** From BR descriptions, state lifecycle initial states, or RULE defaults
- **Constraints:** From RULE-NNN and COMMON-NNN (format, length, range, enum values)
- **Source:** BR-NNN, RULE-NNN, COMMON-NNN, or UC-XXX-NNN that defines this attribute

## Step 6 — Map Constraints

For each entity's attributes, cross-reference constraints:

1. **RULE constraints** — map each RULE to specific entity + attribute it constrains
2. **COMMON constraints** — read the project's `common-rules.md` and apply cross-cutting rules by attribute type:
   - String attributes → character length limits
   - Text attributes → longer character limits
   - Name attributes → name-specific length limits
   - Description attributes → description-specific length limits
   - Email attributes → format validation rules
   - Phone attributes → format validation rules
   - Currency attributes → decimal precision rules
   - File attributes → size limits, accepted formats
   - Image attributes → size limits, accepted image formats
   - Password attributes → complexity rules
3. **Enum extraction** — collect enum values from state diagrams, BR descriptions, RULE descriptions

## Step 7 — Derive Relationships

Apply `references/extraction-heuristics.md` §5:

1. Parse BP activity flows for inter-entity interactions
2. Parse UC cross-references (→ UC-XXX patterns) for entity connections
3. Parse BR descriptions for ownership/association language
4. Determine cardinality (1:1, 1:N, N:M) for each relationship
5. For N:M relationships, decide if junction entity is needed or already identified

Build relationship table with: From Entity, Cardinality, To Entity, Description, Source.

## Step 8 — Generate Mermaid ER Diagram

Create a `erDiagram` block showing:
- All entities as boxes
- Relationships with cardinality notation
- Key attributes inside entity boxes (id, name/display field, status if applicable)

**Keep the ER diagram high-level** — show entity names, key relationships, and cardinality. Do NOT include all attributes (that's what the attribute tables are for).

Mermaid erDiagram cardinality notation:
- `||--o{` = one-to-many (required on left, optional on right)
- `||--|{` = one-to-many (required both sides)
- `}o--o{` = many-to-many
- `||--||` = one-to-one

## Step 9 — Build Traceability Matrix

Create summary matrix showing which BRs map to which entities:
- Every BR in the "Related BRs" of any BP should appear
- Mark coverage: ✅ (fully mapped), ⚠️ (partially mapped)
- Flag orphan BRs that have data implications but no entity mapping

## Step 10 — Write Output

Write `docs/ba/entity-model.md` using template from `references/output-template.md`:
1. File header with generation date and source links
2. Summary table with entity counts and attribute counts
3. Mermaid ER diagram
4. Entity sections (one per entity) with attributes, state lifecycle, business rules
5. Relationships table
6. Traceability matrix
7. Changelog with initial generation entry

## Step 11 — Coverage Check

Verify completeness:
- Every BR that describes data fields has ≥1 mapped entity attribute
- Every RULE that imposes constraints is referenced in ≥1 attribute's Constraints column
- Every entity has ≥1 source reference
- Every attribute has ≥1 source reference
- State lifecycle entities have matching status enum values

## Step 12 — Report to User

Summary output:
- Total entities generated
- Total attributes across all entities
- Entity list with attribute counts
- Relationships count
- Orphan BRs (BRs with data implications but no entity mapping)
- Coverage metrics (% of BRs mapped, % of RULEs mapped)
- Files written (path)
- Suggested next steps (review, run `update` after BA doc changes, use for spec writing)
