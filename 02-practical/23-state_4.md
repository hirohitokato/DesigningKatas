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

# 読みやすいコードの作り方 - 状態(4)

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
    * **不変性 :**
        * 状態遷移そのものを不可能にする
    * **冪(べき)等性 :**  ← ｷｮｳﾊｺｺ!
        * 内部状態を隠し呼び出し前の状態確認を不要にする
    * **非巡回**
        * 状態の循環を止め複雑な管理をなくす

![bg right:30% 90%](assets/12-book.jpg)

<!-- この本ではどのような点に注意すると良いと言っているか -->
<!-- 1は状態そのものの数を減らすという考え方、2は状態間の遷移を適切にすべきという考え方 -->

---

## 冪等性(べきとうせい)

冪等: 操作を１回行ったときの結果と、操作を複数回行ったときの結果が同じ

→ 何回でも安心して処理を実行できる

```cs
class GoodClosableClass {
    private bool isClosed {get; private set;} = false;
    public void Close() {
        if (isClosed) { return; }
        isClosed = true; ... 
    }
}
class BadClosableClass {
    public bool isClosed {get; private set;} = false;
    public void Close() {
        if (isClosed) { /*例外を投げる*/}
        : // 以降は同じ
    }
}
```

<!-- どちらもやっていることは同じ。しかし後者のケースはClose()を呼び出す前に状態の確認が必要。
 すべてのclose()の呼び出しに状態確認を強制していることになり、
 * 単純にはコードが煩雑になる
 * さらには確認を忘れた際にバグを発生させてしまう
 という問題を埋め込むことになる。
  -->

---

## 冪等性で実装するメリット

* 再実行が安全になる
    * 何度実行しても同じ結果を返すため、再実行が必要な場合でも安全
    * 例: ネットワークエラーが発生した場合の再試行
* デバッグ(原因分析)が容易になる
    * 予測可能な動作をする関数になるため、デバッグが容易になる
* テストが簡便になる
    * テストケース作成時、同じ入力には同じ結果が得られるため書きやすい
* 状態管理の簡素化
    * 状態を変更しないため、システム全体の状態管理が簡素化できる

---

## 冪等性: 内部状態の隠蔽

キャッシュや遅延評価を実装するときには冪等性を用いて内部状態を隠すと良い

```cs
class NumberRepository {
    private int? _cachedValue;
    // キャッシュを保持していようがいまいがGetValue()を呼べば良い
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

* **冪等性**: 処理を何回実行しても同じ結果になること
* **参照透過性**: 処理を同じ引数で実行すると同じ結果になること
* **副作用**: 結果が引数以外に依存して決まる処理のこと

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
5. ファイルの内容を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド
3. 電源をオフにするボタン
4. 絶対値を求める関数
5. ファイルの内容を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン
4. 絶対値を求める関数
5. ファイルの内容を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数
5. ファイルの内容を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数 **→ 冪等性・参照透過性**
5. ファイルの内容を文字列で返す関数
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数 **→ 冪等性・参照透過性**
5. ファイルの内容を文字列で返す関数 **→ 冪等性**
6. 現在の通信状態を返す関数

---

## 冪等性 and 参照透過性 クイズ

次の要素が冪等性・参照透過性を持つかを答えてください

1. HTTPのGETメソッド **→ 冪等性**
2. HTTPのPOSTメソッド **→ どちらも持たない**
3. 電源をオフにするボタン **→ 冪等性**
4. 絶対値を求める関数 **→ 冪等性・参照透過性**
5. ファイルの内容を文字列で返す関数 **→ 冪等性**
6. 現在の通信状態を返す関数 **→ 冪等性**

<!--
要するに、冪等性は操作の外から見た性質であり、利用者が同じ操作を繰り返しても同じ結果が得られるかどうかを判断する基準です。GETメソッドは読み取り専用であるため、冪等性を満たしますし、同様にファイルの内容や通信状態を返す関数も、同じ状況において同じ結果を返すことから冪等性を満たすことになります
-->

---

## 冪等性: まとめ

* 冪等性とは、何回呼んでも同じ結果になること
    * 関数を呼ぶ前のチェックを不要にできる(チェック漏れを防げる)
* 不正な状態遷移を排除できる
* デバッグ・テストが容易になる
* 内部状態を隠蔽できる(キャッシュなど)

呼ぶ前に相手先の状態をチェックしている箇所に注意する

<!-- 
メリット(もう一度)
* 再実行の安全性: 冪等性を持つ関数は、何度実行しても同じ結果を返すため、再実行が必要な場合でも安全です。例えば、ネットワークエラーが発生した場合に再試行する際に役立ちます。
* デバッグの容易さ: 冪等性を持つ関数は予測可能な動作をするため、デバッグが容易になります。
* テストの簡便さ: テストケースを作成する際に、同じ入力に対して同じ結果が得られるため、テストが簡単になります。
* 状態管理の簡素化: 状態を変更しないため、システム全体の状態管理が簡素化されます。
 -->

---

## 非巡回

可変なオブジェクトを作る際はb or cのような遷移にするのが望ましい
|a.巡回のある状態遷移|b.非巡回な状態遷移|c.自己ループを除けば<br/>非巡回な状態遷移|
|---|---|---|
|![](./assets/22-cyclic_state.png)|![](./assets/22-acyclic_state.png)|![](./assets/22-acyclic_state_with_selfloop.png)|

<!-- そのためには、可変なオブジェクトを再利用しないようにすることが重要。 -->

---

## 非巡回: 例) 非巡回なStopWatchクラス

```cs
class StopWatch {
    private DateTime _startTime = DateTime.Now;
    private DateTime _elapsedTime = DateTime.Now;

    private State _state = State.Measuring; // Measuring/Finished

    double FinishMeasurement() {
        if (_state == State.Finished) { return _elapsedTime.TotalMilliseconds; }

        _state = State.Finished;
        _elapsedTime = DateTime.Now - _startTime;
        return _elapsedTime.TotalMilliseconds;
    }
}
```

<!-- どういう使い方をするかの説明 -->

---

## 非巡回: 例) 非巡回なStopWatchクラス(使用例)

```cs
void RunSomeHeavyTask() {
    var stopWatch = new StopWatch(); // 計測開始
    : // 重い処理
    var elapsedTimeInMs = stopwatch.FinishMeasurement(); // 計測終了
}

void RunAnotherHeavyTask() {
    var stopWatch = new StopWatch(); // 計測開始
    : // 重い処理
    var elapsedTimeInMs = stopwatch.FinishMeasurement(); // 計測終了
}
```

![](./assets/22-acyclic-stopwatch.png)

---

## 非巡回: 例) 再利用可能(=巡回)なStopWatchクラス

```cs
class StopWatch { // [BAD]
    private DateTime _startTime = DateTime.Now;
    private DateTime _elapsedTime = DateTime.Now;
    private State _state = State.Stopped; // Measuring/Stopped

    void StartMeasurement() { if(_state == State.Stopped) { _startTime = DateTime.Now; } }

    double FinishMeasurement() {
        if (_state == State.Stopped) { return _elapsedTime.TotalMilliseconds; }

        _state = State.Finished;
        _elapsedTime = DateTime.Now - _startTime;
        return _elapsedTime.TotalMilliseconds;
    }
}
```

再利用可能になったことで、生成コストも減って便利なクラスになった気がする

<!-- これはヤバい、と思った時点で挙手してほしい。最後の人にしか当てないので、遠慮せずどんどん。 -->

---

## 非巡回: 例) 再利用可能(=巡回)なStopWatchクラス

クラスの状態遷移図。初期状態が変わり、`StartMeasurement()`を呼ぶとリセットされるようになった。

|非巡回なStopWatch|巡回なStopWatch|
|---|---|
|![](./assets/22-acyclic-stopwatch.png)|![](./assets/22-cyclic-stopwatch.png)|

---

## 非巡回: 例) 再利用可能(=巡回)なStopWatchクラス(使用例)

```cs
class SomeRunner {
    private StopWatch _stopWatch = new StopWatch();
    public void RunSomeHeavyTask() {
        _stopWatch.StartMeasurement(); // 計測開始
        : // 重い処理
        var elapsedTimeInMs = stopwatch.FinishMeasurement(); // 計測終了
    }
    public void RunAnotherHeavyTask() {
        _stopWatch.StartMeasurement(); // 計測開始
        : // 重い処理
        var elapsedTimeInMs = stopwatch.FinishMeasurement(); // 計測終了
    }
}
```

<!-- 使い方もほとんど同じ -->

---

## 非巡回: 例) 再利用可能(=巡回)なStopWatchクラス(問題発生)

```cs
class SomeRunner {
    ...
    public void RunTask() {
        _stopWatch.StartMeasurement(); // 計測開始

        if (...) {
            this.RunSomeHeavyTask(); // バグ
        } else {
            this.RunAnotherHeavyTask(); // バグ
        }

        var elapsedTimeInMs = stopwatch.FinishMeasurement(); // バグ
    }
}
```

<!-- ((ここで最後の人に当てる)) -->
<!-- 
* RunSomeHeavyTask()が呼ばれるが、既にRunTask()先頭でstart～が呼ばれているので開始時刻が正しく設定されない
* RunAnotherHeavyTask()が呼ばれるが、既にRunTask()先頭でstart～が呼ばれているので開始時刻が正しく設定されない
* if文のどちらかでFinishMeasurementが呼ばれているので、何も計測されていない
 -->

<!-- こういうのを安全に作ろうとすると、内部設計が複雑になってしまうし、結局中身では使い捨てのインスタンスを作っていることもある。
特別な理由がない限りはインスタンスを使い捨て可能にして状態線が循環しない設計にすると良い -->

---

## 巡回が必要な場合も処理を抑え込む

|大きな巡回がある|巡回箇所を制限した遷移図|←を大局的に見ると…|
|---|---|---|
|![](./assets/22-big_cyclic_0.png)|![](./assets/22-big_cyclic_1.png)|![](./assets/22-big_cyclic_2.png)|

巡回箇所を局所化し、非巡回な遷移に出来ている

---

## 非巡回: まとめ

* 状態に巡回構造があると実装が複雑になりやすい
    * 再帰的に呼び出されたり、再利用のタイミングを意識しなければならない
* 単方向のオブジェクトを使い捨てる設計にする
    * 必要に応じて巡回構造に再設計する
* 消せない巡回構造は局所化する

---

## まとめ

複数の変数間の関係と状態遷移の設計の２観点から単純化する方法を説明

* 直交性を意識する
    * 変数を関数として置き換える
    * 直和型で置き換える
* 状態遷移の設計
    * 不変性・冪等性を用いる
    * 非巡回の状態遷移を用いる(巡回する範囲を狭める)