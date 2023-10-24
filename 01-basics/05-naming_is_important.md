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

# 名前重要

_Naming/Name is important_

---

> 「すべての人物・事物には真の名前があり、その名前を知るものはそれを支配することができる」  
> 
> ネイティブ・アメリカンによる言葉(出典不明)

<!-- 旧約聖書の神の名は、正しく発音できないよう「YHWH」になっている。グリム童話の「ルンペルシュティルツヒェン」（独: Rumpelstilzchen）もある。他にも千と千尋の神隠しでは湯婆婆が名前を知って支配していたり、血界戦線という漫画では血界の眷属に対して真の名を知ることで初めて封印できるなど、名前を理解することの重要性は枚挙にいとまがない -->

---

## 名前重要

プログラミングにおいて、分割した概念に対して

* 名前を付けること
* 付けた名前そのもの

はとても重要であるという意味。Ruby言語の開発者であるまつもとゆきひろ氏が、自身の座右の銘として挙げている

>>> [プログラマが知るべき97のこと - 名前重要](https://xn--97-273ae6a4irb6e2hsoiozc2g4b8082p.com/%E3%82%A8%E3%83%83%E3%82%BB%E3%82%A4/%E5%90%8D%E5%89%8D%E9%87%8D%E8%A6%81/)より

---

## なぜ？

* 適切な名前をつけられる
    * ＝ その機能が正しく理解されて、設計されている
* 適切な名前がつけられない
    * ＝ その機能が果たすべき役割を十分に理解できていない

**適切な名前が付けられれば設計の８割が完成している。**

---

## 適切な名前とは？

* 理解が捗る
    * 短いコメントや「コードのUI」として読める
* プロジェクトのガイドラインにしたがっている
* 脳への負担が少ない、誤解されることがない
* 効果と目的を説明し、手段には言及しない
* 検索しやすい

---

## 例

```py
def func(a, b):
    return a + b

def cubic_interpolate(y):
    # 媒介変数yを使って３次補間した値を返す
    return y * y * (3.0 - 2.0 * y)
```
↓
```py
def add(a, b):
    return a + b

def cubic_interpolate(t):
    # 媒介変数tを使って３次補間した値を返す
    return t * t * (3.0 - 2.0 * t)
```

---

## 例

```py
def ctlFlg3(is_on):
    # ドライバの制御フラグ３をON/OFFする
    ...
```
↓
```py
def setDriverFlag3State(is_on):
    ...
```

---

## (ちょっと意地悪な)クイズ

適切な関数名・変数名を考えてみよう

```py
def regist_cust(name, pwd):
    ...

def cre_task(exinf, tskatr, task, itskpri, …):
    ...

def clear_cache_and_load_data():
    ...
```

---

## とはいえ守るべきもの

プロジェクトで一貫性を保つことが最優先。

* 異なるネーミングルールの混在は混乱の元にしかならない
    * 名前だけでなく技術も同様。
* 悪法もまた法なり$^1$

>>> 俗にソクラテス(古代ギリシャの哲学者)が死刑判決を下された時に言ったといわれている。

---

![bg](https://pbs.twimg.com/media/F841re7XIAA67ad?format=jpg&name=large)

>>>> https://x.com/lewismenelaws/status/1715367533606281464?s=51&t=8SPovdJ4_WYmWx6V6E-yLg