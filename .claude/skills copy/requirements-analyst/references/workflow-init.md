# Workflow: Init Mode

> Full extraction from source documents → generate all three BA files.

## Step 1 — Identify Input Files

If user provides file paths as arguments, use those.
Otherwise, ask via `AskUserQuestion`:
- Which files to analyze (PDF, MD, DOCX, or directory)
- Project domain context (optional, to improve question quality)

## Step 2 — Ingest Documents

- **MD files:** Read directly with `Read` tool
- **PDF files:** Activate `ai-multimodal` skill → use Gemini to extract full text
- **DOCX files:** Activate `ai-multimodal` skill → use Gemini to extract full text
- Preserve all original wording; do NOT paraphrase during extraction

## Step 3 — Extract & Classify

From raw content, extract into these categories:

**Business Requirements (BR)**
High-level functional capabilities per stakeholder.
Format: `BR-NNN | Actor | Capability | Source ref`
Examples: "Admin can manage customer accounts", "User can place order via COD"

**Business Rules (RULE)**
Logic, formulas, constraints, validations governing the system.
Format: `RULE-NNN | Domain | Rule description | Source ref`
Examples: "Commission = sale_price × rate%", "Vendor must complete EKYB before listing"

**Stakeholders & Personas**
All actors mentioned or implied in the document.
Format: `| Stakeholder | Role | Key Characteristics | Goals |`

**Business Processes (BP)**
End-to-end business objectives described in the requirements — NOT UI flows or system flows.
A business process qualifies only when it represents a named business objective (e.g. "Vendor Onboarding", "Payment Settlement", "Product Listing Approval").
Each process gets:
- A Mermaid **activity diagram** (use `flowchart TD`) for sequential activity flows
- A Mermaid **state diagram** (use `stateDiagram-v2`) when the subject has lifecycle states (e.g. order status, vendor status)
- A markdown detail table describing each step/state/decision

Use diagram type decision:
- Activity flow (who does what, in what order) → `flowchart TD`
- Entity lifecycle (what states it passes through) → `stateDiagram-v2`
- Complex process with both → include both diagrams

**Question Backlog (QA)**
Gaps, ambiguities, or missing details found in source documents.
ONLY ask questions grounded in actual document gaps — never invent.
Format: `QA-NNN | Priority (H/M/L) | Section | Question | Why it matters`

## Step 4 — Clarify with User (if needed)

If there are high-priority ambiguities that block extraction accuracy, use `AskUserQuestion` to confirm before writing output. Keep questions minimal — max 3 per round.

## Step 5 — Generate Output

Write **three files** using templates in `references/output-template.md`:

1. `docs/ba/requirement-traceability.md` — BRs, Business Rules, Stakeholders
2. `docs/ba/business-processes.md` — one section per business process with Mermaid diagram(s) + detail table
3. `docs/ba/question-backlog.md` — all QA items with Open/Answered status tracking

Cross-link all three files (each header references the others).

Ensure:
- Only content from source docs — no invented information
- Every item has a source reference (file name + section/page)
- QA items reference specific BR/RULE/BP IDs or document sections
- Mermaid diagrams use valid v11 syntax (activate `mermaidjs-v11` skill if unsure)
- Tables are properly formatted markdown

## Step 6 — Report

Report to user:
- Files analyzed
- Counts: BR / RULE / Stakeholders / BP / QA items
- Paths of generated files
- Any items that need user confirmation
