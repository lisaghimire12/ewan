import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",

    title: "Delivering global solutions locally",

    description:
      "We are a complete solution for tunnel accessories, spare parts for rock drilling machines, safety accessories for tunnel use, fitting & installation of bailey bridge, servicing & maintenance of air compressor, rock drilling machines and more.",

    image: require("../assets/images/img1.jpeg"),
  },

  {
    id: "2",

    title: "15 YEARS OF SERVICE",

    description:
      "We specialize in tunnel equipment, accessories, maintenance and repair works for hydro power, road and tunnel construction.",

    image: require("../assets/images/img2.png"),
  },

  {
    id: "3",

    title: "INDEPENDENTLY OWNED",

    description:
      "We operate with integrity, quick decision making and strong customer support whenever you need us.",

    image: require("../assets/images/img3.png"),
  },
];

export default function Onboarding() {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);

  const flatListRef = useRef(null);

  const handleNext = () => {
  const nextSlide = currentSlide + 1;

  if (nextSlide < slides.length) {
    setCurrentSlide(nextSlide);

    flatListRef.current.scrollToOffset({
      offset: nextSlide * width,
      animated: true,
    });
  } else {
    router.replace("/login");
  }
};

  const handleSkip = () => {
    router.replace("/login");
  };

  const renderItem = ({ item }) => {

    return (

      <View style={styles.slide}>

        {/* TOP SECTION */}

        <View style={styles.topSection}>

          <View style={styles.gridContainer}>

            {Array.from({ length: 40 }).map((_, index) => (

              <View
                key={`vertical-${index}`}
                style={[
                  styles.verticalLine,
                  { left: index * 28 },
                ]}
              />

            ))}

            {Array.from({ length: 20 }).map((_, index) => (

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

        {/* BOTTOM SECTION */}

        <ScrollView
          style={styles.bottomSection}
          contentContainerStyle={{ paddingBottom: 220 }}
          showsVerticalScrollIndicator={false}
        >

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
                {currentSlide === slides.length - 1 ? "Start →" : "Next →"}
              </Text>

            </TouchableOpacity>

          </View>
        </ScrollView>

        {/* FOOTER */}

        {/* <View style={styles.footer}>

          <TouchableOpacity onPress={handleSkip}>

            <Text style={styles.skipText}>
              Skip
            </Text>

          </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >

            <Text style={styles.nextText}>
              Next →
            </Text>

          </TouchableOpacity>

        </View> */}

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
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#1D2F97",
  },

  slide: {
    width,
    height,
  },

  topSection: {
    height: height * 0.45,
    backgroundColor: "#1D2F97",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  gridContainer: {
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

  imageCard: {
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
    width: 170,
    height: 170,
    borderRadius: 10,
  },

  bottomSection: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    marginTop: -25,
    paddingHorizontal: 34,
    paddingTop: 24,
  },

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
    lineHeight: 40,
    marginBottom: 22,
    fontFamily: "Times New Roman",
    fontWeight: "700",
  },

  description: {
    color: "#505B74",
    fontSize: 17,
    lineHeight: 32,
  },

  footer: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
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

});