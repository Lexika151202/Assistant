# UC Readiness Review
**Functional / Black-box Test Readiness Template**

---

> **How to use this template**
>This template defines the minimum information QA testers need to begin test case design.
>Fill out all sections completely before handing off to QA. Do not leave any field blank — if a section truly does not apply, write N/A and explain why.
>
> **Completion status conventions:**
> - ✅ **Complete** = section is fully populated and no longer ambiguous
> - ⚡ **Partial** = contains content but requires further clarification
> - ⚠️ **Missing** = absent — BLOCKER, cannot start test design

---

## Feature Brief

*(Summarize the feature based on all read documents. Include: what the feature is, who uses it, how it works, key business rules, and known exceptions.)*

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `XX / 100` | [✅ READY / ⚠️ CONDITIONALLY READY / ❌ NOT READY] |

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| *(Unique identifier for this use case, e.g., UC-12)* | *(Brief feature name, e.g., Service Menu List)* | *(Document version, e.g., v1.0)* | *(Current status: Draft / In Review / Finalized)* |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| *(Name of the document author)* | *(Name and role of the approver)* | *(Creation date, YYYY-MM-DD format)* | *(Last updated date, YYYY-MM-DD format)* |

---

## 1. Objective & Scope

### 1.1 Objective

*(Describe WHY this feature exists. What business problem does it solve? Who benefits? Write 1–3 concise sentences.)*

*(e.g., "Allow admin users to manage the service menu hierarchy displayed on the front-end service site, including adding, editing, deleting, and reordering menu items.")*

---

### 1.2 In Scope

*(List every function / sub-use-case covered in this UC. Use one line per item or bullet points.)*
*(e.g., View list, Add, Edit, Delete, Reorder 1-depth items, Set menu order.)*

---

### 1.3 Out of Scope

*(Clearly list what is NOT covered in this UC. If nothing is excluded, write "None.")*
*(e.g., "Front-end rendering of the menu on the service site is handled by UC-20 and is out of scope here.")*

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| *(Specific name of the user or system. Do not use generic names like "the user", e.g., Admin User)* | *(Primary / Secondary / Human / System)* | *(Describe what this actor can do in the UC. If there are multiple admin roles, specify permissions for each. e.g., Can view, add, edit, delete, and reorder all menu items. No restrictions on any record.)* |
| *(e.g. Authentication System)* | *(System)* | *(Describe the system's role. e.g., Validates the admin session before granting access to any page within this UC.)* |
*(Add rows as needed)*

> ⚠️ **Common mistake:** Vague actor names like "user" or "system". Use specific names — role, system, or API. If there is only one type of admin, state that clearly.

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions

*(List every condition that must be true before the flow begins. One condition per line.)*
    - *(e.g., The admin site is online and accessible.)*
    - *(e.g., The admin account has been created and stored in the database.)*
    - *(e.g., The admin has successfully authenticated.)*
    - *(e.g., At least one 1-depth item exists in the system.)*

---

### 3.2 Postconditions

*(Describe the system state after each successful outcome. Add one row per flow.)*

| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| *(e.g. Add record)* | *(e.g. New record appears at the top of the list, sorted by creation date descending. A success message is displayed.)* |
| *(e.g. Edit record)* | *(e.g. Updated data is saved. List refreshes. Success popup "Saved successfully" is shown.)* |
| *(e.g. Delete record)* | *(e.g. Selected record(s) are permanently removed. List refreshes immediately.)* |
| *(e.g. Apply order change)* | *(e.g. New display order is persisted to the backend and reflected on the front-end service.)* |
*(Add rows as needed)*

---

## 4. Main Flows (Happy Path)

> **Instructions:** Write one flow table for each sub-use-case (e.g., 4.1 View List, 4.2 Add, 4.3 Edit...).
> Each step must have: Actor → Action → System Response / Expected Result.
> System responses must be specific enough for the tester to determine pass/fail without asking the author.

---

### 4.1 Flow Name — e.g. View & Search List

| Step | Actor | Action | System Response / Expected Result |
|------|-------|--------|----------------------------------|
| 1 | *(Actor name, e.g. Admin)* | *(Actor's action, e.g. Navigates to the [module name] page.)* | *(What does the system display? e.g., System displays the list with filter bar, action buttons, and paginated table. Default row count: [X].)* |
| 2 | *(e.g. Admin)* | *(e.g. Enters/selects filter criteria and clicks Search.)* | *(e.g. List refreshes and shows only records matching the filter conditions.)* |
| 3 | *(e.g. Admin)* | *(e.g. Clicks Reset.)* | *(e.g. All filter fields return to default values. Full list is displayed.)* |
*(Add rows as needed)*

---

### 4.2 Flow Name — e.g. Add Record

| Step | Actor | Action | System Response / Expected Result |
|------|-------|--------|----------------------------------|
| 1 | *(e.g. Admin)* | *(e.g. Clicks the Add button.)* | *(e.g. System opens the Add form / popup with all fields empty.)* |
| 2 | *(e.g. Admin)* | *(e.g. Fills in all required fields.)* | *(e.g. Character counters update in real-time. Conditional fields appear/hide based on selections.)* |
| 3 | *(e.g. Admin)* | *(e.g. Clicks Save.)* | *(e.g. System validates input, saves the record, displays success feedback \[specify: popup / toast / inline\], and refreshes the list.)* |
*(Add rows as needed)*

---

### 4.3 Flow Name — e.g. Edit Record

| Step | Actor | Action | System Response / Expected Result |
|------|-------|--------|----------------------------------|
| 1 | *(e.g. Admin)* | *(e.g. Clicks \[specify trigger: row name link / Edit button / etc.\] on an existing record.)* | *(e.g. System opens the Edit form pre-filled with existing data. Author info (created by / modified by) is shown.)* |
| 2 | *(e.g. Admin)* | *(e.g. Modifies one or more fields and clicks Save.)* | *(e.g. System validates, saves, and displays success feedback \[specify message text\].)* |
*(Add rows as needed)*

---

### 4.4 Flow Name — e.g. Delete Record

| Step | Actor | Action | System Response / Expected Result |
|------|-------|--------|----------------------------------|
| 1 | *(e.g. Admin)* | *(e.g. Selects one or more records using checkboxes and clicks Delete.)* | *(e.g. \[Specify: confirmation dialog text?\] Upon confirmation, selected record(s) are removed from the list.)* |
*(Add rows as needed)*

---

## 5. Alternative Flows

> **Instructions:** Alternative flows are named branches — conditions where the user deviates from the happy path.
>
> Each branch must have: a clear trigger condition, a description of what changes, and an end at a defined state.

| ID | From Step | Trigger Condition | Alternative Action & Result |
|----|-----------|------------------|-----------------------------|
| A1 | *(e.g. Section 4.1, Step 2)* | *(e.g. No records match the search criteria.)* | *(e.g. System displays an empty state message: "\[specify message text\]". No records shown in table.)* |
| A2 | *(e.g. Section 4.2, Step 1)* | *(e.g. Admin closes the form without saving — clicks Cancel or X.)* | *(e.g. \[Specify: confirmation dialog shown? If yes, provide dialog text. If no, form closes immediately with no data saved.\])* |
| A3 | *(From step...)* | *(Describe the branching condition...)* | *(Describe what happens and the end state...)* |
*(Add rows as needed)*

---

## 6. Exception & Error Flows

> **⚠️ This section is critical for QA. Without it, the tester cannot design negative test cases.**
>
> Each error scenario must include: exact trigger, exact error message text (word-for-word), UI display location, and system behavior (is data saved? does the form close?).

| Trigger Condition | Error Message Text *(exact wording)* | UI Location | System Behavior |
|-------------------|--------------------------------------|-------------|-----------------|
| *(e.g. Required field is left empty on Save.)* | *(e.g. "This field is required.")* | *(e.g. Inline below the field, red border.)* | *(e.g. Form does not close. Data is not saved. Field is highlighted.)* |
| *(e.g. Input exceeds maximum character limit.)* | *(e.g. "Maximum \[X\] characters allowed." — or specify if input is blocked at limit.)* | *(e.g. Counter turns red. Toast notification.)* | *(e.g. System blocks further input at limit, OR allows input and shows error on Save. Specify which.)* |
| *(e.g. File upload with invalid format, e.g. non-PNG.)* | *(e.g. "Only PNG files are allowed.")* | *(e.g. Immediately on file selection.)* | *(e.g. File is rejected. Upload field is cleared. No data is saved.)* |
| *(e.g. Delete action with no checkbox selected.)* | *(e.g. "Please select at least one item to delete.")* | *(e.g. Alert popup or toast.)* | *(e.g. No records are deleted. List is unchanged.)* |
| *(e.g. Save/submit fails due to a network or server error.)* | *(e.g. "An error occurred. Please try again.")* | *(e.g. Toast notification.)* | *(e.g. Data is NOT saved. Form remains open. User can retry.)* |
| *(e.g. URL field input is an invalid format.)* | *(Specify the exact error message text.)* | *(Specify: real-time or upon Save?)* | *(Specify system behavior.)* |
*(Add rows as needed)*

---

## 7. Business Rules & Validations

> **Instructions:** List every validation rule with exact values. Vague rules like "must be short" or "valid format" CANNOT be tested. Always specify numbers, patterns, or allowed values.

### 7.1 Field Validation Rules

| Field Name | Required | Format / Constraint | Min | Max | Error Message *(exact text)* |
|------------|----------|---------------------|-----|-----|-------------------------------|
| *(e.g. Menu Name)* | *(Yes / No)* | *(e.g. Text. No HTML tags allowed.)* | *(e.g. 1)* | *(e.g. 13 chars)* | *(e.g. "This field is required." / "Maximum 13 characters allowed.")* |
| *(e.g. Landing URL)* | *(e.g. Conditional — ghi rõ điều kiện)* | *(e.g. Must start with https://. Relative URLs not accepted.)* | *(—)* | *(—)* | *(e.g. "Please enter a valid URL.")* |
| *(e.g. Icon Upload)* | *(e.g. No)* | *(e.g. PNG format only. Max file size: [X] KB.)* | *(—)* | *(e.g. [X] KB)* | *(e.g. "Only PNG files are allowed." / "File size must not exceed [X] KB.")* |
| *(e.g. Exposure Period)* | *(e.g. Yes)* | *(e.g. DateTime range. End date must be after start date.)* | *(—)* | *(—)* | *(e.g. "End date must be after start date.")* |
*(Add rows as needed)*

---

### 7.2 Other Business Rules

*(List business rules that are not field-level validations. One rule per line.)*

- *(e.g. "Deleting a record requires at least one checkbox to be selected.")*
- *(e.g. "Order changes are temporary until the Apply button is clicked.")*
- *(e.g. "A record cannot be deleted if it has active child records.")*
- *(e.g. "If a parent item is set to Hidden, child items will not appear on the front-end regardless of their own status.")*
- *(Add rules as needed...)*

---

## 8. UI / UX Behaviour

> **Instructions:** Describe every visible UI state. QA must be able to verify UI behavior without guessing. If there is a design/wireframe, cross-reference it here.

### 8.1 Screen States

| State | Description |
|-------|-------------|
| *(Default / loaded state)* | *(Describe what the screen looks like on initial load. Which fields are empty? What are the default values? e.g., All filter fields are empty. Table shows the first [X] records sorted by creation date descending. Add and Delete buttons are visible and enabled.)* |
| *(Loading state)* | *(Describe the UI during search / save / upload. Is there a spinner? Are buttons disabled? e.g., A loading spinner appears over the table. The Search and Reset buttons are disabled until the response is received.)* |
| *(Empty state)* | *(Describe what the list/table looks like when there are no results. Provide the exact message text. e.g., Table body is replaced with the message: "No results found. Please adjust your filters and try again.")* |
| *(Validation error state)* | *(Describe how errors are displayed on the form field. e.g., Field border turns red. Error message appears inline below the field. The Save button remains enabled so the user can retry.)* |
| *(Success state)* | *(Describe the success feedback after Add / Edit / Delete / Order change. Provide the exact message text. e.g., A toast notification appears in the top-right corner with the message: "Saved successfully". It auto-dismisses after 3 seconds.)* |
| *(Confirmation dialog)* | *(Describe any confirmation popups before destructive actions. Provide button labels and dialog text. e.g., A modal appears with the message: "Are you sure you want to delete the selected item(s)? This action cannot be undone." Buttons: "Cancel" and "Delete".)* |
*(Add states as needed)*

---

### 8.2 Conditional UI / Dynamic Behaviour

*(Describe UI elements that appear, hide, enable, or disable based on user interaction.)*

- *(e.g. "When Type = Service Landing is selected, the following fields become visible: Search Exposure Name, Landing URL, Autocomplete toggle, Label, Keywords, Icon upload.")*
- *(e.g. "When Type = Menu Category is selected, the above fields are hidden completely.")*
- *(Add all conditional behaviors...)*

---

### 8.3 Character Counters & Live Feedback

*(List all fields with real-time character counters or live validation feedback.)*

- *(e.g., "The Menu Name field displays a live counter in the format '0 / 13'. When the limit is reached, [specify: counter turns red / input is blocked].")*
- *(Add other fields...)*

---

## 9. API / Integration Behaviour

> **Instructions:** Fill out this section if the feature interacts with a backend API. Without it, QA cannot design API-level or integration test cases.
>
> If there is no API, write: "N/A — all processing is handled client-side."

| Feature Action | HTTP Method | Endpoint | Request / Response / Error Codes |
|---------------|-------------|----------|----------------------------------|
| *(e.g. Get list)* | *(e.g. GET)* | *(e.g. /api/[resource])* | *(e.g. Response: 200 OK + paginated list. Query params: [list them]. Error: 401 Unauthorized.)* |
| *(e.g. Add record)* | *(e.g. POST)* | *(e.g. /api/[resource])* | *(e.g. Request body: [list required fields]. Response: 201 Created + new record. Error: 400 Validation, 409 Duplicate.)* |
| *(e.g. Edit record)* | *(e.g. PUT / PATCH)* | *(e.g. /api/[resource]/{id})* | *(e.g. Response: 200 OK. Error: 404 Not Found, 400 Validation.)* |
| *(e.g. Delete record)* | *(e.g. DELETE)* | *(e.g. /api/[resource]/{id})* | *(e.g. Response: 204 No Content. Error: 404 Not Found.)* |
| *(e.g. Upload file)* | *(e.g. POST)* | *(e.g. /api/upload/[type])* | *(e.g. Request: multipart/form-data. Allowed types: PNG. Max size: [X] KB. Response: 200 + file URL. Error: 400 Invalid format/size.)* |
*(Add all endpoints...)*

---

## 10. Acceptance Criteria

> **Instructions:** Acceptance criteria must be written in a verifiable pass/fail format, using the Given / When / Then structure.
>
> Avoid words like "should", "can", "might", or "works correctly" — these cannot be tested.
>
> Each main flow, alternative flow, error flow, and business rule must have at least one acceptance criterion.

| AC # | Scenario | Given *(precondition / setup)* | When *(user action)* | Then *(expected result — specific & measurable)* |
|------|----------|-------------------------------|----------------------|--------------------------------------------------|
| AC-01 | *(e.g. View list — default load)* | *(e.g. Admin is authenticated and navigates to the module page.)* | *(e.g. Page finishes loading.)* | *(e.g. The list displays records with the correct columns. Default row count is [X]. Filter fields are empty.)* |
| AC-02 | *(e.g. Add record — happy path)* | *(e.g. Admin has the Add form open with all required fields filled with valid data.)* | *(e.g. Admin clicks Save.)* | *(e.g. [Specify success message text]. New record appears in the list. Form closes.)* |
| AC-03 | *(e.g. Add record — required field empty)* | *(e.g. Admin has the Add form open and leaves a required field blank.)* | *(e.g. Admin clicks Save.)* | *(e.g. Error message "[exact text]" is displayed [location]. Form does not close. No data is saved.)* |
| AC-04 | *(e.g. Field max length — boundary)* | *(e.g. Admin is on the Add form.)* | *(e.g. Admin enters [max+1] characters in the [field name] field.)* | *(e.g. [Specify: input is blocked at [max] chars, OR error is shown on Save. Counter turns red at limit.] )* |
| AC-05 | *(e.g. File upload — invalid format)* | *(e.g. Admin is on the Add/Edit form.)* | *(e.g. Admin selects a [non-allowed format] file for upload.)* | *(e.g. Error message "[exact text]" is shown immediately. File is rejected. Upload field is cleared.)* |
| AC-06 | *(e.g. Delete — no selection)* | *(e.g. Admin is on the list page with no checkboxes selected.)* | *(e.g. Admin clicks Delete.)* | *(e.g. Error message "[exact text]" is displayed. No records are deleted. List is unchanged.)* |
| AC-07 | *(e.g. Delete — with selection)* | *(e.g. Admin has selected [N] records using checkboxes.)* | *(e.g. Admin clicks Delete and confirms.)* | *(e.g. Selected records are removed from the list. List refreshes. [Specify success feedback if any.] )* |
| AC-08 | *(e.g. Order change — applied)* | *(e.g. Admin has reordered items using ▲/▼.)* | *(e.g. Admin clicks Apply / Save Order.)* | *(e.g. New order is persisted. [Specify success message.] Order reflects correctly on next page load.)* |
| AC-09 | *(e.g. Order change — not applied)* | *(e.g. Admin has reordered items using ▲/▼ but has NOT clicked Apply.)* | *(e.g. Admin closes the popup / navigates away.)* | *(e.g. [Specify: confirmation dialog shown? OR order is discarded silently. Original order is preserved.] )* |
*(Add ACs for every flow and business rule...)*

---

## 11. Non-functional Requirements

> **Instructions:** Even if these requirements are not blockers, specify them so test cases for performance, security, and compatibility can be created. If they truly do not apply, write "N/A" for the respective category.

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| *(Performance)* | *(e.g. Search results must load within 2 seconds for up to 10,000 records. Save/upload actions must complete within 3 seconds.)* | *(e.g. SLA doc / agreement)* |
| *(Security)* | *(e.g. All API endpoints require authentication. CSRF protection is enforced on all state-changing requests. Uploaded files are scanned for malicious content before storage.)* | *(e.g. Security policy)* |
| *(Browser Compatibility)* | *(e.g. Must function correctly on Chrome [version]+, Edge [version]+, Safari [version]+. Mobile browsers: [specify or "not required for admin site"].)* | |
| *(File Upload Limits)* | *(e.g. Maximum file size: [X] KB. Maximum image dimensions: [W x H] px. Allowed types: PNG only.)* | |
| *(Accessibility)* | *(e.g. Meets WCAG 2.1 Level AA. All interactive elements are keyboard-navigable. Drag-and-drop has an equivalent keyboard alternative.)* | |
| *(Data Retention)* | *(e.g. Deleted records are soft-deleted (recoverable for 30 days) OR hard-deleted immediately. Specify which.)* | |
*(Add categories as needed)*

---

## 12. Open Questions & Dependencies

### 12.1 Open Questions

| # | Question / Issue | Context | Owner | Status |
|---|-----------------|---------|-------|--------|
| Q1 | *(e.g. Does the edit form open by clicking the record name or a separate Edit button?)* | *(e.g. Affects how the Edit trigger is defined in Section 4.3.)* | *(e.g. BA / Designer)* | *(Open / In Review / Resolved)* |
| Q2 | *(e.g. Is drag-and-drop reordering in scope, or only ▲/▼ buttons?)* | *(e.g. Wireframe shows ▲/▼ only; requirements mention drag-and-drop. Conflict needs resolution.)* | *(e.g. BA / PO)* | *(e.g. Open)* |
*(Add questions as needed)*

---

### 12.2 Dependencies

*(List any UC, feature, API, or external system that this UC depends on.)*
    - *(e.g., "This UC depends on UC-05 (Admin Authentication) being complete and stable.")*
    - *(e.g., "The 1-depth Item dropdown is populated by the 1-depth Item Management module (UC-12.03).")*

---

## 13. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|--------------------|
| *(e.g. v1.0)* | *(YYYY-MM-DD)* | *(Author name)* | *(e.g. Initial draft.)* |
| *(e.g. v1.1)* | *(YYYY-MM-DD)* | *(Author name)* | *(e.g. Added error flows for Section 6. Updated max length for Label field.)* |
*(Add a row for each revision...)*

---

*UC Readiness Template v2.0 — For QA Test Design*
