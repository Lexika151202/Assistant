# Update Workflow (`/spec update <UC-ID>`)

**Objective:** Patch an existing Use Case document safely when requirements or the UI Screen changes.

## 1. Load Existing File
1. Read the existing specification output at `docs/ba/spec/{UC-ID}/{UC-ID}.md`.
2. If it does not exist, fall back to the `create-workflow.md` and explicitly note it.

## 2. Diff Validation
1. Compare current BA documents (`docs/ba/usecase-list.md`) to the contents of Section 1. Note any changes in Pre-conditions, Business Rules, or Triggers.
2. Examine the most recent `.png` screen inside `docs/ba/spec/{UC-ID}/` using your vision capabilities. Note any UI elements added, removed, or visually modified compared to Section 2.

## 3. Patch Document
1. Carefully replace the corresponding rows in Section 1 (Use Case Description) for any changing business data.
2. Insert, update, or remove rows in Section 2 (Screen Description) corresponding to the new UI state.
3. Keep business rules strict: ensure all UI constraints (error handling, limits) exactly match the updated Business Requirements and Common Rules. Use cross-references (e.g. `(→ UC-XXX)`) for interconnected flows.
4. Preserve any manual annotations or custom rules previously added unless they are directly contradicted by the new requirements or screen.

## 4. Save and Report
1. Write the updated document back to `docs/ba/spec/{UC-ID}/{UC-ID}.md`.
2. Inform the user of exactly which tables and UI elements were modified.

## 5. Sync Open Questions to Question Backlog
1. Read `docs/ba/question-backlog.md` and determine the last `QA-NNN` ID.
2. For each open question (`OQ-*`) in the spec document's **Section 5 — Open Questions**:
   - Skip if the question text already exists in the backlog (match by semantic similarity).
   - Otherwise, create a new `QA-NNN` entry (incrementing sequentially from the last existing ID).
   - Set **Priority** = `M` (default; adjust to `H` if it blocks design/architecture).
   - Set **Ref** = `spec/{UC-ID}` (e.g., `spec/UC-VOB-002`).
   - Set **Question** = the open question text.
   - Set **Why It Matters** = `Discovered during spec update for {UC-ID}`.
   - Set **Status** = `Open`.
3. Append any new rows to the **Open Questions** table in `question-backlog.md`.
4. Report added QA IDs in the user summary.
