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

# 読みやすいコードの作り方 - 関数(4)

_Code Readability_

---

## タネ本

### 『読みやすいコードのガイドライン<br>　 持続可能なソフトウェア開発のために』

- 石川宗寿(著)
- 技術評論社 2022/11/4 初版

![bg right:30% 90%](assets/12-book.jpg)

---

## 読んですぐに理解できる関数を書く

関数の動作が予測しやすくなっていれば、中身を意識しなくても良くなる。

> 関数名, 仮引数, 戻り値の型, ドキュメンテーション, ...

**斜め読みしても意味が分かる構成であれば、問題も見つけやすい**

* 関数の名前の意味とその動作が一致しているか
* 関数の名前が十分に具体的か
* ドキュメンテーションの要約が容易に書けるか

<!-- 命名という話だけではなく、その実装においても大事という話。命名は命名編を見てほしい -->

---

## 関数パートの説明内容

1. 関数の責任
    * 責任の分割の基本方針
    * コマンドとクエリの分割(Command-Query Separation. CQS)
1. 関数の流れ
    * 定義指向プログラミング
    * 早期リターン **←ｺｺ!**

---

## 早期リターン(Early return)

ハッピーパスとアンハッピーパス$^※$のうち、アンハッピーパスを早い段階で除外する

* <b>ハッピーパス</b>
    * 関数の主な目的を達成するときの処理の流れ。正常系
* <b>アンハッピーパス</b>
    * 目的を達成できないときの処理の流れ。異常系

**→ アンハッピーパスが関数先頭にまとまり、以降もハッピーパスのみに意識を向けて読めるようになる**

>>> ※正常系・異常系とも

---

## 早期リターンができていない例

```py
[BAD]
if is_network_available():
    query_result = query_to_server()
    if query_result.is_valid:
        result_str = query_result.parse()
        if result_str != "":
            # ...ハッピーパスの実装...
    else:
        show_invalid_response_dialog() # アンハッピーパス２
else:
    show_network_unavailable_dialog() # アンハッピーパス１
```

…３つ目のif文がelseを持っていないのに気づきましたか？アンハッピーパスの記述順がチェックしたときの順と異なっているのに気が付きましたか？

>>> 私も過去のプロダクトコードで同じコードを見たことがあります

---

## 早期リターンによる改善例

```py
[GOOD]
if not is_network_available:
    show_network_unavailable_dialog() # アンハッピーパス１
    return

query_result = query_to_server()
if not query_result.is_valid:
    show_invalid_response_dialog() # アンハッピーパス２
    return

result_str = query_result.parse()
if result_str == "":
    return # アンハッピーパス３

# ...ハッピーパスの実装...
```

---

## 早期リターンのコツ

* 早期リターンのまとまりを明確にする
    * switch文の一部にreturnが紛れていたりすると可読性が落ちる
* アンハッピーパスの妥当性に注意する
    * コードが離れるためハッピーパスの仕様変更に追従しづらくなる
    * 不要なチェックまで残りがちなのでハッピーパスと共に管理するよう気をつける

---

## 関数分割のコツ: メインシーケンスを複数作らない

```py
[BAD]
class MessageType(Enum): REGISTER_USER, GET_STATUS, ...

# この関数が肥大化しているので分割したい
def send_message(message_type: MessageType, peer: URL): # データを生成し送信
    # データ先頭部の作成
    if message_type == MessageType.REGISTER_USER: ...
    elif message_type == MessageType.GET_STATUS: ...
    elif ...
    # データ本体部のレイアウト更新
    if message_type == MessageType.REGISTER_USER: ...
    elif message_type == MessageType.GET_STATUS: ...
    elif ...
    ：
    send_to(peer, self.data)
```

>>> 本では「操作対象による分割」と表現しています

---

## 関数分割のコツ

```py
[BAD]
def send_message(message_type: MessageType, peer: URL): # データを生成し送信
    # タイプによるデータの作成
    if message_type == MessageType.REGISTER_USER:
        create_postdata_for_registeruser()
    elif message_type == MessageType.GET_STATUS:
        create_postdata_for_getstatus()
    elif message_type == MessageType.…:
        :

    send_to(peer, self.data)
```

* `create_postdata()`を見ただけでは具体的な処理が分からない
* すべての分岐先で網羅性を担保できない
    * 新しいデータ要素を追加: `MessageType.GET_STATUS`だけ更新忘れ

---

## 関数分割のコツ: メインシーケンスを１つにする

```py
[GOOD]
def send_message(message_type: MessageType, peer: URL): # データを生成し送信
    # データ生成
    data = create_header(message_type)
    data.append(create_body(message_type))
    data.append(create_footer(message_type))
    
    send_to(peer, data)

def create_header(message_type) -> Data: ...
    # タイプによるヘッダーの作成
    if message_type == MessageType.REGISTER_USER: ...
    elif message_type == MessageType.GET_STATUS: ...
    return data 生成したデータを返す

def create_body(message_type) -> Data: ...
def create_footer(message_type) -> Data: ...
```

<!-- ポイントは２つある。
* メインになるシーケンスを残しているため、何をしている処理なのかがわかりやすい
* create_header()/body()/footer()などの処理が参照透過性を持っていること
 -->

---

## まとめ

ハッピーパスとアンハッピーパスを分けることで、メインになる処理をより明らかにできる

* 早期リターン
    * ハッピーパスとアンハッピーパスのうち、アンハッピーパスを早い段階で除外する

<!-- 書籍 p172 にもまとめがある -->

---

## 補遺: 契約による設計

> もしそちらが事前条件を満たした状態で私を呼ぶと約束して下さるならば、お返しに事後条件を満たす状態を最終的に実現することをお約束します。$^※$

* **事前条件**: 呼び出し側が守らなければならない条件
* **事後条件**: 呼ばれる側が守らなければならない条件
* <b>不変条件</b>: 呼び出し前、呼び出し後で維持されなければならない性質

事前条件として引数の型を厳密に定義しておき、その引数の型を持ってオブジェクトを渡す限りはある価値を返すことを事前条件で約束する。

>>> ※「オブジェクト指向入門 第2版: 原則・コンセプト」バートランド メイヤー著, 酒匂寛 訳, 翔泳社

<!-- 事前条件と事後条件の間がメインルーチン。

* 事前条件のチェック: メソッドの最初に、前提条件が満たされているかを確認します。満たされていない場合は、例外をスローします。
* 事後条件のチェック: メソッドの最後に、後条件が満たされているかを確認します。これも満たされていない場合は、例外をスローします。
* 不変条件のチェック: クラスの状態が常に不変条件を満たしているかを確認します。これも同様に、満たされていない場合は例外をスローします。

事前条件を満たした後、事後条件を満たすまでの処理が、おおむねハッピーパスとなる。何をしているかが分かりやすいはず。
 -->