import argparse
import io
import re
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')


def parse_table(lines):
    table_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('|') and '---' not in stripped:
            table_lines.append(stripped)

    if not table_lines:
        print("Lỗi: Không tìm thấy bảng pipe trong file.", file=sys.stderr)
        sys.exit(1)

    header = table_lines[0]
    col_names = [c.strip().lower() for c in header.split('|')]
    data_lines = table_lines[1:]

    modules = []
    last_module_name = ""
    last_feature_name = ""

    for line in data_lines:
        parts = [p.strip() for p in line.split('|')]
        if len(parts) < 5:
            continue

        col1 = parts[1]  # STT / UC ID
        col2 = parts[2]  # Danh mục (module)
        col3 = parts[3]  # Nhóm chức năng (feature)
        col4 = parts[4]  # Chức năng chính (function)

        if not col1:
            continue
        if col1.startswith('Ưu tiên') or col1.startswith('Cancel') or col1.startswith('Out-of-scope'):
            continue

        if col2:
            last_module_name = col2.upper()
        if col3:
            last_feature_name = col3.strip()
            if last_feature_name:
                last_feature_name = last_feature_name[0].upper() + last_feature_name[1:]

        function_name = col4
        if not function_name:
            continue

        mod = next((m for m in modules if m['name'] == last_module_name), None)
        if not mod:
            mod = {'id': str(len(modules) + 1), 'name': last_module_name, 'features': []}
            modules.append(mod)

        feat = next((f for f in mod['features'] if f['name'] == last_feature_name), None)
        if not feat:
            feat_id = f"{mod['id']}.{len(mod['features']) + 1}"
            feat = {'id': feat_id, 'name': last_feature_name, 'functions': []}
            mod['features'].append(feat)

        func_id = f"{feat['id']}.{len(feat['functions']) + 1}"
        feat['functions'].append({'id': func_id, 'name': function_name})

    return modules


def build_tree(modules, system_name):
    out = []
    out.append(f"# Phân rã chức năng - {system_name}\n")
    out.append(f"> Nguồn: file markdown (bảng pipe)")
    out.append(f"> Ngày tạo: auto-generated\n")
    out.append("```")
    out.append(system_name.upper())

    total_modules = len(modules)
    total_features = sum(len(m['features']) for m in modules)
    total_funcs = sum(len(f['functions']) for m in modules for f in m['features'])

    for m_idx, mod in enumerate(modules):
        is_last_mod = m_idx == total_modules - 1
        mod_branch = "└── " if is_last_mod else "├── "
        mod_cont = "    " if is_last_mod else "│   "
        out.append(f"{mod_branch}{mod['id']}. {mod['name']}")

        for f_idx, feat in enumerate(mod['features']):
            is_last_feat = f_idx == len(mod['features']) - 1
            feat_branch = "└── " if is_last_feat else "├── "
            feat_cont = "    " if is_last_feat else "│   "
            out.append(f"{mod_cont}{feat_branch}{feat['id']} {feat['name']}")

            for func_idx, func in enumerate(feat['functions']):
                is_last_func = func_idx == len(feat['functions']) - 1
                func_branch = "└── " if is_last_func else "├── "
                out.append(f"{mod_cont}{feat_cont}{func_branch}{func['id']} {func['name']}")

    out.append("```")
    return '\n'.join(out), total_modules, total_features, total_funcs


def detect_system_name(lines):
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('# '):
            return stripped[2:].strip()
    return "Hệ thống"


def main():
    parser = argparse.ArgumentParser(description='Parse MD pipe table to feature tree')
    parser.add_argument('--input', required=True, help='Input markdown file with pipe table')
    parser.add_argument('--output', default='docs/feature_list.md', help='Output feature list file')
    parser.add_argument('--name', default=None, help='System name (auto-detect from header if omitted)')
    args = parser.parse_args()

    with open(args.input, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    system_name = args.name or detect_system_name(lines)
    modules = parse_table(lines)

    if not modules:
        print("Lỗi: Không parse được module nào từ file.", file=sys.stderr)
        sys.exit(1)

    tree_md, n_mod, n_feat, n_func = build_tree(modules, system_name)

    with open(args.output, 'w', encoding='utf-8') as f:
        f.write(tree_md)

    print(f"Tổng: {n_mod} modules, {n_feat} nhóm chức năng, {n_func} chức năng chi tiết")
    print(f"File: {args.output}")


if __name__ == '__main__':
    main()
