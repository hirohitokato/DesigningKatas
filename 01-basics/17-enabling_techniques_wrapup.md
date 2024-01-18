---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# アーキテクチャ根底技法まとめ

---

1. [分割と統治(Divide and Conquer)](./02-divide_and_conquer.md)
1. [参照の一点性](./07-single_point_of_reference.md)
1. [抽象化](./12-abstraction.md)
1. [カプセル化](./13-encapsulation_infohiding_pkg.md)
1. [情報隠蔽](./13-encapsulation_infohiding_pkg.md)
1. [パッケージ化](./13-encapsulation_infohiding_pkg.md)
1. [関心の分離](./14-separation_of_concerns.md)
1. [充足性 & 完全性 & プリミティブ性](./15-suff_comp_prim.md)
1. [ポリシーとメカニズムの分離](01-basics/16-segmentation_principles.md)
1. [インターフェースと実装の分離](01-basics/16-segmentation_principles.md)

---

## よい「もの」には「型」がある

**もの** ＝ ソフトウェア、コード、モデル、ドキュメント、デザイン、etc.
**型** ＝ 空手の型のようなもの

* 技術や業(わざ)のノウハウを習得するための教範
* 型の稽古を通じて、体系やその身体性を獲得する

<!-- https://10mtv.jp/pc/column/article.php?column_article_id=3186 -->
<!-- もともと武道の「型」は､その武道が伝えたい叡智､すなわち技術や業のノウハウなどを修行者（学習者）が習得するために使用された教範 -->
<!-- 型とは､いくつかの動作を組み合わせたもの。一連の想定の下での動作や姿勢が設定されている。学習者は「型」を通じて稽古を重ねることによってそれぞれの「型」そのものを学び､体系を把握するとともに型体系が要求する身体を獲得するに至る。 -->

### → 型を身に着けよう・型を破り離れよう