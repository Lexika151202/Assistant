# Create Workflow (`/spec create <UC-ID>`)

**Objective:** Extract Use Case info from BA documents and map it to a UI screen description.

## 1. Gather Context
1. Locate the UC by searching `docs/ba/usecase-list.md`. Identify its Pre-conditions, Post-conditions, Triggers, and applicable Business Rules.
2. Read the referenced business rules in `docs/ba/common-rules.md` or `docs/ba/requirement-traceability.md` if necessary to understand precise definitions.
3. Locate the generated visual UI screen in the workspace (`docs/ba/spec/{UC-ID}` directory, look for `.png` files).

## 2. Analyze Screen
1. Use your multimodal vision capabilities to carefully inspect the screen image (`.png`).
2. Identify all actionable UI elements (Buttons, Inputs, Checkboxes, Dropdowns, Toggles).
3. Determine their **Display Rules** (when are they visible?) and **Behaviors** (what happens when clicked/changed?).

## 3. Draft Document
1. Load the template located at `references/templates/uc-document-template.md`.
2. Fill in Section 1 (Use Case Description) accurately using the gathered textual BA context. Ensure all alternative flows (e.g. error handling, validations) are explicitly mapped.
3. Fill in Section 2 (Screen Description) by enumerating the elements from the screen analysis. Add corresponding localized labels (e.g. Korean) if present.
4. **Enforce Constraints:** Map every business rule and constraint (e.g., file sizes, validation messages, format limits) directly into the Behaviors column of the relevant UI element. 
5. **Cross-reference Rules & UCs:** Use `(→ UC-XXX)` to explicitly reference navigation or triggers to other Use Cases. Explicitly reference common rules (e.g. `[COMMON-001]`) or business rules (e.g. `[BR-XX]`) where applicable.

## 4. Output Generation
1. Write the fully populated content to `docs/ba/spec/{UC-ID}/{UC-ID}.md`.
2. Do not insert placeholders. The final document must be completely descriptive and aligned with the project's specification standards.

## 5. Sync Open Questions to Question Backlog
1. Read `docs/ba/question-backlog.md` and determine the last `QA-NNN` ID.
2. For each open question (`OQ-*`) in the spec document's **Section 5 — Open Questions**:
   - Create a new `QA-NNN` entry (incrementing sequentially from the last existing ID).
   - Set **Priority** = `M` (default; adjust to `H` if it blocks design/architecture).
   - Set **Ref** = `spec/{UC-ID}` (e.g., `spec/UC-VOB-002`).
   - Set **Question** = the open question text.
   - Set **Why It Matters** = `Discovered during spec creation for {UC-ID}`.
   - Set **Status** = `Open`.
3. Append the new rows to the **Open Questions** table in `question-backlog.md`.
4. Do NOT duplicate: skip any question whose text already exists in the backlog (match by semantic similarity).
