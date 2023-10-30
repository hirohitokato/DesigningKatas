---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会#-->
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

# 参照の一点性

_Single point of reference_

---

## 参照の一点性

変数を一度定義したら値を書き換えない。

```py
x = 193
 :
x = 4649 # NG.値を途中で書き換えない
 :
```
↓
```py
x = 193
 :
# xは通用範囲(スコープ)内で常に193
```

⇒ 値が変化することを考えなくて済む、見通しの良いコードになる