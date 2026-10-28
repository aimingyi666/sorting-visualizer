"""分析组件文件中的 HTML 重复情况。

用法: python tools/analyze-duplication.py
"""
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COMPONENTS = ROOT / "src" / "components"


def extract_js_strings(text: str) -> str:
    """把 JS 源码里 '...' 单引号字符串的内容解出来（含 \\n \\x3c 等转义）。"""
    out = []
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        if ch in "'\"":
            quote = ch
            i += 1
            buf = []
            while i < n:
                c = text[i]
                if c == "\\" and i + 1 < n:
                    nxt = text[i + 1]
                    mapping = {"n": "\n", "t": "\t", "r": "\r", "\\": "\\", "'": "'", '"': '"'}
                    if nxt == "x" and i + 3 < n:
                        try:
                            buf.append(chr(int(text[i + 2 : i + 4], 16)))
                            i += 4
                            continue
                        except ValueError:
                            pass
                    if nxt == "u" and i + 5 < n:
                        try:
                            buf.append(chr(int(text[i + 2 : i + 6], 16)))
                            i += 6
                            continue
                        except ValueError:
                            pass
                    buf.append(mapping.get(nxt, nxt))
                    i += 2
                    continue
                if c == quote:
                    i += 1
                    break
                buf.append(c)
                i += 1
            out.append("".join(buf))
        else:
            i += 1
    return "\n".join(out)


def report(name: str) -> None:
    path = COMPONENTS / name
    if not path.exists():
        print(f"  [缺失] {path}")
        return
    raw = path.read_text(encoding="utf-8")
    html = extract_js_strings(raw)
    ids = re.findall(r'id="([^"]+)"', html)
    cnt = Counter(ids)
    dups = {k: v for k, v in cnt.items() if v > 1}
    print(f"--- {name} ---")
    print(f"  源码 {len(raw)} 字符 -> HTML {len(html)} 字符, id {len(ids)} 个 (唯一 {len(cnt)})")
    if dups:
        print(f"  重复 id {len(dups)} 个:")
        for k, v in sorted(dups.items(), key=lambda x: (-x[1], x[0])):
            print(f"    {k:<34} x{v}")
    else:
        print("  无重复 id")
    # 顶层区块
    blocks = re.findall(r'<(main|header|footer|section)\b[^>]*>', html)
    print(f"  顶层区块: {blocks}")
    print()


if __name__ == "__main__":
    targets = sys.argv[1:] or [
        "navbar.js",
        "footer.js",
        "control-panel.js",
        "explanation-section.js",
        "code-section.js",
        "document-exporter.js",
    ]
    for t in targets:
        report(t)
