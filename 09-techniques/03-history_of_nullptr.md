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

# nullポインタの歴史

---
## nullポインタとは

何のオブジェクトも指していないことを表す特別なポインタの値。
メモリ空間として

https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/


---
## nullの語源

ラテン語の『nullus』に由来。「無」を意味する。

>>> 別言語で出てくる`nil`もラテン語の nihil の短縮形に由来する

---

## ヌル文字$^1$ '`\0`'

* C言語やその派生言語や各種データフォーマットで文字列やデータの終端を表す制御文字

元々NOP(No Operation)と似た意味で用いられていた。

>>> 1:ヌル終端文字とも言う
