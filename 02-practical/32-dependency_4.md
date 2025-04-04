---
marp: true
math: mathjax
theme: katas
title: "読みやすいコードの作り方 - 依存関係(4)"
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# 読みやすいコードの作り方 - 依存関係(4)

_Code Readability_

<!-- 説明メモ： 結合度はけっこう大事なところなので、前回の話を振り返った上で次に進むこと -->

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

> 見た目を美しく整えることや、流行りのテクニックを取り入れることが「改善」だと思い込んでいませんか？

![bg right:30% 90%](assets/12-book.jpg)

---

## 依存関係とは

２つのクラス/関数/モジュールなどを組み合わせたときの『相手を使うクラス』『相手に使われるクラス』の関係のこと。

- <b>相手を使うクラス・関数</b>: **依存元**
- <b>相手に使われるクラス・関数</b>: **依存先**

![bg 100% right:19%](https://kroki.io/nomnoml/svg/eNqLTs5JLC5WiKipidW1i4ZwIoEcLgB33Ajz)

```cs
class X { // 依存元クラス
    Y other;
    void act() { other.doSomething(); }
}

class Y { // 依存先クラス
    void doSomething() { ... }
}
```

<!-- クラスとして表現した場合の、依存元クラスXと依存先クラスYのその他の関係はこういうものもある

- XがプロパティとしてYのインスタンスを持つ(スライドのとおり)
- XのメソッドがYを引数として取るか、戻り値として返す
- Xの中でYのメンバー(メソッドやプロパティ)にアクセスする
- XがYを継承している
 -->

---
 
 ## 理想的な依存関係

- 依存関係が弱い（≠依存関係がない）
- 循環依存や重複した依存がない
- 明示的な依存関係になっている

記述するコードがこれらのルールを守れている状態にする

<!-- 派生開発や未知のコード・スキル不足などで「必要最小限の変更」を繰り返していると依存関係が簡単に崩れていく -->

---

## 依存関係

1. **依存の強さ(結合度)**
1. 依存の方向
1. 依存の重複
1. 依存の明示性

---

## 結合度

ソフトウェアの分割がどの程度行き届いているかを測る尺度。

Reliable software through composite design(*1)の定義 ＋ Software Architect's Handbookの定義(*2)

![bg right height:400px](./assets/28-couplings.jpg)

>>> 1. Glenford J. Myers. 1975
>>> 2. Joseph Ingeno. 2018.
>>> 注： 外部結合の定義は文献によって全く異なるため原典を明記しています

---
## スタンプ結合 ＆ データ結合

値の受け渡しに関数の引数や戻り値を使い、制御結合ではない状態。弱い結合。

- 関数の引数や戻り値を使って値を受け渡し
- 引数に渡したデータ構造の一部のみ使う(スタンプ結合)

>>> ※両者の違い: <b>スタンプ結合</b>:構造体やクラスなどの構造的なデータの受け渡し / <b>データ結合</b>:プリミティブな値の受け渡し<br/>データ構造に対する依存がないぶんスタンプ結合の方が弱い結合だが、大差なし

---

## スタンプ結合 ＆ データ結合の例

引数はデータ結合、返り値はスタンプ結合になった例。

```cs
UserModel QueryUserModel(string userName, string userId) {
    // グローバル変数やクラスのメンバー変数を使わず
    // 引数として渡した値やデータ構造のみ使用してデータ取得
    return userModel;
}
```

→ 結合が強い方に従うのでこの関数はスタンプ結合相当になる。

---

## スタンプ結合よりもデータ結合が良いわけではない

```cs
[BAD]
// ...データ結合になるよう引数を必要なプリミティブ型だけに限定 💪
public void ShowUserProfile(string userName, string profileImageUrl) {
    // `userName`と `profileImageUrl`を使って「メッセージ送信者の情報」を
    // 画面に表示するコード
    ...
}

// UserDataのプロパティを取り出し渡す
ShowUserProfile(userData1.name, userData1.imageUrl);
```
**クイズ**: このコードに起こり得る問題を考えてみよう

>>> ※両者の違い: <b>スタンプ結合</b>:構造体やクラスなどの構造的なデータの受け渡し / <b>データ結合</b>:プリミティブな値の受け渡し
---

## 情報の粒度を考える

```cs
[BAD]
// 起こり得る問題の例
ShowUserProfile(userData1.name, otherUserData.imageUrl); // 別ユーザーが混じる
ShowUserProfile(userData1.imageUrl, otherUserData.name); // 名前とURLが逆
// その他 userData の中身を直接操作(userDataの操作責任が分散)
```

```cs
[BETTER] -- ただしこれも常に良いわけではない(UserDataの神クラス化を招く)
void ShowUserProfile(userData1) { ... }
```
<!-- 必要なデータだけ、プリミティブなデータだけ無理に取り出そうとしない。 この場合は同一のユーザーであることが確定しているので、引き離す必要がない-->
<!-- この解答の一方で、UserDataをどこでも引き回すようになると、神オブジェクトに変化していってしまうし、呼ぶ側も呼ばれる側もUserDataを引き回さないといけないので、奥深くの処理になっているときは扱いづらくなってしまう。 -->
<!-- あらゆる使い方をされてしまうことに思いを馳せること。 -->

---

## コードの外で定義されたデータ構造

外部(サーバー,別デバイス,ドライバー)との通信で使用するデータ構造を内部まで持ち込まない。界面で内部のデータ構造に検査・変換して使用する **← 関心の分離**

- データフレーム、パケット、エラー型や分類など

![center](./assets/32-datascope.png)

- 逆視点でも同じ。内部のデータ構造を外部通信にそのまま使わない

>>> 外部・内部で定義されたデータ形式を変換する緩衝レイヤーを独立して構築した場合、それはドメイン駆動開発における **『腐敗防止層』** になります。

<!-- スタンプ結合で使われるデータ構造が、コードの外部で定義されている場合は注意が必要。外側は基本的に不安定で変化・更新されやすいものであるため、その依存関係が自分のモジュールの奥底にまで侵食していることのリスクを考えてほしい -->
<!-- バリデーションなど正当性を評価して、不正なものを持ち込ませないようにできる -->
<!-- これもやりすぎには注意。レイヤーごとに別データ構造を設けたら重くなってしまい、自重で崩壊してしまう -->

---

## スタンプ結合＆データ結合のまとめ

- 値の受け渡しに関数の引数や戻り値を使う
    - 比較的弱い結合。無理にこれ以上弱くする必要はない
- スタンプ結合: 構造体やクラスの授受 / データ結合: プリミティブな値の授受
- 一応 スタンプ結合<データ結合 だが、常にデータ結合の方が良いわけでもない


---

## メッセージ結合

関数の引数や戻り値による情報の受け渡しをしない、単に関数を呼び出すだけの関係。非常に弱い結合。

- イベント発生の通知
- リソースの解放(デストラクタなど)

```cs
void CloseConnection() { // メッセージ結合の例。引数も戻り値も使っていない
    this._file.close();
    ...
}

CloseConnection();
```

…とはいえ、大局的に見た時にむしろ強い依存関係を作ることがある

---

## 一見メッセージ結合だが実質は共通結合

```cs
class SomeUIClass { // [BAD]
    private UserListPresenter _presenter = ...;
    void UpdateUserList(IList<User> users) {
        _presenter.Users = users;
        _presenter.NotifyUserListUpdated(); // ←一見メッセージ結合
    }
```

- `NotifyUserListUpdated()`だけ見るとメッセージ結合
- 実際は呼ばれる前に`Users`が更新されていることを想定
    - 広義の共通結合(=共有されたデータ構造を介した受け渡し)
    - `users`設定と`NotifyUserListUpdated()`の間に内容結合の危険性も

---

## 一見メッセージ結合だが実質は共通結合: 解決策

```cs
class SomeUIClass { // [BAD]
    private UserListPresenter _presenter = ...;
    void UpdateUserList(IList<User> users) {
        _presenter.Users = users;
        _presenter.NotifyUserListUpdated(); // ←一見メッセージ結合
    }
```
↓
```cs
class SomeUIClass { // [GOOD]
    private UserListPresenter _presenter = ...;
    void UpdateUserList(IList<User> users) {
        _presenter.NotifyUserListUpdated(users); // ←良いスタンプ結合
    }
```
---

## メッセージ結合のまとめ

- 関数の引数や戻り値による情報の受け渡しをせず関数を呼び出すだけ
    - 非常に弱い結合。
    - イベント送信やリソース解放などで登場
- 関数呼び出しの前に条件設定が必要な場合、見えない強結合が生まれていることがあるので注意する
    - メッセージ結合にこだわらず関数引数や戻り値を用いる
        - スタンプ結合・データ結合

---

## 結合度まとめ

|指標|結合度|状態|
|---|---|---|
|内容結合|強|隠すべき内容に依存している|
|共通結合|↓|他者も読み書きできる場所で値を受け渡し(データ構造)|
|外部結合|↓|〃(Primitive値)|
|制御結合|↓|動作を決める情報を渡して内部処理を切り替え|
|スタンプ結合|↓|関数の引数や戻り値を使って値を受け渡し(データ構造)|
|データ結合|↓|〃(Primitive値)|
|メッセージ結合|弱|引数/戻り値を持たない関数の呼び出し|

---

## 結合度まとめ

|指標|緩和策|
|---|---|
|内容結合|依存元に対する制約の最小化・責任範囲の明確化|
|共通結合|引数/戻り値を使った受け渡し・依存性注入の活用|
|外部結合|〃|
|制御結合|操作対象で分割・不要な条件分岐の除去・Strategyパターン|
|スタンプ結合|情報の不必要な細分化に注意する|
|データ結合|〃|
|メッセージ結合|隠れた依存関係の作り込みに注意する|

<!-- いずれの結合度においても、現代のモダンなプログラミング言語を使っていたとしても違反しうるものなので、注意 -->

---

## [補足] 凝集度について

タネ本では意図的に凝集度(モジュール強度)を紹介していない。

> - 元はモジュール間の関係性を表したもの
>     - １モジュール内に関係のない要素を含めるべきでない
> - タネ本の視点での「モジュール」は「関数/メソッド」
>     - → クラス内でメンバー変数を使用することも凝集度の低下につながる
>     - 「全メンバーもメソッドもpublicなので凝集度最高！」 🤔?
>     - 凝集度の論理的強度を高めるためには関数を分割すると、呼び出し側で制御結合が生まれる

**凝集度を見るには大域的な視点が必要＆凝集度にどのような定義を与えるかが重要**…なので独自定義を避けるために凝集度は紹介していない

<!-- 種本が紹介していない理由が面白いので紹介しておく -->
<!-- 
とはいえ凝集度は視点によっては重要になる。モジュールの関係では依然として有効だし、解釈を広げれば種本が問題にしているクラス内のメンバー同士の関係性やクラス間の関係性に持ち込んで、より変更に強いシステムを作り出すことも出来る。

視点を変えると凝集度の定義を厳密に取り入れることに無駄が生じる一つの例。
そういう考え方もあるということを理解しておく。原理主義というのは得てして問題を生むので、色んな解像度を得て中庸を行くのが良い -->
