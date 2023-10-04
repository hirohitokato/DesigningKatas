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
<!-- header: 銀の弾丸などない-->
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

# 銀の弾丸などない(No silver bullet)

---

## 「銀の弾丸などない(No silver bullet)」

フレデリック・ブルックス$^1$が1986年に著した論文$^2$に出てくる言葉。

* すぐに役に立ちプログラマの生産性を倍増させるような技術や実践(特効薬)は存在しないことを表した言葉
  * ただし偶有的な複雑性には銀の弾丸は存在することに注意

**銀の弾丸**： 西洋の信仰において狼人間や悪魔を撃退する際に用いる武器。

>>> 1: 1931-2022 アメリカ合衆国のソフトウェア技術者
>>> 2: “No Silver Bullet — Essence and Accident in Software Engineering”. Proceedings of the IFIP Tenth World Computing Conference: 1069–1076
---
## → プログラミングの難しさ = 本質的な複雑性＋偶発的な複雑性

### 本質的な複雑性(essential complexity)

プログラムによって解決しようとしている対象領域そのものの難しさ。

論文ではこの複雑性に対しては銀の弾丸が存在しないと言っている

### 偶有的な複雑性(accidental complexity)

開発者の選択によって生じる複雑さ。プログラム言語の種類、採用したアルゴリズム、コーディング環境、プロジェクトマネジメントなどによってもたらされる遅延

銀ほどではないが、生産性を向上する手立ては存在する

---

プログラミングの問題を一気に解決する方法・特効薬など存在しない

* ソフトウェア開発は本質的に複雑で困難なもの
* 本質的な複雑性は４つに分かれる
    * 「複雑性」「同調性」「可変性」「不可視性」


    |性質|説明|
    |---|---|
    |複雑性|大きく難解である
    |同調性|外部環境に追従していく必要がある
    |可変性|機能追加/改善により変化し続ける
    |不可視性|ソースコードやUI以外目に見えるものがない

---

## → どうすればいい？

* 地道で科学的なアプローチによる学習・改善を積み、本質的な複雑さにだけ注目できるようにする
    * プログラミングの難しさ = 本質的な複雑性＋偶発的な複雑性
    * 後者をゼロに近づけていく

![bg 110% left:20%](assets/monogatari_kyojinno_katani_noru.png)

