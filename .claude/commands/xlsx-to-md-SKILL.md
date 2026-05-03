---
name: xlsx-to-md
description: >
  Convert Excel (.xlsx) files to Markdown tables. Use this skill whenever the user wants to:
  - Convert an Excel file to Markdown format
  - Export spreadsheet data as a Markdown table
  - Turn an .xlsx file into a .md file
  - Re-use or share Excel content in Markdown
  Always use this skill when the user uploads an .xlsx file and asks for a Markdown output,
  even if phrased casually (e.g. "chuyển file này sang md", "export ra markdown", "tạo file md từ excel").
  This skill handles multi-sheet workbooks — each sheet becomes a separate section.
---

# XLSX → Markdown Skill

Convert one or more sheets from an Excel workbook into clean, complete Markdown tables, preserving all cell content including multi-line text.

---

## Workflow

1. **Parse the file path** from the user's argument (absolute or relative to working directory)
2. **Auto-install dependencies** if missing (`pandas`, `openpyxl`)
3. **Run the conversion script** (see below)
4. **Save output** to the same directory as input, same base name with `.md` extension
5. **Report summary** — number of sheets, rows per sheet, output path

---

## Conversion Script

Run this Python script inline via Bash tool. Replace `INPUT_PATH` and `OUTPUT_PATH` with actual paths.

```python
import subprocess, sys, os

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Auto-install dependencies
for pkg in ['pandas', 'openpyxl']:
    try:
        __import__(pkg)
    except ImportError:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', pkg, '-q'])

import pandas as pd

input_path  = r'INPUT_PATH'
output_path = r'OUTPUT_PATH'

all_sheets = pd.read_excel(input_path, sheet_name=None, header=None, engine='openpyxl')

md_parts = []

for sheet_name, df in all_sheets.items():
    # Drop fully empty rows and columns
    df = df.dropna(how='all').dropna(axis=1, how='all').reset_index(drop=True)

    if df.empty:
        md_parts.append(f'\n# Sheet: {sheet_name}\n\n*(Không có dữ liệu)*\n')
        continue

    # Auto-detect header: use first row as header if majority of non-null cells are strings
    first_row = df.iloc[0]
    non_null = first_row.dropna()
    str_ratio = non_null.apply(lambda x: isinstance(x, str)).sum() / max(len(non_null), 1)
    if len(non_null) > 0 and str_ratio >= 0.5:
        headers = [str(v).strip() if pd.notna(v) else '' for v in first_row]
        df = df.iloc[1:].reset_index(drop=True)

        # Detect merged-header sub-row: if next row is mostly empty but fills gaps in header
        if len(df) > 0:
            sub_row = df.iloc[0]
            sub_non_null = sub_row.dropna()
            main_empty = sum(1 for h in headers if h == '')
            if len(sub_non_null) > 0 and sub_non_null.apply(lambda x: isinstance(x, str)).all():
                sub_fills_gaps = sum(1 for i, v in enumerate(sub_row) if pd.notna(v) and headers[i] == '')
                sub_null_count = sub_row.isna().sum()
                if sub_null_count >= len(sub_row) * 0.5:
                    for i, v in enumerate(sub_row):
                        if pd.notna(v):
                            sv = str(v).strip()
                            if headers[i] == '':
                                headers[i] = sv
                            else:
                                headers[i] = f'{headers[i]} - {sv}'
                    df = df.iloc[1:].reset_index(drop=True)

        df.columns = headers

    # Vectorized clean: escape pipes, replace newlines
    def clean_series(col):
        s = col.fillna('').astype(str).str.strip()
        s = s.str.replace('|', r'\|', regex=False)
        s = s.str.replace('\n', '<br>', regex=False)
        s = s.str.replace('\r', '', regex=False)
        return s

    header_names = [str(c).replace('|', r'\|').replace('\n', '<br>').strip() for c in df.columns]
    header_line = '| ' + ' | '.join(header_names) + ' |'
    sep_line = '| ' + ' | '.join(['---'] * len(df.columns)) + ' |'

    # Build all rows at once using vectorized ops
    cleaned_df = df.apply(clean_series)
    rows = cleaned_df.apply(lambda row: '| ' + ' | '.join(row) + ' |', axis=1)

    md_parts.append(f'\n# Sheet: {sheet_name}\n')
    md_parts.append(header_line)
    md_parts.append(sep_line)
    md_parts.append('\n'.join(rows))
    md_parts.append('')

with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_parts))

# Summary
total_rows = 0
for name, df in all_sheets.items():
    df_clean = df.dropna(how='all').dropna(axis=1, how='all')
    n = max(0, len(df_clean) - 1)  # subtract header row
    total_rows += n
    print(f'  - {name}: {n} rows, {len(df_clean.columns)} cols')
print(f'Done! {len(all_sheets)} sheet(s), {total_rows} total rows -> {output_path}')
```

---

## Key Decisions & Edge Cases

| Situation | Handling |
|---|---|
| Header detection | Auto-detect: if ≥50% of non-null cells in first row are strings, treat as header |
| Fully empty rows | Dropped |
| Fully empty columns | Dropped |
| Multi-line cell content | Newlines → `<br>` |
| Pipe `\|` in cells | Escaped as `\|` |
| Empty cell | Empty string |
| Multiple sheets | Each sheet → `# Sheet: <name>` section |
| Numeric/date values | Converted via `str()` |
| Missing pandas/openpyxl | Auto-installed at runtime |

---

## Output Naming Convention

Output file is saved in the **same directory** as the input file, with `.md` extension:

| Input | Output |
|---|---|
| `docs/Report.xlsx` | `docs/Report.md` |
| `docs/Trạm Y Tế _ HIS - WBS.xlsx` | `docs/Trạm Y Tế _ HIS - WBS.md` |

---

## Notes

- Paths come from the user's argument — use as-is (absolute) or resolve relative to working directory
- No `present_files` — this runs in Claude Code CLI, just report the output path
- Uses vectorized pandas string ops instead of `iterrows()` for performance
- Auto-installs dependencies silently if missing
