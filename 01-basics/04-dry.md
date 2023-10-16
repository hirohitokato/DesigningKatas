---
marp: true
---
<!-- 
size: 16:9
paginate: true
style: |
  /* 三重引用を脚注の記号に転用 */
  blockquote > blockquote > blockquote {
    font-size: 55%;
    font-weight: 400;
    padding: 0;
    margin: 0;
    border: 0;
    border-top: 0.1em dashed #555;
    position: absolute;
    bottom: 70px;
    left: 70px;
  }
-->
<!-- header: 勉強会#-->
<script type="module">
  // Mermaidを使えるようにするおまじない
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

# DRY (Don't Repeat Yourself)

---

## Don't Repeat Yourself

Andy Hunt と Dave Thomas の著書『The Pragmatic Programmer$^1$』による言葉。

コードだけでなくデータ構造、テスト計画、ビルドシステム、ドキュメントなどでも適用される

> _"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system"_  
> 「すべての知識はシステムの中で、単一で、あいまいでもなく、信頼できる表現を持っていなければならない」

>>> 邦題『達人プログラマー』村上雅章訳、オーム社。なお『達人プログラマー（第2版）熟達に向けたあなたの旅』 も2020年に刊行されている

---

## DRY example 1

```python
if x == 0:
    y = "zero"
elif x == 1:
    y = "one"
elif x == 2:
    y = "two"
elif x == 3:
    y = "three"
elif x == 4:
    y = "four"
    :
```
↓
```py
numbers = ["zero", "one", "two", "three", "four", ...]
y = numbers[x]
```

---

## DRY example 2

```py
def funcA(…):
    # ある処理

def funcAA(…):
    # funcAによく似た処理

def funcAB(…):
    # funcAによく似た処理
```
↓
```py
def funcA(…, …):
    # 同じ処理をまとめたもの
```

---

## DRYにすべきではないケース

* 似た関数でも、ある変更が他には関係しないケースがある場合
    * ドメインが異なる処理の共通化
    * レイヤーの異なる処理の共通化

やりすぎると密結合になり、かえってメンテナンスしにくい処理になってしまう