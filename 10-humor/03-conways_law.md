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

# コンウェイの法則
(Conway's law)

---

> 「システムを設計する組織は、そのコミュニケーション構造をそっくりまねた構造の設計を生み出してしまう」
>
> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.  
> — _Melvin E. Conway$^1$_

>>> 1: メルヴィン・コンウェイ： アメリカのコンピュータ科学者でありプログラマー。「コルーチン」という言葉を生み出した。