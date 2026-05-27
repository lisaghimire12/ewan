import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

export default function MachineDetails() {

  const { name, image } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>

      {/* BACK BUTTON */}

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.back}>
          ←
        </Text>
      </TouchableOpacity>

      {/* MACHINE IMAGE */}

      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* MACHINE INFO */}

      <View style={styles.content}>

        <Text style={styles.title}>
          {name}
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  back: {
    fontSize: 32,
    color: "#1F2790",
  },

  image: {
    width: "100%",
    height: 340,
  },

  content: {
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#151A2D",
  },

});