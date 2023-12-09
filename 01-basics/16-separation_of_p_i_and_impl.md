---
marp: true
theme: katas
---
<!-- 
size: 16:9
paginate: true
-->
<!-- header: 勉強会#-->

アーキテクチャ根底技法(7,8)

# ポリシーとメカニズムの分離
_Separation of Policy and Mechanism_

# インターフェイスと実装の分離

_Separation of Interface and Implementation_

---

## ポリシーとメカニズムの分離$^※$

>>> ※:『プリンシプルオブプログラミング』では「ポリシーと実装の分離」とあるが、たぶんメカニズムが正しい

ある機能を実装するとき、その **様々な作戦/戦略(ポリシー)** と **作戦/戦略自体を実行するしくみ(メカニズム)** とを混ぜないようにする

* 認証と認証方式, AIモデルとTensorFlowなど, 印刷とプリンタドライバなど

## インターフェイスと実装の分離

ある機能を実装するとき、その **仕様/定義(インターフェイス)** と **実際の処理(実装)** とを混ぜないようにする

* ヘッダーファイルと実装ファイル, APIとデータ処理, UIとモデルなど

---

## ポリシーとメカニズムの…

![bg right contain 90%](https://kroki.io/plantuml/svg/eNpzKC5JLCopzc1RCC4pSixJTa9U8E0tychP4crMK0ktSktMTlV43Dz3cfOqx03bHzfvqeZSUNDVBRLKCtWJScVAPckltQrF-bmp8Wmlecklmfl5GppctVzJOYnFxQpP9s551rHs_Z6JCqkVJal5KcW4zCJkwCRyDXjcvPBx0-rHzd2Pm3Y9bl4A1qFQDPOqFYpxQE1caOoV8nWLdFEUAfUk5-eVJGbmKdhxOQCdBAw7AJhzj9c=)

GoF$^1$のストラテジーパターン(Strategy Pattern)そのもの。

* やりたいことに対してアルゴリズム(ポリシー)を動的/静的に切替可
* 右図`メカニズム`は変更不要


>>> 書籍『オブジェクト指向における再利用のためのデザインパターン』の4人の共著者のこと。Gang of Four(４人のギャング)と呼ばれる

---

## インターフェイスと実装の分離

* 利用者はインターフェイスだけを知っていれば良い

<!-- ポリシーとメカニズムについては先日のエンジンを考えると良いかもしれない。車体側のエンジンマウントがメカニズムで、載せるエンジンの種類がポリシー。エンジンが変えられないと困る。もし変えられないと、藤原拓海も須藤京一のランエボⅢにいろは坂で再戦して勝つどころか86を手放すことになっていたかもしれないわけで、重要さも分かると思う -->

---

