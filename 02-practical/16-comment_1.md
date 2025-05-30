---
marp: true
math: mathjax
theme: katas
title: "読みやすいコードの作り方 - コメント(1)"
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# 読みやすいコードの作り方 - コメント(1)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4初版

> 見た目を美しく整えることや、流行りのテクニックを取り入れることが「改善」だと思い込んでいませんか？

![bg right:30% 90%](assets/12-book.jpg)

---

## コメント

1. **コメントの種類と目的**
2. **ドキュメンテーション**
3. 非形式的なコメント

---

## コメントはなぜ存在するのか

コードだけでは高い可読性を維持できるとは限らないため

- 命名の工夫、簡潔なコードでも伝えられない事柄がある

![bg 70% right:40%](assets/16-whynot_in_comments.png)
>>> 画像は https://twitter.com/t_wada/status/904916106153828352 より。[PIEの説明](../01-basics/09-pie.md)でも登場しました。

<!-- 「Why not」というのは「なぜ別のやり方を採用しなかったか」「あえてやっていないこと」という意味。
そこでコメントを書く目的や書く際の注意点を含め、どのようなコメントを書くべきかについて説明していく -->

<!-- ただ、これも当てはまる場合とそうでない場合もある。その解像度を上げていきましょう -->

---

## ドキュメンテーションコメントと非形式的なコメント

- **ドキュメンテーションコメント**: 形式的な説明。クラス/関数/変数の宣言や定義に使う
    - pydoc, Documentation Comment, Doxygen, etc.によりドキュメントを自動生成、ツールで表示(下図)
- **非形式的なコメント**: 定義・宣言に限らずコードのあらゆる場所に書かれる

![center](assets/16-docucomment_swift.png)

---

## コメントを書く理由

1. コードの理解を加速させる
2. ミスを防ぐ
3. リファクタリングを促進する
4. IDEやドキュメンテーションツールを用いた開発の補助

これらの恩恵が特にない場合、コメントを書く必要なし

---

## コメントからのリファクタリング

```kotlin
/** <<BAD>>
 - キーワードとその説明文のペア [newData] を追加する。
 *
 - 追加した定義は [getDescription] メソッドで参照できる。
 - もしキーワードが追加済ならば、何もせずに `false` を返す。
 - それ以外の場合の追加処理は成功し、 `true` を返す。
 */
fun add(newData: Pair<String, String>): Boolean
```

---

## コメントからのリファクタリング

```kotlin
/** <<BAD>>
 - キーワードとその説明文のペア [newData] を追加する。
 *
 - 追加した定義は [getDescription] メソッドで参照できる。
 - もしキーワードが追加済みならば、何もせずに `false` を返す。
 - それ以外の場合の追加処理は成功し、 `true` を返す。
 */
fun add(newData: Pair<String, String>): Boolean
```

- `add`というメソッド名の意味が実際の動作と比べて広すぎる
- `newData`という仮引数名の情報量が少ない
- 追加済みの場合の挙動が一般的ではない

---

## リファクタリング後

```kt
/** <<GOOD>>
 - キーワード[keyword]に対する説明[description]を新規に登録、もしくは上書きする
 *
 - 登録された定義は、[getDescription]によって取得できる。
 */
fun registerDescription(keyword: String, description: String)
```

---

## その他のコメントの目的

- 統合開発環境(IDE)やエディタのためのコメント
    - `// TODO: 〜`, `//FIXME: 〜`, `#region 〜 #endregion` など
- メタプログラミングを行うためのコメント
    - `#!/bin/sh` と書くなど$^1$
- 型や制約の検証・解析をするためのコメント
    - Pythonの型コメント(PEP484)、Closure compilerの型アノテーションなど
- 継続的インテグレーション
>>> 1: UNIXスクリプトで１行目にインタプリタを指定する方法。shebang。

---

## コメント

1. コメントの種類と目的
2. **ドキュメンテーション**
3. 非形式的なコメント

---

<!-- p64 -->

## ドキュメンテーションコメント

コード中の宣言や定義に対して決められた書式で書くコメントのこと

- 関数・クラス・ファイルやパッケージなど
- プログラミング言語やドキュメンテーションツールによって異なる
    - Python(PyDoc): `""" 〜 """`, C++/C#系: `/** 〜 */`で括られたコメント
- APIリファレンスや、エディタ上でのクイックヒントなどに使われる

![center 25%](assets/16-docucomment_swift.png)

---

<!-- ここは本の3-2-2(p70)と少し先取りしているので注意 -->

## ドキュメンテーションの構成

ドキュメンテーションには要約と詳細とを書き、トップダウンで読み進められる内容を心がける

|パート|書くこと|
|---|---|
|**要約**|先頭行(段落)。コードが何であるのか・何をするのか(簡潔に)|
|**詳細**|基本的な使い方・戻り値の補足・制約やエラー時の動作<br>(どうやって使うか、何に注意するか分かりやすく)|

---

### ドキュメンテーションの例(Kotlin)

```kt
/**
 - キーワードとそれに対応する説明を、それぞれ文字列として保持する辞書クラス
 *
 - ...(詳細：基本的な使い方などを書く)...
 */
 class Dictionary {
    /**
     - [registerDescription]で登録済みの[keyword]に対する説明を取得する。
     *
     - ...(詳細：未定義のkeywordだった場合にどうなるかなどを書く)...
     */
    fun getDescription(keyword: String): String { ... }
 }
```

常体(普通体。だ・である調)と敬体(丁寧体。です・ます調)はプロジェクトで統一する

---

<!-- p65に戻る -->

## ドキュメンテーションコメントのアンチパターン

1. 自動生成されたドキュメンテーションの放置
2. 宣言と同じ内容を繰り返す
3. コードを自然言語に翻訳しただけ
4. 概要を書かない
5. 実装の詳細に言及する
6. コードを使う側の内容に言及する

---

### 1. 自動生成されたドキュメンテーションの放置

```kt
/** <<BAD>>
 - @param keyword
 - @return
 */
fun getDescription(keyword: String): String { … }
```

### 2. 宣言と同じ内容を繰り返す

```kt
/** <<BAD>>
 - [keyword] に対する説明を取得する。
 */
fun getDescription(keyword: String): String { … }
```

---

## 3. コードを自然言語に翻訳しただけ

```kt
/** <<BAD>>
 - もし`conditionA`が成り立つなら[doA]を呼び出す。
 - そうでないなら[doB]を呼び出し、さらにもし`conditionC`が成り立つなら …<snip>
 */
fun getDescription(keyword: String): String {
    if (conditionA) {
        doA()
    } else {
        doB()
        if (conditionC) { … }
    }
}
```

---

## 4. 概要を書かない

```kt
/** <<BAD>>
 - 与えられた[keyword]が空文字の場合は、例外を投げる。
 */
fun getDescription(keyword: String): String { … }
```

## 5. 実装の詳細に言及する

```kt
/** <<BAD>>
 - プライベートメンバーの[dictionary]が保持している文字列を返す。
 */
fun getDescription(keyword: String): String { … }
```

---

## 6. コードを使う側の内容に言及する

```kt
/** <<BAD>>
 - ・・・(概要)・・・
 - この関数は[UserProfilePresenter]によって使用される。
 */
fun getDescription(keyword: String): String { … }
```

---

## ではドキュメンテーションコメントに何を書けば良いのか

- コードが何であるのか・何をするのかを最初に要約部で簡潔に説明する
    - 詳細部で具体的な内容に言及する
- 抽象度や粒度をコードよりも高く保つ
- 実装の詳細やコードを使う側には言及しない

<!-- 和田卓人氏が「コードコメントにはWhy notを書こう」という話をしたが、ドキュメンテーションにその記述は不要。何であるか、どういう使い方が出来るのかを説明するのが役割なので。 -->
