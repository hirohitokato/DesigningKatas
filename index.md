# コンテンツ

エンジニアの解像度を「知識」×「視点」×「好奇心」の掛け算で高めていく『勉強会#』のコンテンツ一覧です。これまでの実施履歴は[こちら](ACTIVITIES.md)をご覧ください。

## A. 原理・原則

### プログラミングの原則・ガイドライン

多くのプログラミングの状況で共通に適用されるべき、基本的な決まり事を紹介します。

- [銀の弾などない(No silver bullet)](01-basics/01-no_silver_bullets.md)
- [KISS(Keep It Simple, Stupid)](01-basics/03-kiss.md)
- [DRY(Don't Repeat Yourself)](01-basics/04-dry.md)
- [名前重要](01-basics/05-naming_is_important.md)
- [SLAP(Single Level of Abstraction Principle)](01-basics/06-slap.md)
- [PIE(Program Intently and Expressively)](01-basics/09-pie.md)
- [YAGNI](01-basics/20-yagni.md)

### プログラミングの考え方

プログラミングの「思想」に関する原理原則を紹介します。成功したソフトウェアには、その成功を支えた「文化」「哲学」「価値観」といった思想があります。

- アーキテクチャ根底技法
    - [分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md)
    - [参照の一点性](01-basics/07-single_point_of_reference.md)
    - [抽象化(Abstraction)](01-basics/12-abstraction.md)
    - [カプセル化/情報隠蔽/パッケージ化](01-basics/13-encapsulation_infohiding_pkg.md)
    - [関心の分離](01-basics/14-separation_of_concerns.md)
    - [充足性 & 完全性 & プリミティブ性](01-basics/15-suff_comp_prim.md)
    - [ポリシーとメカニズムの分離・インターフェースと実装の分離](01-basics/16-segmentation_principles.md)
    - [まとめ](01-basics/17-enabling_techniques_wrapup.md)
- [７つの設計原理](01-basics/08-seven_design_principles.md)
- SOLID
    - [単一責任の原則(SRP)](02-practical/01-solid-srp.md)
        - [1時間バージョン](02-practical/01-solid-srp-1h.md)
    - [開放閉鎖の原則(OCP)](02-practical/02-solid-ocp.md)
        - [1時間バージョン](02-practical/02-solid-ocp-1h.md)
    - [リスコフの置換原則(LSP)](02-practical/03-solid-lsp.md)
    - [インターフェース分離の原則(ISP)](02-practical/04-solid-isp.md)
    - [依存関係逆転の原則(DIP)](02-practical/05-solid-dip.md)
    - [まとめ](02-practical/06-solid-wrapup.md)
- パッケージ・コンポーネントの原則
    - [導入～再利用・リリース等価の原則(REP)](02-practical/07-component-rep.md)
    - [閉鎖性共通の原則(CCP)＆全再利用の原則(CRP)](02-practical/08-component-ccp_crp.md)
    - [非循環依存関係の原則(ADP)](02-practical/09-component-adp.md)
    - [安定依存の原則(SDP)](02-practical/10-component-sdp.md)
    - [安定度・抽象度等価の原則(SAP)](02-practical/11-component-sap.md)
- [もう一度学ぶオブジェクト指向](01-basics/22-objectoriented.md)

### プログラマーの習慣

プログラミングの「習慣」に関する原理原則です。日常の習慣や行動指針が、結果的に良いコードを生み出します。

- [TMTOWTDI](01-basics/10-tmtowtdi.md)
- [ボーイスカウトの規則 & 最適化のルール](01-basics/21-boyscout_optimize.md)

### プログラミングのアンチパターン

ソフトウェア開発において陥りやすい罠を紹介します。

- [コンウェイの法則](10-humor/03-conways_law.md)
- [ジョシュアツリーの法則](01-basics/18-joshua-tree.md)
- [アンナ・カレーニナの法則](10-humor/09-anna_karenina.md)

## B. プログラミング技術

- [ユビキタス言語](01-basics/19-ubiquitous.md)
- 読みやすいコードの書き方
    - 石川宗寿著『[読みやすいコードのガイドライン―持続可能なソフトウェア開発のために](https://gihyo.jp/book/2022/978-4-297-13036-7)』(技術評論社)の内容をベースに、保守しやすくしなやかなコードを読みやすさの観点から説明します。
    - [命名(1)](02-practical/12-naming_1.md)
    - [命名(2)](02-practical/13-naming_2.md)
    - [命名(3)](02-practical/14-naming_3.md)
    - [命名(4)](02-practical/15-naming_4.md)
    - [コメント(1)](02-practical/16-comment_1.md)
    - [コメント(2)](02-practical/18-comment_2.md) - ドキュメンテーション
    - [コメント(3)](02-practical/19-comment_3.md) - 非形式的なコメント
    - [状態(1)](02-practical/20-state_1.md)
    - [状態(2)](02-practical/21-state_2.md)
    - [状態(3️)](02-practical/22-state_3.md) - 不変性
    - [状態(4)](02-practical/23-state_4.md) - 冪等性
    - [状態(5)](02-practical/24-state_5.md) - 非巡回
    - [関数(1)](02-practical/25-function_1.md) - 関数の責任
    - [関数(2)](02-practical/26-function_2.md) - 関数の流れ(定義指向プログラミング)
    - [関数(3)](02-practical/27-function_3.md) - 関数の流れ(定義指向プログラミング)
    - [関数(4)](02-practical/28-function_4.md) - 関数の流れ(早期リターン＆関数分割のコツ)
    - [依存関係(1)](02-practical/29-dependency_1.md) - 依存関係(結合度)
    - [依存関係(2)](02-practical/30-dependency_2.md) - 依存関係(共通結合,外部結合)
    - [依存関係(3)](02-practical/31-dependency_3.md) - 依存関係(制御結合)
    - [依存関係(4)](02-practical/32-dependency_4.md) - 依存関係(スタンプ結合＆データ結合＆メッセージ結合)

## C.その他(ネタ,ウンチクなど)

- [90:90 の法則](10-humor/01-90_90rule.md)
- [エンジニア適正クイズ](10-humor/04-milk_and_egg.md)
- [10種類の人間](10-humor/05-10kinds_of_people.md)
- [プログラマーとは](10-humor/07-programmers.md)
- [なぜ配列の要素番号はゼロから始まるのか](09-techniques/02-why-index-start-with0.md)
- [NULLポインタの歴史](09-techniques\03-history_of_nullptr.md)
- [プログラミングに関するジョークいくつか](10-humor/13-jokes_from_quora.md)
- [基本編の復習と分類](01-basics/11-wrapup.md)

## 本勉強会の資料について

本サイトの資料はいずれも [Unlicense](https://ja.wikipedia.org/wiki/Unlicense) で公開しています。資料の内容やテキスト、スライドのテンプレートなど自由にご活用ください。

- 引用元の書籍や記事の著作権にはご注意ください
- 流用する際の連絡は不要ですが、一言伝えていただけると私の自己肯定感が高まります。 ;)