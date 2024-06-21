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

# エンジニアとマジックナンバー/マジックストリング

---

## 42

**「生命、宇宙、そして万物についての究極の疑問の答え」** に対してスーパーコンピュータ、ディープ・ソートが750万年の計算の末に出した答え

>>> ダグラス・アダムズの『銀河ヒッチハイク・ガイド』(The Hitchhiker's Guide to the Galaxy)

---

## Dead Beef / Ate Bad Beef 

* メモリ破壊が起きていないかチェックする際に、事前に書き込んでおく値の一種
* 派生として`0x8BADF00D`や他にもたくさんある$^1$
    * MSVC++のデバッグランタイムだとスタック領域を`0xCCCCCCCC`で埋めている。

>>> 参考: https://en.wikipedia.org/wiki/Magic_number_(programming)#Debug_values

---

## 0xCAFEBABE

* Javaソースコードをコンパイルしたときにできあがるクラスファイルの先頭に連なる４バイト