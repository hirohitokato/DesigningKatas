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

## 基本: 循環依存は避ける

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
## 基本: 循環依存は避ける

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