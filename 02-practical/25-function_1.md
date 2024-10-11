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

## 読んですぐに理解できる関数を書く

関数の動作が予測しやすくなっていれば、中身を意識しなくても良くなる。

> 関数名, 仮引数, 戻り値の型, ドキュメンテーション, ...

**斜め読みしても意味が分かる構成であれば、問題も見つけやすい**

* 関数の名前の意味とその動作が一致しているか
* 関数の名前が十分に具体的か
* ドキュメンテーションの要約が容易に書けるか

<!-- 命名という話だけではなく、その実装においても大事という話。命名は命名編を見てほしい -->

---

## 関数パートの説明内容

1. 関数の責任
    * 責任の分割の基本方針
    * コマンドとクエリの分割(Command-Query Separation. CQS)
1. 関数の流れ
    * 定義指向プログラミング
    * 早期リターン
    * 操作対象による関数分割

---

# 1. 関数の責任

* 責任の分割の基本方針
* コマンドとクエリの分割(Command-Query Separation. CQS)

---

## 関数の責任

関数においても単一責任の原則(SRP$^1$)を守る。責任範囲の曖昧な処理のまとまりを作らない。

<b>複数の責任を持っている</b>
→ **抽象的に理解しづらくなる・再利用性が低下する**

> **問題**:
> 関数`queryUserData(string userId) -> UserData`はどんな振る舞いを予想する？


>>> 1. Single Responsibility Principle

---

## 関数の責任

> **問題**:
> 関数`queryUserData(string userId) -> UserData`はどんな振る舞いを予想する？

- → ユーザーデータを取得する
    - → データ取得にネットワークなど外部へのアクセスが含まれるかも
* → データ削除や更新はする？何か他の処理はする？

>>> 1. Single Responsibility Principle

<!-- 想像から外れない実装にする。驚き最小の原則 -->

---

## 責任分割の良し悪し ∋ **処理の要約を１行で書けるかどうか**

```kt
// [GOOD]
fun ...(messageData: MessageData) {
    messageView.text = messageData.contentText
    senderNameView.text = messageData.senderName
    timestampView.text = messageData.sentTimeText
}
```

→ 「メッセージデータの持つ情報を画面に表示する」

---

## 関数の責任: 要約を１行で書けるかどうか

```kt
// [BAD]
fun ...(messageData: MessageData) {
    messageView.text = messageData.contentText
    senderNameView.text = messageData.senderName
    timestampView.text = messageData.sentTimeText

    let data = getDataFromNetwork(messageData.userId)
    setDataToDatabase(data)
}
```

→ 「メッセージデータを画面に表示し、ユーザーIDから新しいデータを受け取ったらデータベースに格納する」
↓
複数の責任を持ってしまっている

---

## 関数の責任: 要約を１行で書けるかどうか

改善後のコード。前半と後半を別関数に分けた：

```kt
// [GOOD]
fun ...(messageData: MessageData) {
    messageView.text = messageData.contentText
    senderNameView.text = messageData.senderName
    timestampView.text = messageData.sentTimeText
}

 ＆ // 複数に分ける

fun ...(userId: String) {
    let data = getDataFromNetwork(userId)
    setDataToDatabase(data)
}
```

---

## 関数の責任: コマンド・クエリ分離の原則(CQS$^1$)

「<b>状態を変更するための関数(Command)</b>」と「<b>状態を知るための関数(Query)</b>」とを別にする

- <b>コマンド</b>: 呼ばれたオブジェクトや実引数、外部の状態を変化させる関数。戻り値は持たない
- <b>クエリ</b>: 戻り値によって情報を取得する関数。呼ばれたオブジェクトや実引数、外部の状態は変化させない

この原則を守ると責任が単一になっていき、可読性や頑健性を高めやすくなる

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
var c = a.getAppended(b) // 言語はC#を想定。リストaにbを追加した配列を返す
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

## 関数の責任: コマンド・クエリ分離の原則(CQS)

* コマンド
    * ユーザー情報を更新する、 設定変更する、 HTTP POST/UPDATE、…
* クエリ
    * オブジェクトが保持しているデータを返す、 HTTP GET、 …

<!-- データ送信の場合などで、送信するからコマンドなのかなと一括りで考えないようにする。
相手側の状態を変えるものであればコマンド(POST)、変えなければクエリ(GET)とか。
組込プログラミングの場合だと、何かの値を取得するための処理として

    1. ある命令を相手に送信して、相手の状態を送信状態に変更する
    2. 送信状態になった相手からデータが送られてくる
    3. 必要なデータを受け取ったら命令を送信して、相手のデータ送信モードを解除する

といった手順を踏むことがある。この場合、値の取得処理であっても
相手の状態を変更することがあるのでコマンドなのかクエリなのか分からなくなることがあるかもしれない。
この場合は、1-3をひとまとめにした処理として見て、処理が終わったあとに相手の状態が変化していないからクエリ、
という視点もできる。（ファイルから読み込むときもファイルをオープンして読んでクローズして…と状態変化するし）

なのでコマンド・クエリというのを考える時には１つ１つを細かくして考えず、責任範囲の前後において
どうなっているかを考えると良い
-->

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

