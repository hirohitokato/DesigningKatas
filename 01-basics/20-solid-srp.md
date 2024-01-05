---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会#-->

# SOLID #1 単一責任の原則
_Single Responsibility Principle_

---

## その前にSOLID

オブジェクト指向のクラス設計・任意のモジュール設計において **超**重要な原則

* SOLIDを理解していると
    * スパゲティコードがなくなり読みやすくなる
    * 機能拡張に素早く柔軟に対応できる
    * 長期間にわたってメンテナンスしやすくなる

### → SOLID(堅牢)なソフトウェアを作るバクロニム

---

## ソフトウェアアーキテクチャとは？

* 複数の階層をなしたもの
    * ↓
* システムの全体的な形状と構造を定義するもの
    * ↓
* モジュールやコンポーネント・クラスの構造とその相互接続

>>> Robert C. Martin氏(通称:ボブおじさん)による論文「Design Principles and Design Patterns」より

 <!-- 逆にアーキテクチャとは何のためにあるか。メンテナンスのためにある。
 １回で作れて以降の変更も要らないものにアーキテクチャは不要。
 時間がかかり、人が絡み、変化していくものにはしっかりしたアーキテクチャが必要
 （つまり書き捨てのスクリプト以外には必要と考えて良い） -->
---

## SOLID

コードの臭いに気づき消臭する５つの原則

* S: 単一責任の原則: Sindle Responsibility Principle
* O: 開放閉鎖の原則: Open/Closed Principle
* L: リスコフの置換原則: Liskov Substitution Principle
* I: インターフェイス分離の原則: Interface Segregation Principle
* D: 依存関係逆転の原則: Dependency Inversion Principle

---

