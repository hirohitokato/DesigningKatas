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

<!-- この概念を採用したことによって10億ドルの損失を世界中に生んだと言われる厄災とでもいうべき存在 -->

---
## nullポインタとは

何のオブジェクトも指していないことを表す特別なポインタの値。
（リアルモードで動くプログラムを除き）不正なアドレスとして扱われ、nullポインタに対して操作を行おうとするとメモリアクセス違反でアボートする。

プログラミング言語「Algol 60」で初めて登場した

<!-- 1960年に作られたプログラミング言語。ペルセウス座の恒星で2等星もアルゴルと名付けられているが、意味はアラビア語で「食屍鬼(グール)の頭」を意味する -->
<!-- https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/ -->

---

## Algol 60のサンプルコード (階乗(n!)を求める)

```algol
begin
	comment Algol 60で階乗を求めるプログラム;
	integer procedure factorial(n); integer n;
	begin
		integer i,fact;
		fact:=1;
		for i:=2 step 1 until n do
			fact:=fact*i;
		factorial:=fact
	end;
	integer i;
	for i:=1 step 1 until 10 do outinteger(1,factorial(i));
	outstring(1,"\n")
end
```

---
## 語源

ラテン語の『nullus』に由来。「無」を意味する。

>>> 別言語で出てくる`nil`もラテン語の nihil の短縮形に由来する

<!-- ラテン語の意味は虚無。冷めたり暗い考えに陥りがちな人を表す「ニヒル」と同じ。 -->
---

## ヌル文字$^1$ '`\0`'

* C言語やその派生言語や各種データフォーマットで文字列やデータの終端を表す制御文字

元々NOP(No Operation)と似た意味で用いられていた。

>>> 1:ヌル終端文字とも言う
