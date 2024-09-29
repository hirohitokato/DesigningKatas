# Dependency Inversion Principle演習

次のコードの問題点を調べ、依存関係逆転の原則を適用したコードに改善しよう。

検証先リンク: https://paiza.io/ja/projects/new

## 改善前

```cpp
#include <iostream>

class TemperatureSensor {
public:
    float readTemperature() {
        // 実際のセンサーから温度を読み取る処理
        return 25.0f;  // サンプル値
    }
};

class Heater {
public:
    void turnOn() {
        std::cout << "ヒーターをオンにしました" << std::endl;
    }

    void turnOff() {
        std::cout << "ヒーターをオフにしました" << std::endl;
    }
};

class TemperatureController {
private:
    TemperatureSensor sensor;
    Heater heater;
    float targetTemperature;

public:
    TemperatureController(float target) : targetTemperature(target) {}

    void controlTemperature() {
        float currentTemperature = sensor.readTemperature();
        if (currentTemperature < targetTemperature) {
            heater.turnOn();
        } else {
            heater.turnOff();
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

* TemperatureController クラスが TemperatureSensor と Heater クラスに直接依存している
    * 高レベルのモジュール（TemperatureController）が低レベルのモジュール（TemperatureSensor, Heater）に依存している
    * 不安定の連鎖がTemperatureControllerにまで広がっていて、TemperatureControllerも不安定なクラスになっている
* システムの拡張性や柔軟性が低く、例えば別の種類のセンサーやヒーターに交換することが難しい


## 改善後

* 抽象（インターフェース）を導入し、高レベルモジュールと低レベルモジュールの両方がその抽象に依存するようにする。
* TemperatureController クラスが具体的な実装ではなく、抽象に依存するようにする。
* 依存性注入を使用して、外部から依存オブジェクトを提供できるようにする。

```cpp

```
