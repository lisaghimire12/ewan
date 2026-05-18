import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpScreen() {
  const { phone } = useLocalSearchParams();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(165);

  const inputs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const maskPhoneOrEmail = (value) => {
    if (!value) return "your registered number";

    const text = String(value);

    if (text.includes("@")) {
      const [name, domain] = text.split("@");
      const visibleName = name.slice(0, 2);
      return `${visibleName}****@${domain}`;
    }

    if (text.length <= 4) {
      return text;
    }

    const first = text.slice(0, 4);
    const last = text.slice(-2);

    return `${first}******${last}`;
  };

  const handleChange = (text, index) => {
    const value = text.replace(/[^0-9]/g, "");

    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");

      digits.forEach((digit, digitIndex) => {
        if (index + digitIndex < 6) {
          newOtp[index + digitIndex] = digit;
        }
      });

      setOtp(newOtp);

      const nextIndex = Math.min(index + digits.length, 5);
      inputs.current[nextIndex]?.focus();

      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (event, index) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the complete 6-digit OTP.");
      return;
    }

    if (timeLeft <= 0) {
      Alert.alert("OTP expired", "Please resend OTP and try again.");
      return;
    }

    Alert.alert("OTP Entered", `You entered: ${enteredOtp}`);

    // Later we will connect this to backend OTP verification
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(165);
    inputs.current[0]?.focus();

    Alert.alert("OTP resent", "A new OTP has been sent.");
  };

  const isOtpComplete = otp.join("").length === 6;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.screen}>
            <View style={styles.topSection}>
              <View style={styles.contentWidth}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                >
                  <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Verify Phone</Text>

                <Text style={styles.subtitle}>
                  Code sent to{" "}
                  <Text style={styles.phoneText}>
                    {maskPhoneOrEmail(phone)}
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.whiteSection}>
              <View style={styles.contentWidth}>
                <Text style={styles.instruction}>
                  Enter the 6-digit verification code sent to your registered
                  mobile number.
                </Text>

                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputs.current[index] = ref;
                      }}
                      style={[
                        styles.otpBox,
                        digit ? styles.otpBoxFilled : styles.otpBoxEmpty,
                      ]}
                      value={digit}
                      onChangeText={(text) => handleChange(text, index)}
                      onKeyPress={(event) => handleBackspace(event, index)}
                      keyboardType="number-pad"
                      maxLength={6}
                      textAlign="center"
                      textAlignVertical="center"
                      selectionColor="#25B6FF"
                      returnKeyType="done"
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    !isOtpComplete && styles.verifyButtonDisabled,
                  ]}
                  onPress={handleVerify}
                  activeOpacity={0.85}
                >
                  <Text style={styles.verifyButtonText}>
                    Verify & Continue
                  </Text>
                </TouchableOpacity>

                <View style={styles.resendRow}>
                  <Text style={styles.resendMuted}>Didn't receive? </Text>

                  <TouchableOpacity
                    onPress={handleResendOtp}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.timerText}>
                  {timeLeft > 0
                    ? `Code expires in ${formatTime(timeLeft)}`
                    : "Code expired"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1220",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  contentWidth: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },

  topSection: {
    backgroundColor: "#1D2088",
    paddingTop: 54,
    paddingHorizontal: 24,
    paddingBottom: 46,
  },

  backButton: {
    width: 44,
    height: 34,
    justifyContent: "center",
    marginBottom: 26,
  },

  backText: {
    color: "#DDE3FF",
    fontSize: 34,
    fontWeight: "300",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Times New Roman" : "serif",
  },

  subtitle: {
    color: "#C7CCE8",
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 0.3,
  },

  phoneText: {
    color: "#25B6FF",
    fontWeight: "700",
  },

  whiteSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 48,
  },

  instruction: {
    color: "#384152",
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 34,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 34,
  },

otpBox: {
  width: 54,
  height: 64,
  borderRadius: 12,
  fontSize: 28,
  fontWeight: "800",
  color: "#1D2088",
  backgroundColor: "#F5F7FB",

  padding: 0,
  margin: 0,

  textAlign: "center",

  paddingTop: Platform.OS === "ios" ? 0 : 0,
  paddingBottom: Platform.OS === "ios" ? 2 : 0,

  includeFontPadding: false,

  outlineStyle: "none",
},

  otpBoxFilled: {
    borderWidth: 2,
    borderColor: "#25B6FF",
    backgroundColor: "#F2FAFF",
  },

  otpBoxEmpty: {
    borderWidth: 1.5,
    borderColor: "#E1E5EE",
  },

  verifyButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: "#155ED6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#155ED6",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },

  verifyButtonDisabled: {
    opacity: 0.55,
  },

  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  resendMuted: {
    color: "#8C94A8",
    fontSize: 15,
  },

  resendLink: {
    color: "#18A8F5",
    fontSize: 15,
    fontWeight: "700",
  },

  timerText: {
    textAlign: "center",
    color: "#9AA2B6",
    fontSize: 13,
    marginTop: 10,
  },
});