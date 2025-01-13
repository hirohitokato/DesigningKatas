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

# 読みやすいコードの作り方 - 関数(2)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

> 見た目を美しく整えることや、流行りのテクニックを取り入れることが「改善」だと思い込んでいませんか？

![bg right:30% 90%](assets/12-book.jpg)

---

## 読んですぐに理解できる関数を書く

関数の動作が予測しやすくなっていれば、中身を意識しなくても良くなる。

> 関数名, 仮引数, 戻り値の型, ドキュメンテーション, ...

**斜め読みしても意味が分かる構成であれば、問題も見つけやすい**

- 関数の名前の意味とその動作が一致しているか
- 関数の名前が十分に具体的か
- ドキュメンテーションの要約が容易に書けるか

<!-- 命名という話だけではなく、その実装においても大事という話。命名は命名編を見てほしい -->

---

## 関数パートの説明内容

1. 関数の責任
    - 責任の分割の基本方針
    - コマンドとクエリの分割(Command-Query Separation. CQS)
1. 関数の流れ **←ｺｺｶﾗ!**
    - 定義指向プログラミング
    - 早期リターン

---

## 2.関数の流れ

処理の流れが明瞭であるほど、短時間で概要を把握できる

- 詳細な挙動を読み飛ばしても理解できる
    - ネストの中、定義の右辺、エラーの処理など
- 関数中のどこが重要な部分かが分かりやすい
- 条件分岐を網羅して読まなくても理解できる

そのための方法として「<b>定義指向プログラミング</b>」「<b>早期リターン</b>」「<b>操作対象による分割</b>」がある

---

## 関数の流れ: 定義指向プログラミング

ネスト・メソッドチェーン・リテラルを使わず、名前のついた変数・関数・クラスの定義を多用するプログラミングスタイル

### 目的
> - 高い抽象度を与える
> - 斜め読みで概要を把握できるにする
> - 関数内の読み返しを減らす


>>> 「定義指向プログラミング」について調べたものの、調べ得た範囲ではこの本が初出でした。

<!-- ほかだとオブジェクト指向～、アスペクト指向～、データ指向～ -->

---

## 定義指向プログラミングの例

メソッドの深いネストを避けられ、途中処理の意味も伝えられる

```py
# func_a()関数の意味が分かりにくい
c = calculate_sqrt(func_a(a, 2), func_a(b, 2))
```
↓
```py
# 定義指向プログラミング
# func_aは累乗を計算する関数(==pow())だと読み取れるようになる
a_square = func_a(a, 2)
b_square = func_a(b, 2)
c = calculate_sqrt(a_square + b_square)
```

`#define M_PI 3.14159`,`const NAME_KEY="name"`なども同じ

---

## 定義指向プログラミング適用例① : ネスト (例1)

```cs
[BAD]
someView.ShowDialogOnError(                   // (もし取得失敗したらエラーダイアログ表示)
    presenter.UpdateSelfProfileView(          // 2.得られたモデルをプロフィール画面に反映
        userRepository.queryUserModel(userId) // 1.ユーザーIDに紐づくデータを取得
    )
);
```

- 問題
    - どこが重要なコードなのか分かりにくい
    - 戻り値の意味/内容が読み取りにくい

---

## 定義指向プログラミング適用例① : ネスト (例1)

```cs
[BAD]
someView.ShowDialogOnError(                   // (もし取得失敗したらエラーダイアログ表示)
    presenter.UpdateSelfProfileView(          // 2.得られたモデルをプロフィール画面に反映
        userRepository.queryUserModel(userId) // 1.ユーザーIDに紐づくデータを取得
    )
);
```
↓
```cs
[GOOD]
try {
    var userModel = userRepository.queryUserModel(userId); // 変数にいったん定義
    presenter.UpdateSelfProfileView(userModel);
}
catch (Exception e) { // エラーを変数に定義
    someView.ShowDialogOnError(e);
}
```

---

## 定義指向プログラミング適用例① : ネスト (例2)

```cs
[BAD]
if (messageModelList.HasValidModel(messageId)) {
    if (messageListPresenter.IsMessageShown(messageId)) {
        if (requestQueue.Contains(messageId)) {
            view.ShowStatusText("送信中です");
        }
    }
} // ↓↓↓↓ これを定義指向プログラミングで書き換えて見ようとした結果… ↓↓↓↓
```
```cs
[NOT GOOD] // なぜNOT GOODかを考えてみよう
var isMessageValid = messageModelList.HasValidModel(messageId);
var isMessageViewShown = messageListPresenter.IsMessageShown(messageId);
var isMessageSengingOngoing = requestQueue.Contains(messageId);

if (isMessageValid && isMessageViewShown && isMessageSengingOngoing) {
    view.ShowStatusText("送信中です");
}
```

---

## 定義指向プログラミング適用例① : ネスト (例2)

定義先を変数ではなく関数とすると良い（こともある）

```cs
[GOOD]
bool _IsValidMessage(messageId) => messageModelList.HasValidModel(messageId);
bool _IsViewShownFor(messageId) => messageListPresenter.IsMessageShown(messageId);
bool _IsUnderSending(messageId) => requestQueue.Contains(messageId);
︙
if (_IsValidMessage(messageId) &&
    _IsViewShownFor(messageId) &&
    _IsUnderSending(messageId))
{
    view.ShowStatusText("送信中です");
}
```

---

## 定義指向プログラミング適用例① : ネスト (例3)

![bg right:30% 90%](assets/25-for_nest.png)

ネストだからと何でも削れば良いわけではない。

```cs
[BAD]
void ...(List<MessageListPage> messageListPages) {
    // ページのまとまりからメッセージを順に取り出し格納する
    for (messageListPage in messageListPages) {
        for (messageListChunk in messageListPage) {
            for (messageModel in messageListChunk) {
                repository.storeMessage(messageModel);
            }
        }
    }
}
```

---

## 定義指向プログラミング適用例① : ネスト (例3)
かえって読みにくくなってしまっている。
```cs
[BAD] /* スペースの都合でfor文の括弧を省いているので注意 */
void ...(List<MessageListPage> messageListPages) {
    for (messageListPage in messageListPages)
        this.storeMessageForPage(messageListPage);
}

private void storeMessageForPage(MessageListPage page) {
    for (chunk in page)
        storeMessageForChunk(chunk);
}

private void storeMessageForChunk(MessageListChunk chunk) {
    for (messageModel in chunk)
        repository.storeMessage(messageModel);
}
```

<!-- 個々の関数内ではまるでネストが存在しないように出来たかに見えるが、問題はいくつかある。
- いちばん重要な`repository.storeMessage(messageModel);`が最奥部に隠れてしまっている
- 関数の依存関係が増えてしまって手を出しにくい
- 結局元のページ構造を正しく理解しないと読めない/使えない構造になっている

皮肉なことに、可読性を追求した結果が読みにくく使いづらいものになっている
 -->
---

## 定義指向プログラミング適用例① : ネスト (例3)

**[対象を取り出す処理]** と **[対象に対して行う処理]** とで分割する

```cs
[GOOD]
private void forEachMessage(List<MessageListPage> pages, Action<MessageModel> action) {
    // スペースの都合でfor文の括弧を省いているので注意
    for (page in pages)
        for (chunk in page)
            for(messageModel in chunk)
                action(messageModel);
}
```
```cs
// 使用方法
void ...(List<MessageListPage> messageListPages) {
    forEachMessage(messageListPages, (messageModel) => {
        repository.storeMessage(messageModel);
    }
}
```

---

## 補足: 書籍『リーダブルコード』(*)

変数を「説明変数」「要約変数」２つの意味に分けている

- **説明変数**: 値の意味が何であるかを説明する変数
- **要約変数**: 式の意味を要約する変数

これらを目的に変数を使うとコードがより分かりやすくなる。

>>> *:Dustin Boswell, Trevor Foucher, 須藤功平(解説),角征典(訳).2012. オライリー・ジャパン

---

## 脇道: ループ・分岐処理の解像度を上げる

for文などの繰り返し処理は２つの責務が混じっている。分割して考えられるようになると良い。

- 一定の条件下で処理を繰り返す
- 繰り返しの中で抽出される要素に対して処理を行う

> 🤔`std::for_each(c++)`, `map(swift,kotlin)`, `Select(C#)`などのアルゴリズム関数がなぜ存在しているかを考えてみよう

> switch～caseも同じ。分岐することと、分岐先での処理とを別責務と考える

共通化の対象は内側だけでなく外側にもある。

<!-- これらが分離して考えられるようになると、繰り返し処理の一般化が出来るようになったり、分岐箇所が見通し良く書けるようになったり、さらに分岐からオブジェクト指向のポリモーフィズムが考えられるようになる -->

<!-- 大圖衛玄(Moriharu Ohzu)著 『ゲームプログラマのためのコーディング技術』 より -->

---

## ここまでのまとめ

関数の流れ・処理の流れが明瞭であるほど、短時間で概要を把握できる

- 定義指向プログラミング
    - 名前のついた変数・関数・クラスの定義を多用するプログラミングスタイル
        - ネスト・メソッドチェーン・リテラルに有効
    - 処理がネストしないように、定義を途中挟みながら「定義のかたまり」を作っていく
- ループや分岐処理の解像度も上げよう

次回はメソッドチェーン・リテラルを定義指向プログラミングで解決する話を続けます。
