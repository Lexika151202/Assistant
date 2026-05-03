# Extraction Heuristics

Rules for identifying entities, extracting attributes, deriving constraints, and mapping relationships from BA documents.

---

## 1. Entity Identification

Scan BA documents for entity candidates using these heuristics, in priority order:

### 1.1 State-Bearing Business Objects (Highest Priority)

Anything with a **status lifecycle** defined in `business-processes.md` is always an entity.

- Look for `stateDiagram-v2` blocks in BP sections
- The subject of the state machine = entity (e.g., Application, Ticket, Request, Document)
- **Signal words:** "status flow", "lifecycle", "state transitions"

### 1.2 Actors as Entities

Each human actor in the stakeholder table (`requirement-traceability.md` §3) is typically an entity.

- Identify all actor types from the stakeholder table
- Evaluate attribute overlap between actor types
- Example: Admin, Manager, Staff → may be roles on a single User entity

**Decision:** If multiple actors share the same core attributes (login, name, email), consolidate into one `User` entity with a `role` attribute. Create separate entities only when they have significantly different attribute sets (e.g., Employee vs Customer vs Supplier).

### 1.3 Transaction Objects

Nouns that appear in BP **activity flows** as things being created, processed, or tracked.

- **Signal patterns:** "System creates {X}", "User places {X}", "Actor submits {X}"
- Examples: Order, Invoice, Request, Ticket, Transaction, Claim, Application

### 1.4 Catalog/Configuration Objects

Things that Admin configures and that other entities reference.

- **Signal patterns:** "Admin configures {X}", "Admin manages {X}", "Admin defines {X}"
- Examples: Category, Department, Policy, Schedule, Template, Role, Permission

### 1.5 Content/Media Objects

Uploadable or created content referenced by other entities.

- **Signal patterns:** "uploads {X}", "images", "documents", "brochures"
- Examples: Attachment, Document, Photo, Report, Certificate

### 1.6 Junction/Association Objects

Implicit entities needed to represent N:M relationships or composite transactions.

- **Signal patterns:** memberships, enrollments, assignments, line items
- Examples: LineItem, Enrollment, Assignment, Membership, TagAssignment

### 1.7 Audit/Log Objects

System-generated records mentioned in RULEs about immutability and logging.

- **Signal words:** "logged immutably", "audit trail", "all actions logged"
- Examples: AuditLog, ActivityLog, ChangeHistory, SyncLog

---

## 2. Attribute Extraction

For each identified entity, extract attributes from these sources:

### 2.1 From BR Capability Text

BRs describe what actors can do with entities. Parse field lists from BR descriptions.

**Pattern:** "Create {entity} with **name, code, description, category, type, status, effective date**"
→ Each comma-separated item = candidate attribute for that entity.

### 2.2 From UC Descriptions

UC descriptions often list fields explicitly.

**Pattern:** "User fills {entity} details: **name, code, description, category, type, priority, due date, attachments**"
→ UC descriptions often provide more detailed attribute lists than BRs.

### 2.3 From UC Pre/Post-Conditions

State changes imply attributes.

**Pattern:** "{Entity} status = Approved" → `status` attribute on that entity
**Pattern:** "{Entity} status = Pending Review" → `status` attribute on that entity

### 2.4 From BP Activity Detail Tables

Each row's Description column often mentions specific fields.

**Pattern:** "Enter details; select type A or type B" → `type` attribute (Enum) on that entity

### 2.5 From RULE Constraints

Rules often imply attributes that must exist for the rule to apply.

**Pattern:** "PDF format; 5MB max per document" → implies `format` and `fileSize` constraints on a Document entity
**Pattern:** "Configurable window per category" → implies a duration/period attribute on that entity

### 2.6 From State Lifecycle Diagrams

Each state in a lifecycle = an enum value for the entity's `status` attribute.

**Pattern:** `[*] --> Pending --> Approved --> Suspended` → `status` enum with values: Pending, Approved, Rejected, Suspended

### 2.7 Standard Audit Attributes

Add standard tracking attributes to all entities unless explicitly excluded:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Unique identifier (system-generated) |
| createdAt | DateTime | Yes | Record creation timestamp |
| updatedAt | DateTime | Yes | Last modification timestamp |
| createdBy | String | No | User/system that created the record |
| updatedBy | String | No | User/system that last modified the record |

**Note:** Only include audit attributes in the output if the BA docs explicitly mention audit logging for that entity. Otherwise, omit them to keep the model focused on business attributes.

---

## 3. Type Mapping

Use BA-friendly types. These are conceptual types for BA review, NOT database column types.

| BA Concept | Type | Examples |
|-----------|------|----------|
| Name, title, label, code, identifier | String | fullName, projectCode |
| Description, content, remarks, notes, reason | Text | description, rejectionReason |
| Price, amount, rate, cost, fee, balance | Currency | unitPrice, totalAmount |
| Count, quantity, limit, max attempts, duration | Number | quantity, maxRetries |
| Percentage (rate, ratio, discount) | Percentage | taxRate, completionPercent |
| Yes/no flag, enabled/disabled, active/inactive | Boolean | isActive, isVerified |
| Date of birth, expiry date, effective date | Date | startDate, expiryDate |
| Created at, updated at, timestamp, logged at | DateTime | createdAt, approvedAt |
| Status, type, category selection, role, priority | Enum | status, priority, userRole |
| Email address | Email | email, contactEmail |
| Phone number | Phone | phone, mobileNumber |
| Website, link, endpoint, callback URL | URL | website, callbackUrl |
| Upload, document, certificate, import file | File | contract, importFile |
| Photo, logo, avatar, thumbnail | Image | avatar, thumbnail |
| Star rating (1-5), score | Rating | rating, satisfactionScore |
| Coordinates, address, region | Location | address, coordinates |
| Rich text, HTML content, formatted body | RichText | bodyContent, notes |
| Array of values, tags, multiple selections | List | tags, permissions |

---

## 4. Constraint Extraction

### 4.1 From RULE-NNN

Each business rule may constrain one or more entity attributes:

| Constraint Pattern | Example | Resulting Constraint |
|-------------------|---------|---------------------|
| Format restriction | "PDF format only" | format: PDF only |
| Size limit | "5MB max per file" | maxFileSize: 5MB |
| Required condition | "Field X mandatory before activation" | field: Required when status = Active |
| Lock after event | "Field editable during setup only" | field: Immutable after approval |
| Status flow | "Draft → Pending → Approved → Archived" | status: Enum values |
| Calculation formula | "Total = Quantity × UnitPrice" | totalAmount: Computed field |
| Priority/ordering | "Specific > General > Default" | priority: hierarchical override |
| Time window | "Configurable period per category" | windowDays: Number, per category |

### 4.2 From COMMON-NNN

Common rules provide cross-cutting constraints applicable to multiple entities:

Map each COMMON rule to the attribute types it constrains. The exact COMMON-NNN IDs and rules depend on the project's `common-rules.md`. Common patterns:

| Attribute Type | Typical COMMON Constraint |
|---------------|---------------------------|
| String | Max character length |
| Text | Max character length (longer) |
| Name | Specific max length for name fields |
| Description | Specific max length for description fields |
| Email | Email format validation (e.g., RFC 5322) |
| Phone | Phone format validation (e.g., E.164) |
| Currency | Decimal precision, symbol format |
| File | Max file size, accepted formats |
| Image | Max file size, accepted image formats |
| Password | Minimum length, complexity rules |

**How to apply:** Read the project's `common-rules.md`, identify rules that constrain attribute types, and map each COMMON-NNN to matching attributes across all entities.

### 4.3 Enum Value Extraction

Extract enum values from:
1. **State lifecycle diagrams** → status enums (e.g., Draft, Pending, Approved, Rejected, Archived)
2. **BR descriptions** → type/category enums (e.g., "Type A or Type B", "daily/weekly/monthly")
3. **RULE descriptions** → method/mode enums (e.g., "Method X, Method Y, Method Z")
4. **UC descriptions** → selection enums (e.g., "option 1 or option 2")

---

## 5. Relationship Derivation

### 5.1 From BP Activity Flows

- "System creates {child} for each {parent}" → Parent 1:N Child
- "Actor uploads documents" → Actor 1:N Document
- "System assigns {entity} to {owner}" → Owner 1:N Entity

### 5.2 From UC Cross-References

- UC cross-references (→ UC-XXX) indicate actions on the same entity or related entities
- UC descriptions mentioning foreign attributes ("category", "department") → Entity N:1 ReferencedEntity

### 5.3 From BR Descriptions

- "Actor may create sub-items" → Parent 1:N Child
- "Rule applies at multiple levels: specific > general > default" → Rule N:1 ScopeEntity (optional)

### 5.4 Cardinality Rules

| Pattern | Cardinality |
|---------|-------------|
| Entity A "has" or "owns" Entity B | A 1:N B |
| Entity A "belongs to" Entity B | A N:1 B |
| Entity A "has many" Entity B and B "has many" A | A N:M B (junction entity) |
| Entity A "is" Entity B (1-to-1 extension) | A 1:1 B |
| Entity "self-references" (parent/child) | Self 1:N |

---

## 6. Complexity Control

- **Maximum entities:** No hard limit, but aim for completeness over minimalism. Include every entity the BA docs explicitly describe.
- **Attribute completeness:** Include all attributes mentioned in BRs, UCs, and RULEs. Do NOT add speculative attributes.
- **Relationship completeness:** Include only relationships with explicit BA doc support. Do NOT infer relationships not described.
- **Avoid database thinking:** Do NOT add surrogate keys, indexes, junction table IDs, or technical columns unless the BA docs mention them.
