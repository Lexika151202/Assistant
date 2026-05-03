---
name: qc-ask-ba
description: Transfers open questions from the 'Unified Gap & Question Report' of an audited file to a Question Backlog file for the BA to answer. Triggered when the user asks "hỏi BA các câu hỏi của [UC-CAT-ID]" or call this skill.
---
# QC Ask BA Skill

## Purpose

This skill aims to extract unresolved questions identified during the requirement review process (located in the "Unified Gap & Question Report" section of the audited file) and transfer them into a dedicated Question Backlog file. This ensures that Business Analysts (BAs) can easily track, answer, and confirm the missing information.

## Trigger

Execute this skill when the User's prompt matches the pattern: "hãy hỏi BA các câu hỏi của [UC-CAT-ID]" (For example: "hãy hỏi BA các câu hỏi của UC-VOB-001").

## Step 1: Input Resolution & Clone Template

1. Extract the `[UC-ID]` from the User's prompt.
2. Search for the audited UC file within the `requirements/[UC-ID]/` directory. If multiple versions of the audited file exist, you MUST select the file with the highest version number.
3. Search for the question backlog file within the `requirements/[UC-ID]/` directory. If multiple versions of the question backlog file exist, you MUST select the file with the highest version number.
If the question backlog file already exists, skip the template cloning process, check if there are any answered questions in the backlog file that are not in the audited file. If there are, stop and warning the user that they should be re-audit the UC.
If the question backlog file does not exist, follow the step 4 and 5 to create a new one.
4. Read the master template from `skills\qc-ask-ba\template\question-backlog_template.md`.
5. Create the output file at the path: `requirements/[UC-ID]/[UC-ID]_question-backlog.md`.


## Step 2: Content Extraction & Transfer

1. From the highest version audited file, extract all the table data under the heading `### 📋 Unified Gap & Question Report`.
2. In the newly created (or opened) `[UC-CAT-ID]_question-backlog.md` file, locate the `## Open Questions` section.
3. Remove the placeholder line `_(No open questions — all resolved.)_` (if it exists).
4. Populate the `Open Questions` table with all the rows extracted from the audited report.
5. Ensure the table columns strictly follow the standard format:
   `| ID | Priority | Ref | Question | Why It Matters | Status |`
6. **ID Handling**: Keep the original IDs (e.g., Q1, Q2) from the audited report unless there is an ID conflict with existing entries in the backlog file (if appending to an existing file).

## Input Contract

- Audited file: `requirements/[UC-ID]/[UC-ID]_audited_v[N].md` (highest version)
- Question backlog file: `requirements/[UC-ID]/[UC-ID]_question-backlog.md` (if exists)

## Output Contract

- **Output path:** `requirements/[UC-ID]/[UC-ID]_question-backlog.md`
- Once the transfer or merge is completed, output a summary message indicating the number of questions successfully transferred to the backlog file.
