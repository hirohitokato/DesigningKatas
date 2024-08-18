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

# 読みやすいコードの作り方 - 関数(1)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 目的

関数の動作が予測しやすくなっていれば、中身を意識しなくてもよくなる。

* 関数名
* 仮引数
* 戻り値の型
* ドキュメンテーション

---

## 関数パートの説明内容

* 関数の責任
    * 責任の分割の基本方針
    * コマンドとクエリの分割
* 関数の流れ
    * 定義指向プログラミング
    * 早期リターン
    * 操作対象による分割

---

## 関数の責任

基本は単一責任の原則(SRP$^1$)を守る

**Q**: `queryUserData(string userId) -> UserData`という関数はどんな動きをする？


>>> 1. Single Responsibility Principle

---

## 関数の責任

基本は単一責任の原則(SRP$^1$)を守る

**Q**: `queryUserData(string userId) -> UserData`という関数はどんな動きをする？

- → ユーザーデータを取得する
    - → データ取得にネットワークなど外部へのアクセスが含まれるかも
* → データ削除や更新はする？何か他の処理はする？

>>> 1. Single Responsibility Principle

---

## 関数の責任: 要約を１行で書けるかどうか

```kt
fun ...(messageData: MessageData) {
    messageView.text = messageData.contentText
    senderNameView.text = messageData.senderName
    timestampView.text = messageData.sentTimeText
}
```

→ 「メッセージデータを画面にバインドする」

---

## 関数の責任: 要約を１行で書けるかどうか

```kt
fun ...(messageData: MessageData) {
    messageView.text = messageData.contentText
    senderNameView.text = messageData.senderName
    timestampView.text = messageData.sentTimeText

    let data = getDataFromNetwork(messageData.userId)
    setDataToDatabase(data)
}
```

→ 「メッセージデータを画面にバインドし、ユーザーIDから新しいデータを受け取ったらデータベースに格納する」
↓
複数の責任を持ってしまっているので、前半と後半を別関数に分ける

---

