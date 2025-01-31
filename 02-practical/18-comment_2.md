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

# 読みやすいコードの作り方 - コメント(2)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

> 見た目を美しく整えることや、流行りのテクニックを取り入れることが「改善」だと思い込んでいませんか？

![bg right:30% 90%](assets/12-book.jpg)

---

## コメント

1. コメントの種類と目的
2. **ドキュメンテーション**
3. 非形式的なコメント

---

## ドキュメンテーション内の構成(要約と詳細)

- **要約部:** そのコードが何であるのか・何をするのかを簡単に説明
- **詳細部:** 仕様の詳細や補足事項を説明

```kt
/**
 - キーワードとそれに対応する説明を、それぞれ文字列として保持する辞書クラス。
 *
 - ...(詳細: 基本的な使い方などを書く)...
 */
class Dictionary {
    /**
     - [registerDescription] で登録済みの [keyword] に対する説明を取得する。
     *
     - ...(詳細: 未定義の場合どうするかなどを書く)...
     fun getDescription(keyword: String): String { ... }
```

>>> 1.ドキュメンテーションツールによって要約/詳細の分け方が異なるので注意

<!-- 最初の要約部とその後の詳細部に分かれる -->

---

## **要約**には「対象が何であるのか・何をするのか」を書く

１行で概要を記述。ただし完全な形の文章にする必要はなく主語がなくても良い。

- **クラス・変数**: 名詞句を使う
    - _"A Generic ordered collection of elements."_ (Kotlin:`List`)
    - _"A single-precision, floating-point value type."_ (Swift:`Float`)

- **関数・メソッド**: 三人称単数形の動詞から始まり、主語を省略した不完全な文
    - _"Adds a new element at the end of the array."_ (Swift:`Array.append()`)
    - _"Returns a list containing all elements that are not null."_<br>(Kotlin:`filterNotNull()`)

<!-- ドキュメンテーションツールだけでなく、このプログラミング言語だったらこう書くべきという指針が書かれていることもあるのでそれを守るようにする -->
<!-- いくつかのドキュメンテーションツールが最初に登場するピリオドを終点としてあつかい、そこまでを要約と扱っている -->
<!-- 英語の例を読むと分かりやすいので紹介します。 -->

<!-- いくつかテクニックがあるので活用しましょう。
 - テクニック1: 重要なコードを見つける
 - テクニック2: コードの共通点を見つける -->

---

## テクニック1: 重要なコードを見つける

**Quiz**: 以下のKotlinコードにおいて、①～④のどれが一番重要か

```kt
fun ...(user: UserModel) { // 関数名はわざと省略
    if (!user.isValid) return // ①
    val rawProfileImage = getProfileImage(user.id, ...) // ②
    val roundProfileImage = applyRoundFilter(rawProfileImage, ...) // ③
    profileView.setImage(roundProfileImage) // ④
}
```

---

## テクニック1: 重要なコードを見つける

```kt
fun ...(user: UserModel) {
    if (!user.isValid) return // ①
    val rawProfileImage = getProfileImage(user.id, ...) // ②
    val roundProfileImage = applyRoundFilter(rawProfileImage, ...) // ③
    profileView.setImage(roundProfileImage) // ④ ← 一番重要
}
```

「プロフィール画像を表示する」が大事で、それ以外はその前処理

---

## テクニック1: 重要なコードを見つける

重要な部分をまず記述する
```kt
/**<NOT SO BAD>
 - プロフィール画像を表示する。
 */
```

｜これだけだと関数名と変わらないアンチパターンになってしまう。<br>↓さらに補足を加えて以下のようにすると良い。

```kt
/** <GOOD>
 - 与えられたユーザー[user]に対応するプロフィール画像を、円形にトリミングして表示する。
 */
```

---

## テクニック2: コードの共通点を見つける

**Quiz**: どういう要約を書いたら良いか

```kt
/**
 - ここに何を書く？
 */
fun ...(receivedMessage: MessageModel) { // 関数名はわざと省略
    contentTextView.text = receivedMessage.contentText // 本文テキスト
    senderNameView.text = receivedMessage.senderName   // 送信者名
    timestampView.text = receivedMessage.sentTimeText  // 送信時刻
}
```

---

## テクニック2: コードの共通点を見つける

無理に１つを抜き出しても誤解を招く表現になってしまう。

```kt
/**<BAD>
 - 受信したメッセージ[receivedMessage]の本文テキストをビューに表示する
 */
```

↓  テキストの抽象度を上げて他の要素を並列に取り上げる

```kt
/**<GOOD>
 - 受信したメッセージ[receivedMessage]で、表示レイアウト
 - (本文テキスト・送信者名・送信時刻)をビューに表示する
 */
```

---

## **詳細**には注意する細かな仕様・理解を助ける補足を書く

必須ではないが、要約で説明が不足する場合には追加する。

- 基本的な使い方
- 関数/変数の使い方
- 戻り値の補足
- 制約やエラー時の動作

要約と異なり完全な文を書く。日本語の場合は常体・敬体や句読点の形式を要約に合わせること。

---

## 基本的な使い方

要約で書ききれなかった基本を補足する

```kt
/**<GOOD>
 - メッセージの内容(本文テキスト・送信者名・送信時刻)をレイアウトに
 - バインドして表示するプレゼンテーションクラス。
 *
 - メッセージのモデル[MessageModel]を[updateLayout]メソッドに渡すと、
 - すべての表示内容が更新される。
 */
class MessageViewPresenter(messageLayout: Layout)
```

<!-- クラスなのに関数のように引数が付いているように見えるが、これはKotlinでクラスのプロパティ(メンバ変数)を定義する書き方 -->
<!-- 詳細とはいえ、このupdateLayoutメソッドの詳細に触れるのは同メソッドのドキュメンテーションコメントに任せるように -->
---

## 基本的な使い方:関数/変数の使い方

使用例を書くと利用方法が直感的に理解できるようになる。

```kt
/**
 - 与えられた文字列をカンマ `","` 区切りで分解し、文字列のリストとして返す。
 *
 - 例えば`"a, bc ,,d"`を引数として与えると`listOF("a","bc","","d")`を返す。
 */
fun splitByComma(string: String): List<String> { ... }
```

↑の例だと様々な状況を一発でイメージさせられるようになる

---

## 基本的な使い方:戻り値の補足


```kt
fun setSelectedState(isSelected: Boolean): Boolean {...} ←この戻り値の意味は？
```

多くのプログラミング言語では**戻り値の名前を宣言できない**ので書く

```kt
 /**<GOOD>
  - ...
  - 戻り値は、この関数が呼ばれる前の選択状態を表す。
  */
```
```kt
 /**<GOOD>
  - ...
  - 返される値は 0.0≦x<1.0 の範囲である。
  */
```

<!-- 返り値を表現するタグが使える場合は使う -->

---

## 基本的な使い方:制約やエラー時の動作

正しく使用するためには決められた手続きが必要なもの、その制約に違反したときに何が起きるかを書く

```kt
/** <GOOD>
 - ...(要約)...
 *
 - ...(再生方法についての詳細を先に書く)...
 - [play]や[seek]を呼び出す前には[prepare]で動画ファイルをロードしておくこと。
 - 
 - [prepare]せずに[play]/[seek]を呼び出した場合は、
 - 例外[ResourceNotReadyException]を投げる。
 */
class VideoPlayer(videoPath: String) { ... }
```

---

## その他、詳細に書くべきこと

- インスタンスが有効な生存期間
- 関数呼び出し時のスレッド
- 再入可能性や実行後の再呼び出し
- 実行時間・消費メモリ・その他の使用リソース
- 外部環境とのインタラクション(ネットワーク・ローカルストレージなど)

---

## ドキュメンテーションのまとめ

- ドキュメンテーションとは形式的な説明。クラス/関数/変数の宣言や定義に使う
    - 要約と詳細によってその概要や補足事項を説明する
- 内部コードを読まなくても理解できる内容を書く
    - 重要な処理、抽象化した処理
    - 使い方/戻り値の補足/制約やエラー時の動作
