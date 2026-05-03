## Generate Test Cases (5-Step Mandatory Workflow & Logic)

### Step 1: Input Analysis (MANDATORY)

- Identify the highest version of all the input files (UC Readiness Report, Scenarios). Always select the highest version number available.
- Read the provided documents and comprehend the use case in preparation for test case design.
- Do NOT generate `testcases` files or write Python scripts in this step.

### Step 2: Detailed Drafting (MANDATORY)

Write a test cases .md file.
Follow  6 distinct phases to design test cases:

#### Phase 1: Screen Initialization (Static States)

The agent must verify the landing state of the screen before any user interaction occurs.

- Empty State (No Data): Verify the visibility and specific default attributes of every object on the screen.
  - Explicitly describe placeholders, empty-state icons, or "No Data" messages.
- Populated State (With Data): Verify the default appearance of all items.
  - Describe the default state (Enabled/Disabled) of all components relative to the data present.

#### Phase 2: Item Interactions (Component States)

Verify the behavior of individual UI components without triggering core business logic.

- Navigation & Reset: Check 'X' icons, 'Cancel' buttons, and 'Close' controls to ensure they exit or reset the view as intended.
- Screen Initialization Triggers: Verify that clicking functional buttons correctly opens or initializes the relevant sub-functions or popups.
- Component Verification:
  - Dropdowns: Verify clickability and ensure the correct list of values is displayed.
  - Textboxes/Buttons: Verify states (Clickable, Disabled, Read-only) based on the design or business rules.
- Navigation Tools: Check pagination behavior (Active page, Next/Prev arrows).

#### Phase 3: Core Functional Testing (Logic Analysis)

Apply systematic testing techniques for every specific function available on the screen:

- Happy Path: Execute the successful flow using valid inputs.
- Validation: * Required Fields: Ensure the system blocks saving if mandatory fields are empty.
  - Format: Check Email, Phone, Date, or specific data formats.
  - Range: Check character length or numeric limits.
  - Boundary Value Analysis (BVA): Test at the limits (Min, Max, Min-1, Max+1).
- Exception/Error Handling: Trigger and verify system responses to invalid logic or external errors.

#### Phase 4: Functional Integration

Verify the synergy between different functions on the same screen.

- Example: How a 'Search' action affects 'Pagination', or how 'Deleting' an item updates the list count in real-time.

#### Phase 5: UI-Level Non-Functional Testing

- Security: Check for sensitive data masking (passwords) and input sanitization (SQL Injection/XSS) in UI fields.
- U X/Loading: Verify the presence of loading indicators (spinners) during data fetching and button debounce to prevent double-clicks.

#### Phase 6: GUI & Visual Compliance (Design-to-Code)

This phase focuses exclusively on visual fidelity:

- Design Alignment: Compare every object against the design file (Figma/Mockup) regarding position, color (HEX codes), spacing, and font sizes.
- Responsive Design: Verify the UI rendering across various screen resolutions and aspect ratios.

**Test Case sorting rules:**
Rule 1: Sheet-level separation:
- GUI test cases → `GUI` sheet only.
- Functional test cases → `FUNCTION` sheet only.

Rule 2: Within each sheet — sort by Phase (1→6):
- Phase 1: Screen Initialization (Static States)
- Phase 2: Item Interactions (Component States)
- Phase 3: Core Functional Testing (Logic Analysis)
- Phase 4: Functional Integration
- Phase 5: UI-Level Non-Functional Testing
- Phase 6: GUI & Visual Compliance (Design-to-Code)

Rule 3: Within each Phase — sort by logical flow:
- Happy path first, then validation, then error/exception cases.

**Test Case Instruction rules:** Following 3 rules below:
Rule 1: Naming & Identifier Rules
TC ID: Always strictly adhere to the format: TC_[UC-ID]_[Type]_[Incremental Number].
Example: TC_UC001_GUI_01, TC_UC001_FUNC_02.

Rule 2: UI Notation Standard
The Agent must utilize specific notations to differentiate on-screen components:
[Square Brackets]: Use for interactive components such as Buttons, Menus, Tabs, Icons. (Example: [Create Crawl Job] button, [X] icon).
"Double Quotes": Use for Labels, Placeholders, input values, or selected values from a list. (Example: "Platform" dropdown, "Select platform" placeholder).

Rule 3: Content Logic
Test Title: 
- Must begin with a verification verb (Check, Confirm, Verify...).
- Must include the scenario context. For example: ... in case no data, ... in case select [Value].

Pre-conditions: Must begin with an action, describes the actions that must be performed before executing the test case.
Example:
- Login to Admin system at [URL].
- Navigate to Product List screen.
- Click "Create" button and wait for "Create Product" popup to open completely.

Test Steps (Action-Oriented):
- Each step must be a single, discrete action on the UI.
- Use active imperative verbs: Navigate to, Click, Select, Enter, Hover over, Focus on.

Expected Result (UI Verification):
- Do not write generic statements like "System works correctly".
- Must explicitly describe the changed state of the UI:
    - Display a message (explicitly stating the message content).
    - Open/Close a popup/screen.
    - State of fields (enabled, disabled, displaying placeholder).
    - Display rules (What order is it sorted in? What is the color?).

**Priority:**
| Priority | When                                                 |
| -------- | ---------------------------------------------------- |
| High     | Happy path, auth, data integrity, core ACs           |
| Medium   | Alternative flows, validation rules, role/permission |
| Low      | Edge cases, cosmetic UI, minor error messages        |

### Step 3: Pre-Execution Traceability Matrix

- Inside the draft file, build the `Requirement Traceability Matrix` mapping the file requirement ACs to the drafted Test Case IDs.
- Ensure 100% test coverage before progressing.

### Step 4: Output Generation (.xlsx)

- Only after Steps 1-3 are verified, proceed to generate the `.xlsx` file by writing a script to populate the `Testcase_template.xlsx` using the verified draft data.
- Check the output directory for existing versions. If `v[N].xlsx` exists, increment the version to `v[N+1].xlsx`. Never overwrite existing files.
- Check `testcases/[UC-ID]/` for existing versions. Start at `v1`, increment if files exist. Never overwrite.
- Copy the template from: `.agents/skills/tc-design/templates/Testcase_template.xlsx`
- Write test cases to the correct sheet:
  - GUI sheet → UI test cases (start row 2)
  - FUNCTION sheet → Functional test cases (start row 2)
  - Columns: `A=TC ID | B=Title | C=Preconditions | D=Test Steps | E=Expected Result | F=Priority`
- Save to: `testcases/[UC-ID]/[UC-ID]_[feature-name]_testcases_[YYYYMMDD]_v[N].xlsx`
- Delete the draft `.md` file after successful Excel generation.

### Step 5: Write Summary

Save a summary file in the same folder as the Excel. Include:

```markdown
## ✅ Test Design Complete

| Artifact | File | Count |
|---|---|---|
| Test Cases | [filename].xlsx | X cases (Y GUI / Z FUNC) |

### Requirement Traceability Matrix
| AC ID | Acceptance Criteria | Linked Test Cases | Status |
|---|---|---|---|
| AC-01 | ... | TC_UC001_GUI_01, TC_UC001_GUI_02 | Covered |