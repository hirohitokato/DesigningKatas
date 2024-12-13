---
marp: true
math: mathjax
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# 再帰を理解するたった１つの冴えた方法

---

> 再帰を理解するには、まず再帰を理解しましょう。
>
> _To understand recursion, you must first understand recursion._

>>> https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Top-10-programmer-jokes

---

# 似たような言葉

- GNU _(GNU is Not UNIX)_
- cURL _(Curl URL Request Library)_
- PHP _(PHP: Hypertext Preprocessor)_
- PIP _(PIP Installs Packages)_
- PNG _(正式には"Portable Network Graphics"、非公式には"PNG's not GIF")_
- VISA _(Visa International Service Association)_
- 「TTPプロジェクトの『TTP』って何の略？」→「The TTP Project」([ディルバート](https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%AB%E3%83%90%E3%83%BC%E3%83%88)という米の漫画の１コマ)

言語学的にはこれを「[**再帰的頭字語**(Recursive acronym)](https://ja.wikipedia.org/wiki/%E5%86%8D%E5%B8%B0%E7%9A%84%E9%A0%AD%E5%AD%97%E8%AA%9E)」または**自己言及型頭字語**と言います。

<!-- GNUはRichard M. Stallmanを中心とした、世界中の開発者によるボランティア活動によって開発が進められているソフトウェアのまとまりでありプロジェクト。Unix系の設計ではあるがUNIXとは違いフリーソフトウェアでありUNIXに由来するソースコードを全く使っていないことを示すため -->