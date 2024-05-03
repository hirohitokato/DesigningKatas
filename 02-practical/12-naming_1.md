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

# 読みやすいコードの作り方 - 命名(1)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』
* 石川宗寿(著)
* 技術評論社 2022/11/4初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 命名の対象

* クラス(インターフェース、列挙型、構造体、プロトコル、トレイト、etc.)
* 変数(定数、プロパティ、フィールド、仮引数、ローカル変数、etc.)
* 関数(メソッド、手続き、サブルーチン、etc.)
* スコープ(パッケージ、モジュール、名前空間、etc.)
* リソース(ファイル、ディレクトリ、ID、etc.)

---

## どうあるべきか

* 正確であること
    * 名前の示す意味とその実態が一致していること
* 説明的であること
    * 名前を見ただけで何であるかが理解できること

---

## 前提: 英文法に近い形で命名する

* 「メッセージを表示するテキストビュー上で発生したクリックイベントのリスナー」
* **✕** `ListenerEventMessageClickViewText`
    * 「リスナーを対象とするイベントのメッセージ(?)を表示するクリックビュー(??)のテキスト？？」🤔
* **◯** `MessageTextViewClickEventListener`
    * (末尾から読みながら)イベントリスナーである<br> → クリックに関するイベントのようだ<br> → テキストビュー、しかもメッセージに関連しそうだ

**解釈が一意に定まる**ように命名する

---

## 前提: 品詞を使い分ける

<b>▶ 名詞/名詞句</b>  : 
* クラスやインターフェースなどの型名
    * `HashSet`,`ImageRenderer`, etc.
* 性質や状態を返す関数、新たに作られたオブジェクトを返す関数
    * `size()`, `length()`, `listOf()`, etc.

<b>▶ 命令文</b>
* 一般的な関数、手続き、メソッド
    * `add(…)`, `registerDescription(…)`, `getValue()`, etc.

### まずはこの２つを覚える。

---

## 名詞/名詞句の使い方

1. 名前を付ける対象を示す単語(最も重要な単語)を最後に置く
    * 例) ボタンの高さ:  **✕**`heightButton` →  **◯**`buttonHeight`
    * 修飾語句が長い場合は工夫する(が、例外として考える):
        * **✕**`portraitModeButtonHeight` →  **△**`buttonHeightInPortraitMode`
2. 解釈の幅を持たせない
    * 例) ユーザー数: **✕**`numUsers` <br>　→ **△**`numberOfUsers`, **△**`userNumber`, <br>　→ **◯**`userCount`, **◯**`userTotal`

* 性質や状態を返す関数の場合は仮引数まで含めて名詞句にすることを考える
    * `indexOf(element)`, `maxValueIn(array)`

---

## 命令文の使い方

1. 動詞の原形を先頭に置いた関数名にする
    * ユーザーの動作を記録する: **✕**`userActionLog()`, **◯**`logUserAction()`
2. 関数が引数を取る場合は仮引数の名前も含めて命令文を構成する(こともある)
    * 値をvalueと比較する: `compareTo(value)`
3. 性質や状態を返す関数には名詞(句)を使う
    * 名詞句を使わない場合は`get`/`query`/`obtain`などを先頭に置く
    * 適切な動詞で、副作用の有無や実行時間を意味に含める

---

<b>▶ 形容詞/形容詞句、分詞</b>
* 性質や状態、処理される対象を示すクラスや変数
    * `Iterable`, `Decodable`, `PLAYING`, `FINISHED`, etc.
* 新たに作られたオブジェクトを返す関数
    * `sorted()`, `appending()`, etc.

<b>▶ 三人称単数形の動詞/助動詞、それによる疑問文</b>
* 真偽値を示す変数・関数
    * `contains(x)`, `shouldUpdate`, `isTextVisible`, `equalsTo(value)`, etc.

<b>▶ 前置詞を伴う副詞句</b>
* 形を変換する関数、コールバックに用いる引数
    * `toInt()`, `fromMemberId(x)`, `asSequence()`, `onFinished`, etc.

---

## なぜ文法が無視されていくのか

