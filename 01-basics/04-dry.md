---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会#-->

# DRY (Don't Repeat Yourself)

---

## Don't Repeat Yourself

Andy Hunt と Dave Thomas の著書『The Pragmatic Programmer$^1$』による言葉。

コードだけでなくデータ構造、テスト計画、ビルドシステム、ドキュメントなどでも適用される

> _"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system"_  
> 「すべての知識はシステムの中で、単一で、あいまいでもなく、信頼できる表現を持っていなければならない」

>>> 邦題『達人プログラマー』村上雅章訳、オーム社。なお『達人プログラマー（第2版）熟達に向けたあなたの旅』 も2020年に刊行されている

---

## DRY example 1

```python
if x == 0:
    y = "zero"
elif x == 1:
    y = "one"
elif x == 2:
    y = "two"
elif x == 3:
    y = "three"
elif x == 4:
    y = "four"
    :
```
↓
```py
numbers = ["zero", "one", "two", "three", "four", ...]
y = numbers[x]
```

---

## DRY example 2

```py
# a = [1, 0, 1, 0, 0, 0, 0, 1]
if a[0] == 1: x = x + 1
if a[1] == 1: x = x + 2
if a[2] == 1: x = x + 4
  :
if a[7] == 1: x = x + 128
print(x)
```
↓
```py
for i in range(8):
    x = x + pow(2, i) * a[i]
print(x)
```

---

## DRY example 3

```py
def funcA(…):
    # ある処理

def funcAA(…):
    # funcAによく似た処理

def funcAB(…):
    # funcAによく似た処理
```
↓ 
```py
def funcA(…, …):
    # 同じ処理をまとめたもの
```

<!-- ただし、このやり方は結合度としては悪化しているので注意。具体的には７レベルの結合度のうちレベル４の「制御結合」に抵触している。どういうことかというと、呼び出し側が処理の内容を知っていないといけなくなり、相手をブラックボックスにできなくなってしまう。
呼び出されるモジュールの凝集度も、論理的強度(同じものをまとめただけ。レベルも2/7と低い)になってしまう欠点もある -->
---

## DRY example 4

```py
if h1 < 634:
    do_something()
  :
if h2 < 634:
    do_something()
```
↓ 数値も同様
```py
SKYTREE_HEIGHT = 634

if h1 < SKYTREE_HEIGHT:
    do_something()
  :
if h2 < SKYTREE_HEIGHT:
    do_something()
```

---

## DRYにすべきではないケース

* 似た関数でも、ある変更が他には関係しないケースがある場合
    * ドメインが異なる処理の共通化
    * レイヤーの異なる処理の共通化

やりすぎると「皆が参照するため誰も触れない処理＝密結合」になり、かえってメンテナンスしにくい処理になってしまう

---

## DRY失敗例(1)

```py
def funcAinModuleA(…):
    # ある処理

def funcAinModuleB(…):
    # funcAによく似た処理だが別モジュール

def funcAinDriver(…):
    # funcAによく似た処理だが別のレイヤー
```
↓ 「同じことをしているから1つにまとめよう」
```py
def funcA(…, …):
    # 同じ処理をまとめたもの。
    # あるレイヤーの都合で勝手に書き換えた途端いっせいに異常動作
```

---

## DRY失敗例(2)

```cpp
struct HighSchoolStudent {
    int biologyScore; // 生物学。1-100点
}

struct ElementarySchoolStudent {
    int artsAndCraftsScore; // 図工。1-5の評点
}
```
↓ 「同じ生徒だから共通化できるぞ！」
```cpp
struct Student {
    int biologyScore;
    int artsAndCraftsScore;
}
```

---

## DRYまとめ

* Don't Repeat Yourself.
* 繰り返し同じことをやっているときは一般化できないかを考えてみよう
    * 3回同じことを書いていたら関数や共通処理に切り出せないかを考える
* ドメイン/レイヤーの異なる要素を共通化するときは神関数、神クラスにならないよう注意
    * 同じ処理が複数にちらばっていても良い

---

## WET

DRYの対義語として『WET』『DAMP』がある。

> WET: _Write Everything Twice / Write Every Time_
> 　（すべてを２回書く / 毎回書く）

> DAMP: _Descriptive And Meaningful Phrases_$^1$
> 　（説明的かつ意味が分かりやすい言い回し）

* WETは常にアンチパターンとして考える
* DAMPはDRYほど簡潔にすべきではない場合、たとえばユースケースやテストコードを記述するときに良いと言われる。

>>> http://blog.jayfields.com/2006/05/dry-code-damp-dsls.html

<!-- DAMP: 2006年にJayというエンジニア？がブログに記述した記事。 http://blog.jayfields.com/2006/05/dry-code-damp-dsls.html -->
<!-- DAMPは書籍「Googleのソフトウェアエンジニアリング」(分厚くて重い)のp289に出てきた。 -->
<!-- バクロニム: ある単語の各文字を使って略語にしつつも、新たに頭字語としての意味を持たせたもの -->