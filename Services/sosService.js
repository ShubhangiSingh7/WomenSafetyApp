import * as Location from "expo-location";
import { supabase } from "../lib/supabase";

export const triggerSOS = async (method = "button_pressed") => {
  try {
    const userResp = await supabase.auth.getUser();
    const user = userResp.data.user;
    if (!user) throw new Error("No logged-in user");

    // Get location
    let location = null;
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const position = await Location.getCurrentPositionAsync({});
      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    }

    // Insert SOS alert
    const alertData = {
      user_id: user.id,
      latitude: location?.latitude,
      longitude: location?.longitude,
      message: "SOS activated",
      method: method,
      created_at: new Date().toISOString(),
    };

    const { error: alertError } = await supabase
      .from("sos_alerts")
      .insert([alertData]);

    if (alertError) throw alertError;

    // Get contacts
    const { data: contacts, error } = await supabase
      .from("trusted_contacts")
      .select("phone")
      .eq("user_id", user.id);

    if (error) throw error;

    // Prepare message
    const mapLink = location
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
      : "Location not available";

    const sosMessage = `This is ${user.email}. My location: ${mapLink}`;

    const numbers = contacts.map((c) => c.phone);

    // Send SMS
    const resp = await fetch(
      "https://unnotified-mellie-disjunctively.ngrok-free.dev/send-sms",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numbers: numbers.join(","),
          message: sosMessage,
        }),
      }
    );

    const text = await resp.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server returned non-JSON response");
    }

    if (!resp.ok || !data.success) {
      throw new Error(data?.error || "SMS sending failed");
    }

    return true;
  } catch (error) {
    throw error;
  }
};