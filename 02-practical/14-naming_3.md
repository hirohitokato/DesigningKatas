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

# 読みやすいコードの作り方 - 命名(3)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』
* 石川宗寿(著)
* 技術評論社 2022/11/4初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 命名

1. 命名に使う文法
2. 名前の示す内容
3. 単語の選択 **←ｲﾏｺｺ!**

---

## 注意深く単語を選ぶ

* 曖昧性の少ない単語を選ぶ
* 紛らわしい略語を避ける
* 単位や実体を示す語句を追加する
* 肯定的な単語を用いる

---

## 曖昧性の少ない単語を選ぶ

汎用的な名前を避け、より意味が限定された単語を使う。 `limit` < `min`,`max`

### ありがちな名前

* flag
* check
* old

---

## 曖昧な例①:flag「`bool initializationFlag`とは？」🤔

|状態|ふさわしい名前|
|---|---|
|初期化中|`isInitializing`|
|初期化済み|`wasInitialized`|
|初期化可能|`canInitialize`,`isInitializable`|
|初期化するべき|`shouldInitialize`, `isInitializationRequired`,<br>`requiresInitialization`|

フラグがtrueのときに何を示しているかに着目する

---

## 曖昧な例②:check「`checkMessage()`とは？」🤔

|行為|ふさわしい名前|
|---|---|
|条件に合致するかを返す|`hasNewMessage`, `isMessageFormatValid`,<br>`throwIfMessageIdEmpty`|
|条件に合うものを返す|`takeSentMessage`, `takeMessagesIfNotEmpty`|
|外部から取得する|`queryNewMessages`, `fetchQueuedMessageList`|
|内部状態を更新・同期する|`updateStoredMessages`, `syncMessageListWithServer`|

呼び出しで状態変化を伴う→変更内容に着目 / 伴わない→戻り値や例外の内容に着目

---

## 曖昧な例③:old「`oldIdentifier`とは？」🤔

|状態|ふさわしい名前|
|---|---|
|1つ前の状態|`previous〜`|
|無効化された値|`invalidated〜`, `expired〜`|
|変更前の値|`original〜`, `unedited〜`|
|既に取得・保存した値|`fetched〜`, `cached〜`, `stored〜`|
|(非推奨のクラスなど)|`deprecated`|

比較対象の有無・条件を満たしているかどうかに着目。oldが範囲を示す場合は`before`/`until`/`by`も候補になる

---

## クイズ([名前重要](../01-basics\05-naming_is_important.md)から再掲)

適切な関数名・変数名を考えてみよう

```py
def regist_cust(name, pwd):
    ...

def cre_task(exinf, tskatr, task, itskpri, …):
    ...

def clear_cache_and_load_data():
    ...
```

<!-- exinf:extended information, tskatr:task attributes, task: function pointer of task, itskpri: task priority(iは?) -->

---

## より曖昧さの少ない単語を探すには

（業務ドメインを意識しつつ）辞書や類語辞典を利用する。それでもうまく見つけられない場合、同じ単語を使う別の状況を想定して比較するのも良い。

#### 例：値を取得する関数名で`get〜`しか思いつかない…

* データのソース：既に持っている値を返すか・計算で取得するか・ネットワークを使うか
* 状態の変更を伴うか：何も変更しないか・キャッシュするか・元のデータを削除するか

→ `find`,`search`,`pop`,`calculate`,`fetch`,`query`,`load`が思いつける

<!-- ただし語彙力も重要。若かりし日の過ちを打ち明けると、「工場出荷リセットしてもずっと保持し続ける情報の格納庫」に
EternalDataStoreと名付けてしまった。永久の/無限にはちょっと意味が大きすぎる。PersistentDataStore,FactoryResetSafeDataStoreにしておくべきだった。 -->
<!-- 今はChatGPTやCoPilotがあるから、仕様を説明して考えてもらうのも良い -->