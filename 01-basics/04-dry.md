---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会#-->
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

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