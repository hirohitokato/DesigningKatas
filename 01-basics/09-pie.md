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

# PIE

_Program Intently and Expressively_

<!-- 意図が分かりやすく、表現力豊かにプログラミングしなさい -->
---

## 『意図を表現してプログラミングしなさい』

一般的な文章と同様、誰か他の人が読んでわかるように書くということ。

* コードは1回だけ書かれて、そのあと何回も読まれる
* コードだけがソフトウェアの動作を正確かつ完全に知るための手がかり

つまり、

* **コードの読みやすさ ≫ コードの書きやすさ**

---

## 参考:文芸的プログラミング

文章とコードを混ぜて書くことで、文章の完成度を高めることがソースコードの品質を上げることにつながる仕組みのこと。ドナルド・クヌースにより提唱された考え方

```pascal
1.中心アルゴリズム
do_something()は中心となる処理内容である。
<a routine> ==
 item.do_something().

2.メインループ
あるコレクションの全ての内容を<中心アルゴリズム>で処理する。
<main> ==
for item in collection
 <a routine>
---- ↓ -----
for item in collection
  item.do_something().
 ```
<!-- クヌースはいわゆる天才。The Art of Computer Programmingという超有名な本を書くために、本を作るためのソフトウェアを書いたという -->
<!-- 今だとJupyter notebookが近いが、より連携したもの -->
<!-- 今はChatGPTがあるので不要かもしれない。
* Pythonでcollectionという名前の配列を順にたどり、格納されているitemのdo_something()メソッドを呼び出す処理
 -->

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
* 「読みやすく書け！」ということ。対になるのは「動けばいいや」$^1$
* 書いたコードが数年後の黒歴史にならないようにしよう

>>> 1: 『[「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word18455.html)』より