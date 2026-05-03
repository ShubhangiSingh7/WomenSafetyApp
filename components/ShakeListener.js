import { useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import { Vibration, Alert } from "react-native";
import { triggerSOS } from "../Services/sosService";

export default function ShakeListener() {
  useEffect(() => {
    let lastShake = 0;
    let isProcessing = false;

    const subscription = Accelerometer.addListener((accel) => {
      const totalForce = Math.sqrt(
        accel.x ** 2 + accel.y ** 2 + accel.z ** 2
      );

      if (totalForce > 6) {
        const now = Date.now();

        if (now - lastShake > 2000 && !isProcessing) {
          lastShake = now;
          isProcessing = true;

          Vibration.vibrate(500);

          // 🚨 POPUP ADDED HERE
          Alert.alert(
            "SOS Triggered 🚨",
            "Shake detected! Sending emergency alert...",
            [{ text: "OK" }]
          );

          triggerSOS("shake_triggered")
            .catch((err) => console.log("SOS Error:", err.message))
            .finally(() => {
              isProcessing = false;
            });
        }
      }
    });

    Accelerometer.setUpdateInterval(100);

    return () => subscription.remove();
  }, []);

  return null;
}