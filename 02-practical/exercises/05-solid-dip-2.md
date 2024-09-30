# Dependency Inversion Principle演習2

次のコードの問題点を調べ、SOLIDを満たす内容に改善しよう。

検証先リンク: https://paiza.io/ja/projects/new

## 改善前

```cpp
#include <iostream>

class Application {
public:
    void connectToDatabase() {
        std::cout << "Connected to database" << std::endl;
    }

    void disconnectFromDatabase() {
        std::cout << "Disconnected from database" << std::endl;
    }

    void logToConsole(const std::string& message) {
        std::cout << "[C]Log: " << message << std::endl;
    }

    void logToFile(const std::string& message) {
        std::cout << "[F] Log: " << message << std::endl;
    }

    void run() {
        connectToDatabase();
        logToConsole("Application started");
        logToFile("Application started");
        // アプリケーションのメイン処理
        logToConsole("Application running");
        logToFile("Application running");
        disconnectFromDatabase();
    }
};

int main() {
    Application app;
    app.run();

    return 0;
}
```

このコードには以下の問題があります：

Applicationクラスがすべての機能を内包しており、依存関係逆転の原則（DIP）、単一責任の原則（SRP）を守れていない

## 改善後

* インターフェースを導入して、Applicationクラスが具体的なデータベース接続やログ記録の実装に依存しないようにする
* データベース接続とログ記録のクラスはそれぞれのインターフェースを実装する

```cpp
#include <iostream>
#include <vector>
#include <memory>

// データベースインターフェース
class IDatabase {
public:
    virtual void connect() = 0;
    virtual void disconnect() = 0;
    virtual ~IDatabase() = default;
};

// ログインターフェース
class ILogger {
public:
    virtual void log(const std::string& message) = 0;
    virtual ~ILogger() = default;
};

// データベースクラス
class Database : public IDatabase {
public:
    void connect() override {
        std::cout << "Connected to database" << std::endl;
    }
    void disconnect() override {
        std::cout << "Disconnected from database" << std::endl;
    }
};

// コンソールロガークラス
class ConsoleLogger : public ILogger {
public:
    void log(const std::string& message) override {
        std::cout << "[C] Log: " << message << std::endl;
    }
};

// ファイルロガークラス
class FileLogger : public ILogger {
public:
    void log(const std::string& message) override {
        std::cout << "[F] Log: " << message << std::endl;
    }
};

// アプリケーションクラス
class Application {
    std::unique_ptr<IDatabase> database;
    std::vector<std::unique_ptr<ILogger>> loggers;
public:
    Application(std::unique_ptr<IDatabase> d, std::vector<std::unique_ptr<ILogger>> l)
        : database(std::move(d)), loggers(std::move(l)) {}

    void run() {
        database->connect();
        log("Application started");
        // アプリケーションのメイン処理
        log("Application running");
        database->disconnect();
    }

    void log(const std::string& message) {
        for (auto& logger : loggers) {
            logger->log(message);
        }
    }
};

int main() {
    auto db = std::make_unique<Database>();
    auto consoleLogger = std::make_unique<ConsoleLogger>();
    auto fileLogger = std::make_unique<FileLogger>();

    std::vector<std::unique_ptr<ILogger>> loggers;
    loggers.push_back(std::move(consoleLogger));
    loggers.push_back(std::move(fileLogger));

    Application app1(std::move(db), std::move(loggers));
    app1.run();

    return 0;
}
```
