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

# 未実施
# PIE

_Program Intently and Expressively_

---

## 『意図を表現してプログラミングしなさい』

一般的な文章と同様、誰か他の人が読んでわかるように書くということ。

* コードは1回だけ書かれて、そのあと何回も読まれる
* コードだけがソフトウェアの動作を正確かつ完全に知るための手がかり

つまり、

* **コードの読みやすさ ≫ コードの書きやすさ**

---

## コメントも重要

コードは「What」と「How」を表現できるが、「Why」は表現できない。
なぜそのようなコードを書いたのか、その理由をコメントに書くとよい。

### 注意
コメントもメンテナンスの対象にすること。コードは常にそのとおりに動くが、コメントは昔の内容が残り続けてしまうかもしれない。

---

## まとめ

* プログラムは他の人が読みやすいように書くべき
    * 超絶技巧は不要
    * ３日後の自分も他人と心がける
* 書いたコードが数年後の黒歴史にならないようにしよう
