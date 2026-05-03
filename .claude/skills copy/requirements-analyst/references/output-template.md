# Output Templates

Three files are always generated together in `docs/ba/`.

---

## File 1: `docs/ba/requirement-traceability.md`

```markdown
# Requirement Traceability Matrix

> Generated: {DATE}
> Source files: {FILE_LIST}
> Business Processes: [business-processes.md](./business-processes.md)
> QA Backlog: [question-backlog.md](./question-backlog.md)

---

## 1. Business Requirements

| ID | Actor | Capability | Source |
|----|-------|-----------|--------|
| BR-001 | Admin | Manage customer accounts | prd.md §2.1 |
| BR-002 | User | Add items to cart and place order | prd.md §3.2 |

---

## 2. Business Rules

| ID | Domain | Rule | Source |
|----|--------|------|--------|
| RULE-001 | Finance | Commission = sale_price × vendor_rate | prd.md §5.1 |
| RULE-002 | Vendor | Vendor must complete EKYB before listing products | prd.md §4.3 |

---

## 3. Stakeholders & Personas

| Stakeholder | Role | Key Characteristics | Goals |
|-------------|------|-------------------|-------|
| Admin | Platform operator | Full system access, manages users/vendors | Oversee platform health, resolve disputes |
| Vendor | Merchant | Sells products, manages inventory | Maximize sales, comply with platform rules |
| User / Customer | End buyer | Browses, buys, tracks orders | Convenient shopping, reliable delivery |
```

---

## File 2: `docs/ba/business-processes.md`

```markdown
# Business Processes

> Generated: {DATE}
> Source files: {FILE_LIST}
> Traceability Matrix: [requirement-traceability.md](./requirement-traceability.md)
> QA Backlog: [question-backlog.md](./question-backlog.md)

Each section covers one business-objective-level process.
Only processes explicitly described or clearly implied in source documents are included.

---

## BP-001: Vendor Onboarding

**Objective:** Enable a new vendor to register, complete verification, and start listing products.
**Actors:** Vendor, Admin, System
**Source:** prd.md §4.1–4.3

### Activity Flow

```mermaid
flowchart TD
    A([Vendor submits registration]) --> B[System validates form]
    B --> C{Valid?}
    C -- No --> D[Return errors to Vendor]
    D --> A
    C -- Yes --> E[System creates pending account]
    E --> F[Vendor submits EKYB documents]
    F --> G[Admin reviews EKYB]
    G --> H{Approved?}
    H -- No --> I[Admin rejects with reason]
    I --> J([Vendor notified — resubmit or appeal])
    H -- Yes --> K[Admin activates vendor account]
    K --> L([Vendor can list products])
\```

### Activity Detail

| Step | Actor | Description | Business Rule | Notes |
|------|-------|-------------|---------------|-------|
| Submit registration | Vendor | Fill in company name, contact, category | RULE-002 | All fields mandatory |
| Validate form | System | Check required fields, email format | COMMON-001 | Return inline errors |
| Submit EKYB | Vendor | Upload business registration certificate + ID | RULE-002 | PDF/JPG ≤ 5MB |
| Review EKYB | Admin | Manually verify documents within SLA | — | SLA not defined in source → QA-004 |
| Activate account | Admin | Set vendor status to Active | — | Triggers welcome email |

---

### Vendor Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Pending : Registration submitted
    Pending --> UnderReview : EKYB documents submitted
    UnderReview --> Active : Admin approves
    UnderReview --> Rejected : Admin rejects
    Rejected --> UnderReview : Vendor resubmits
    Active --> Suspended : Admin suspends
    Suspended --> Active : Admin reinstates
    Active --> [*] : Account closed
\```

### State Detail

| State | Description | Entry Condition | Exit Condition |
|-------|-------------|----------------|----------------|
| Pending | Account created, EKYB not yet submitted | Registration validated | EKYB documents uploaded |
| Under Review | EKYB submitted, awaiting admin decision | Documents uploaded | Admin approves or rejects |
| Active | Vendor can list products and receive orders | Admin approves EKYB | Suspended or closed |
| Rejected | EKYB failed verification | Admin rejects | Vendor resubmits documents |
| Suspended | Account frozen by admin | Admin action | Admin reinstates |

---

## BP-002: Payment Settlement

**Objective:** Distribute collected order payments to vendors after platform commission deduction.
**Actors:** System, Finance Admin, Vendor
**Source:** prd.md §5.1–5.3

### Activity Flow

```mermaid
flowchart TD
    A([Order delivered & confirmed]) --> B[System calculates vendor payout]
    B --> C[Apply commission: payout = sale_price × 1 - rate]
    C --> D[System queues settlement record]
    D --> E[Finance Admin reviews settlement batch]
    E --> F{Approve?}
    F -- No --> G[Finance Admin flags for investigation]
    G --> H([Investigation resolved])
    H --> E
    F -- Yes --> I[System initiates bank transfer]
    I --> J{Transfer success?}
    J -- No --> K[System retries / alerts Finance Admin]
    J -- Yes --> L([Vendor receives payout — notified])
\```

### Activity Detail

| Step | Actor | Description | Business Rule | Notes |
|------|-------|-------------|---------------|-------|
| Calculate payout | System | sale_price × (1 − commission_rate) | RULE-001 | Rate per vendor or global? → QA-002 |
| Queue settlement | System | Aggregate orders within settlement period | — | Settlement period not defined → QA-005 |
| Review batch | Finance Admin | Spot-check payout amounts | — | — |
| Initiate transfer | System | Bank transfer to vendor's registered account | — | Retry count not defined → QA-006 |
| Notify vendor | System | Send payout confirmation with breakdown | — | — |
```

---

## File 3: `docs/ba/question-backlog.md`

```markdown
# Question Backlog

> Generated: {DATE}
> Source files: {FILE_LIST}
> Traceability Matrix: [requirement-traceability.md](./requirement-traceability.md)
> Business Processes: [business-processes.md](./business-processes.md)

Questions grounded in gaps/ambiguities found in source documents.
Do NOT add questions without a clear source reference.

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| QA-001 | H | BR-005 | What triggers an order cancellation — user only, or also admin/vendor? | Affects workflow logic and notification design | Open |
| QA-002 | M | RULE-001 | Is commission rate fixed platform-wide or configurable per vendor? | Impacts data model and calculation engine | Open |
| QA-003 | L | COMMON-002 | Should foreign currency display be supported for international users? | Scope boundary for i18n | Open |

Priority: H = High (blocks design), M = Medium (affects scope), L = Low (nice to know)
Status: Open | Answered | Deferred

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date |
|----|----------|-----|----------|--------|-------------|------|
```
