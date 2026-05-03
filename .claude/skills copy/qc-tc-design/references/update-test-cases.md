## Update Test Cases (6-Step Mandatory Workflow & Logic)

> **Trigger conditions:** This workflow is triggered when EITHER of the following occurs:
> 1. **Requirement change**: The audited UC Readiness Report has been updated (new version). Test cases need to be aligned with the changed requirements.
> 2. **User feedback**: The user provides explicit feedback about gaps, errors, or missing coverage in the existing test cases.

---

### Step 1: Input Analysis (MANDATORY)

#### 1.1 — Load Existing Artifacts

- Identify the highest version of the **existing test cases** file (`testcases/[UC-ID]/`).
- Identify the **current audited file** (UC Readiness Report) used to originally generate those test cases.
- Identify the **latest version** of the audited file available now.
- Load all three above. Do NOT generate any output files in this step.

#### 1.2 — Determine the Source of Change

Parse the user's invocation to determine **what triggered this update**:

| Trigger Type | Description |
|---|---|
| **A — Requirement Change** | User says the audited file has a new version. OR the latest audited file version is newer than the one used to generate existing test cases. |
| **B — User Feedback** | User provides explicit feedback about test cases (e.g., "missing cases", "wrong expected result", "need to add X"). |
| **C — Both** | Both requirement change and user feedback are provided simultaneously. |

If the trigger type is ambiguous, ask the user:
> _"Bạn muốn cập nhật test cases vì: (A) Requirement đã thay đổi, (B) Có feedback về test cases hiện tại, hay (C) Cả hai?"_

---

### Step 2: Change Impact Analysis (MANDATORY)

This step replaces the open-ended drafting of generate. The agent MUST focus analysis on **what changed** and **how the change impacts existing test cases**.

#### 2A — If Trigger is Type A (Requirement Change)

Perform a **diff analysis** between the previous and latest audited file:

1. **Identify changed ACs**: List all Acceptance Criteria (ACs) that were added, removed, or modified.
2. **Map ACs to existing TCs**: Using the Requirement Traceability Matrix from the previous summary file, find which test cases are linked to each changed AC.
3. **Classify the impact** for each changed AC:

| Change Type | Impact on Test Cases |
|---|---|
| AC added (new requirement) | → Need to **design new TCs** covering this AC. Apply the same 6-phase logic from `generate-test-cases.md`. |
| AC removed | → **Delete TCs** that exclusively cover this AC. If a TC covers multiple ACs and only one is removed, keep the TC and update its coverage. |
| AC modified (wording, logic, constraint changed) | → **Review and update** linked TCs. Recheck: Expected Result, Pre-conditions, Test Steps for accuracy against the new requirement. |
| AC unchanged | → Existing TCs remain valid. Mark as "No change". |

4. Build an **Impact Table**:

```
| AC ID | Change Type | Linked TC IDs | Action Required |
|-------|-------------|---------------|-----------------|
| AC-03 | Modified    | TC_012, TC_013 | Update Expected Result in TC_012, TC_013 |
| AC-07 | Added       | —              | Design new TCs  |
| AC-10 | Removed     | TC_025         | Delete TC_025   |
```

#### 2B — If Trigger is Type B (User Feedback)

Perform a **feedback classification analysis**:

For each feedback item provided by the user, classify it into one of three categories:

| Feedback Category | Definition | Agent Action |
|---|---|---|
| **Cat 1 — Agent Gap** | The requirement clearly implies this case, but the agent missed it when generating. Example: A validation rule was in the audited file but no TC was created for it. | → Design the missing TC(s). **Also flag this as a skill improvement suggestion** (see Step 2B.3). |
| **Cat 2 — Requirement Gap** | The feedback implies a behavior that is NOT documented in the current audited file. Example: User says "the system should show a warning when X" but X is not in the audited AC list. | → Do NOT design the TC yet. First: **ask the user to confirm and update the audited file** with this new requirement. After confirmation, re-trigger update with the new audited file. |
| **Cat 3 — Factual Correction** | The existing TC has an incorrect expected result, wrong step, or wrong pre-condition — not due to missing requirement, but due to a drafting error. | → Directly fix the existing TC. |

**Step 2B.1 — Analysis output per feedback item:**

For each feedback item, state:
```
Feedback: "[user's feedback text]"
Category: Cat 1 / Cat 2 / Cat 3
Reason: [Explain why you classified it this way, citing the AC ID or noting its absence]
Action: [What the agent will do]
```

**Step 2B.2 — For Cat 2 items:** Ask the user:
> _"Feedback '[summary]' mô tả một hành vi chưa được ghi nhận trong tài liệu requirement (audited file [version]). Để đảm bảo traceability, bạn có thể xác nhận và bổ sung nội dung này vào file audited không? Sau khi cập nhật, tôi sẽ thiết kế test case tương ứng."_

**Step 2B.3 — For Cat 1 items:** After designing the missing TCs, add a **Skill Improvement Flag**:
```
⚠️ SKILL IMPROVEMENT SUGGESTION:
Missing coverage for [type of validation/logic, e.g., "boundary value for max-length field"].
Recommended addition to generate-test-cases.md → Phase 3 (Core Functional Testing):
"[Suggested new rule or checklist item]"
```
Present this to the user and ask:
> _"Trường hợp này bị thiếu do skill chưa cover loại case này. Tôi đề xuất bổ sung vào `generate-test-cases.md` để tránh lặp lại. Bạn có muốn tôi cập nhật skill không?"_

#### 2C — If Trigger is Type C (Both)

Apply both 2A and 2B analyses sequentially. Consolidate the Impact Table and Feedback Analysis into a unified **Change Analysis Report** before proceeding to Step 3.

---

### Step 3: Redesign Affected Test Cases (MANDATORY)

Using the same 6-phase design logic as `generate-test-cases.md`, apply it **only to the impacted scope** identified in Step 2:

- **New TCs**: Design from scratch using the 6-phase logic for the new or changed ACs.
- **Updated TCs**: Rewrite only the affected fields (Steps, Expected Result, Pre-conditions) — keep the TC ID unchanged. Add a note: `[Updated vN — Reason: AC-XX modified]`.
- **Deleted TCs**: Mark as DELETED in the draft — do NOT renumber remaining TCs to avoid traceability breaks.

**Test Case sorting rules:** Follow the same rules as `generate-test-cases.md` (GUI first → Phase 1→6 → Happy path first).

**TC ID continuity rule:**
- New TCs must continue from the highest existing TC ID (e.g., if TC_025 was the last, new TCs start at TC_026).
- NEVER reuse a deleted TC's ID.

---

### Step 4: Write Draft File (.md) (MANDATORY)

Before generating the `.xlsx`, write the complete updated test case list into the new md file.

- The md file must contain ALL test cases — unchanged, updated, and newly added — in their final form.
- For each changed TC, annotate inline:
  - `[UPDATED — Reason: AC-XX modified]` next to the TC title.
  - `[NEW — AC-XX]` next to the TC title for new cases.
  - Do NOT include deleted TCs in the md file.
- At the bottom of the md file, include the **Updated Requirement Traceability Matrix**:
  - Merge old coverage + new coverage.
  - Mark deleted TCs as `[DELETED]`. Mark new TCs as `[NEW]`. Mark updated TCs as `[UPDATED]`.
  - Ensure 100% coverage for all active ACs in the latest audited file.
---

### Step 5: Output Generation (.xlsx)
- **Always create a new version**: If `v[N].xlsx` exists, create `v[N+1].xlsx`. NEVER overwrite.
- Use the template file.
- Source data comes from the md file generated in Step 4.
- Write ALL test cases — both unchanged and updated — into the new file:
  - GUI sheet → UI test cases (start row 2)
  - FUNCTION sheet → Functional test cases (start row 2)
  - Columns: `A=TC ID | B=Function | D=Preconditions | E=Test Steps | F=Expected Result | G=Priority`
- For deleted TCs: **Do NOT include them** in the new file. Their removal is documented in the summary.

---

### Step 6: Write Update Summary

Save a summary file in the same folder as the Excel. The summary MUST include:

```markdown
## ✅ Test Cases Update Complete

### Update Context
- Trigger: [Type A — Requirement Change / Type B — User Feedback / Type C — Both]
- Previous version: [filename]_v[N].xlsx ([X] cases)
- New version: [filename]_v[N+1].xlsx ([Y] cases)
- Audited file used (previous): [audited_filename_vX]
- Audited file used (new): [audited_filename_vY]

---

### Change Summary

| Metric | Count |
|---|---|
| Total TCs in previous version | X |
| TCs deleted | -D |
| TCs updated (modified) | ~U |
| TCs added (new) | +A |
| **Total TCs in new version** | **Y** |

#### Deleted Test Cases
| TC ID | Title | Reason |
|---|---|---|
| TC_025 | [Title] | AC-10 removed from requirement |

#### Updated Test Cases
| TC ID | Title | Change Description |
|---|---|---|
| TC_012 | [Title] | Expected Result updated — AC-03 constraint modified |

#### New Test Cases
| TC ID | Title | Linked AC |
|---|---|---|
| TC_026 | [Title] | AC-07 (newly added) |

---

### Updated Requirement Traceability Matrix
| AC ID | Acceptance Criteria | Linked Test Cases | Status |
|---|---|---|---|
| AC-01 | ... | TC_001, TC_002 | Covered |
| AC-07 | ... | TC_026 | Covered [NEW] |
| AC-10 | ... | — | Removed |

---

### Skill Improvement Flags (if any)
[List any Cat 1 feedback items that suggest gaps in the generate skill]

### Open Questions (if any)
[List any Cat 2 feedback items pending user confirmation to update audited file]

### Out-of-scope items
[e.g., Performance testing, Load testing — not covered by this skill]
```
