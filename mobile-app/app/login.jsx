import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../constants/api";

export default function Login() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert("Missing details", "Please enter email/phone and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        Alert.alert(
          "Login failed",
          data.message || "Invalid email/phone or password."
        );
        return;
      }

      await SecureStore.setItemAsync("accessToken", data.tokens.access);
      await SecureStore.setItemAsync("refreshToken", data.tokens.refresh);

      router.push("/otp");
    } catch (error) {
      Alert.alert(
        "Connection error",
        "Could not connect to the server. Please check your backend and API URL."
      );
    } finally {
      setLoading(false);
    }
  };

  const goToOtp = () => {
    router.push("/otp");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={styles.logoBox}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <View>
                <Text style={styles.brandTitle}>Ewan Engineering</Text>
                <Text style={styles.brandSubtitle}>
                  And Construction Pvt. Ltd.
                </Text>
              </View>
            </View>

            <Text style={styles.welcome}>Welcome back!!</Text>
            <Text style={styles.signInText}>Sign in to your account</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>EMAIL / PHONE</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}></Text>

              <TextInput
                style={styles.input}
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="Enter email or phone"
                placeholderTextColor="#9AA3B8"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.label}>PASSWORD</Text>

            <View style={[styles.inputBox, styles.activeInput]}>
              <Text style={styles.inputIcon}></Text>

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#9AA3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeText}>
                  {showPassword ? "🫣" : "👀"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In Securely</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>🌐 Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={goToOtp}>
                <Text style={styles.socialText}>📱 Phone OTP</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerText}>
                Don't have an account?{" "}
                <Text style={styles.registerLink}>Register →</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1C2187",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#1C2187",
    paddingHorizontal: 34,
    paddingTop: 20,
    paddingBottom: 60,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
  },

//   logoBox: {
//     width: 54,
//     height: 54,
//     borderRadius: 14,
//     backgroundColor: "#2BC3F3",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },

  logo: {
    width: 110,
    height: 110,
    marginRight: 15,
  },

  brandTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontFamily: "Times New Roman",
    fontWeight: "700",
  },

  brandSubtitle: {
    color: "#22C7F4",
    fontSize: 15,
    marginTop: 2,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 29,
    fontFamily: "Times New Roman",
    fontWeight: "700",
  },

  signInText: {
    color: "#C9CBEF",
    fontSize: 16,
    marginTop: 10,
  },

  formSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 34,
    paddingTop: 32,
    paddingBottom: 40,
  },

  label: {
    color: "#273044",
    fontSize: 12,
    letterSpacing: 1.2,
    fontWeight: "700",
    marginBottom: 9,
  },

  inputBox: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E3E7EF",
    backgroundColor: "#F6F7FA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 22,
  },

  activeInput: {
    borderColor: "#22B9F2",
    backgroundColor: "#F2F8FF",
  },

  inputIcon: {
    fontSize: 15,
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: "#111827",
    fontSize: 16,
  },

  eyeText: {
    fontSize: 15,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -12,
    marginBottom: 30,
  },

  forgotText: {
    color: "#159CE8",
    fontSize: 14,
  },

  loginButton: {
    height: 58,
    borderRadius: 12,
    backgroundColor: "#195CCB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#195CCB",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },

  disabledButton: {
    opacity: 0.7,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    color: "#9AA3B8",
    fontSize: 13,
    marginHorizontal: 12,
  },

  socialRow: {
    flexDirection: "row",
    gap: 12,
  },

  socialButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  socialText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
  },

  registerButton: {
    marginTop: 24,
    alignItems: "center",
  },

  registerText: {
    color: "#9AA3B8",
    fontSize: 14,
  },

  registerLink: {
    color: "#159CE8",
    fontWeight: "700",
  },
});