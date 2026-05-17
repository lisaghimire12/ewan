import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Otp() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Verify Phone</Text>
        <Text style={styles.subtitle}>Code sent to +977 98XXXXXXX</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.info}>
          OTP page
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#1C2187",
    paddingHorizontal: 28,
    paddingTop: 50,
    paddingBottom: 36,
  },

  back: {
    color: "#FFFFFF",
    fontSize: 30,
    marginBottom: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "Times New Roman",
    fontWeight: "700",
  },

  subtitle: {
    color: "#C9CBEF",
    fontSize: 15,
    marginTop: 12,
  },

  body: {
    flex: 1,
    padding: 28,
  },

  info: {
    color: "#4B5563",
    fontSize: 16,
    lineHeight: 26,
  },
});