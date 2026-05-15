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

export default function SplashScreen() {

  return (

    <SafeAreaView style={styles.container}>

      {/* Background circles */}

      <View style={styles.circleLarge} />
      <View style={styles.circleMedium} />
      <View style={styles.circleSmall} />

      {/* Main content */}

      <View style={styles.content}>

        <Image
          source={{
            uri: "https://ewanengineering.com/wp-content/uploads/2023/03/cropped-logo.png",
          }}
          style={styles.logo}
        />

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

      {/* Bottom loader */}

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
    backgroundColor: "#0D1B66",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 30,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#4FC3F7",
    fontSize: 15,
    letterSpacing: 2,
    marginTop: 5,
  },

  tagline: {
    color: "#C5CAE9",
    fontSize: 17,
    marginTop: 45,
  },

  circleLarge: {
    position: "absolute",
    width: 700,
    height: 700,
    borderRadius: 350,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  circleMedium: {
    position: "absolute",
    width: 450,
    height: 450,
    borderRadius: 225,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  circleSmall: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  loaderContainer: {
    position: "absolute",
    bottom: 90,
    alignItems: "center",
  },

  loaderTrack: {
    width: 180,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    overflow: "hidden",
  },

  loaderFill: {
    width: 70,
    height: "100%",
    backgroundColor: "#4FC3F7",
    borderRadius: 10,
  },

  loadingText: {
    color: "#B0BEC5",
    marginTop: 15,
    fontSize: 14,
  },

});