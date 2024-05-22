# DesigningKatas

設計・プログラミングに関する大事な考え方やコードへの応用例を説明します。

## 表示するためには

各スライドは[Marp](https://marp.app/)を使って作成しています。手元の環境でもスライド形式で閲覧したい場合、MarpでPDF等に変換するか、Visual Studio Codeの[Marp for VS Code拡張機能](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)をインストールしてvscode上でご覧ください。

※カスタムテーマや閲覧設定は[.vscode/settings.json](.vscode/settings.json)で設定済みです。

## 勉強会の実施履歴

### 1st group

1. 2023/10/06 [銀の弾などない(No silver bullet)](01-basics/01-no_silver_bullets.md)
2. 2023/10/11 [[アーキテクチャ根底技法]分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md)
3. 2023/10/13 [[アーキテクチャ根底技法]分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md) & [KISS(Keep It Simple, Stupid)](01-basics/03-kiss.md)
4. 2023/10/20 [DRY(Don't Repeat Yourself)](01-basics/04-dry.md) & カレーレシピの分割位置(分割と統治の補講)
5. 2023/10/25 [名前重要](01-basics/05-naming_is_important.md) & [90:90の法則](10-humor/01-90_90rule.md)
6. 2023/10/27 [SLAP(Single Level of Abstraction Principle)](01-basics/06-slap.md)
7. 2023/11/01 [[アーキテクチャ根底技法]参照の一点性](01-basics/07-single_point_of_reference.md) & [コンウェイの法則](10-humor/03-conways_law.md)
8. 2023/11/08 [７つの設計原理](01-basics/08-seven_design_principles.md)
9. 2023/11/10 [PIE(Program Intently and Expressively)](01_basics/09-pie.md) & [エンジニア適正クイズ](10-humor/04-milk_and_egg.md)
10. 2023/11/15 [TMTOWTDI](01-basics/10-tmtowtdi.md)
11. 2023/11/17 [ここまでの復習と分類](01-basics/11-wrapup.md)
12. 2023/11/29 [[アーキテクチャ根底技法]抽象化(Abstraction)](01-basics/12-abstraction.md) & [10種類の人間](10-humor/05-10kinds_of_people.md)
13. 2023/12/01 [[アーキテクチャ根底技法]カプセル化/情報隠蔽/パッケージ化](01-basics/13-encapsulation_infohiding_pkg.md) & 演習
14. 2023/12/06 [[アーキテクチャ根底技法]関心の分離](01-basics/14-separation_of_concerns.md) & 演習
15. 2023/12/08 [[アーキテクチャ根底技法]充足性 & 完全性 & プリミティブ性](01-basics/15-suff_comp_prim.md)
16. 2023/12/13 [[アーキテクチャ根底技法]ポリシーとメカニズムの分離・インターフェースと実装の分離](01-basics/16-segmentation_principles.md)
17. 2023/12/15 [アーキテクチャ根底技法10個のまとめ](01-basics/17-enabling_techniques_wrapup.md)
18. 2023/12/22 [ジョシュアツリーの法則](01-basics/18-joshua-tree.md) & [プログラマーとは](10-humor/07-programmers.md)
19. 2023/12/27 [ユビキタス言語](01-basics/19-ubiquitous.md)
20. 2024/01/10 [[SOLID]単一責任の原則(SRP)](02-practical/01-solid-srp.md)
21. 2024/01/12 [[SOLID]開放閉鎖の原則(OCP)](02-practical/02-solid-ocp.md)
22. 2024/01/17 [[SOLID]リスコフの置換原則(LSP)](02-practical/03-solid-lsp.md) & [アンナ・カレーニナの法則](10-humor/09-anna_karenina.md)
23. 2024/01/19 [[SOLID]インターフェース分離の原則(ISP)](02-practical/04-solid-isp.md)
24. 2024/01/24 [[SOLID]依存関係逆転の原則(DIP)](02-practical/05-solid-dip.md)
25. 2024/01/26 [SOLIDまとめ](02-practical/06-solid-wrapup.md)
26. 2024/02/07 [なぜ配列の要素番号はゼロから始まるのか](09-techniques/02-why-index-start-with0.md)
27. 2024/02/28 [[コンポーネントの原則]導入～再利用・リリース等価の原則(REP)](02-practical/07-component-rep.md) & 演習
28. 2024/03/01 [[コンポーネントの原則]閉鎖性共通の原則(CCP)＆全再利用の原則(CRP)](02-practical/08-component-ccp_crp.md) & 演習
29. 2024/03/06 [[コンポーネントの原則]非循環依存関係の原則(ADP)](02-practical/09-component-adp.md) & 演習
30. 2024/03/08 [[コンポーネントの原則]安定依存の原則(SDP)](02-practical/10-component-sdp.md)
31. 2024/03/15 [[コンポーネントの原則]安定度・抽象度等価の原則(SAP)](02-practical/11-component-sap.md)
32. 2024/03/22 [YAGNI](01-basics/20-yagni.md)
33. 2024/04/26 [ボーイスカウトの規則 & 最適化のルール](01-basics/21-boyscout_optimize.md)
34. 2024/05/10 [[読みやすいコードの作り方]命名(1)](02-practical/12-naming_1.md)
35. 2024/05/10 [[読みやすいコードの作り方]命名(2)](02-practical/12-naming_2.md) & [プログラミングに関するジョークいくつか](10-humor/13-jokes_from_quora.md)

### 2nd group
<!-- VP -->

1. 2023/11/28 [銀の弾などない(No silver bullet)](01-basics/01-no_silver_bullets.md)
2. 2023/11/30 [[アーキテクチャ根底技法]分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md)
3. 2023/12/12 [KISS](01-basics/03-kiss.md) & [90:90の法則](10-humor/01-90_90rule.md)
4. 2023/12/15 [DRY(Don't Repeat Yourself)](01-basics/04-dry.md) & [テストエンジニアとサンドイッチ](10-humor/02-sandwich.md)
5. 2023/12/26 [名前重要](01-basics/05-naming_is_important.md)
6. 2024/01/09 [７つの設計原理](01-basics/08-seven_design_principles.md)
7. 2023/01/16 [SLAP(Single Level of Abstraction Principle)](01-basics/06-slap.md) & [コンウェイの法則](10-humor/03-conways_law.md) & [エンジニア適正クイズ](10-humor/04-milk_and_egg.md)
8. 2024/01/23 [[アーキテクチャ根底技法]参照の一点性](01-basics/07-single_point_of_reference.md)
9. 2024/02/06 [なぜ配列の要素番号はゼロから始まるのか](09-techniques/02-why-index-start-with0.md)
10. 2024/02/27 [TMTOWTDI](01-basics/10-tmtowtdi.md) & [PIE(Program Intently and Expressively)](01_basics/09-pie.md)
11. 2024/03/05 [ここまでの復習と分類](01-basics/11-wrapup.md)
12. 2024/03/12 [[アーキテクチャ根底技法]抽象化(Abstraction)](01-basics/12-abstraction.md)
13. 2024/04/16 [[アーキテクチャ根底技法]カプセル化/情報隠蔽/パッケージ化](01-basics/13-encapsulation_infohiding_pkg.md) & 演習
14. 2024/04/23 [[アーキテクチャ根底技法]関心の分離](01-basics/14-separation_of_concerns.md) & 演習
15. 2024/04/30 [[アーキテクチャ根底技法]充足性 & 完全性 & プリミティブ性](01-basics/15-suff_comp_prim.md) & 演習
16. 2024/05/07 [[アーキテクチャ根底技法]ポリシーとメカニズムの分離・インターフェースと実装の分離](01-basics/16-segmentation_principles.md)
17. 2024/05/21 [アーキテクチャ根底技法10個のまとめ](01-basics/17-enabling_techniques_wrapup.md)

### 3rd group
<!-- MS -->

1. 2023/12/08 [銀の弾などない(No silver bullet)](01-basics/01-no_silver_bullets.md)
2. 2023/12/15 [[アーキテクチャ根底技法]分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md) & [90:90の法則](10-humor/01-90_90rule.md)
3. 2023/12/22 [KISS](01-basics/03-kiss.md) & [再帰を理解するたった１つの冴えた方法](10-humor/06-howto_know_recursion.md)
4. 2024/01/12 [DRY(Don't Repeat Yourself)](01-basics/04-dry.md)
5. 2024/01/19 [７つの設計原理](01-basics/08-seven_design_principles.md)
6. 2024/01/26 [名前重要](01-basics/05-naming_is_important.md)
7. 2024/02/09 [なぜ配列の要素番号はゼロから始まるのか](09-techniques/02-why-index-start-with0.md)
8. 2023/03/01 [SLAP(Single Level of Abstraction Principle)](01-basics/06-slap.md) & [コンウェイの法則](10-humor/03-conways_law.md) & [エンジニア適正クイズ](10-humor/04-milk_and_egg.md)
9. 2024/03/08 [TMTOWTDI](01-basics/10-tmtowtdi.md) & [PIE(Program Intently and Expressively)](01_basics/09-pie.md)
10. 2024/03/15 [ジョシュアツリーの法則](01-basics/18-joshua-tree.md)
11. 2024/03/22 [ここまでの復習と分類](01-basics/11-wrapup.md)
12. 2024/04/12 [[アーキテクチャ根底技法]カプセル化/情報隠蔽/パッケージ化](01-basics/13-encapsulation_infohiding_pkg.md) & 演習
13. 2024/04/26 [[アーキテクチャ根底技法]抽象化(Abstraction)](01-basics/12-abstraction.md) & [プログラミングに関するジョークいくつか](10-humor/13-jokes_from_quora.md)
14. 2024/05/10 [[アーキテクチャ根底技法]関心の分離](01-basics/14-separation_of_concerns.md) & 演習
15. 2024/05/17 [[アーキテクチャ根底技法]充足性 & 完全性 & プリミティブ性](01-basics/15-suff_comp_prim.md) & 演習

### 4th group
<!-- AC -->

1. 2023/12/13 [銀の弾などない(No silver bullet)](01-basics/01-no_silver_bullets.md) & [90:90の法則](10-humor/01-90_90rule.md)
2. 2023/12/18 [[アーキテクチャ根底技法]分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md)
3. 2023/12/27 [KISS](01-basics/03-kiss.md)
4. 2024/01/10 [DRY(Don't Repeat Yourself)](01-basics/04-dry.md)
5. 2024/01/17 [名前重要](01-basics/05-naming_is_important.md)
6. 2023/01/24 [SLAP(Single Level of Abstraction Principle)](01-basics/06-slap.md) & [コンウェイの法則](10-humor/03-conways_law.md) & [ダニング＝クルーガー効果](10-humor/10-dunning_kruger_effect.md)
7. 2024/02/07 [なぜ配列の要素番号はゼロから始まるのか](09-techniques/02-why-index-start-with0.md)
8. 2024/02/28 [TMTOWTDI](01-basics/10-tmtowtdi.md) & [PIE(Program Intently and Expressively)](01_basics/09-pie.md)
9. 2024/03/06 [[アーキテクチャ根底技法]参照の一点性](01-basics/07-single_point_of_reference.md) & [エンジニア適正クイズ](10-humor/04-milk_and_egg.md)
10. 2024/03/13 [ここまでの復習と分類](01-basics/11-wrapup.md)
11. 2024/03/27 [[アーキテクチャ根底技法]抽象化(Abstraction)](01-basics/12-abstraction.md)
12. 2024/04/10 [[アーキテクチャ根底技法]カプセル化/情報隠蔽/パッケージ化](01-basics/13-encapsulation_infohiding_pkg.md) & 演習
13. 2024/05/08 [[アーキテクチャ根底技法]関心の分離](01-basics/14-separation_of_concerns.md) & 演習
14. 2024/05/15 [[アーキテクチャ根底技法]充足性 & 完全性 & プリミティブ性](01-basics/15-suff_comp_prim.md) & 演習

### 5th group
<!-- PB -->

1. 2023/12/13 [銀の弾などない(No silver bullet)](01-basics/01-no_silver_bullets.md)
2. 2023/12/21 [[アーキテクチャ根底技法]分割と統治(Divide and Conquer)](01-basics/02-divide_and_conquer.md) & [90:90の法則](10-humor/01-90_90rule.md)
3. 2023/12/27 [KISS](01-basics/03-kiss.md)
4. 2024/01/10 [DRY(Don't Repeat Yourself)](01-basics/04-dry.md)
5. 2024/01/17 [名前重要](01-basics/05-naming_is_important.md)
6. 2023/01/24 [SLAP(Single Level of Abstraction Principle)](01-basics/06-slap.md)
7. 2024/02/07 [なぜ配列の要素番号はゼロから始まるのか](09-techniques/02-why-index-start-with0.md)
8. 2024/02/28 [TMTOWTDI](01-basics/10-tmtowtdi.md) & [PIE(Program Intently and Expressively)](01_basics/09-pie.md)
9. 2024/03/06 [[アーキテクチャ根底技法]参照の一点性](01-basics/07-single_point_of_reference.md) & [エンジニア適正クイズ](10-humor/04-milk_and_egg.md)
10. 2024/03/13 [ここまでの復習と分類](01-basics/11-wrapup.md)
11. 2024/03/27 [[アーキテクチャ根底技法]抽象化(Abstraction)](01-basics/12-abstraction.md)
12. 2024/04/10 [[アーキテクチャ根底技法]カプセル化/情報隠蔽/パッケージ化](01-basics/13-encapsulation_infohiding_pkg.md) & 演習
13. 2024/05/08 [[アーキテクチャ根底技法]関心の分離](01-basics/14-separation_of_concerns.md) & 演習
14. 2024/05/15 [[アーキテクチャ根底技法]充足性 & 完全性 & プリミティブ性](01-basics/15-suff_comp_prim.md) & 演習
15. 2024/05/22 [[アーキテクチャ根底技法]ポリシーとメカニズムの分離・インターフェースと実装の分離](01-basics/16-segmentation_principles.md)