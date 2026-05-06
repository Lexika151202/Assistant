---
description: "Pipeline tự động: planner → scanner → generator, lặp cho đến hết features. Ví dụ: /pipeline hoặc /pipeline --module 2 hoặc /pipeline --feature 2.4 hoặc /pipeline --parallel --module 2"
---

## Input (parse từ $ARGUMENTS)

- Không có argument → xử lý feature tiếp theo theo logic planner
- `--module <moduleId>` → chỉ xử lý features trong module đó
- `--feature <featureId>` → chỉ xử lý 1 feature cụ thể (skip planner)
- `--scan-only` → chỉ scan, không gen
- `--gen-only` → chỉ gen (feature đã scan), không scan
- `--parallel` → kích hoạt parallel mode (yêu cầu `--module`)

## Luồng xử lý chính

**Nếu có `--parallel`**: chuyển sang [Luồng Parallel](#luồng-parallel-mode) bên dưới.

**Nếu không**: chạy tuần tự:

```
START
  ↓
[1. PLAN] → Agent(planner) → xác định feature tiếp theo
  ↓
[2. SCAN] → Agent(scanner) → scan Figma deep metadata + content_map, ghi YAML
  ↓
[3. GEN]  → Agent(generator) → gen code .tsx + self-check + tsc
  ↓         ↺ nếu needs_next_batch → gọi lại generator
[4. DONE] → Báo cáo kết quả cho user
  ↓
Lặp lại từ bước 1 (nếu user đồng ý)
```

## Bước 1 — PLAN

**Nếu có `--feature`**: bỏ qua planner, dùng trực tiếp featureId.

**Nếu không**: Gọi Agent(planner):

```
Prompt: "Đọc figma-to-code-plan.yaml và docs/feature_list.md.
Xác định feature tiếp theo cần xử lý.
[Nếu --module]: chỉ xét features trong module {moduleId}.
Trả về PLAN_STATUS format."
```

Đọc kết quả:
- `action: complete` → BÁO CÁO tổng, KẾT THÚC pipeline
- `action: scan` → chuyển sang bước 2 (SCAN)
- `action: gen` → skip bước 2, chuyển sang bước 3 (GEN)

## Bước 2 — SCAN

Gọi Agent(scanner):

```
Prompt: "Scan feature {featureId} — {featureName}.
Figma section: {figmaSectionId}.
Đọc plan YAML, gọi get_metadata DEEP (2-3 cấp), trích xuất content_map.
Sau khi xác định functions, NHÓM chúng thành screens dựa trên figma_nodes chung.
Mỗi screen = 1 Figma frame/view thực tế. Functions không có frame riêng (chỉ thêm mode/action) → map vào screen chứa hành vi đó.
Merge content_map per screen. Ghi screens[] vào plan YAML.
Trả về SCAN_RESULT format."
```

Nếu scanner báo section quá lớn (>8 nodes) → báo user, hỏi có tiếp không.

## Bước 3 — GEN

Gọi Agent(generator):

```
Prompt: "Gen code React Web cho feature {featureId}.
Đọc plan YAML. Nếu feature có screens[] → dùng screen-based flow:
  - Lấy screens có status: scanned
  - Với mỗi screen: gọi get_design_context 1 lần (hoặc split nếu tall_screen)
  - Gen 1 file .tsx per screen, bám sát design
  - Self-check merged content_map, chạy tsc --noEmit, cập nhật plan
Nếu feature chỉ có functions[] (legacy) → dùng function-based flow:
  - Lấy functions có status: scanned
  - Với mỗi function: gọi get_design_context, gen file, self-check, tsc
Trả về GEN_RESULT format."
```

Nếu generator trả về `needs_next_batch: true`:
→ Gọi lại Agent(generator) cho cùng feature:
```
Prompt: "Tiếp tục gen code cho feature {featureId}.
Đọc plan YAML, lấy screens/functions còn status: scanned (batch tiếp).
Trả về GEN_RESULT format."
```
→ Lặp tối đa 3 batch.

## Bước 4 — DONE

Báo cáo kết quả cho user:

### Thành công (generator báo status: done + tsc pass)
```
✓ Feature {featureId} — {featureName}
  Screens: N screens (covering M functions)
  Gen: N files created
  TSC: PASS
  Self-check: K/K content items verified

Tiếp tục feature tiếp theo? (planner sẽ xác định)
```

### Có vấn đề (tsc lỗi hoặc content_map thiếu)
```
⚠ Feature {featureId} — {featureName}
  Gen: N/M screens created
  Issues:
  {issue_details từ generator}

User tự review và sửa. Sau khi xong: /pipeline --feature {featureId} --gen-only
```

---

## Luồng Parallel Mode

Khi có `--parallel --module <moduleId>`:

```
START
  ↓
[1. PLAN MODULE] → Agent(planner) → trả PLAN_MODULE (toàn bộ features trong module)
  ↓
[2. SCAN ALL]    → Tuần tự scan từng feature (tích lũy shared components)
  ↓                Scanner F1 → ghi YAML → Scanner F2 → ghi YAML → ...
[3. GEN //]      → Spawn N Agent(generator) song song (tối đa 3/batch)
  ↓                Generator A: gen F1 | Generator B: gen F2 | Generator C: gen F3
[4. COLLECT]     → Nhận GEN_RESULT từ mỗi generator
  ↓
[5. WRITE YAML]  → Pipeline ghi tập trung (cập nhật status + file_paths)
  ↓
[6. REPORT]      → Báo cáo tổng hợp, hỏi tiếp batch tiếp?
```

### Bước P1 — PLAN MODULE

Gọi Agent(planner):

```
Prompt: "Quét module {moduleId}. mode: module_scan.
Đọc figma-to-code-plan.yaml và docs/feature_list.md.
Trả PLAN_MODULE format — danh sách features_to_scan và features_to_gen."
```

Đọc kết quả:
- Nếu cả 2 list rỗng → module hoàn thành, KẾT THÚC
- Nếu có features thiếu `figma_section` → hỏi user cung cấp nodeId

### Bước P2 — SCAN ALL (tuần tự)

Với mỗi feature trong `features_to_scan` (theo thứ tự):

```
Gọi Agent(scanner):
"Scan feature {featureId} — {featureName}.
 Figma section: {figmaSectionId}.
 Đọc plan YAML, gọi get_metadata DEEP, trích xuất content_map.
 Nhóm functions thành screens. Ghi screens[] vào plan YAML."
```

Chờ xong → scanner ghi YAML → feature tiếp theo đọc được shared_nodes.
Nếu scanner báo section quá lớn → hỏi user, có thể skip feature đó.

### Bước P3 — GEN SONG SONG

Gộp danh sách:
- `features_to_gen` (từ planner — đã scan trước đó)
- Features vừa scan xong (từ bước P2)
= `all_features_ready_for_gen`

Chia batch: tối đa 3 features/batch.

```
Batch 1: spawn song song 3 Agent(generator):
  Agent(generator, "Gen feature X.1. PARALLEL_MODE: true.
    Đọc plan YAML, gen per-screen, self-check, tsc. Trả GEN_RESULT với yaml_updates.")
  Agent(generator, "Gen feature X.2. PARALLEL_MODE: true. ...")
  Agent(generator, "Gen feature X.3. PARALLEL_MODE: true. ...")
```

Tất cả Agent() calls trong cùng 1 message → chạy song song.

### Bước P4 — COLLECT + WRITE YAML

Nhận GEN_RESULT từ mỗi generator. Với mỗi result:
- Đọc `yaml_updates.screens_done` → Edit YAML: cập nhật screen status → done, ghi file_path
- Nếu tất cả screens done → cập nhật feature status → done
- Nếu còn screens chưa gen → feature status → partial
- Nếu error → log lỗi, giữ status hiện tại

Pipeline ghi YAML tuần tự (1 feature/lần) → không conflict.

### Bước P5 — REPORT + NEXT BATCH

Báo cáo batch gen vừa xong.
Nếu `all_features_ready_for_gen` còn features chưa xử lý:
→ Hỏi user tiếp tục batch tiếp?
→ Có: quay lại bước P3 với 3 features tiếp theo
→ Không: kết thúc

### Giới hạn parallel mode
- Scan: tuần tự, tối đa **5 features/session**
- Gen: tối đa **3 generators/batch**, tối đa **2 batches/session** (6 features gen)
- Mỗi generator tối đa **5 screens/feature**

### Báo cáo cuối session (parallel)

```
═══ PARALLEL PIPELINE SUMMARY ═══
Module: X — {moduleName}

Phase SCAN (tuần tự):
  ✓ Scanned N features (tích lũy K shared components)

Phase GEN (song song):
  Batch 1:
    ✓ Feature X.1 — Name1 → done (2 screens, 5 functions, TSC pass)
    ✓ Feature X.2 — Name2 → done (1 screen, 3 functions, TSC pass)
    ⚠ Feature X.3 — Name3 → partial (1/3 screens, tsc 2 warnings)
  Batch 2:
    ✓ Feature X.4 — Name4 → done (2 screens, 6 functions, TSC pass)

Progress: M/N features done | Next: /pipeline --parallel --module X
```

---

## Giới hạn 1 session (mode tuần tự)

- Tối đa **3 feature cycles** mỗi session (scan+gen = 1 cycle)
- Sau 3 cycles → báo cáo tổng, đề nghị chạy session mới cho batch tiếp
- Lý do: tránh context cha tích lũy quá nặng (mỗi cycle ~3-5K summary)

## Báo cáo cuối session

```
═══ PIPELINE SUMMARY ═══
Features processed: N
  ✓ Feature 2.4 — Phản ánh kiến nghị → done (2 screens, 3 functions, TSC pass)
  ✓ Feature 2.6 — Tin tức → partial (1/3 screens done)
  ⚠ Feature 2.7 — Xúc tiến đầu tư → done (2 tsc warnings, user review)

Next: Chạy /pipeline để tiếp tục từ feature tiếp theo.
```

## Lưu ý quan trọng

- Mỗi Agent() call = **subagent với context riêng** — không chia sẻ context với nhau
- Giao tiếp giữa các agent qua **figma-to-code-plan.yaml** — source of truth duy nhất
- Session cha (pipeline) chỉ đọc summary từ agent, KHÔNG đọc chi tiết code
- Nếu user muốn can thiệp giữa chừng → dừng và chờ input
