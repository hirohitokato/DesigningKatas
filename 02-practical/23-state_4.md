---
marp: true
math: mathjax
theme: katas
title: "読みやすいコードの作り方 - 状態(4)"
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会# ― エンジニアとしての解像度を高めるための勉強会-->

# 読みやすいコードの作り方 - 状態(4)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

> 見た目を美しく整えることや、流行りのテクニックを取り入れることが「改善」だと思い込んでいませんか？

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

1. 変数の<b>直交性</b>を意識する
    - 手法1: 関数への置き換え
    - 手法2: 直和型での置き換え
2. 状態の<b>遷移</b>を設計する
    - 不変性 :
        - 状態遷移そのものを不可能にする
    - **冪(べき)等性** :
        - 内部状態を隠し呼び出し前の状態確認を不要にする
    - 非巡回
        - 状態の循環を止め複雑な管理をなくす


![bg right:30% 90%](assets/12-book.jpg)

<!-- この本ではどのような点に注意すると良いと言っているか -->
<!-- 1は状態そのものの数を減らすという考え方、2は状態間の遷移を適切にすべきという考え方 -->

---

## 冪等性(べきとうせい。idempotent)

冪等: 操作を１回行ったときの結果と、操作を複数回行ったときの結果が同じ

→ 何回でも安心して処理を実行できる

```cs
class GoodClosableClass { // GOOD
    private bool isClosed {get; private set;} = false;
    public void Close() {
        if (isClosed) { return; }
        isClosed = true; ... 
    }
}
class BadClosableClass { // BAD
    public bool isClosed {get; private set;} = false;
    public void Close() {
        if (isClosed) { /*例外を投げる*/ }
        : // 以降は同じ
    }
}
```

<!-- どちらもやっていることは同じ。しかし後者のケースはClose()を呼び出す前に状態の確認が必要。
 すべてのclose()の呼び出しに状態確認を強制していることになり、
 - 単純にはコードが煩雑になる
 - さらには確認を忘れた際にバグを発生させてしまう
 という問題を埋め込むことになる。
  -->

---

## 冪等性で実装するメリット

- 再実行が安全になる
    - 何度実行しても同じ結果を返すため、再実行が必要な場合でも安全
    - 例: ネットワークエラーが発生した場合の再試行
- デバッグ(原因分析)が容易になる
    - 予測可能な動作をする関数になるため、デバッグが容易になる
- テストが簡便になる
    - テストケース作成時、同じ入力には同じ結果が得られるため書きやすい
- 状態管理の簡素化
    - 状態を変更しないため、システム全体の状態管理が簡素化できる

---

## 冪等性: 内部状態の隠蔽

キャッシュや遅延評価を実装するときには冪等性を用いて内部状態を隠すと良い

```cs
class NumberRepository {
    private int? _cachedValue;
    // 使う側は中の状態に関係なくGetValue()を呼べば良い
    public int GetValue() {
        if (_cachedValue) { return _cachedValue; }
        else { return loadNewValue(); }
    }
    private int loadNewValue() {
        int newValue = /* 値の読み込み処理 */
        _cachedValue = newValue
        return _cachedValue;
    }
}
```

<!-- 逆を言うと、冪等でないにも関わらず内部状態を隠すと誤解を招くコードになりやすく、結果としてバグを生む
その場合は、内部状態を変更しうることを名前やコメントで明示するとよい。
このGetValue()の場合だと、GetCachedValueOrInvokeといった関数名が候補になる。
安直ではあるものの、意図的に長い関数名にすることで注意するべき点があることを示せる。

長い名前といえば、某プロジェクトで似たようなことをやった。長い名前を使うことで処理の流れを意識させ、
さらにはあまり長い名前は使いたくないという心理を利用して、ライブラリでもあまり使ってほしくない関数に長い名前を用いるというテクニックを使った。
・・・が、他の関数の機能が弱かったせいでそれを使わないといけない状況になってしまい、ライブラリ全体がなんか使いにくいという印象を与えてしまった。失敗だった
 -->
---

## 冪等性と参照透過性と副作用

冪等性と参照透過性とは少し異なる

- **冪等性**: 処理を何回実行しても同じ結果になること
- **参照透過性**: 処理を同じ引数で実行すると同じ結果になること
- (**副作用**: 結果が引数以外に依存して決まる処理のこと)

<!--
参照透過性： 足し算、引き算もそうだが、変数の再代入やグローバル変数の参照が処理内になければ、処理内では変数の参照について心配する必要がないので、参照が透過的と言える
副作用は「グローバル変数があるので処理を読んでも結果がわからない」とか「同じ実行の仕方をしても朝と夜で結果が変わる」とか言う感じ
-->

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド
2. HTTPのPOSTメソッド
3. 電源をオフにするボタン
4. 絶対値を求める関数
5. ファイルの内容全体を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド
3. 電源をオフにするボタン
4. 絶対値を求める関数
5. ファイルの内容全体を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン
4. 絶対値を求める関数
5. ファイルの内容全体を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数
5. ファイルの内容全体を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数 **→ 冪等性・参照透過性**
5. ファイルの内容全体を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数 **→ 冪等性・参照透過性**
5. ファイルの内容を文字列で返す関数 全体 **→ 冪等性**
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数 **→ 冪等性・参照透過性**
5. ファイルの内容を文字列で返す関数 全体**→ 冪等性**
6. 現在の通信状態を返す関数 **→ 冪等性**

<!--
要するに、冪等性は操作の外から見た性質であり、利用者が同じ操作を繰り返しても同じ結果が得られるかどうかを判断する基準です。GETメソッドは読み取り専用であるため、冪等性を満たしますし、同様にファイルの内容や通信状態を返す関数も、同じ状況において同じ結果を返すことから冪等性を満たすことになります
-->

---

### 冪等性 vs. 参照透過性

|特徴|冪等性|参照透過性|
|---|---|---|
|主な対象|操作やプロセス|関数や式|
|副作用を許容するか？|副作用を許容する<br>（ただし影響は限定的）|副作用を許容しない|
|結果が変わらない条件|同じ操作を何度繰り返しても変わらない|同じ入力なら必ず同じ結果を返す|
|置換可能性|操作を繰り返しても結果の整合性が保たれる|呼び出しを評価結果に置き換えても意味が保たれる|
|HTTP<br>メソッド|GET, PUT, DELETE は冪等|通常HTTPメソッドは参照透過ではない（副作用が存在する可能性があるため）|

<!-- 
ファイルの内容を文字列で返す関数が冪等であるかどうか

- 冪等： 何回読んでもファイルの内容を返してくれる(=最初の呼び出し後の最終状態を変えない)
- 冪等ではない： 呼ぶたびに違う行が返ってくる(=行を順に読み出すイメージ)、呼ぶとファイル内容を書き換える(→呼ぶたびに得られる文字列が変化する)

参照透過性は入力(関数の場合は引数)だけで結果を完全にコントロールできている必要がありますので、ファイルシステムが壊れるといった、引数以外の要因が絡むようなもの（画面表示やNW通信、参照透過性を持たない関数の呼び出しなど）がある場合は参照透過にはなりません。
 
これを踏まえ改めて冪等性と参照透過性の定義をまとめると

- 冪等性 (Idempotence)
    - 定義: 同じ操作を何度繰り返しても結果が変わらない性質。操作を繰り返すことによって状態や結果が影響を受けないことが保証される
    - 冪等性は、主に操作（プロセス、関数、HTTPリクエストなど）の影響に焦点を当てた概念。
- 参照透過性 (Referential Transparency)
    - 定義: 同じ入力に対して常に同じ結果を返し、副作用を持たない性質。つまり関数や式をその評価結果に置き換えても、プログラムの動作や結果が変わらない。
    - 参照透過性は、主に関数や式が持つ純粋性に焦点を当てた概念。

となり、それぞれが異なるベクトルを持った概念になっています。参照透過性は冪等性とは(似ている概念だけど)無関係で、その上位互換/下位互換ではないということです。
 -->

---

## 冪等性: まとめ

- 冪等性とは、何回呼んでも同じ結果になること
    - 関数を呼ぶ前のチェックを不要にできる(チェック漏れを防げる)
- 不正な状態遷移を排除できる
- デバッグ・テストが容易になる
- 内部状態を隠蔽できる(キャッシュなど)

呼ぶ前に相手先の状態をチェックしている箇所に注意する

<!-- 
メリット(もう一度)
- 再実行の安全性: 冪等性を持つ関数は、何度実行しても同じ結果を返すため、再実行が必要な場合でも安全です。例えば、ネットワークエラーが発生した場合に再試行する際に役立ちます。
- デバッグの容易さ: 冪等性を持つ関数は予測可能な動作をするため、デバッグが容易になります。
- テストの簡便さ: テストケースを作成する際に、同じ入力に対して同じ結果が得られるため、テストが簡単になります。
- 状態管理の簡素化: 状態を変更しないため、システム全体の状態管理が簡素化されます。
 -->

