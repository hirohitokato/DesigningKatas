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

# 読みやすいコードの作り方 - 状態(3)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 状態とは？ (recap)

プログラムの振る舞いを決定するデータとその組み合わせ。

1. 変数の値（値の変化＝状態の変化）
2. オブジェクトの状態（メンバー変数の変化＝状態の変化）
3. プログラムや処理のフロー（状態変数の変化＝状態の変化）
4. 処理の状態（処理状況の変化＝状態の変化）

フラグ変数が５個あるだけで32($=2^5$)種類もの状態が存在することになる

<!--
突き詰めて言うと、プログラムは入力がまったく同じである場合は同じように動き、一方で入力のほんの一部でも異なっていれば異なる動きをする(ことがある)。
これはつまりそのプログラムが「変化しうる変数や入力情報のすべての組み合わせからなる状態数」を持っているということになる
-->

---

## 複雑な状態への対処方法

1. 変数の直交性を意識する
    * 手法1: 関数への置き換え
    * 手法2: 直和型での置き換え
2. 状態の**遷移**を設計する
    * **不変性 :**  ← ｷｮｳﾊｺｺ!
        * 状態遷移そのものを不可能にする
    * **冪(べき)等性 :**
        * 内部状態を隠し呼び出し前の状態確認を不要にする
    * **非巡回**
        * 状態の循環を止め複雑な管理をなくす

![bg right:30% 90%](assets/12-book.jpg)

<!-- この本ではどのような点に注意すると良いと言っているか -->
<!-- 1は状態そのものの数を減らすという考え方、2は状態間の遷移を適切にすべきという考え方 -->

---

## 状態の不変性

状態遷移がない(=状態が変わらない)処理であれば状態遷移の問題は起こらない
* オブジェクト作成後に値が変化しない
* **変化が外から観測できない**

```cpp
class MyClass {
  public:
    MyClass(int val) : value{val} {}
  private:
    const int value;
};
```
↓
**不変性**を満たしていれば、余計な状態遷移が発生しない

---

## 不変性: 不変なクラスと可変なクラス比較(C++)

```cpp
struct MyClass { // 不変であるクラス。すべてのプロパティが再代入不可
    MyClass(int val) : value{val} {}
  private:
    const int value;
    const double double_value = 2.5;
};
```
↕ 
```cpp
struct MyClass { // 可変であるクラス。一部のプロパティが可変ならばmutable
    MyClass(int val) : value{val} {}
    int value;
    const double double_value = 2.5;
};
```

---

## 不変性: 不変なクラスと可変なクラス比較(C#)

```cs
class MyClass { // 不変であるクラス。すべてのプロパティが再代入不可
    public readonly int Value;
    public readonly double DoubleValue = 2.5;
    public MyClass(int val) { Value = val; }
}
```
↕ 
```cpp
class MyClass { // 可変であるクラス。一部のプロパティが可変ならばmutable
    public readonly int Value;
    public double DoubleValue = 2.5;
    public MyClass(int val) { Value = val; }
}
```

---

## 不変性: 不変(immutable)と読み取り専用(read-only)の違い

変更させないようにしているつもりが、変更できてしまう例

```cs
class NGSample // [BAD] C#で読み取り専用の配列を作ろうとしているが出来ていない
{
    private static readonly string Message1 = "hello,";
    private static readonly string Message2 = "world!";
    // 列挙用配列。しかし、この配列の公開はNG
    public static readonly string[] Messages = { Message1, Message2 };
}

:

NGSample.Messages[1] = "OUCH!";
foreach (var s in NGSample.Messages) { Console.WriteLine(s); }  // hello,\nOUCH!
```

<!-- 不変と読み取り専用とは明確に異なる概念として意識する

* 不変：immutable
* 読み取り専用: unmodifiable, read-only

この場合は言語機能の誤解から問題が生じている。
readonlyは、参照しているオブジェクトを変更することはできなくなるものの、その中の内容は自由に変更できてしまう。

ソースコード例： [[C#] 配列やList<T>を直接公開する代わりにするべきこと](https://qiita.com/laughter/items/b5e91d0eac5bac208d35)
-->

---

## 不変性: 不変(immutable)と読み取り専用(read-only)の違い - 改善例

変更できない型を正しく使って公開する

```cs
class NGSample // [GOOD] C#で読み取り専用の配列を作成する
{
    private static readonly string Message1 = "hello,";
    private static readonly string Message2 = "world!";
    public static IReadOnlyList<string> Messages = new[] { Message1, Message2 };
}

:

NGSample.Messages[1] = "OUCH!"; // コンパイルエラー
```

<!-- ReadOnlyListが使えない・用意されていない環境の場合には、たとえばリストそのものは見せないようにしておき、
その要素へのアクセスにはgetterメソッドを用意しておくなどした、カスタムコレクション型にするなど -->

---

## 不変性: 値と参照の可変性

```cs
// [BAD] 参照そのものと参照先のオブジェクトの両方を可変にしたせいで意図しない動作になる
class DiscouragedMutable {
    public static List<string> MutableList = new List<string> { "a", "b", "c" };
    public static void ResetList() { // 内容を初期値にリセット
        MutableList = new List<string> { "a", "b", "c" };
    }
}

var list = DiscouragedMutable.MutableList;
foreach (var s in list) { Console.Write(s); } // abc

DiscouragedMutable.MutableList.Add("d");
foreach (var s in list) { Console.Write(s); } // abcd (Addの影響を受ける)

DiscouragedMutable.ResetList();
foreach (var s in list) { Console.Write(s); } // abcd (list変数はリセットされていない)

DiscouragedMutable.MutableList.Add("e");
foreach (var s in list) { Console.Write(s); } // abcd (abceにならない)
```

<!-- 変数を可変にする場合は、参照そのものと参照先のオブジェクトの両方を可変にしない -->
<!-- この場合は２通りの対策が考えられる。
1. 参照を書き込み可能にして、オブジェクトそのものを読み取り専用にする（MutableList）
2. 参照を読み取り専用にし、オブジェクトは更新可能にする
 -->

---

## 不変性: 局所的な不変性

値のライフサイクルが異なるものを混ぜない

```cs
[BAD]
class UserDataModel {
    string Name;
    string Identifier;
    bool IsOnline; // これだけ頻繁に更新される = ライフサイクルが異なる
}
   ↓
[GOOD]
class UserStatus { bool IsOnline; ... }
class UserInformation {
    string Name; ...
    UserStatus Status;
}
```

状態変化に伴う不具合の発生箇所を限定できる

---

## 不変性のまとめ

* 不正な状態遷移を**起こせない**コードにする
    * そもそも状態遷移がないデータ構造を使えば、不正な状態遷移は発生しない
* ただし言語によっては抜け穴が存在できてしまう書き方があるので要注意
    * プリミティブな値は良いがオブジェクトには注意
    * 自分の使う言語の仕様にも詳しくなろう
* 不変にできる部分を局所化して安全地帯を設ける
    * 不具合発生箇所をコントロールする考え方を持とう

