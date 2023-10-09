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

# 分割と統治 (Divide and Conquer)

大きな問題はいくつかの小さな問題に分割して解決していく

---

## 大きな問題をそのまま解決できる人はいない

![vertical bg 100% right:23%](https://3.bp.blogspot.com/-3OcwLnav84Y/WQvu99az5tI/AAAAAAABEDM/nfjpY6Gcewkae2OCnKBu2-s40FS37rN1ACLcB/s800/figure_ningenkankei_fukuzatsu.png)

解決できない大きな問題があったとしても、それは解決可能な小さい問題の寄せ集めでしかない。

* 大きな問題をそのまま解決しようとしても、遅れるか解決できない
    * 問題が複雑になっていて掌上に乗らない
    * 誰だって同じ

---
## 大きな問題は小さな問題の寄せ集め

どんなに複雑な問題も、解決可能な小さい問題に分割できる

* `システム → ドメイン → 機能 → モジュール → 関数 → コード → ...`
* **山も崩せば塵となる**

解決した小さな問題を再び組み上げれば、解決した大きな問題が出来上がる

* `コード → 関数 → モジュール → 機能 → ドメイン → システム(完成!)`
* **塵も積もれば山となる**

![bg 100% blur:2px opacity:0.3](https://kroki.io/mermaid/svg/eNpLy8kvT85ILCpRCHHhUlBwjH6xpP3l7ImPG1c9ndr_cmFPrIKurp2TocaTHWufr-h-umvZ48Z1EBlNkHKwrBFeWWMcsk6GIGkFZ0ONF8sXP9u462n_-hfNe-EWIysxwqPECKLEmLASEzxKjCFKTHErcYa4xQVbUDxq2A3R92xHB1itEQlqIVa7GBGj1gSqFsQ2hbCNidDnAnG7qwZa5GKog7jbFcSEOMsVAEfvDgE=)


---
