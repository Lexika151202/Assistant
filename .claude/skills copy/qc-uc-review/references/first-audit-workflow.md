## First Audit Workflow

1. **Ingest & Understand** — read all provided artefacts, understand the feature
2. **Audit** — score completeness across all required knowledge areas
3. **Report** — deliver a structured readiness report with verdict, score, gaps, and suggestions

## Supported Artefact Types

Accept any combination of:

| Type                        | Examples                                           |
| --------------------------- | -------------------------------------------------- |
| Requirements / Use Case doc | UC spec, feature brief, BRD, user story            |
| UI Design / Wireframe       | Figma export, mockup image, screen flow PDF        |
| API Specification           | REST API doc, Swagger/OpenAPI, integration spec    |
| Business Process doc        | Workflow diagram, BPMN, process description        |
| Design document             | Technical design, system design, architecture note |
| Other supporting docs       | Data dictionary, error code list, email templates  |

All file formats are supported: plain text, Markdown, PDF, Word (.docx), images (PNG/JPG).

## Phase 1 — Ingest & Understand

### Step 1: Read all artefacts

Read all the common files first.
Read each provided file or pasted content fully before scoring anything.

**Input-type routing:**
| Input type           | Action  |
| -------------------- | -------------------|
| URL provided         | Invoke the `.agents\skills\document-extraction\SKILL.md` skill to extract text, tables, images first. Do NOT use the Read tool directly on URL files.|
|PDF provided          | Invoke the `.agents\skills\pdf\SKILL.md` skill to extract text, tables, images first. Do NOT use the Read tool directly on PDF files.|
|DOCX provided          | Invoke the `.agents\skills\docx\SKILL.md` skill to extract text, tables, images first. Do NOT use the Read tool directly on DOCX files.|
| File path provided   | Read the file using the appropriate tools|
| Image file provided  | Use the Read tool — it renders images inline; describe all visible UI elements, labels, states, and flows in detail |
| Pasted text provided | Treat as a document; parse directly from the prompt |

### Step 2: Synthesise a Feature Understanding
After fully comprehending all provided documents and analyzing the design images (including any screen mockups embedded within the specification documents), proceed to synthesize the requirement content according to the following 5 sections:
**1. UI Object Inventory & Mapping**
Extract and catalog all user interface components based on the Design Mockup and map them correspondingly to the Functional Specification document.
  - Data Display Structure (Grid/List/Table): Identify the list of data columns, define the pagination limit, establish the default sorting logic, and specify the display state when the dataset is empty (Empty state).
  - Control System (Filters/Search Fields): Identify the initial state, the list of available values in Dropdowns, and the input data constraints of the search fields.
  - Navigation and Action Components (Buttons/Controls): Define the position and identity of all functional buttons on the interface.
  - All other components present on the interface.

**2. Object Attributes & Behavior Definition**
Determine the state and response of each UI object based on specific system conditions.
  - System States: Define the default state of the object (Enabled, Disabled, Hidden, Read-only) based on variables such as: account privileges (Permissions), input data conditions, or the current data state of the system.
  - Interaction Matrix: Specify the possible interaction actions (Click, Hover, Drag & Drop) and the corresponding system responses for each object.
  - Object Behavior: Define how the object reacts when there is a data change or a state change in related objects.

**3. Functional Logic & Workflow Decomposition**
Analyze in detail the business processes of each function available on the feature screen, such as view list, filter, search, create, view detail, edit, delete, export, etc.
  - Workflows:
    - Main Flow (Happy Path): The correct execution flow that produces no errors or exceptions.
    - Alternative Flows: Alternative execution paths that lead to a successful outcome.
    - Exception & Error Flows: Scenarios involving system errors or invalid data.
  - Business Rules & Validations: Synthesize the business rules regarding format constraints, value ranges, and mandatory fields.
  - UI/UX Feedback: Specify system notifications (Toast messages), error codes, and loading states corresponding to each process.

**4. Functional Integration Analysis**
Analyze and evaluate the linkages and influences between the cataloged functions, acting as an integration check between functions.
  - Impact Analysis: Determine whether a change in state or data within one function directly or indirectly affects other functions.
  - Data Consistency: Verify the synchronization of data across all related UI components after a function is executed.

**5. Acceptance Criteria (AC) Synthesis**
Establish the final set of measurement and evaluation standards regarding the completeness of the requirement.
  - Establishing Acceptance Criteria (AC): Categorize and detail the acceptance criteria for each group: Interface (UI), Function, and Integration.

## Phase 2 — Audit

### Knowledge Areas Checklist

Score the **combined artefact set** against these knowledge areas.
A tester needs all of these to design complete test cases.

Mark each as:

- ✅ **Clear** — explicitly stated and unambiguous (full marks)
- ⚠️ **Partial** — present but vague, incomplete, or only inferred (half marks)
- ❌ **Missing** — absent from all provided artefacts (zero marks)

| #   | Knowledge Area                        | Max Pts | Critical? | What to look for  |
| --- | ------------------------------------- | ------- | --------- | ---------------- |
| 1   | Feature Identity (title, ID, context) | 5       | Yes       | Is it clear what this feature is and where it fits in the system? |
| 2   | Objective & Scope                     | 5      | Yes       | Why does this feature exist? What is in/out of scope? |
| 3   | Actors & User Roles                   | 10      | Yes       | Who triggers the feature? What roles/permissions are involved? |
| 4   | Preconditions & Postconditions        | 10      | Yes       | What must be true before? What is the system state after success? |
| 5   | UI Object Inventory & Mapping         | 15      | Yes       | List all user interface components based on the Design Mockup and map them correspondingly to the Functional Specification  document.|
| 6   | Object Attributes & Behavior Definition| 20      | Yes       | Determine the state and response of each UI object based on specific system conditions|
| 7   | Functional Logic & Workflow Decomposition| 20      | Yes       | Analyze in detail the business processes of each function available on the feature screen. Duplicate the block below for each major sub-function (e.g., View List, Create Record).|
| 8   | Functional Integration Analysis       | 10      | Yes       | Analyze and evaluate the linkages and influences between the cataloged functions, acting as an integration check between functions.|
| 9   | Acceptance Criteria                   | 10      | Yes       | Measurable, verifiable pass/fail statements|
| 10   | Non-functional Requirements           | 5       | No        | Performance, security, compatibility, accessibility|

**Total: 110 points → Normalise to 100 for the final score.**

**Normalization formula:** `Final Score = round((Raw Score / 110) × 100, 1)`

> Example: Raw score 88 / 110 → Final Score = round((88 / 110) × 100, 1) = **80.0 / 100**
> Example: Raw score 95 / 110 → Final Score = round((95 / 110) × 100, 1) = **86.4 / 100**

**Auto-fail rule:** If any Critical knowledge area scores 0, verdict = NOT READY
regardless of total score.

> **Critical areas** (rows marked "Yes"): Areas #1–#9. If ANY of these score 0, the verdict is automatically NOT READY regardless of total score.
> **Non-critical areas** (rows marked "No"): Areas #10–#12. Scoring 0 here reduces the total but does not trigger auto-fail.

### Cross-Artefact Conflict Check

After scoring, check for **conflicts between artefacts**:

- Does the UC doc describe a flow that contradicts the wireframe?
- Does the API spec define fields not mentioned in requirements?
- Are there UI elements in the design with no corresponding business rule?
- Are labels/field names inconsistent across documents?

List all conflicts found — they are automatic Warnings.

### Blocked Artefact Protocol

If a referenced artefact (wireframe, API spec, supporting doc) is **unavailable or inaccessible**:

- Mark the dependent knowledge area(s) as `[BLOCKED: artefact name not accessible]`
- Score those areas as 0
- Since blocked artefacts almost always affect Critical knowledge areas (#1–#9), surface each blocked area as a 🔴 **Blocker** in the report under the "Blockers" section
- Do NOT infer or assume content from unavailable artefacts


## Phase 3 — Report

The report is based on the **UC Readiness Review Template**. Open the template file, fill every section based on what was found (or not found) in the provided artefacts, then save the completed as the report output.

**Status markers used throughout:**
- ✅ **Complete** — explicitly stated and unambiguous
- ⚡ **Partial** — present but vague, incomplete, or only inferred (half marks)
- ⚠️ **Missing** — absent from all provided artefacts (zero marks)
- *(inferred)* — the reviewer inferred information rather than finding it explicitly; these are candidates for confirmation before test design begins

### 📊 Audit Summary

> **Note:** Knowledge area numbers map to template sections as follows:
> #1 → Section 0 · #2 → Section 1 · #3 → Section 2 · #4 → Section 3 · #5 → Section 4 · #6 → Section 5 · #7 → Section 6 · #8 → Section 7 · #9 → Section 8 · #10 → Section 9 

| #               | Knowledge Area                           | Max Pts       | Score | Status                    |
| --------------- | ---------------------------------------- | ------------- | ----- | ------------------------- |
| 1               | Feature Identity                         | 5             | X/5   | ✅/⚡/⚠️                 |
| 2               | Objective & Scope                        | 5             | X/5   | ✅/⚡/⚠️                 |
| 3               | Actors & User Roles                      | 10            | X/10  | ✅/⚡/⚠️                 |
| 4               | Preconditions & Postconditions           | 10            | X/10  | ✅/⚡/⚠️                 |
| 5               | UI Object Inventory & Mapping            | 15            | X/15  | ✅/⚡/⚠️                 |
| 6               | Object Attributes & Behavior Definition  | 20            | X/20  | ✅/⚡/⚠️                 |
| 7               | Functional Logic & Workflow Decomposition| 20            | X/20  | ✅/⚡/⚠️                 |
| 8               | Functional Integration Analysis          | 10            | X/10  | ✅/⚡/⚠️                 |
| 9               | Acceptance Criteria                      | 10            | X/10  | ✅/⚡/⚠️                 |
| 10              | Non-functional Requirements              | 5             | X/5   | ✅/⚡/⚠️                 |
| **Total**       |                                          | **110**       |       | **XX/110 → XX/100**       |

### 📋 Unified Gap & Question Report
Synthesize all gaps, missing info, warnings, conflicts, and open questions from all analyzed sections into a single comprehensive table for the BA to review. Ensure there is no duplicated content.
| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| *(e.g., Q1)* | *(High / Medium / Low)* | *(Exact excerpt from requirement. Skip if Missing)* | *(Main content to clarify or fix)* | *(Why this is an issue, impact on testability)* | *(Open)* |
- **ID**: ID of the question (e.g., Q1, Q2)
- **Priority**: 
- **High**: Blockers (critical knowledge areas scoring 0, missing critical info).
- **Medium**: Warnings, Cross-artefact conflicts, Partial/Vague details.
- **Low**: Suggestions for improvement, minor open questions.
- **Ref**: Exact excerpt from the requirement that led to this question. If the issue is something completely missing, write "N/A (Missing)".
- **Question**: Clearly state what needs to be answered, provided, or corrected by the BA. Make sure to include the description of the issue as currently found.
- **Why It Matters**: Explain the specific reason for raising this question (e.g., impact on test design, potential bugs, data inconsistency).
- **Status**: Default to "Open".

### 🟢 What's Good

Briefly acknowledge what is well-documented. Give the author credit for what is ✅ Complete.


### 🧪 Testability Outlook

**What CAN be tested now:**

- [Test areas with enough information to start]

**What CANNOT be tested yet (blocked by gaps):**

- [Test areas blocked by ⚠️ Missing or ⚡ Partial sections]

**Suggested test focus areas** *(once gaps are resolved)*:

- Happy path: [based on Section 5. Object Attributes & Behavior Definition
- Alternative scenarios: [based on Section 5. Object Attributes & Behavior Definition]
- Boundary & validation tests: [based on Section 5. Object Attributes & Behavior Definition]
- Error & exception scenarios: [based on Section 5. Object Attributes & Behavior Definition]
- UI-specific checks: [based on Section 5. Object Attributes & Behavior Definition, if design/wireframe was provided]

### 📌 Summary & Recommendation

One paragraph: overall state of the artefact set, key actions required, and a clear recommendation — hold until fixed / fix specific items and proceed / proceed now.

---

## Readiness Thresholds

| Score   | Verdict                           | Meaning                                                              |
| ------- | --------------------------------- | -------------------------------------------------------------------- |
| 90–100 | ✅**READY**                 | QA can begin test design immediately                                 |
| 70–89  | ⚠️**CONDITIONALLY READY** | QA can start on clear areas; flagged items must be fixed in parallel |
| 0–69   | ❌**NOT READY**             | Too many gaps; do not begin test design                              |

**Auto-fail:** Any Critical knowledge area scoring 0 → ❌ NOT READY regardless of total.


## Common Gap Patterns

| Gap Pattern                                  | Impact on Test Design                         |
| -------------------------------------------- | --------------------------------------------- |
| No preconditions stated                      | Tester can't set up test data correctly       |
| Vague actor ("the user")                     | Can't determine which role/permission to test |
| Missing field validation rules               | Can't write boundary value or negative tests  |
| No error messages specified                  | Can't verify error handling behaviour         |
| Acceptance criteria use "should" / "can"     | Not verifiable; can't define pass/fail        |
| Error UI state not described                 | Can't verify UI error behaviour               |
| API error codes not listed                   | Can't verify API error handling               |
| Design shows fields not in requirements      | Ambiguous scope and validation rules          |
| Flows reference other features without links | Can't trace test dependencies                 |
