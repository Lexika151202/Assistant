# Workflow: Update Mode

> Parse stakeholder feedback → resolve QA items → surgically update existing BA docs.

## Step 1 — Identify Feedback Input

Accept one or more of these input types:

| Format | Description | Example |
|--------|-------------|---------|
| Meeting transcript (MD/TXT) | Recorded or manually typed interview notes | `docs/ba/meeting-transcript-1104.md` |
| Chat log (MD/TXT) | Slack, Teams, or messenger conversation export | Copy-pasted chat text |
| QA response CSV | Structured answers to QA items | `QA-001,H,Answer text,Stakeholder Name,2026-04-11` |

If user provides file paths, use those. Otherwise ask via `AskUserQuestion`.

## Step 2 — Read Existing BA Documents

Load all current documents:
1. `docs/ba/question-backlog.md` — to identify open QA items
2. `docs/ba/requirement-traceability.md` — to find impacted BRs, RULEs
3. `docs/ba/business-processes.md` — to find impacted BPs and diagrams
4. `docs/ba/usecase-list.md` — to find impacted use cases (descriptions, pre/post-conditions, triggers, BR/RULE refs)
5. `docs/ba/spec/*/` — scan for existing UC spec documents (`docs/ba/spec/{UC-ID}/{UC-ID}.md`). Read the **Open Questions** section of each to identify `OQ-*` items that may be answered by the feedback

## Step 3 — Parse Feedback & Match to QA Items

From the feedback input, extract **answer records**.

For each answer found:
1. Match to an existing `QA-NNN` item in the question backlog (by explicit ID reference like `[QA-001]`, or by semantic matching to the question text)
2. Extract: answer text, respondent name/role, date
3. Classify the answer status:
   - **Answered** — clear, actionable answer provided
   - **Deferred** — stakeholder explicitly deferred ("mark as pending", "will get back")
   - **Partially answered** — answer given but raises follow-up questions

Also detect **unsolicited new information** — rules, constraints, or decisions in the feedback that don't map to any existing QA item. These become new BRs, RULEs, or QA items.

## Step 4 — Determine Impact

For each answered QA item, trace impact to existing documents:

| QA answer contains... | Update target |
|-----------------------|---------------|
| New business rule or constraint | Add row to `requirement-traceability.md` § Business Rules |
| New or modified capability | Add/modify row in `requirement-traceability.md` § Business Requirements |
| New common rule | Note in report — user should run `common-rules update` to add |
| Changed process flow or status lifecycle | Update diagram + detail table in `business-processes.md` |
| New use case or modified UC definition | Add/update row in `usecase-list.md` (description, pre/post-conditions, triggers, BR/RULE refs) |
| Changed UC pre-conditions, triggers, or post-conditions | Update affected row(s) in `usecase-list.md` |
| Answer to a spec open question (`OQ-*`) | Update the UC spec document (`docs/ba/spec/{UC-ID}/{UC-ID}.md`) — resolve the OQ, update affected sections |
| Changed UC behavior, screen flow, or validation | Update affected UC spec document sections (Use Case Description, Screen Description, Validation Summary) |
| Scope removal ("remove X from scope") | Strike/remove from relevant doc + add note |
| Follow-up question raised | Add new `QA-NNN` item to `question-backlog.md` |

## Step 5 — Apply Updates

Execute updates in this order:

### 5a. `question-backlog.md`
- Move answered QA items from "Open Questions" table to "Answered Questions" table
- Fill in: Answer, Answered By, Date columns
- For deferred items: change Status to "Deferred"
- Add any new QA items discovered during feedback parsing
- Increment QA IDs sequentially from the last existing ID

### 5b. `requirement-traceability.md`
- Add new BR/RULE rows with source reference pointing to the feedback file (e.g., `meeting-transcript-1104.md`)
- If feedback contains new common rules, note them in the report for the user to add via `common-rules update`
- Modify existing rows only if the answer explicitly changes a previously stated rule
- Increment IDs sequentially from the last existing ID

### 5c. `business-processes.md`
- Update affected Mermaid diagrams (activity flows, state lifecycles)
- Update affected detail tables
- Add new BP sections if a previously undocumented process is now described
- Activate `mermaidjs-v11` skill if unsure about diagram syntax

### 5d. `usecase-list.md`
- If feedback introduces a **new use case**: add a new row under the correct BP category table, assigning the next sequential `UC-{CODE}-NNN` ID
- If feedback **modifies an existing use case**: update the affected columns (Description, Pre-condition, Post-condition, Trigger, Business Requirements, Business Rules) in place
- If feedback **removes a use case from scope**: strike or remove the row and add a note in the Changelog
- Preserve all existing UC IDs — never renumber or reorder
- Ensure Business Requirements and Business Rules columns reference the correct BR/RULE IDs (including any new ones added in step 5b)

### 5e. UC Spec Documents (`docs/ba/spec/{UC-ID}/{UC-ID}.md`)
For each impacted UC spec document:
- **Resolve open questions:** If feedback answers an `OQ-*` item in the spec's Section 5 (Open Questions), update its Status from `Open` to `Resolved` and append a short resolution note (e.g., `Resolved: [answer summary] — [source]`)
- **Update Use Case Description (Section 1):** If the answer changes pre-conditions, post-conditions, triggers, basic/alternative flows, or business rules — patch the affected rows in the table
- **Update Screen Description (Section 2):** If the answer changes UI element behaviors, display rules, or validation logic — patch the affected element rows
- **Update Validation Summary (Section 3):** If validation rules change, update the corresponding table
- **Update Cross-References (Section 4):** Add new BR/RULE/COMMON references if introduced by the feedback
- Preserve all content not impacted by the feedback
- Also update the corresponding `QA-NNN` item in `question-backlog.md` if the spec's OQ was previously synced there

### 5f. Changelog entry
- Append a changelog entry to the bottom of each updated file
- Use format from `references/update-changelog-template.md`

## Step 6 — Report

Report to user:
- Feedback files analyzed
- QA items resolved (list IDs + summary of answer)
- QA items deferred (list IDs)
- New items added (BR/RULE/QA/UC IDs)
- Use cases added or modified (list UC IDs + summary of change)
- UC spec documents updated (list UC-IDs + OQs resolved + sections patched)
- Suggested common rules for `common-rules update` (if any detected)
- Documents updated (with paths)
- Impacted BPs (if any diagrams changed)
- Any items needing further clarification
