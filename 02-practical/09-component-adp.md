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

### コンポーネントの原則 #4

# 非循環依存関係の原則(ADP)
_Acyclic Dependencies Principle_

---
## タネ本

### 『クリーンアーキテクチャ<br>　 ― 達人に学ぶソフトウェアの構造と設計』
* Robert C. Martin(著), 角征典, 髙木正弘(訳)
* アスキードワンゴ刊
![bg right:30% 90%](assets/07-cleanarchitecture.jpg)

---

## 非循環依存関係の原則(ADP)

循環した依存関係を作らないようにする
使用関係、知識の関係が単方向になるように注意する
　
![center](assets/09-cyclic_simple.png)


<!-- 単一方向になっていること -->
<!-- MVC,MVP,Clean Architectureなどなど、世の中にたくさんアーキテクチャのパターンがあるけれども、どのアーキテクチャも絶対に守っているのがこの単方向の依存関係。これが双方向になってしまうのはどんな事情があっても絶対に避けるべき -->

---

## ソースコードでも同じ

お互いに保持することでメモリが解放されなくなる$^※$

```py
class A:
    def __init__(self):
        self.b_instance = None

class B:
    def __init__(self):
        self.a_instance = None

a = A()
b = B()
a.b_instance = b
b.a_instance = a # 循環参照の発生。a,b破棄してもメモリーに残り続ける
```

>>> Pythonは世代別ガーベージコレクションも実装しているので、いつかは解放される。

<!-- 注意：Pythonは参照カウンタ型のガーベージコレクションだけでなく、循環参照にも対応した世代別ガーベージコレクションも実装しているので、上のコードがメモリが解放されなくなる、というのは正確には嘘。たくさんのオブジェクトが作られた時には解放してくれている。 -->

---

## 循環依存を探せ

![center](assets/09-cyclic_complex.png)

<!-- 正解: Interactors→Entities→Authorizer→Interactors→… -->

---

## 循環依存の除去

![width:1000px center](assets/09-resolve-cycles.png)

---

## 非循環依存関係の原則(ADP)まとめ

* 循環依存・循環参照はソフトウェア開発では常に悪
    * 依存関係逆転の原則(DIP),共通部分の切り出しで解決する

<!-- TODO:ここで共依存の話を持ってくる。
現実世界でも同じ。共依存という言葉を知っていますか？
 -->