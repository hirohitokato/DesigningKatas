---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# DRY (Don't Repeat Yourself)

---

## Don't Repeat Yourself

Andy Hunt と Dave Thomas の著書『The Pragmatic Programmer$^1$』による言葉。

コードだけでなくデータ構造、テスト計画、ビルドシステム、ドキュメントなどでも適用される

> _"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system"_  
> 「すべての知識はシステムの中で、単一で、あいまいでもなく、信頼できる表現を持っていなければならない」

>>> 邦題『達人プログラマー』村上雅章訳、オーム社。なお『達人プログラマー（第2版）熟達に向けたあなたの旅』 も2020年に刊行されている

<!-- 達人プログラマーの中でも10ページ近く割いて書いてある。 -->
<!-- ソースコードをコピペするなという単純なルールで捉えるのではなく、「知識」や「意図」の二重化を避けるという原則。異なった場所に同じ表現をすることを避けるという意味 -->
---

## (言語学の復習)

<!-- エンジニア界隈に多い -->

### アクロニム・頭字語(acronym)
主にアルファベットによる略語の一種。複数の単語から構成された単語の頭文字を並べて作られた語のこと。
単語として発話できない場合はイニシャリズムという

> AIDS, NATO, UFO, FBI, GCC, etc.

### バクロニム（backronym/bacronym）
ある単語の各文字を使って、新たに頭字語としての意味を持たせたもの

> KISS, **DRY**, Suica, R.I.P., A.R.E., etc.

<!--
AIDS: 後天性免疫不全症候群、Acquired immune deficiency syndrome
UFO: 未確認飛行物体、unidentified flying object
FBI: 連邦捜査局、Federal Bureau of Investigation
GCC: GNU Compiler Collection
-->
<!--
SOS: Save Our Ship(Souls)
Suica: Super Urban Intelligent Card / スイスイ行けるICカード
ARE: アレ。Aim, Respect, Empower
R.I.P.: Rest In Peace。本来はラテン語で「安らかに眠れ」を意味する「requiescat in pace(レクウィエスカト・イン・パーチェ)」
-->

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

## DRY example 3 （イマイチなケース）

```py
def funcA(x):
    # ある処理

def funcAA(x):
    # funcAによく似た処理

def funcAB(x):
    # funcAによく似た処理
```
↓ 
```py
def funcA(x, type):
    # 同じ処理をまとめたもの。typeで処理を分岐
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

<!-- 
皆重複を排除したがるけれど、その重複は「本物の重複」ですか?
本物の重複 : あるクラスに変更があればそのクラスのすべての複製にも同じ変更を反映しなければならない。
偽物の重複 : 明らかに重複していたコードが時間とともに異なる進化をとげて、数年後(数日後かも)には全く違うものになっている。

https://zenn.dev/maru44/articles/3405308b1b83bc
-->
---

## DRY失敗例(1)

```py
def funcAinModuleA(x: int):
    # ある処理

def funcAinModuleB(y: int):
    # funcAによく似た処理だが別モジュール

def funcAinDriver(z: int):
    # funcAによく似た処理だが別のレイヤー
```
↓ 「同じことをしているから1つにまとめよう」
```py
def funcA(num: int, …):
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

## DRY失敗例(3)

```python
def validate_age(value): # 購入者の年齢認証
    validate_type(value, int)
    validate_min_integer(value, 0)

def validate_quantity(value): # 購入するワインの注文数
    validate_type(value, int)
    validate_min_integer(value, 0)
```
↓ 似ているから共通化しよう
```python
def validate_something(value):
    validate_type(value, :integer)
    validate_min_integer(value, 0)
```

<!-- 異なる2つのものごとが、たまたま同じ規則を持っていただけ。それは偶然であり二重化ではない -->

---

## DRYまとめ

* Don't Repeat Yourself.
* 繰り返し同じことをやっているときは一般化できないかを考えてみよう
    * 3回同じことを書いていたら関数や共通処理に切り出せないかを考える
* ドメイン/レイヤーの異なる要素を共通化するときは神関数、神クラスにならないよう注意
    * 同じ処理が複数にちらばっていても良い

<!-- 開発者間で発生する二重化もあるので注意してほしい
例：
アメリカ合衆国政府のコンピューターシステムが2000年問題に対処できているかどうかを監査したときに、社会保障番号(SSN。日本で言うマイナンバー的な)をチェックする処理が、10,000箇所以上で、それぞれで独自に実装されていたことが判明した
        
つまりDRYを回避する方法の１つには開発者感での活発＆頻繁なコミュニケーションもある。あらゆるタイミングで意識が必要であるという好例とも言える。 -->

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