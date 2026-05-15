import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",

    title: "Delivering global solutions locally",

    description:
      "We are a complete solution for tunnel accessories, spare parts for rock drilling machines, safety accessories for tunnel use, fitting & installation of bailey bridge, servicing & maintenance of air compressor, rock drilling machines, Shotcrete machine, Generator & many more. We offer a variety of product types and materials along with Genuine brands in order to meet our customer requirements.",

    image: require("../assets/images/img1.jpeg"),
  },

  {
    id: "2",

    title: "15 YEARS OF SERVICE",

    description:
      "We are privately owned company specializing in tunnel equipments, its accessories, with maintenance and repair works. We are specialized supplier of medium and small machineries and equipments to Hydro Power, road construction and tunnel construction",

    image: require("../assets/images/img2.png"),
  },

  {
    id: "3",

    title: "INDEPENDENTLY OWNED",

    description:
      "Because Global Industrial is independent, we’re able to do business the way our customers need it. Our team is able to make quick decisions and operate with honor and integrity. We’re there when you need us 24/7.",

    image: require("../assets/images/img3.png"),
  },
];

export default function Onboarding() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const flatListRef = useRef(null);

  const handleNext = () => {

    const nextSlide = currentSlide + 1;

    if (nextSlide < slides.length) {

      flatListRef.current.scrollToOffset({
        offset: nextSlide * width,
        animated: true,
      });

      setCurrentSlide(nextSlide);
    }
  };

  const handleSkip = () => {

    const lastSlide = slides.length - 1;

    flatListRef.current.scrollToOffset({
      offset: lastSlide * width,
      animated: true,
    });

    setCurrentSlide(lastSlide);
  };

  const renderItem = ({ item }) => {

    return (

      <View style={styles.slide}>

        {/* TOP HALF */}

        <View style={styles.topSection}>
          <View style={styles.gridContainer}>

            {Array.from({ length: 60 }).map((_, index) => (

              <View
                key={`vertical-${index}`}
                style={[
                  styles.verticalLine,
                  { left: index * 28 },
                ]}
              />

            ))}

            {Array.from({ length: 12 }).map((_, index) => (

              <View
                key={`horizontal-${index}`}
                style={[
                  styles.horizontalLine,
                  { top: index * 35 },
                ]}
              />

            ))}

          </View>

          <View style={styles.imageCard}>

            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />

          </View>

        </View>

        {/* BOTTOM HALF */}

        <View style={styles.bottomSection}>

          {/* PAGINATION */}

          <View style={styles.pagination}>

            {slides.map((_, index) => (

              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index && styles.activeDot,
                ]}
              />

            ))}

          </View>

          {/* TEXT */}

          <Text style={styles.smallTitle}>
            TUNNEL & CONSTRUCTION
          </Text>

          <Text style={styles.mainTitle}>
            {item.title}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>

          {/* BUTTONS */}

          <View style={styles.footer}>

            <TouchableOpacity onPress={handleSkip}>

              <Text style={styles.skipText}>
                Skip
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >

              <Text style={styles.nextText}>
                Next →
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </View>

    );

  };

  return (

    <SafeAreaView style={styles.container}>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}

        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  gridContainer: {
    zIndex: 1,
    position: "absolute",

    width: "100%",
    height: "100%",
  },

  verticalLine: {
    position: "absolute",

    width: 1,
    height: "100%",

    backgroundColor: "rgba(255,255,255,0.05)",
  },

  horizontalLine: {
    position: "absolute",

    width: "100%",
    height: 1,

    backgroundColor: "rgba(255,255,255,0.05)",
  },

  container: {
    flex: 1,
    backgroundColor: "#1D2F97",
  },

  slide: {
    width,
    height,
  },

  /* TOP SECTION */

  topSection: {
    height: "50%",

    backgroundColor: "#1D2F97",

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  imageCard: {
    zIndex: 2,
    width: 170,
    height: 170,

    borderRadius: 35,

    backgroundColor: "rgba(255,255,255,0.08)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  image: {
    width: 200,
    height: 200,
  },

  /* BOTTOM SECTION */

  bottomSection: {
    height: "50%",

    backgroundColor: "#F7F7F7",

    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,

    paddingHorizontal: 34,
    paddingTop: 24,
  },

  /* PAGINATION */

  pagination: {
    flexDirection: "row",

    alignSelf: "center",

    marginBottom: 34,
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#D7D7D7",

    marginHorizontal: 4,
  },

  activeDot: {
    width: 28,
    backgroundColor: "#29B6F6",
  },

  /* TEXT */

  smallTitle: {
    color: "#29B6F6",

    fontSize: 13,

    letterSpacing: 3,

    marginBottom: 18,

    fontFamily: "Times New Roman",
  },

  mainTitle: {
    color: "#1D2F97",
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 22,
    fontFamily: "Times New Roman",
    fontWeight: 700,
  },

  description: {
    color: "#505B74",

    fontSize: 17,

    lineHeight: 32,
  },

  /* FOOTER */

  footer: {
    position: "absolute",

    bottom: 85,
    left: 34,
    right: 34,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  skipText: {
    color: "#9E9E9E",
    fontSize: 17,
  },

  nextButton: {
    backgroundColor: "#29B6F6",

    paddingHorizontal: 36,
    paddingVertical: 18,

    borderRadius: 20,

    elevation: 6,
  },

  nextText: {
    color: "white",

    fontSize: 17,

    fontWeight: "600",
  },

  /* BACKGROUND CIRCLES */

  circleLarge: {
    position: "absolute",

    width: 650,
    height: 650,

    borderRadius: 0,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.04)",
  },

  circleMedium: {
    position: "absolute",

    width: 380,
    height: 380,

    borderRadius: 0,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.04)",
  },

});