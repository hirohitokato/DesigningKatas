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

<!-- 今日は数ある原理原則の中でもとびきり難しいものを紹介します -->

# TMTOWTDI

---

# TMTOWTDI

発音: /tɪmˈtəʊdi/（てぃむ・たぅでぃ） $^1$

>>> [Wikipediaより](https://en.wiktionary.org/wiki/TMTOWTDI)

---

![bg right contain](https://cdn.perl.org/perlweb/images/icons/header_camel.png)

## ＝ やり方は１つじゃない

* 正解は『There's More Than One Way To Do It.』
* Perl言語のモットーとして使われる

Perl(1987〜)はラリー・ウォールによって開発された、実用性と多様性を重視したプログラミング言語。

>>>  画像は https://www.perl.org より

<!-- Perlはまだ死んでいない。5.38.0が2023年7月02日にリリースされている -->

---

## 「ツール」において多様性は善(なこともある)

ここにおいてのツールとは、アプリ以外にもプログラミング言語/APIなども含まれる。

* 使う側が多様な場面に適したロジックを書けるようになる(こともある)
* ツールの使い方をシンプルにしたつもりでいても、その方法に思いが至らない人もいる
* 現実の複雑さとツールのシンプルさの橋渡しを、ユーザーが負わなければならない(こともある)

---

![bg](https://www.epson.jp/showroom/marunouchi/epsite/gallery/exhibitions/2023/0726/images/pht_art.jpg)

>>> https://www.epson.jp/showroom/marunouchi/epsite/gallery/exhibitions/2023/0726/

---

## 基本はシンプル第一

* ただし場合によっては、ツールが複雑さの面倒を見てあげることも必要
* 非常にセンスが問われる難しい原則

> シンプル教条主義にならず、場合によっては一部複雑さを受け入れ、エコシステム全体の最適化を優先させることが必要です。$^1$

>>> 『プリンシプルオブプログラミング - ３年目までに身につけたい一生役立つ101の原理原則』より