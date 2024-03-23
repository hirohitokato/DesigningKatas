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

## きれいなコード > 最適化されたコード

Donald E. Knuth曰く「まずコードを綺麗にしろ」$^1$

>>> 1: コードをきれいな状態に保つことと、実行速度の向上やリソース削減のどちらを優先すべきか？の問いに対し

---

## 早計な最適化 ＝ 諸悪の根源

コードのどこが遅いかを予測することは難しい

* 計測しないで最適化しても効果はない
