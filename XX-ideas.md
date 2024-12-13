- @文字の由来
- キーボードの歴史
- Ctrl+c,v,xの理由
- https://qiita.com/kokubo_bosh_409/items/7c8fab57c04ab08d372a と、その下のraki氏によるコメント。reverseがある環境でなぜforを回しているか
- コメント
    - 「優れたコード > ひどいコード + 優れたコメント」。コードの読みにくさを補う「補助的なコメント」は通常必要になることはない。ひどいコードを直すためのトリガーとして考えてみよう
- デザインパターンもう一度
    - Head Firstデザインパターン(オーム社)でピックアップしているものを紹介(残りはやらない)
        - https://www.oreilly.co.jp/books/9784873119762/
        - Observer, Decorator, Factory, Singleton, Command, Adapter/Facade, Template Method, Iterator/Composite, State, Proxy, Compound(?)/State
            - 紹介されていない： Bridge,Builder,Chain of Responsibility, Flyweight, Interpreter, Mediator, Memento, Prototype, Visitor

- ヌル許容型について書いたらヌルの歴史を公開する
https://qiita.com/bigwheel/items/c4d60d91b3bbd7e6e130 null安全の観点から見たnull非許容型、null許容非安全型、null許容安全型の比較
    > 端的に書くと、null許容非安全型の利用をやめて実行時例外が発生する危険をなくそう、というものになります。
    > しかし、JavaやObjective-C, C#などでは言語デフォルトの型がnull許容非安全型であるためnull許容非安全型を使わないことは不可能です。
    > そのためKotlinやSwift, TypeScriptなど言語デフォルトの型がnull許容安全型であるような言語への移行が2019年現在進んでいます。