import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import { useEffect, useState } from "react";

export default function RockDrillingScreen() {

  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {

      const response = await fetch(
        "http://192.168.101.7:8000/api/machines/"
      );

      const data = await response.json();

      console.log("MACHINES:", data);

      setMachines(data);

    } catch (error) {
      console.log("ERROR:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1F2790" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Text style={styles.back}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            Rock Drilling
          </Text>

          <Text style={styles.subtitle}>
            {machines.length} Machines Available
          </Text>

        </View>

        {/* MACHINE LIST */}

        <View style={styles.grid}>

          {machines.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/machine-details",
                  params: {
                    name: item.name,
                    image: item.image,
                  },
                })
              }
            >

              <Image
                source={{
                  uri: item.image
                }}
                style={styles.image}
              />

              <Text style={styles.machineName}>
                {item.name}
              </Text>

              <Text style={styles.viewText}>
                View Machine →
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#1F2790",
    padding: 22,
    paddingTop: 40,
  },

  back: {
    color: "#fff",
    fontSize: 32,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 18,
  },

  subtitle: {
    color: "#C9D2FF",
    marginTop: 6,
    fontSize: 16,
  },

  grid: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    backgroundColor: "#EAEAEA",
  },

  machineName: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: "700",
    color: "#151A2D",
  },

  viewText: {
    marginTop: 8,
    color: "#1D9BF0",
    fontWeight: "700",
    fontSize: 16,
  },

});