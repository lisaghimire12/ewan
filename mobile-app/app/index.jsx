import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

export default function Index() {

  return (

    <SafeAreaView style={styles.container}>

      {/* Background circles */}

      <View style={styles.circleLarge} />
      <View style={styles.circleMedium} />
      <View style={styles.circleSmall} />

      {/* Main content */}

      <View style={styles.content}>

        {/* Logo card */}

        <View style={styles.logoCard}>

          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

        </View>

        {/* Company title */}

        <Text style={styles.title}>
          Ewan Engineering
        </Text>

        <Text style={styles.subtitle}>
          AND CONSTRUCTION PVT. LTD.
        </Text>

        <Text style={styles.tagline}>
          Building Nepal’s Future
        </Text>

      </View>

      {/* Loader */}

      <View style={styles.loaderContainer}>

        <View style={styles.loaderTrack}>
          <View style={styles.loaderFill} />
        </View>

        <Text style={styles.loadingText}>
          Initializing secure session...
        </Text>

      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#182785",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
    marginBottom: 40,
    zIndex: 2,
  },

  /* Logo card */


  logo: {
    width: 990,
    height: 100,
  },

  /* Typography */

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -0.4,
    fontFamily: "Times New ROman",
  },

  subtitle: {
    color: "#25B6FF",
    fontSize: 14,
    letterSpacing: 4.5,
    marginTop: 10,
    fontWeight: "500",
  },

  tagline: {
    color: "#C7CCE8",
    fontSize: 17,
    marginTop: 48,
    fontWeight: "400",
  },

  /* Loader */

  loaderContainer: {
    position: "absolute",
    bottom: 78,
    alignItems: "center",
  },

  loaderTrack: {
    width: 165,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 30,
    overflow: "hidden",
  },

  loaderFill: {
    width: 62,
    height: "100%",
    backgroundColor: "#43D6FF",
    borderRadius: 30,
  },

  loadingText: {
    color: "#9FA8DA",
    marginTop: 14,
    fontSize: 13,
    fontWeight: "400",
  },

  /* Background circles */

  circleLarge: {
    position: "absolute",
    width: 760,
    height: 760,
    borderRadius: 380,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },

  circleMedium: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: 260,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },

  circleSmall: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },

});
