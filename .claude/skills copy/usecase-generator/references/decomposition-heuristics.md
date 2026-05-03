# Decomposition Heuristics

Rules for breaking business processes into atomic, sub-feature-level use cases.

## Core Principle

Each UC = **one actor, one goal, one trigger**. A UC is atomic when it cannot be split further without losing functional coherence. It should be small enough to describe as a single screen or interaction, but complete enough to represent a meaningful sub-feature.

## Heuristic 1: CRUD Decomposition

If a BP manages an entity (vendor, product, order), extract standard CRUD operations:

| Operation | UC Name Pattern | Example |
|-----------|----------------|---------|
| Create | Create {Entity} | Create Product Listing |
| View List | View {Entity} List | View Product List |
| View Detail | View {Entity} Detail | View Product Detail |
| Update | Edit {Entity} | Edit Product Listing |
| Delete/Archive | Archive/Deactivate {Entity} | Archive Product |

Not every entity needs all 5. Only create UCs that are explicitly supported by the BP's activity flow or implied by BRs.

## Heuristic 2: State Transition = UC

Each state transition in a lifecycle diagram = potential UC:

| Lifecycle Pattern | Extracted UCs |
|-------------------|---------------|
| Pending → Approved | Approve {Entity} |
| Pending → Rejected | Reject {Entity} |
| Approved → Suspended | Suspend {Entity} |
| Suspended → Approved | Reinstate {Entity} |
| Draft → Submitted | Submit {Entity} for Approval |

Combine transitions if they share the same screen/action (e.g., "Approve/Reject Vendor" if decision is on the same review screen). But if the pre-conditions or post-conditions differ significantly, keep separate.

## Heuristic 3: Decision Point = UC

Each decision branch in an activity flow diagram = separate UC if:
- The branch has different actors
- The branch has significantly different post-conditions
- The branch triggers different downstream processes

If branches are simple same-screen options (approve/reject radio), combine into one UC with the decision in the description.

## Heuristic 4: System-Triggered Actions

Automated actions are separate UCs:

| Pattern | UC Example |
|---------|------------|
| Scheduled job | Process Scheduled Settlement |
| Auto-transition after timer | Auto-Complete Order After Return Window |
| Threshold-based trigger | Send Low Stock Alert |
| Abandoned flow recovery | Send Abandoned Cart Email |

These UCs have "System" as actor and a system event or schedule as trigger.

## Heuristic 5: Configuration Actions

Admin configuration of rules, limits, schedules = separate UCs:

| Pattern | UC Example |
|---------|------------|
| Set business rule | Configure Commission Rules |
| Set limits | Configure Pricing Governance |
| Manage lookup data | Manage Cancellation Reasons |
| Set schedule | Configure Settlement Schedule |

## Heuristic 6: Bulk Operations

Bulk variants of CRUD operations = separate UCs:

| Pattern | UC Example |
|---------|------------|
| CSV import | Bulk Import Products via CSV |
| CSV export | Export Product List to CSV |
| Batch processing | Process Settlement Batch |

## Heuristic 7: Screen = UC

View/detail screens that aggregate information and serve as a hub for actions:

- A screen UC describes what is displayed and lists available actions
- Each complex action links to its own UC via `→ UC-XXX`
- Simple actions (e.g., "copy ID") stay inline in the screen UC

**Example:**
- UC: "View Vendor Detail" — shows vendor profile, documents, status
  - Description: "Admin views vendor profile. Actions: Approve (→ UC-VOB-003), Suspend (→ UC-VOB-005)"

## Heuristic 8: Cross-Reference Rule

If a UC's description includes a button or action that:
- Has its own pre-conditions different from the current UC
- Has significant business rules governing it
- Could be triggered from multiple places

Then extract it as a separate UC and cross-reference with `→ UC-XXX`.

## Ordering Within Category

Order UCs within a category by logical flow:
1. Create/Submit operations first
2. View List and View Detail
3. Edit/Update operations
4. State change operations (approve, reject, suspend)
5. Configuration operations
6. Bulk/batch operations
7. System-triggered/automated operations

## Naming Conventions

Start UC names with imperative verbs:

| Verb | When to Use |
|------|-------------|
| Submit | User sends data for processing/review |
| Create | User creates a new entity |
| View | User views information (list or detail) |
| Edit | User modifies existing entity |
| Upload | User uploads files/documents |
| Review | User (usually Admin) evaluates submitted data |
| Approve / Reject | User makes accept/deny decision |
| Suspend / Reinstate | User changes entity active status |
| Configure | Admin sets rules, limits, schedules |
| Process | System performs automated calculation or action |
| Track | User monitors status/progress |
| Export / Import | Bulk data operations |
| Initiate | User starts a multi-step process (return, refund) |
| Send | System dispatches notification |
