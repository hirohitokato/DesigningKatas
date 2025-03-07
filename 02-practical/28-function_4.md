---
marp: true
math: mathjax
theme: katas
title: "読みやすいコードの作り方 - 関数(4)"
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

> 見た目を美しく整えることや、流行りのテクニックを取り入れることが「改善」だと思い込んでいませんか？

![bg right:30% 90%](assets/12-book.jpg)

---

## 読んですぐに理解できる関数を書く

関数の動作が予測しやすくなっていれば、中身を意識しなくても良くなる。

> 関数名, 仮引数, 戻り値の型, ドキュメンテーション, ...

**斜め読みしても意味が分かる構成であれば、問題も見つけやすい**

- 関数の名前の意味とその動作が一致しているか
- 関数の名前が十分に具体的か
- ドキュメンテーションの要約が容易に書けるか

<!-- 命名という話だけではなく、その実装においても大事という話。命名は命名編を見てほしい -->

---

## 関数パートの説明内容

1. 関数の責任
    - 責任の分割の基本方針
    - コマンドとクエリの分割(Command-Query Separation. CQS)
1. 関数の流れ
    - 定義指向プログラミング
    - **早期リターン**
    - **関数分割のコツ**
---

## 早期リターン(Early return)

ハッピーパスとアンハッピーパス$^※$のうち、アンハッピーパスを早い段階で除外する

- <b>ハッピーパス</b>
    - 関数の主な目的を達成するときの処理の流れ。正常系
- <b>アンハッピーパス</b>
    - 目的を達成できないときの処理の流れ。異常系

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

<b>Quiz:</b> 気になる処理・読みにくいと思う部分を考えてみよう

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

- 早期リターンのまとまりを明確にする
    - switch文の一部にreturnが紛れていたりすると可読性が落ちる
- アンハッピーパスの妥当性に注意する
    - コードの記述箇所が離れるためハッピーパスの仕様変更に追従しづらくなる
    - 不要なチェックまで残りがちなのでハッピーパスと共に管理するよう気をつける

---

## 早期リターン vs. MISRA-C 14.7$^{1,2}$

「14.7 関数では、関数の最後に唯一の出口がなくてはならない」⇔早期リターン

- MISRA-C 14.7での狙い:
    - return前のリソース解放忘れを防ぐ
    - 制御フローを原則１つにする
    - (関数の出口を１つにしても問題ないくらいに責務分離する) $^3$

「責務分離の徹底」「制御フローをシンプルにする」では目的が一致。教条主義に陥らないように。

>>> 1. MISRA(Motor Industry Software Reliability Association、ミスラ)が開発したC言語のためのソフトウェア設計標準規格。安全性/可搬性/信頼性の確保が目的
>>> 2. 初版が1998年に発表、現在は2012年版を追記＆誤記修正した2023年版が最新版。有償。
>>> 3. https://togetter.com/li/363795 の中で出て来た拡大解釈

<!-- https://togetter.com/li/363795 より
MISRA-Cのルール14.x全体を見ると，goto 禁止だけでなく，break や continue に制限がかかったり if-else の後の else を強制したりして，想定外の制御フローの存在を極端に嫌っている．
MISRA-Cルール14.x に適合するコードを書こうとすると，たぶんインデントの段数は少なく(STLないので1段は無理としても)なり，関数中のreturn文の数は少なくなる．
result変数を持ち歩くコードは可読性悪いから．結局早期リターンのコードにも近づく．
-->
<!-- とはいえ関数末尾へのgotoは許可していたりするからモニョるところはある -->

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

- `create_postdata_～()`を見ただけでは具体的な処理が分からない
- すべての分岐先で網羅性を担保できない
    - 新しいデータ要素を追加: `MessageType.GET_STATUS`だけ更新忘れ

<!-- 結合度においては「条件結合になっている」と言えます -->

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
- メインになるシーケンスを残しているため、何をしている処理なのかがわかりやすい
- create_header()/body()/footer()などの処理が参照透過性を持っていること
 -->

---

## まとめ

- 早期リターン
    - ハッピーパスとアンハッピーパスを分けることで、メインになる処理をより明らかにできる
    - ハッピーパスとアンハッピーパスのうち、アンハッピーパスを早い段階で除外する
- 関数分割のコツ
    - メインシーケンスを複数にせず１つになるよう書く
    - 処理の適切な階層化にもつながる

<!-- 書籍 p172 にもまとめがある -->

---

## 関数の総まとめ

1. 関数の責任
    - 責任の分割の基本方針
    - コマンドとクエリの分割(Command-Query Separation. CQS)
1. 関数の流れ
    - 定義指向プログラミング
    - 早期リターン
    - 関数分割のコツ

---

## 補遺: 契約による設計

> もしそちらが事前条件を満たした状態で私を呼ぶと約束して下さるならば、お返しに事後条件を満たす状態を最終的に実現することをお約束します。$^※$

- **事前条件**: 呼び出し側が守らなければならない条件
- **事後条件**: 呼ばれる側が守らなければならない条件
- <b>不変条件</b>: 呼び出し前、呼び出し後で維持されなければならない性質

事前条件として引数の型を厳密に定義しておき、その引数の型を持ってオブジェクトを渡す限りはある価値を返すことを事前条件で約束する。

>>> ※「オブジェクト指向入門 第2版: 原則・コンセプト」バートランド メイヤー著, 酒匂寛 訳, 翔泳社

<!-- 事前条件と事後条件の間がメインルーチン。

- 事前条件のチェック: メソッドの最初に、前提条件が満たされているかを確認します。満たされていない場合は、例外をスローします。
- 事後条件のチェック: メソッドの最後に、後条件が満たされているかを確認します。これも満たされていない場合は、例外をスローします。
- 不変条件のチェック: クラスの状態が常に不変条件を満たしているかを確認します。これも同様に、満たされていない場合は例外をスローします。

事前条件を満たした後、事後条件を満たすまでの処理が、おおむねハッピーパスとなる。何をしているかが分かりやすいはず。
-->