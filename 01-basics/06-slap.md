---
marp: true
math: mathjax
theme: katas
title: "SLAP"
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# SLAP

![bg](assets/06-slap.jpg)

---

# SLAP$^1$

_(Single Level of Abstraction Principle)_

── 抽象度統一の原則

>>> 1:Robert C. Martin著『Clean Code』(2009)が初出。SOLIDを提唱するなど「ボブおじさん（Uncle Bob）」としてソフトウェア設計の界隈では超有名。

---

## SLAPとは

関数やレイヤーを抽象レベルに沿って抽出すること

- ある関数の中で呼ぶ処理は同じ抽象レベルに揃えること
- 抽象度の異なるAPIを同じグループで提供しないこと
- 複合関数とロジック関数とを明確に分けること

SLAPが守られていると…

- **読みやすく、理解しやすくなる**
- **変更に強くなり、保守性が上がる**

---

![bg contain](assets/06-balanced.png)
![bg height:600px](assets/06-imbalance.png)

>>> 「Q7. 強平衡二分木の頂点数」(https://algo-method.com/tasks/922)より

---

## 例
```py
def high_level():
    middle_level1()
    middle_level2()

def middle_level1():
    low_level1()
    low_level2()

def middle_level3():
    low_level3()

def low_level1():
    # 具体的な処理...
def low_level2():
    # 具体的な処理...
def low_level3():
    # 具体的な処理...
```

---

## 高レベル〜低レベルに処理を分ける

※段階の度合いは３つでなくとも良い。数が増えるときはグループ化の繰り返しなどによって再帰的な構造をもたせることが多い

|レベル|説明|
|---|---|
|高レベル|ビジネスロジックやユースケースなど、対象のドメイン(モジュール/クラス/関数)が行うシーケンスを記述|
|中レベル|高レベルよりも一段階抽象度が低い処理。分割されたモジュールにおけるメインシーケンス|
|低レベル|分割する必要のなくなった具体的な処理。ドライバー/ライブラリのような外部機能もここ|

<!-- 高レベル:「ここではつまり〜をする」が一望できるレベル。「何をするか」が大きくまとめられているイメージ -->
<!-- 中レベル:さらに下のレベルに分けたほうがいい場合、このレベルも複合関数として実装する-->
<!-- 低レベル:条件分岐やデータ更新などの実際の作業。ロジック関数とも。アーキテクチャによってはUIや外部公開APIなども含まれる -->

<!-- モジュール階層という点で、同じ機能の中でも更にレイヤーが存在するものもある。
- UI: ベースになる部品と、それを組み合わせた部品(ボタンと、装飾付ボタン、ラベルとリッチテキストなラベル)
- 通信モジュール: データ交換そのもの、その上で動くプロトコル(通信手順)、そしてヘッダとかを剥がしたデータ操作
 -->

---

## 複合関数とロジック関数

抽象化のレベルを合わせるときに使う技術。システム内の関数を２種類の関数で作り上げることで、役割分担が明確に強制され抽象度を揃えやすくなる。

- 関数/サブルーチンを呼ぶだけの複合関数
- 実際の処理を行うロジック関数

構造化プログラミングの一手法でもある。

<!-- オブジェクト指向のデザインパターンにおいても、FacadeやMediatorパターンが該当する。狭い範囲ではAdaptorパターン -->

--- 

### 複合関数

より低いレベルの他の関数を組み合わせて呼ぶのみで、自分自身は判断や実際の処理を行わない関数。

```py
def purchase_usecase(a, b):
    c = validate(a)
    d = get_item(a, c)
      : # 下位の処理を呼ぶだけ。自分では何も判断/決定しない
    return x
```

ツリー構造$^1$におけるルート/ノードのようなもの。

>>> 1:フォルダとファイルのようなものをイメージすると良い。複合関数はフォルダに相当

---
### ロジック関数

実際の処理を書く関数。単一の役割を担うのみで、複数の機能は持たない$^1$

ツリー構造$^2$におけるリーフのようなもの。

>>> 1:アーキテクチャ設計時など、視点次第ではモジュールをロジック関数に見立てることもある。その場合はモジュール内でもレイヤ分けされる
>>> 2:ロジック関数はファイルに相当

---

## SLAPと本のアナロジー

本の構造をプログラムにあてはめて考えると、抽象度が統一されていないプログラムのいびつさが分かる

|本|プログラム|
|---|---|
|セクション|モジュール/パッケージ|
|章|クラス/ファイル|
|節|メソッド/関数|
|段落/文|コードの１行１行またはそのまとまり|

---

## まとめ・注意点

- 階層構造の各階層やモジュール分割の粒度などを揃えると、読みやすくメンテナンスもしやすくなる
    - ビジネスロジック(ユースケース)部と機種依存部
    - Public/Internal/Private(Protected) API
    - クラスの親子関係、etc.
- 本の構造に見立てて考えるのがオススメ
- コードを短くすることがSLAPの目的ではない
    - 複合関数とロジック関数の分割
    - ユースケースと機種依存処理の分割

<!-- 前提としては、階層構造がアーキテクチャとして出来ている状態で、さらにそれを優れた構造にするにはどういうことをしたら良いかという原則。グチャグチャな階層になっていないものだと効果半減なので注意。 -->
<!-- とはいえ、木構造の対称性を求めすぎると、他の複雑なモジュールに合わせようとして何もせず下を呼ぶだけの中間モジュールが出来てしまって意味がない。
全体のバランスにこだわり過ぎず、さっき言った複合関数とロジック関数との役割を分けるだけでもかなり変わってくるので、まずはそこから。 -->

<!-- Q&A:
粒度を合わせる際に分割しすぎるのは却って読みにくくなってしまうのではないか？
一回しか登場しないような処理の中で、複合関数スライドのvalidate()にあえて分けずif文とかで書いてもいいのでは？

→グラデーションのどこにポイントを置くかという前提になるが、簡単な処理であればそうしてしまって全然構わない。むしろ関数に切り出すことでいちいちジャンプしないと読めないのもどうかと思う。
ただ、そのif文の中がすごい長かったり、他にもif文がたくさん出てくるような状況だと途端に読みづらくなってしまう。
そもそもSLAPは人間にとっての理解しやすさを大事にした原則なので、その場合は分けた方がいい。
-->

---

## 関連

- Facadeパターン/Mediatorパターン
- SRP(Single Responsibility Principle)
- DIP(Dependency Inversion Principle)
- オニオンアーキテクチャ・クリーンアーキテクチャ
