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

# 読みやすいコードの作り方 - 依存関係(2)

_Code Readability_

<!-- 説明メモ： 結合度はけっこう大事なところなので、前回の話を振り返った上で次に進むこと -->

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

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
- 可変(=状態を変更可能)なシングルトンの使用
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

→ 関数型プログラミングの流れにつながっている

---

## 共通結合＆外部結合のまとめ

- 誰もが読み書きできる場所で値を受け渡ししていないか
    - グローバル変数・可変なシングルトン
    - あらゆる階層からファイル/デバイス/画面の操作
- 回避/緩和策
    - 関数の引数を面倒がらずに使う
    - 関数型プログラミング
    - DI(依存性注入)を使う
