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

# 読みやすいコードの作り方 - 状態(1)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 状態とは？

プログラムの振る舞いを決定するデータとその組み合わせ。

1. 変数の状態
    ```py
    counter = 0  # counterの初期状態は0
    counter += 1  # counterの状態が1に変わる
    ```
2. オブジェクトの状態
    ```py
    class Dog:
        def __init__(self, name):
            self.name = name
            self.hungry = True  # 初期状態ではお腹が空いている

        def feed(self):
            self.hungry = False  # feedメソッドで状態を変更する
    ```

<!--
定義は、日常で使う「状態」と同様で問題ない。ただし、ソフトウェア開発においては以下の特徴がある。
* 状態は、時間の経過により変化するものに対して適用される
* 状態は、過去の処理結果を先々使用するために適用される
(https://mejiro8.hatenablog.com/entry/2021/11/07/003043) -->

---

## 状態とは？ (cont.)

プログラムの振る舞いを決定するデータとその組み合わせ。

3. プログラムや処理のフロー
    ```py
    logged_in = False
    ︙
    if logged_in:
        print("Welcome back!")
    else:
        print("Please log in.")

4. 処理の状態
    ```cpp
    enum class TcpConnectionState { CLOSED, LISTEN, SYN_RCVD, SYN_SENT, ESTAB, … }
    ```

<!--
もっと突き詰めて言うと、プログラムは入力がまったく同じである場合は同じように動き、一方で入力のほんの一部でも異なっていれば異なる動きをする(ことがある)。
これはつまりそのプログラムが「変化しうる変数や入力情報のすべての組み合わせからなる状態数」を持っているということになる
-->

---

## クイズ

お互いに独立した５つのフラグ変数(true/falseのみ持つ)を持つプログラムの状態の数は最大いくつになるか？

```py
isDebug = False
connected = True
isOpened = False
shows_dialog = True
shouldUpdate = True
```

##

---

## クイズ

お互いに独立した５つのフラグ変数(true/falseのみ持つ)を持つプログラムの状態の数は最大いくつになるか？

```py
isDebug = False
connected = True
isOpened = False
shows_dialog = True
shouldUpdate = True
```

**答：**  2 x 2 x 2 x 2 x 2 = 32。32もの状態を持っている

<!-- この32種類のどこにいるかを考えないといけない。この状態で、それぞれの組み合わせで別の処理をしないといけない
状態は少ない方が良いことが分かる -->

<!-- ・・・とはいえ、状態はどうしても作らなければならないことがある。その状態とどう向き合うか、が長年我々が取り組んでいること -->

---

## 状態の複雑さへの一般的な対処法

GoFのState Patternなどを使う。

![bg right:40% w:500](./assets/20-state-diagram.png)

状態ごとに処理をクラスやモジュールに分けて、処理が混ざらないようにする

>>> 画像は https://reactiveprogramming.io/blog/en/design-patterns/state より

<!-- ある状態のときの処理をクラスの中に閉じ込められるので、他の状態のことを考えなくてもよくなる -->

---

## 複雑な状態への対処方法

1. 変数の**直交性**を意識する
2. 状態の**遷移**を設計する

![bg right:30% 90%](assets/12-book.jpg)

<!-- この本ではどのような点に注意すると良いと言っているか -->

---

## 変数間の直交性を意識する

複数の変数が「直交」するように状態を作る

### 変数が**直交**している =

> **定義**:
> ２つ以上の変数について、それぞれの値の取りうる範囲（変域）が他の値に影響されない場合、それらの変数は互いに直交の関係にある。
>
> 直交 ⇔ 非直交

= お互いに独立していて関連がない・変数の値が他の変数に影響を与えない。

---

