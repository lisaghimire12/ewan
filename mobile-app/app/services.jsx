import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
export default function ServicesScreen() {

  const services = [
    {
      emoji: "⛏️",
      title: "Rock Drilling",
      subtitle: "11 products",
      bg: "#EEF2FF",
    },
    {
      emoji: "🌀",
      title: "Tunnel Ventilation",
      subtitle: "8 products",
      bg: "#E8F8F8",
    },
    {
      emoji: "🎪",
      title: "Bailey Bridge",
      subtitle: "5 solutions",
      bg: "#EEF8EA",
    },
    {
      emoji: "🔩",
      title: "Shotcrete",
      subtitle: "6 machines",
      bg: "#FFF4DF",
    },
    {
      emoji: "🛡️",
      title: "Safety Equipment",
      subtitle: "18 items",
      bg: "#FFE8F1",
    },
    {
      emoji: "🛠️",
      title: "Maintenance",
      subtitle: "On-demand",
      bg: "#F4EFFF",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Our Services
          </Text>

          <Text style={styles.headerSubtitle}>
            Engineering & Construction Solutions
          </Text>

        </View>

        {/* BODY */}

        <View style={styles.body}>

          {/* FEATURED CARD */}

          <View style={styles.featuredCard}>

            <View style={{ flexDirection: "row" }}>

              <View style={styles.featuredIcon}>
                <Text style={{ fontSize: 34 }}>
                  🏗️
                </Text>
              </View>

              <View style={{ marginLeft: 14 }}>

                <Text style={styles.featuredTitle}>
                  Tunnel
                </Text>

                <Text style={styles.featuredTitle}>
                  Construction
                </Text>

                <Text style={styles.featuredText}>
                  15+ years · 50+
                </Text>

                <Text style={styles.featuredText}>
                  projects completed
                </Text>

              </View>

            </View>

            <TouchableOpacity style={styles.exploreButton}>

              <Text style={styles.exploreText}>
                Explore →
              </Text>

            </TouchableOpacity>

          </View>

          {/* SERVICES GRID */}

          <View style={styles.grid}>

            {services.map((item, index) => (

              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() => {
                  if (item.title === "Rock Drilling") {
                    router.push("/rock-drilling");
                  }
                }}
              >

                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: item.bg },
                  ]}
                >
                  <Text style={{ fontSize: 32 }}>
                    {item.emoji}
                  </Text>
                </View>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardSubtitle}>
                  {item.subtitle}
                </Text>

                <Text style={styles.viewText}>
                  View →
                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

      </ScrollView>

      {/* FLOATING AI BUTTON */}

      <TouchableOpacity style={styles.aiButton}>
        <Text style={{ fontSize: 28 }}>
          🤖
        </Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}

      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 28 }}>
            🏠
          </Text>
          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 32 }}>
            🔧
          </Text>
          <Text style={styles.activeNavText}>
            Services
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 28 }}>
            📁
          </Text>
          <Text style={styles.navText}>
            Projects
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 28 }}>
            📦
          </Text>
          <Text style={styles.navText}>
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 28 }}>
            👤
          </Text>
          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#1F2790",
    paddingTop: 22,
    paddingHorizontal: 22,
    paddingBottom: 28,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#C9D2FF",
    marginTop: 6,
    fontSize: 16,
  },

  body: {
    padding: 20,
  },

  featuredCard: {
    backgroundColor: "#1FA2F2",
    borderRadius: 24,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  featuredIcon: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: "#3DB7FF",
    justifyContent: "center",
    alignItems: "center",
  },

  featuredTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  featuredText: {
    color: "#DDF2FF",
    fontSize: 14,
    marginTop: 2,
  },

  exploreButton: {
    backgroundColor: "#58B9FF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },

  exploreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 22,
    paddingBottom: 120,
  },

  serviceCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  iconBox: {
    width: 74,
    height: 74,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "700",
    color: "#151A2D",
  },

  cardSubtitle: {
    marginTop: 6,
    color: "#7A8199",
    fontSize: 15,
  },

  viewText: {
    marginTop: 16,
    color: "#1D9BF0",
    fontWeight: "700",
    fontSize: 16,
  },

  aiButton: {
    position: "absolute",
    right: 24,
    bottom: 100,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#1FA2F2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    color: "#7A8199",
    marginTop: 4,
    fontSize: 12,
  },

  activeNavText: {
    color: "#1D9BF0",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },

});