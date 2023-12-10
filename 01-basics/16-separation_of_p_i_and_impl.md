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

* やりたいことに対してアルゴリズム(ポリシー)を動的/静的に切り替えるのに使う
* 右図`メカニズム`は変更不要


>>> 書籍『オブジェクト指向における再利用のためのデザインパターン』の4人の共著者のこと。Gang of Four(４人のギャング)と呼ばれる

---

## インターフェイスと実装の...

* 利用者はインターフェイスだけを知っていれば良い
* 外部設計と内部設計の違いを意識する
    * **外部設計**(インターフェイス): 何をするか
    * **内部設計**(実装): どうやって実現するか

<!-- ポリシーとメカニズムについては先日のエンジンを考えると良いかもしれない。車体側のエンジンマウントがメカニズムで、載せるエンジンの種類がポリシー。エンジンが変えられないと困る。もし変えられないと、藤原拓海も須藤京一のランエボⅢにいろは坂で再戦して勝つどころか86を手放すことになっていたかもしれないわけで、重要さも分かると思う -->

---

1. PowerPointなどの印刷機能をメカニズムと捉えたときにポリシーは何が考えられるか、例を挙げてみましょう
2. 機能としての国語辞典をインターフェイスと実装に分けて表現してみましょう
3. 自動車をポリシーとメカニズムに分けて表現してみましょう
インターネットの情報を使わずに

* 例：鏡をインターフェイスと実装に分けると…
    * インターフェイス: 入射光を反射させる
    * 実装: 材質、反射率、凹面鏡、装飾、女王様からの質問回答機能

<!-- 印刷:
Epsonプリンタへの印刷, brother製プリンタへの印刷, PDFへのエクスポート
-->
<!-- 国語辞典:
インターフェイス=単語/連語/句の意味や用例を提示すること
実装=説明の仕方や解釈の違い、フォントや色遣い、装丁、デジタル/紙
-->
<!-- 自動車:
メカニズム=原動機の動力によって車輪を回転させ、軌条や架線を用いずに路上を走る(人が乗る場合は乗用車)
実装=エンジンの違い、空力性能、タイヤ、インパネ、サスペンション、CVT、etc. ...
-->