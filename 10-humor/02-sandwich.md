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

> 二人のテストエンジニアが、レストランで飲み物を注文した。
> そしてカバンからサンドイッチを出し、食べ始めた。
> 
> 「お客様、ご自分で持ち込んだサンドイッチを食べるのはご遠慮ください」
>
>　テストエンジニアは、サンドイッチを交換した。

_詠み人知らず([Software Testing Jokes](https://softwaretestingfundamentals.com/software-testing-jokes/#Sandwich)より)_