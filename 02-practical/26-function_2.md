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
1. 関数の流れ **←ｺｺｶﾗ!**
    * 定義指向プログラミング
    * 早期リターン
    * 操作対象による関数分割

---

# 2.関数の流れ

* 定義指向プログラミング
* 早期リターン
* 操作対象による関数分割

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


>>> 「定義指向プログラミング」について調べたが、その範囲ではこの本で表現されているのみでした。

<!-- ほかだとオブジェクト指向～、アスペクト指向～、データ指向～ -->

---

## 要改善パターン① : ネスト (例1)

```cs
[BAD]
someView.ShowDialogOnError(                   // (もし取得失敗したらエラーダイアログ表示)
    presenter.UpdateSelfProfileView(          // 2.得られたモデルをプロフィール画面に反映
        userRepository.queryUserModel(userId) // 1.ユーザーIDに紐づくデータを取得
    )
);
```

* 問題
    * どこが重要なコードなのか分かりにくい
    * 戻り値の意味/内容が読み取りにくい

---

## 要改善パターン① : ネスト (例1)

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
    var userModel = userRepository.queryUserModel(userId); // いちど変数に定義
    presenter.UpdateSelfProfileView(userModel);
}
catch (Exception e) { // エラーを変数に定義
    someView.ShowDialogOnError(e);
}
```

---

## 要改善パターン① : ネスト (例2)

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

## 要改善パターン① : ネスト (例2)

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

## 要改善パターン① : ネスト (例3)

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

## 要改善パターン① : ネスト (例3)
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

---

## 要改善パターン① : ネスト (例3)

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

## 要改善パターン② : メソッドチェーン

<b>メソッドチェーン</b>： メソッドの戻り値をレシーバとして、さらに別のメソッドを呼び出す書き方。

```swift
let label = UILabel()              // [Swift]ラベルオブジェクトを作成して
    .size(width: 100, height: 40)  // 幅と高さを設定し、
    .backgroundColor(.red)         // 背景色を赤にして、
    .text("テキスト")               // 表示する文字は「テキスト」
    .textColor(.white)             // 文字色は白(にしたものをlabelに代入)
self.view.addSubview(label) // 作成したラベルを画面に表示
```
```cs
var query = someList                // [C#]リスト構造のデータ
            .Where(x => x % 2 == 0) // 偶数の要素のみ取り出し
            .OrderBy(x => x)        // 昇順でソートして
            .Select(x => x * 3);    // 各値を３倍(したものをqueryに代入)
```

---
## 要改善パターン② : メソッドチェーンのメリット/デメリット

### :+1: メリット
* 関数評価や実行が上から順に行われるので、流れるように読める
* ネストが浅くなるため、メソッドと引数の関係が分かりやすい

### :-1: デメリット

* どこに重要なコードがあるのか分かりにくい
* 途中の状態やレシーバが何か分かりにくい
* 毎回全部読まないと処理が分からない
* あとからの機能変更がしにくい

→ 何もかもメソッドチェーンだけで書こうとしない。途中で分ける

<!-- （ブレークポイントが文の途中で設定できるものは一部のみ） -->
<!-- つまるところ途中状態のないクイズを作っている状態なので、神メソッドチェーンになっておいそれと触れなくなる -->

---

## 要改善パターン② : メソッドチェーン

→ 重要な部分でメソッドチェーンをいちど切る

```kt
[GOOD]
val friendProfileBitmaps = userModelList
    .filter { userModel -> userModel.isFriend }
    .map { userModel -> userModel.profileBitmap }

friendProfileBitmaps
    .forEach { bitmap → imageGridView.addImage(bitmap) }
```

<!-- ここでの分け方は、「データの抽出」と「(抽出した)データへの処理」。このパターンは本当に多いので意識してみると良い -->

---

## 要改善パターン③ : リテラル

<b>リテラル</b>： ソースコード内で直接表現された値や書式のこと

```cs
/* ※C#のコードです */

true, false // booleanリテラル
10000 // 整数リテラル
"文字列リテラル"
"""生文字リテラル"""
(x) => x * 3 // ラムダ
```

>>> C++ではユーザー定義リテラルなどもある

---

## 要改善パターン③ : リテラル

マジックナンバー$^1$にも「(使っても)良いマジックナンバー」と「悪いマジックナンバー」がある

* <b>良いマジックナンバー</b>
    * 意味が自明で変わることがないもの
        * 配列の先頭を表す「`0`」、中央の計算を表す「`/ 2`」など
* <b>悪いマジックナンバー</b>
    * それ以外のもの

**→ 悪いマジックナンバーは名前を付けて置き換えるべき**

>>> 1. 整数や文字列などのプリミティブなデータ型で、名前のついていないリテラルのこと

---
## 要改善パターン③ : リテラル

「悪いマジックナンバー」の解像度も上げよう

**[問題]**
このマジックナンバーが悪い理由を言語化してください。

```cs
const int TEN_THOUSAND = 10000;
```

---

## 要改善パターン③ : リテラル

「悪いマジックナンバー」の解像度も上げよう

**[問題]**
このマジックナンバーが悪い理由を言語化してください。

```cs
const int TEN_THOUSAND = 10000;
```

↓

**回答(例):**
* 名前による意味付けができていない
* 目的を絞れていない

>→ **同じ値が別の目的で使われないよう、マジックナンバーを定義・命名する**

---

## クラス内でメソッド分割を行うときの注意点

メンバ変数(プロパティ)を扱うメソッドを局所化する。

```cs
[BAD]
class SomeClass {
    private View userNameTextView;
    private View profileImageView;

    SomeClass() {
        userNameTextView = new View();
        /* …userNameTextViewに対する長い初期化処理… */

        profileImageView = new View();
        /* …profileImageViewに対する長い初期化処理… */
    }
}
```

---
## クラス内でメソッド分割を行うときの注意点

```cs
[BAD]
class SomeClass {
    private View userNameTextView;
    private View profileImageView;
    SomeClass() {
        this.InitializeUserNameTextView();
        this.InitializeProfileImageView();
    }

    private void InitializeUserNameTextView() {
        userNameTextView = new View();
        /* …userNameTextViewに対する長い初期化処理… */
    }
    private void InitializeProfileImageView() {
        profileImageView = new View();
        /* …profileImageViewに対する長い初期化処理… */
    }
}
```

---
## クラス内でメソッド分割を行うときの注意点

```cs
[GOOD]
class SomeClass {
    private View userNameTextView;
    private View profileImageView;
    SomeClass() {
        userNameTextView = this.CreateUserNameTextView();
        profileImageView = this.CreateProfileImageView();
    }

    private View CreateUserNameTextView() { // 名前がInitialize～からCreate～に変わった点も注目
        var view = new View();
        /* …userNameTextViewに対する長い初期化処理… */
        return view; // ローカル変数で作ったビューを返している(＝メンバー変数に触れていない)
    }
    private View CreateProfileImageView() {
        var view = new View();
        /* …profileImageViewに対する長い初期化処理… */
        return view;
    }
}
```
---

## 早期リターン(Early return)

ハッピーパスとアンハッピーパスのうち、アンハッピーパスを早い段階で除外する

* <b>ハッピーパス</b>
    * 関数の主な目的を達成するときの処理の流れ。正常系
* <b>アンハッピーパス</b>
    * 目的を達成できないときの処理の流れ。異常系

**→ アンハッピーパスが関数先頭にまとまり、以降もハッピーパスのみに意識を向けて読めるようになる**

---

## 早期リターンができていない例

```py
[BAD]
if is_network_available():
    query_result = query_to_server()
    if query_result.is_valid:
        result_str = query_result.parse()
        if result_str != "":
            # ...ハッピーパスの実装...
    else:
        show_invalid_response_dialog() # アンハッピーパス２
else:
    show_network_unavailable_dialog() # アンハッピーパス１
```

…３つ目のif文がelseを持っていないのに気づきましたか？アンハッピーパスの記述順がチェック順と異なっているのに気が付きましたか？

---

## 早期リターンによる改善例

```py
[GOOD]
if not is_network_available:
    show_network_unavailable_dialog() # アンハッピーパス１
    return

query_result = query_to_server()
if not query_result.is_valid:
    show_invalid_response_dialog() # アンハッピーパス２
    return

result_str = query_result.parse()
if result_str == "":
    return # アンハッピーパス３

# ...ハッピーパスの実装...
```

---

## 早期リターンのコツ

* 早期リターンのまとまりを明確にする
    * switch文の一部にreturnが紛れていたりすると可読性が落ちる
* アンハッピーパスの妥当性に注意する
    * コードが離れるためハッピーパスの仕様変更に追従しづらくなる
    * 不要なチェックまで残りがちなのでハッピーパスと共に管理するよう気をつける

---

## 操作対象による関数分割(_split by object, not condition_)

大きくなった、責務が混在した関数を分割するときは