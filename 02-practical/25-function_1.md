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

関数の動作が予測しやすくなっていれば、中身を意識しなくても良くなる。

* 関数名
* 仮引数
* 戻り値の型
* ドキュメンテーション

---

## 関数パートの説明内容

* 関数の責任
    * 責任の分割の基本方針
    * コマンドとクエリの分割(Command-Query Separation. CQS)
* 関数の流れ
    * 定義指向プログラミング
    * 早期リターン
    * 操作対象による分割

---

## 関数の責任

基本は単一責任の原則(SRP$^1$)を守る

**Q**: 関数`queryUserData(string userId) -> UserData`はどんな振る舞いを予想する？


>>> 1. Single Responsibility Principle

---

## 関数の責任

基本は単一責任の原則(SRP$^1$)を守る

**Q**: 関数`queryUserData(string userId) -> UserData`はどんな振る舞いを予想する？

- → ユーザーデータを取得する
    - → データ取得にネットワークなど外部へのアクセスが含まれるかも
* → データ削除や更新はする？何か他の処理はする？

>>> 1. Single Responsibility Principle

<!-- 想像から外れない実装にする。驚き最小の原則 -->

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

## 関数の責任: コマンド・クエリ分離の原則(CQS$^1$)

CQS: 「状態を変更するための関数(Command)」と「状態を知るための関数(Query)」とは別にする

- <b>コマンド</b>: 呼ばれたオブジェクトや実引数、外部の状態を変化させる関数。戻り値は持たない
- <b>クエリ</b>: 戻り値によって情報を取得する関数。呼ばれたオブジェクトや実引数、外部の状態は変化させない

この原則を守ると可読性や頑健性を高められる

>>> 1. Command-Query Separation. 元はバートランド・メイヤーの1988年の本で出てきた概念。名前は後日与えられた

<!-- CQS はC/Qのメソッドの分割パターン、 CQRS はレイヤーやモデルの（アーキテクチャレベルでの）分割パターンという解釈が良さそう。

* CQS: https://martinfowler.com/bliki/CommandQuerySeparation.html
* CQRS: https://martinfowler.com/bliki/CQRS.html
-->

---

## 関数の責任: コマンド・クエリ分離の原則(CQS)

```cs
var a = new IntList([1, 2, 3])
var b = new IntList([4, 5])
var c = a.getAppended(b) // 言語はC#を想定
```

この結果でc行を実行したときに a が `[1, 2, 3, 4, 5]` になっていたらどう思う？

<!-- a<<bは演算子のオーバーロード。元は -->
---

## (補足: 驚き最小の原則$^※$ )

> 驚き最小の原則とは、ユーザインタフェースやプログラミング言語の設計および人間工学において、インタフェースの2つの要素が互いに矛盾あるいは不明瞭だったときに、その動作としては人間のユーザやプログラマが最も自然に思える（驚きが少ない）ものを選択すべきだとする考え方
>
> _――― Wikipedia「[驚き最小の原則](https://ja.wikipedia.org/wiki/%E9%A9%9A%E3%81%8D%E6%9C%80%E5%B0%8F%E3%81%AE%E5%8E%9F%E5%89%87)」より_

相手にとって(この場合は関数を使う側)、予想外の振る舞いをしないことを意識して設計するべし

>>> ※Principle of least astonishment または Rule of least surprise。1966年ごろから言及されている様子

<!--
驚き最小の原則: https://ja.wikipedia.org/wiki/%E9%A9%9A%E3%81%8D%E6%9C%80%E5%B0%8F%E3%81%AE%E5%8E%9F%E5%89%87
-->

<!-- https://www.hyuki.com/kokoro/#surprise -->

<!-- よくある例だと
* アプリのショートカットキーが独特
* Webページでリンク先をクリックしたときに広告が表示されたり、Backボタンで戻っているはずなのに「こんな記事もおすすめ」と別のページが挟まれて出てきたりする
のが驚き最小の原則に違反している例 -->

---

## 関数の責任: CQS適用/不適用の境界

「これはCommandだから戻り値は絶対にvoid」は悪手。実行後に結果をgetするメソッドを書かないといけない処理は不具合の温床になる。

→ 関数の戻り値が主となる結果か、副次的な結果(メタデータ)かで判断する

* <b>主となる結果</b>:
    * `toInt()`や`splitByComma()`などの変換関数の変換後の値、算術演算の計算結果、ファクトリ関数で作成されたインスタンス
    * → **CQSを適用すべき**
* <b>副次的な結果</b>:
    * 失敗するかもしれない関数のエラー種別
    * → **CQSを適用しなくてよい**(クエリ系でも状態更新して良い)

---

## 関数の流れ

処理の流れが明瞭であるほど、短時間で概要を把握できる

* 詳細な挙動を読み飛ばしても理解できる
    * ネストの中、定義の右辺、エラーの処理など
* 関数中のどこが重要な部分化が分かりやすい
* 条件分岐を網羅して読まなくても理解できる

そのための方法として「<b>定義指向プログラミング</b>」「<b>早期リターン</b>」「<b>操作対象による分割</b>」がある

---

## 関数の流れ: 定義指向プログラミング

ネスト・メソッドチェーン・リテラルを使わず、名前のついた変数・関数・クラスの定義を多用するプログラミングスタイル

### 目的
> * 高い抽象度を与える
> * 斜め読みで概要を把握できるにする
> * 関数内の読み返しを減らす


<!-- ほかだとオブジェクト指向～、アスペクト指向～、データ指向～ -->