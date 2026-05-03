# Rule Categories & Suggestions

> Pre-built catalog with suggested rules. During `init`, user selects categories and accepts/modifies/skips suggestions. Project-agnostic.

## 1. Input Constraints
> Field-level validation rules for user input.

| # | Suggested Rule |
|---|---------------|
| 1 | Text field (single line) maximum length: 255 characters |
| 2 | Text area (multi-line) maximum length: 2,000 characters |
| 3 | Required fields must be marked with asterisk (*) |
| 4 | Numeric-only fields must reject non-numeric input on keypress |
| 5 | Dropdown selections must have a placeholder: "Select {field_name}" |
| 6 | Search fields minimum query length: 2 characters before triggering search |
| 7 | Name fields must not exceed 100 characters |
| 8 | Description fields must not exceed 500 characters |

## 2. UI/UX Behaviors
> Interaction patterns and behavioral consistency.

| # | Suggested Rule |
|---|---------------|
| 1 | Modal dialogs dismissible via close button (X); backdrop click must NOT dismiss modals with unsaved changes |
| 2 | Loading spinner must display for async operations exceeding 300ms |
| 3 | Toast notifications auto-dismiss after 5 seconds; error toasts persist until manually dismissed |
| 4 | Confirmation dialog required before any destructive action (delete, archive, suspend) |
| 5 | Form submissions must disable submit button after first click to prevent double submission |
| 6 | Empty states must display descriptive message and suggest an action |
| 7 | Success operations must display a success toast message |
| 8 | Table rows must support hover highlight for readability |

## 3. Data Standards
> Format and representation rules for common data types.

| # | Suggested Rule |
|---|---------------|
| 1 | Email format must comply with RFC 5322 standard |
| 2 | Phone number format: E.164 international format with country code |
| 3 | Date display format: DD/MM/YYYY (configurable per locale) |
| 4 | Date-time display format: DD/MM/YYYY HH:mm (24-hour) |
| 5 | Currency display: symbol prefix with 2 decimal places (e.g., LKR 1,500.00) |
| 6 | Percentage display: value followed by % symbol, max 2 decimal places |
| 7 | Boolean status display: use "Active/Inactive" labels, not "true/false" |
| 8 | Names must use title case display (e.g., "John Doe") |

## 4. Error Handling
> Standardized error messaging and validation feedback.

| # | Suggested Rule |
|---|---------------|
| 1 | Required field validation message: "{Field Name} is required" |
| 2 | Invalid format validation: "Please enter a valid {field type}" |
| 3 | Min/max length validation: "{Field Name} must be between {min} and {max} characters" |
| 4 | Numeric range validation: "{Field Name} must be between {min} and {max}" |
| 5 | Unique constraint violation: "{Field Name} already exists" |
| 6 | Server error fallback: "Something went wrong. Please try again later." |
| 7 | 404 page must display user-friendly message with navigation back to home |
| 8 | Form validation must show inline errors below each field, not only summary banner |

## 5. File Upload
> File upload behavior and constraints.

| # | Suggested Rule |
|---|---------------|
| 1 | Maximum file size per upload: 5 MB (unless specified otherwise per feature) |
| 2 | Image formats accepted: JPEG, PNG, WebP |
| 3 | Document formats accepted: PDF |
| 4 | Image upload must show preview thumbnail before submission |
| 5 | Upload progress indicator for files exceeding 1 MB |
| 6 | File name must be displayed after upload with option to remove |
| 7 | Multiple file upload: maximum 5 files per upload field (unless specified otherwise) |

## 6. Security & Authentication
> Business-level security and authentication behavior.

| # | Suggested Rule |
|---|---------------|
| 1 | Password minimum: 8 characters with at least 1 uppercase, 1 lowercase, 1 digit, 1 special character |
| 2 | Session timeout after 30 minutes of inactivity; display warning 5 minutes before expiry |
| 3 | Maximum login attempts: 5 failures before temporary account lockout (15 minutes) |
| 4 | Password reset link validity: 24 hours |
| 5 | Sensitive actions (e.g., bank detail changes) must require re-authentication or OTP |
| 6 | User sessions must be invalidated on password change |

## 7. Accessibility
> Rules ensuring usability for all users including those with disabilities.

| # | Suggested Rule |
|---|---------------|
| 1 | Color contrast ratio must meet WCAG AA standard (minimum 4.5:1 for normal text) |
| 2 | All interactive elements must be keyboard-navigable (Tab/Shift+Tab) |
| 3 | Form fields must have associated labels (visible or aria-label) |
| 4 | Images must have descriptive alt text |
| 5 | Focus indicators must be visible on all interactive elements |
| 6 | Error messages must be associated with their form fields via aria-describedby |

## 8. Pagination & Lists
> Rules for collections, tables, and paginated data.

| # | Suggested Rule |
|---|---------------|
| 1 | Default page size: 20 items per page |
| 2 | Available page sizes: 10, 20, 50, 100 |
| 3 | Default sort order: newest first (created date descending) |
| 4 | Pagination must display: current page, total pages, total items count |
| 5 | Empty list state must display descriptive message with suggested action |
| 6 | Table columns with long text must truncate with ellipsis and tooltip on hover |
| 7 | Search/filter results must preserve pagination state |

## 9. Notifications
> System-generated notifications and communication.

| # | Suggested Rule |
|---|---------------|
| 1 | Email notifications must use consistent branded template |
| 2 | Transactional emails (order confirmation, password reset) must be sent immediately |
| 3 | Marketing/promotional notifications must support opt-out/unsubscribe |
| 4 | In-app notifications must persist until read; show unread count badge |
| 5 | Failed notification delivery must retry up to 3 times with exponential backoff |
| 6 | Notification content must not expose sensitive data (passwords, full account numbers) |

## 10. Approval & Workflow
> Multi-step approval processes and status workflows.

| # | Suggested Rule |
|---|---------------|
| 1 | All approval/rejection actions must include mandatory remarks/reason field |
| 2 | Approval actions must be logged with timestamp, actor, and remarks |
| 3 | Rejected items must display rejection reason to the submitter |
| 4 | Status transitions must follow defined state machine — no skipping intermediate states |
| 5 | Bulk approval/rejection must apply same remarks to all selected items |
| 6 | Items pending approval must be visually distinguished (badge, icon, or highlight) |
