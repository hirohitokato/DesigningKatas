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

# 読みやすいコードの作り方 - 依存関係(1)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 依存関係とは

２つのクラス/関数/モジュールなどを組み合わせたときの『相手を使うクラス』『相手に使われるクラス』の関係のこと。

* <b>相手を使うクラス・関数</b>: **依存元**
* <b>相手に使われるクラス・関数</b>: **依存先**

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

* XがプロパティとしてYのインスタンスを持つ(スライドのとおり)
* XのメソッドがYを引数として取るか、戻り値として返す
* Xの中でYのメンバー(メソッドやプロパティ)にアクセスする
* XがYを継承している
 -->

---
 
 ## 理想的な依存関係

* 依存関係が弱い（≠依存関係がない）
* 循環依存や重複した依存がない
* 明示的な依存関係になっている

記述するコードがこれらのルールを守れている状態にする

---

## 依存関係

1. **依存の強さ(結合度)**
1. 依存の方向
1. 依存の重複
1. 依存の明示性

---

## 結合度

ソフトウェアの分割がどの程度行き届いているかを図る尺度。

Reliable software through composite design(*1)の定義 ＋ Software Architect's Handbookの定義(*2)

![bg right height:400px](./assets/28-couplings.jpg)

>>> 1. Glenford J. Myers. 1975
>>> 2. Joseph Ingeno. 2018.
>>> 注： 外部結合の定義は文献によって全く異なるため原典を明記しています

---

## 共通結合 ＆ 外部結合$^※$

誰もが読み書きできる場所を使って値の受け渡しをすること

- グローバル変数を使って値を受け渡し
- 可変なシングルトンの使用
- ファイル/ネットワーク/デバイスや共有メモリなど、コードから単一のものとして見えるリソースを利用

>>> ※両者の違い: <b>共通結合</b>:構造体やクラスなどの構造的なデータの受け渡し / <b>外部結合</b>:プリミティブな値の受け渡し。<br/>データ構造に対する依存がないぶん外部結合の方が弱い結合だが、大差なし

<!-- １,2は避けるべきだが、３は必要不可欠なもの。高い結合度だからといって悪ではないという例でもある -->

---

## 共通結合＆外部結合のアンチパターンと回避策

### グローバル変数を使って値を受け渡し

→ 関数の引数と戻り値を使って値の受け渡しを行う

### 可変なシングルトンの使用

→ DI(Dependency Injection/依存性注入)を使う

---

## 可変なシングルトン使用の緩和策: DI

```cs
[BAD]
public static class UserModelRepository {
    public static UserModelRepository SharedInstance() { ... }
};

// 色々なクラス/場所で UserModelRepository.SharedInstance() を使用...
```

```cs
[GOOD]
class SomeClass {
    private UserModelRepository _userModelRepository;
    SomeClass(UserModelRepository repository) { _userModelRepository = repository; }

    // repositoryを介して使用
}
```

↑コンストラクタの呼び出し元がインスタンスの生存期間や参照を管理できる

---

## 念のため…身近に潜む共通結合

クラス内でも共通結合は起こせる。

```cs
[BAD]
class Klass {
    private int _result = -1; // 関数を跨いだ結合になっている
    public void Calculate(int lhs, int rhs) {
        _result = lhs + rhs;
    }

    public int GetResult() {
        return _result;
    }
}
```
---

## 制御結合

フラグなどにより複数の処理を分岐させている。分岐なので悪とは言い切れない。

ただし、

- 条件分岐の粒度が不必要に大きい
- 条件分岐間での動作の関連性が薄い

という状態に注意する。

---

## 制御結合のアンチパターン①: 条件分岐の粒度が不必要に大きい

**✕各条件分岐内の操作対象が同じにも関わらず大きな範囲で条件分岐している**

```cs
[BAD]
void UpdateView(bool isError) {
    if (isError) { // エラー発生を画面に表示する
        _resultView.Visible = false;
        _errorView.Visible = true;
        _iconView.Image = CROSS_MARK_IMAGE;
    } else { // 正常時は結果を画面に表示する
        _resultView.Visible = true;
        _errorView.Visible = false;
        _iconView.Image = CHECK_MARK_IMAGE;
    }
}
```
* 分岐の全てを読まないと「何をしているか」が分からない、仕様変更に弱い

---

## アンチパターン①の緩和策: 操作対象による分割

条件ではなく操作対象ごとにコードを分割する

```cs
[GOOD]
void UpdateView(bool isError) {
    _resultView.Visible = !isError;
    _errorView.Visible = isError;
    _iconView.Image = GetIconImage(isError);
}

Image GetIconImage(bool isError) {
    return isError ? CROSS_MARK_IMAGE : CHECK_MARK_IMAGE;
}
```

✔ 関数の流れが単純になり、制御結合をより細かい範囲に限定/隠蔽出来ている

---

## 制御結合のアンチパターン②: 条件分岐間での動作の関連性が薄い

```cs
[BAD]
void UpdateUserView(DataType dataType) {
    switch(dataType) {
    case DataType.UserName: // データ種別がユーザー名の場合
        _userNameView.Text = GetUserName(userId);
        break;
    case DataType.BirthDate: // データ種別が誕生日の場合
        _birthDateView.Text = GetBirthDate(userId);
        break;
    case DataType.ProfileImage: // プロフィール画像を更新
        _profileImageView.Image = FetchProfileImage(userId);
        ...
    }
}
```

* 抽象化しないと網羅表現できない
* dataTypeは依存元でも条件分岐で決めているかもしれない(分岐の重複)

---

## アンチパターン②の緩和策: 不必要な条件分岐の消去

```cs
void UpdateUserNameView() {
    _userNameView.Text = GetUserName(userId);
}

void UpdateBirthDateView() {
    _birthDateView.Text = GetBirthDate(userId);
}

void UpdateProfileImageView() {
    _profileImageView.Image = FetchProfileImage(userId);
}
```

無駄なポータルサイト(Facade)を作ろうとしない。

>>> ただし各関数内での処理多い場合には重複コードが増えて管理コストが爆発するので、ポリモーフィズムや関数テーブルの適用を考える

---

## 制御結合のまとめ

* 条件分岐によって
    * 分割すべき視点/範囲を誤って表現していないか
    * 関係のない処理を１つにまとめていないか
* 対策
    * 操作対象による分割で細かい範囲に限定/隠蔽する
    * 内部の条件分岐が必要かどうか考える

---

## スタンプ結合 ＆ データ結合

値の受け渡しに関数の引数や戻り値を使い、制御結合ではない状態。弱い結合。

- 関数の引数や戻り値を使って値を受け渡し
- 引数に渡したデータ構造の一部のみ使う(スタンプ結合)

>>> ※両者の違い: <b>スタンプ結合</b>:構造体やクラスなどの構造的なデータの受け渡し / <b>データ結合</b>:プリミティブな値の受け渡し<br/>データ構造に対する依存がないぶんスタンプ結合の方が弱い結合だが、大差なし

---

## スタンプ結合 ＆ データ結合の例

引数はデータ結合、返り値はスタンプ結合になった例。
結合が強い方に従うのでこの関数はスタンプ結合相当になる。

```cs
UserModel QueryUserModel(string userName, string userId) {
    // グローバル変数やクラスのメンバー変数を使わず
    // 引数として渡した値やデータ構造のみ使用してデータ取得
    return UserModel;
}
```

---

## スタンプ結合よりもデータ結合が良いわけではない

```cs
void ShowUserProfile(string userName, string profileImageUrl) {
    // `userName`と `profileImageUrl`を使って「メッセージ送信者」を
    // 画面に表示するコード
    ...
}
```
TODO

---

## メッセージ結合

---

TODO

---


