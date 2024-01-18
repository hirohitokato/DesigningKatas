
* SOLID
    * Dにはハリウッドの原則
    * 最終的な連鎖関係にも言及する SRP→ISP→{DIP&LSP}→OCP
        1. SRP: 分割
        2. ISP: 使っていないものへの依存を回避
        3. DIP: 依存関係の方向を整理
        4. LSP: パーツが交換可能
        5. OCP: コード追加のみで機能拡張できる


---

### 4.1. ISPの例
 
アプリからSMS送信をできるようにするために、
 
「いろんなSMSにも対応できるよう抽象インターフェイスを用意しておけば拡張にも対応しやすいね！」
 
と考え作ったのが次のコード。
 
```cs
// ❌
interface IMessageCommunicator {
    void send(String msg); // 送信だけでなく
    Task waitReceive();    // 受信機能もサービスによってはあるよね？
}
 
class LINEMessageSender: IMessageCommunicator {
    void send(String msg) { … }
    Task waitReceive() { … } ← 要らないのに実装しないとコンパイルエラー…
}
 
var sender = new LINEMessageSender();
// ライブラリ利用者「senderにはwaitReceive()もあるけどどういう意味？🤔」
```
 
上だと送信機能だけをサブクラスで実装できなくなり、使わないはずの受信機能までダミーで実装する事態になっていてヤバい。
 
### 4.2. どうしたらいい？
単一責任の原則(SRP)にも反しているので、下のように役割を分けることで使う側も勘違いなどのミスが減る。
 
```cs
// ⭕
interface IMessageSender {
    void send(String msg);
}
interface IMessageReceiver {
    void send(String msg);
    Task waitReceive();
}
class LINEMessageSender: IMessageSender {
    void send(String msg) { … } ← 必要なものだけ実装できる
}
```

