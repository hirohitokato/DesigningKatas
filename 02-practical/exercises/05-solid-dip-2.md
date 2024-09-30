
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
        logFile << "[F] Log: " << message << std::endl;
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