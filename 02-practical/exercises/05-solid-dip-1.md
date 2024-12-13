# Dependency Inversion Principle演習1

次のコードの問題点を調べ、依存関係逆転の原則を適用したコードに改善しよう。

検証先リンク: https://paiza.io/ja/projects/new?language=cpp

## 改善前

```cpp
#include <iostream>

class TemperatureSensorAndHeater {
public:
    float readTemperature() {
        // 実際のセンサーから温度を読み取る処理
        return 25.0f;  // サンプル値
    }

    void turnOn() {
        std::cout << "ヒーターをオンにしました" << std::endl;
    }

    void turnOff() {
        std::cout << "ヒーターをオフにしました" << std::endl;
    }
};

class TemperatureController {
private:
    TemperatureSensorAndHeater sensors;
    float targetTemperature;

public:
    TemperatureController(float target) : targetTemperature(target) {}

    void controlTemperature() {
        float currentTemperature = sensors.readTemperature();
        if (currentTemperature < targetTemperature) {
            sensors.turnOn();
        } else {
            sensors.turnOff();
        }
    }
};

int main() {
    TemperatureController controller(23.0f);
    controller.controlTemperature();
    return 0;
}
```

このコードには以下の問題があります：

- TemperatureController クラスが TemperatureSensorAndHeater クラスに直接依存している
    - 高レベルのモジュール（TemperatureController）が低レベルのモジュール（TemperatureSensor, Heater）に依存している
    - 不安定の連鎖がTemperatureControllerにまで広がっていて、TemperatureControllerも不安定なクラスになっている
- TemperatureSensorAndHeaterの役割が２つある
- システムの拡張性や柔軟性が低く、例えば別の種類のセンサーやヒーターに交換することが難しい


## 改善後

- 抽象（インターフェース）を導入し、高レベルモジュールと低レベルモジュールの両方がその抽象に依存するようにする。
- TemperatureController クラスが具体的な実装ではなく、抽象に依存するようにする。
- 依存性注入を使用して、外部から依存オブジェクトを提供できるようにする。

```cpp
#include <iostream>
#include <memory>

// 抽象クラス（インターフェース）
class ITemperatureSensor {
public:
    virtual float readTemperature() = 0;
    virtual ~ITemperatureSensor() = default; // デストラクタを仮想化していないと親クラスで確保したリソースが破棄されない問題に繋がる
};

class IHeater {
public:
    virtual void turnOn() = 0;
    virtual void turnOff() = 0;
    virtual ~IHeater() = default;
};

// 具体的な実装クラス
class ConcreteTemperatureSensor : public ITemperatureSensor {
public:
    float readTemperature() override {
        // 実際のセンサーから温度を読み取る処理
        return 25.0f;  // サンプル値
    }
};

class ConcreteHeater : public IHeater {
public:
    void turnOn() override {
        std::cout << "ヒーターをオンにしました" << std::endl;
    }

    void turnOff() override {
        std::cout << "ヒーターをオフにしました" << std::endl;
    }
};

// 高レベルモジュール
class TemperatureController {
private:
    std::unique_ptr<ITemperatureSensor> sensor;
    std::unique_ptr<IHeater> heater;
    float targetTemperature;

public:
    TemperatureController(std::unique_ptr<ITemperatureSensor> s, 
                          std::unique_ptr<IHeater> h, 
                          float target)
        : sensor(std::move(s)), heater(std::move(h)), targetTemperature(target) {}

    void controlTemperature() {
        float currentTemperature = sensor->readTemperature();
        if (currentTemperature < targetTemperature) {
            heater->turnOn();
        } else {
            heater->turnOff();
        }
    }
};

int main() {
    auto sensor = std::make_unique<ConcreteTemperatureSensor>();
    auto heater = std::make_unique<ConcreteHeater>();
    TemperatureController controller(std::move(sensor), std::move(heater), 23.0f);
    controller.controlTemperature();
    return 0;
}
```

この解答例では、以下の点で依存関係逆転の原則を適用しています：

- 抽象化の導入：
    - ITemperatureSensor と IHeater というインターフェース（抽象基底クラス）を導入
    - 具体的な実装クラス（ConcreteTemperatureSensor, ConcreteHeater）はこれらのインターフェースを実装
- 依存関係の逆転：
    - TemperatureController（高レベルモジュール）は、具体的な実装ではなく抽象インターフェースに依存するように
    - 高レベルモジュールと低レベルモジュールの両方が抽象に依存するようになった
- 依存性注入：
    - TemperatureController のコンストラクタで、センサーとヒーターのインターフェースを受け取るように変更
    - 外部から依存オブジェクトを注入できるようになり、柔軟性が向上しました。
- スマートポインタの使用：
    - std::unique_ptr を使用して、リソース管理を改善し、メモリリークを防止

### 改善後コードの利点：

- 拡張性：新しい種類のセンサーやヒーターを追加する際、既存のコードを変更せずに新しいクラスを追加できます。
- テスト容易性：モックオブジェクトを使用して、TemperatureController を容易にテストできます。
- 柔軟性：実行時に異なる種類のセンサーやヒーターを使用できます。
- 疎結合：高レベルモジュールと低レベルモジュールの間の依存関係が弱くなり、システムの保守性が向上します。
