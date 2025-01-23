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

# 読みやすいコードの作り方 - 依存関係(5)

_Code Readability_

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

1. 依存の強さ(結合度)
1. 依存の方向
1. 依存の重複
1. **依存の明示性**

---

## 依存の明示性

![bg 90% right:30%](./assets/34-implicit_dependence.png)
明示的な依存関係だけでなく「コードから見えない依存関係(暗黙的な依存関係)」にも気を配る
（右のコードは実体の注入箇所を見て初めて分かる）

- ポリモーフィズムの実クラス
- 型定義のないデータフォーマット
- 引数や戻り値の変域
- 同じようなコードのコピー

過度な抽象化、極端な低結合度、… etc.
 → **「薬も過ぎれば毒になる」**

---

## アンチパターン(1) 過度な抽象化

![height:120px center](./assets/34-too_abstraction1.png)

```cs
class CurrentDatePresenter { // 現在の日付を表示するクラス
    private DateTextFormatter _dateTextFormatter; // 日付(数値)→文字列変換
    void showCurrentTime() { /* _dateTextFormatterを使った処理 */ }
}

class UserProfilePresenter { // ユーザー情報を表示するクラス
    private UserProfileRepository _repository; // ユーザーID(数値)→文字列取得
    void showProfile(int userId) { /* _repositoryを使った処理 */ }
}
```

🤔「どちらも数値→文字列の処理を持ってるな…そうだ、共通部分を抽象化だ！」

---

## アンチパターン(1) 過度な抽象化


```cs
[BAD]
// 数値を文字列に変換する最高のクラス
interface NumToStringConverter {
    string convert(int value);
}

class DateTextFormatter:  NumToStringConverter { ... }
class UserProfileRepository:  NumToStringConverter { ... }
```

🤔「変換部分をインターフェースとして切り出して…継承して…」

---

## アンチパターン(1) 過度な抽象化

```cs
[BAD]
class CurrentDatePresenter { // 現在の日付を表示するクラス
    private NumToStringConverter _dateTextFormatter; // 日付(数値)→文字列変換
    void showCurrentTime() { /* _dateTextFormatterを使った処理 */ }
}

class UserProfilePresenter { // ユーザー情報を表示するクラス
    private NumToStringConverter _repository; // ユーザーID(数値)→文字列取得
    void showProfile(int userId) { /* _repositoryを使った処理 */ }
}
```

🤔「できた…完璧すぎる…」

---

## アンチパターン(1) 過度な抽象化

悪化。動作の流れが暗黙的になって追いにくく、入れ替えても意味がない処理が変えられるようになってしまっている

<center>

|状況|クラス図|
|---|---|
|before|![height:120px](./assets/34-too_abstraction1.png)|
|after👎|![height:170px](./assets/34-too_abstraction2.png)|

</center>

---

## DI(Dependency Injection.依存性注入)の光と闇

> DIとは、オブジェクト間の依存関係をハードコーディングせずに解決する設計パターンのこと。静的なオブジェクト指向言語ではインターフェースと実装クラスとを分離しておき自由に差し替えられるようにする。

DIにはメリットもデメリットもあるので盲信しない。↓のメリットを求めていないのであればDIを使う必要はない

<center>

|メリット|デメリット|
|---|---|
|・モジュール間の相互依存の解決<br>・実装の差し替え<br>・ビルドの高速化<br>・ツールによるインスタンス管理|・依存関係の暗黙化<br>・可読性の低下のおそれ|

<center>
