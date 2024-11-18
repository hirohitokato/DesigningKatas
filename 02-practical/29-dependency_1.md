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

## 依存関係

1. 依存の強さ：結合度
1. 依存の方向
1. 依存の重複
1. 依存の明示性

---

## 依存関係とは

２つのクラス/関数/モジュールなどを組み合わせたときの『相手を使うクラス』『相手に使われるクラス』の関係のこと。

* <b>相手を使うクラス</b>: **依存元**
* <b>相手に使われるクラス</b>: **依存先**

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

* 依存関係が弱い
* 循環依存や重複した依存がない
* 明示的な依存関係になっている

記述するコードがこれらのルールを守れている状態にする

---

## 悪い例１

```cs
[BAD] 循環依存が発生している
class X {
    Y other
    X() { other = new Y(this); }

    void func1() { other.func2(); }
    void func3() { ... }
}

class Y {
    X other
    Y(X x) { other = x; }

    void func2() { other.func3(); }
}
```

---
## 悪い例２

```cs
[BAD] 分かりにくい循環依存が発生している例
class X {
    Y other;

    X() { other = new Y(); }
    void func() { other.func2(this); }
}

class Y {
    private Object anyObject = null; // Objectはすべてのクラスの基底クラス
    
    void func2(Object any) {
        anyObject = any; // 循環依存の発生！
    }
}
```

 循環依存だけでなく、気をつける例は他にもある

 ---

## 依存関係

1. **依存の強さ：結合度**
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
## 内容結合

隠蔽されるべきコードの詳細に依存するもの

- 依存先のコードを変更する
- 依存先に隠蔽された変数を、外部から参照する
- 依存先の内部のコードに直接ジャンプする

---

TODO

---

## 共通結合 ＆ 外部結合

---

TODO

---

## 制御結合

---

TODO

---

## スタンプ結合 ＆ データ結合

---

TODO

---

## メッセージ結合

---

TODO

---


