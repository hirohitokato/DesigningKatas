---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# ボーイスカウトの規則 & 最適化のルール

---

## 1.ボーイスカウトの規則

**コードを掃除して帰る**

---

## 2.最適化のルール

<!-- ここでの最適化とは「パフォーマンス・チューニング」のことを指す。
動作の速いコードを書くこと。 -->

```cpp
int sum = 0;
for (int i = 1; i <= N; i++) {
  sum += i;
}
printf("sum: %d\n", sum);
```
↓

```cpp
int sum = (N * (N + 1)) / 2;
printf("sum: %d\n", sum);
```

---

## 最適化で守るべき２つのルール

最適化には２つのルールがある。

1. 最適化を行ってはならない
1. _

---

## 最適化で守るべき２つのルール

最適化には２つのルールがある。

1. 最適化を行ってはならない
1. (エキスパート専用)まだ行ってはならない

---

## 最適化のルール

> 「早すぎる最適化は諸悪の根源である」
> premature optimization is the root of all evil
> ――― Donald E. Knuth

---

## きれいなコード > 最適化されたコード

早々に速くしたコードが失うものは大きすぎる

* 可読性、品質、複雑性、保守性、移植性、...etc.

```cpp
int count_bits(int n)
{
  n = (n & 0x55555555) + (n >> 1 & 0x55555555);
  n = (n & 0x33333333) + (n >> 2 & 0x33333333);
  n = (n & 0x0f0f0f0f) + (n >> 4 & 0x0f0f0f0f);
  n = (n & 0x00ff00ff) + (n >> 8 & 0x00ff00ff);
  n = (n & 0x0000ffff) + (n >> 16 & 0x0000ffff);
  return n;
}
```

>>> [Henry S. Warren著『Hacker's Delight』より](https://www.amazon.co.jp/exec/obidos/ASIN/0201914654)
<!-- Intel x86 アーキテクチャが SSE 4.2 から導入した population count 命令の POPCNT を使うのが何倍も速い。 -->
---

## 早計な最適化 ＝ 諸悪の根源

コードのどこが遅いかを予測することは難しい

* 計測しないで最適化しても効果はない

---

## 関連する原則

* ボーイスカウトの規則: [KISS(Keep it simple, stupid)](03-kiss.md)
* 