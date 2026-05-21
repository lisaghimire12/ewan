import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

export default function MachineDetails() {

  const { name, image } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ←
        </Text>
      </TouchableOpacity>

      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text style={styles.title}>
          {name}
        </Text>

        <Text style={styles.description}>
          Heavy-duty industrial drilling machine designed
          for tunnel engineering and rock excavation.
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  backButton: {
    marginTop: 20,
    marginLeft: 20,
  },

  backText: {
    fontSize: 32,
    color: "#1F2790",
  },

  image: {
    width: "100%",
    height: 320,
    marginTop: 10,
  },

  content: {
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#151A2D",
  },

  description: {
    marginTop: 14,
    fontSize: 17,
    color: "#6B7280",
    lineHeight: 28,
  },

});