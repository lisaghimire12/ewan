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

import { useRouter } from "expo-router";

import { API_BASE_URL } from "../constants/api";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email.trim() || !password.trim()) {

      Alert.alert(
        "Missing fields",
        "Please enter email and password."
      );

      return;
    }

    try {

      setLoading(true);

      console.log("1. Login started");

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      console.log("2. Response received");

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("3. DATA:", data);

      if (response.ok) {

        console.log("4. Login success");

        setPassword("");

        router.push({
          pathname: "/otp",
          params: {
            phone: email,
            username: data.user.username,
          },
        });

        return;
      }

      Alert.alert(
        "Login failed",
        data.message || "Invalid email or password."
      );

    } catch (error) {

      console.log("ERROR:", error);

      Alert.alert(
        "Connection error",
        "Could not connect to server."
      );

    } finally {

      setLoading(false);

    }
  };

  const goToOtp = () => {
    router.push("/otp");
  };

  const goToRegister = () => {
    router.push("/register");
  };

  const goToForgotPassword = () => {
    Alert.alert(
      "Coming soon",
      "Forgot password will be connected later."
    );
  };

  const goToGoogleLogin = () => {
    Alert.alert(
      "Coming soon",
      "Google login will be connected later."
    );
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

          {/* HEADER */}

          <View style={styles.header}>

            <View style={styles.brandRow}>

              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />

              <View style={styles.brandTextBox}>

                <Text style={styles.brandTitle}>
                  Ewan Engineering
                </Text>

                <Text style={styles.brandSubtitle}>
                  And Construction Pvt. Ltd.
                </Text>

              </View>

            </View>

            <Text style={styles.welcome}>
              Welcome back!!
            </Text>

            <Text style={styles.signInSubText}>
              Sign in to your account
            </Text>

          </View>

          {/* FORM */}

          <View style={styles.formSection}>

            <Text style={styles.label}>
              EMAIL
            </Text>

            <View style={styles.inputBox}>

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#9AA3B8"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />

            </View>

            <Text style={styles.label}>
              PASSWORD
            </Text>

            <View style={[styles.inputBox, styles.activeInput]}>

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#9AA3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >

                <Text style={styles.eyeText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>

              </TouchableOpacity>

            </View>

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={goToForgotPassword}
            >

              <Text style={styles.forgotText}>
                Forgot password?
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.disabledButton
              ]}
              onPress={handleLogin}
              disabled={loading}
            >

              {loading ? (

                <ActivityIndicator color="#FFFFFF" />

              ) : (

                <Text style={styles.loginButtonText}>
                  Sign In Securely
                </Text>

              )}

            </TouchableOpacity>

            {/* DIVIDER */}

            <View style={styles.dividerRow}>

              <View style={styles.divider} />

              <Text style={styles.dividerText}>
                or continue with
              </Text>

              <View style={styles.divider} />

            </View>

            {/* SOCIAL */}

            <View style={styles.socialRow}>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={goToGoogleLogin}
              >

                <Text style={styles.socialText}>
                  🇬 Google
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={goToOtp}
              >

                <Text style={styles.socialText}>
                  📱 Phone OTP
                </Text>

              </TouchableOpacity>

            </View>

            {/* REGISTER */}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={goToRegister}
            >

              <Text style={styles.registerText}>

                Don't have an account?{" "}

                <Text style={styles.registerLink}>
                  Register →
                </Text>

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
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#1C2187",
    paddingHorizontal: 34,
    paddingTop: 44,
    paddingBottom: 54,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 38,
  },

  logo: {
    width: 105,
    height: 64,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
  },

  brandTextBox: {
    flex: 1,
  },

  brandTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  brandSubtitle: {
    color: "#22C7F4",
    fontSize: 15,
    marginTop: 3,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },

  signInSubText: {
    color: "#C9CBEF",
    fontSize: 17,
    marginTop: 12,
  },

  formSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 34,
    paddingTop: 34,
    paddingBottom: 44,
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

  input: {
    flex: 1,
    color: "#111827",
    fontSize: 16,
  },

  eyeText: {
    color: "#159CE8",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 10,
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
    shadowOffset: {
      width: 0,
      height: 10,
    },
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