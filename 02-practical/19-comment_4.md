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

# 読みやすいコードの作り方 - コメント(4)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

![bg right:30% 90%](assets/12-book.jpg)

---

## コメント

1. コメントの種類と目的
2. ドキュメンテーション
3. 非形式的なコメント **← ｺｺﾏﾃﾞｷﾀ!**

---

## 非形式的なコメント

定義・宣言以外の任意の場所で書くコメント。目的は同じだが役割が異なる

* **ドキュメンテーション**: コードの中身を読まなくても概要を理解するためのもの
    * 書き方が定まっている
    * トップダウンで記述する
* **非形式的なコメント**: コードを読む際に補助をするためのもの
    * 要約が必須ではない
    * 書く内容が多岐にわたり、特定の形式を持たない

今回は「大きなコードの分割」＆「非直感的なコードの説明」の２つに絞って紹介

---

## 大きなコードの分割

コードが長くても別クラスや関数に抽出・分割しないほうが良いケースもある。

1. 空行を使ってまとまりを作る
1. 分割されたまとまりの１つ１つにコメントを追加する

```kt
fun ...() {
    // メッセージモデルをキャッシュから取得する
    val messageCache = ...
    val messageKey = ...
     ︙

     // メッセージモデルのキャッシュが存在しないなら、データベースから取得する
     if (messageModel == null || ...) { ... }
     ︙
```
コメントの抽象度を高く、粒度を粗く保つよう注意する

---

## 非直感的なコードの説明

パッと見て分からないコードを補足することで可読性を改善できる

* 誤解を生みやすいコードに対する注意点を明確にする
* 放って置くと間違った方法でリファクタリングされかねないコードに釘を刺す

---

```kt
class WordReplacementEntry (
    val startIndex: Int
    val endIndex: Int
    val newText: Int
)

/** 文字列を置換。 */
fun ...() {
    val stringBuilder: StringBuilder = ...
    val entries: List<WordReplacementEntry> = ...

    for (entry in entries.reverse()) {
        stringBuilder.replace(entry.startIndex, entry.endIndex, entry.newText)
    }
}
```