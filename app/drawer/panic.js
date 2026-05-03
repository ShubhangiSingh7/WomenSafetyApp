import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { triggerSOS } from "../../Services/sosService";

export default function PanicButton() {
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const callEmergency = () => {
    const phoneNumber = "112";

    Linking.openURL(`tel:${phoneNumber}`)
      .catch((err) => {
        Alert.alert("Error", "Cannot make call: " + err.message);
      });
  };

  const handleSOS = async () => { 
    setLoading(true);
    try {
      await triggerSOS("button_pressed");

      setIsAlertSent(true);
      setMessage("SOS alert sent! Your trusted contacts have been notified.");

      setTimeout(() => {
        setIsAlertSent(false);
        setMessage("");
      }, 10000);

    } catch (error) {
      setIsAlertSent(false);
      setMessage(`Error sending SOS: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleShareLocation = async () => {
    setIsSharingLocation(true);
    setMessage("Location shared with emergency contacts");

    setTimeout(() => {
      setIsSharingLocation(false);
      setMessage("");
    }, 3000);
  };

  const quickActions = [
    { icon: "📍", title: "Share Live Location", action: handleShareLocation, bgColor: "#4f46e5" },
    { icon: "📞", title: "Call Emergency Services", action: callEmergency, bgColor: "#dc2626" }
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Emergency SOS Alert</Text>
      <Text style={styles.subHeader}>Use this button only in genuine emergencies</Text>

      {message ? (
        <View style={[styles.messageBox, message.includes("Error") ? styles.errorBox : styles.successBox]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      <View style={styles.center}>
        <TouchableOpacity
          onPress={handleSOS}
          disabled={isAlertSent || loading}
          style={[
            styles.sosButton,
            isAlertSent ? styles.sosSent : loading ? styles.sosLoading : styles.sosDefault
          ]}
        >
          <Text style={styles.sosText}>
            {loading ? "⏳ Sending..." : isAlertSent ? "✅ SOS Sent!" : "🚨 SOS"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        {quickActions.map((action, idx) => (
          <View key={idx} style={styles.actionCard}>
            <View style={[styles.iconCircle, { backgroundColor: action.bgColor }]}>
              <Text style={styles.iconText}>{action.icon}</Text>
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.infoHeader}>Emergency Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoSubHeader}>What happens when you press SOS?</Text>
            <Text>• Emergency alert sent to all contacts</Text>
            <Text>• Your location automatically shared</Text>
            <Text>• Alert recorded in your safety log</Text>
            <Text>• Quick access to emergency services</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoSubHeader}>Safety Tips</Text>
            <Text>• Stay calm and assess the situation</Text>
            <Text>• Move to a safe location if possible</Text>
            <Text>• Keep your phone accessible</Text>
            <Text>• Trust your instincts</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  subHeader: { fontSize: 16, color: "#4b5563", textAlign: "center", marginBottom: 16 },
  center: { alignItems: "center", marginVertical: 24 },
  sosButton: { width: 200, height: 200, borderRadius: 100, alignItems: "center", justifyContent: "center" },
  sosText: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center" },
  sosDefault: { backgroundColor: "#dc2626" },
  sosLoading: { backgroundColor: "#f59e0b" },
  sosSent: { backgroundColor: "#16a34a" },
  messageBox: { padding: 12, borderRadius: 8, marginBottom: 16 },
  errorBox: { backgroundColor: "#fee2e2" },
  successBox: { backgroundColor: "#bbf7d0" },
  messageText: { color: "#111", fontWeight: "bold" },
  quickActions: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 16 },
  actionCard: { width: "48%", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  iconText: { fontSize: 28 },
  actionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  actionBtn: { backgroundColor: "#4f46e5", padding: 8, borderRadius: 6 },
  actionBtnText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 8, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  infoHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  infoGrid: { flexDirection: "row", justifyContent: "space-between" },
  infoColumn: { flex: 1, marginRight: 8 },
  infoSubHeader: { fontWeight: "bold", marginBottom: 4 },
});