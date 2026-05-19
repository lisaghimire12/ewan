import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {

    const [userName, setUserName] = useState("User");
    const [avatarLetter, setAvatarLetter] = useState("U");
    const { username } = useLocalSearchParams();

    useEffect(() => {

        const loadUser = async () => {

            try {

                // GET USERNAME FROM OTP PAGE
                if (username) {

                    const firstName = username.split(" ")[0];

                    setUserName(firstName);

                    setAvatarLetter(
                        firstName.charAt(0).toUpperCase()
                    );

                    return;
                }

                // FALLBACK
                setUserName("User");
                setAvatarLetter("U");

            } catch (error) {
                console.log(error);
            }
        };

        loadUser();

    }, [username]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}

                <View style={styles.header}>

                    <View style={styles.topRow}>

                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {avatarLetter}
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.greeting}>
                                Good morning,
                            </Text>

                            <Text style={styles.name}>
                                {userName}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.notification}>
                            <Text style={{ fontSize: 18 }}>🔔</Text>
                        </TouchableOpacity>

                    </View>

                    {/* SEARCH */}

                    <View style={styles.searchBar}>
                        <Text style={styles.searchText}>
                            🔎 Search projects, materials...
                        </Text>
                    </View>

                </View>

                {/* BODY */}

                <View style={styles.body}>

                    {/* STATS */}

                    <View style={styles.statsRow}>

                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Active Projects</Text>
                            <Text style={styles.greenText}>↑ 0 new</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Pending Orders</Text>
                            <Text style={styles.orangeText}>↗ 0 urgent</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>100%</Text>
                            <Text style={styles.statLabel}>SLA Uptime</Text>
                            <Text style={styles.greenText}>✓ On track</Text>
                        </View>

                    </View>

                    {/* QUICK ACTIONS */}

                    <Text style={styles.sectionTitle}>
                        Quick Actions
                    </Text>

                    <View style={styles.quickActions}>

                        <View style={styles.actionItem}>
                            <View style={styles.actionIcon}>
                            <Text style={{ fontSize: 32 }}>📋</Text>
                            </View>
                            <Text style={styles.actionText}>Request Quote</Text>
                        </View>

                        <View style={styles.actionItem}>
                            <View style={styles.actionIcon}>
                                <Text style={{ fontSize: 32}}>📦</Text>
                            </View>
                            <Text style={styles.actionText}>Order Material</Text>
                        </View>

                        <View style={styles.actionItem}>
                            <View style={styles.actionIcon}>
                                <Text style={{ fontSize: 32}}>📍</Text>
                            </View>
                            <Text style={styles.actionText}>Track Project</Text>
                        </View>

                        <View style={styles.actionItem}>
                            <View style={styles.actionIcon}>
                                <Text style={{ fontSize: 32}}>🎧</Text>
                            </View>
                            <Text style={styles.actionText}>Support</Text>
                        </View>

                    </View>

                    {/* AI CARD */}

                    <View style={styles.aiCard}>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <View style={styles.botIcon}>
                                <Text style={{ fontSize: 24 }}>🤖</Text>
                            </View>

                            <View style={{ marginLeft: 14 }}>
                                <Text style={styles.aiTitle}>
                                    EwanAI Assistant
                                </Text>

                                <Text style={styles.aiSubtitle}>
                                    Ask about services,
                                </Text>

                                <Text style={styles.aiSubtitle}>
                                    projects & quotes
                                </Text>
                            </View>

                        </View>

                        <TouchableOpacity style={styles.openButton}>
                            <Text style={styles.openButtonText}>
                                Open →
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* PROJECTS */}

                    <View style={styles.projectHeader}>

                        <Text style={styles.sectionTitle}>
                            Active Projects
                        </Text>

                        <Text style={styles.seeAll}>
                            See all →
                        </Text>

                    </View>

                    <View style={styles.projectCard}>

                        <View style={styles.projectTop}>

                            <View>
                                <Text style={styles.projectTitle}>
                                    No Projects Yet
                                </Text>

                                <Text style={styles.projectLocation}>
                                    Projects will appear here
                                </Text>
                            </View>

                            <View style={styles.activeBadge}>
                                <Text style={styles.activeText}>
                                    New
                                </Text>
                            </View>

                        </View>

                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                        </View>

                        <View style={styles.projectBottom}>
                            <Text style={styles.progressText}>
                                0% complete
                            </Text>

                            <Text style={styles.dueText}>
                                Waiting...
                            </Text>
                        </View>

                    </View>

                </View>

            </ScrollView>

            {/* BOTTOM NAV */}

            <View style={styles.bottomNav}>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.activeNav}>🏠</Text>
                    <Text style={styles.activeNavText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text>🔧</Text>
                    <Text style={styles.navText}>Services</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text>📁</Text>
                    <Text style={styles.navText}>Projects</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text>📦</Text>
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text>👤</Text>
                    <Text style={styles.navText}>Profile</Text>
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
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 24,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#3D6BD9",
        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    greeting: {
        color: "#C9D2FF",
        marginLeft: 14,
        fontSize: 14,
    },

    name: {
        color: "#fff",
        marginLeft: 14,
        fontSize: 28,
        fontWeight: "700",
    },

    notification: {
        marginLeft: "auto",
        backgroundColor: "#3154C7",
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    searchBar: {
        marginTop: 24,
        backgroundColor: "#3154C7",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },

    searchText: {
        color: "#C9D2FF",
        fontSize: 15,
    },

    body: {
        padding: 20,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    statCard: {
        backgroundColor: "#fff",
        width: "31%",
        borderRadius: 18,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    statNumber: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1F2790",
    },

    statLabel: {
        color: "#7A8199",
        textAlign: "center",
        marginTop: 6,
        fontSize: 13,
    },

    greenText: {
        color: "#1EB980",
        marginTop: 6,
        fontWeight: "600",
        fontSize: 12,
    },

    orangeText: {
        color: "#F59E0B",
        marginTop: 6,
        fontWeight: "600",
        fontSize: 12,
    },

    sectionTitle: {
        marginTop: 28,
        fontSize: 24,
        fontWeight: "700",
        color: "#151A2D",
    },

    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
    },

    actionItem: {
        alignItems: "center",
        width: "23%",
    },

    actionIcon: {
        width: 62,
        height: 62,
        borderRadius: 18,
        backgroundColor: "#EEF2FF",
        justifyContent: "center",
        alignItems: "center",
    },

    actionText: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 17,
        color: "#4B5563",
    },

    aiCard: {
        marginTop: 28,
        backgroundColor: "#1479D9",
        borderRadius: 24,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    botIcon: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: "#3154C7",
        justifyContent: "center",
        alignItems: "center",
    },

    aiTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
    },

    aiSubtitle: {
        color: "#DCE8FF",
        fontSize: 14,
    },

    openButton: {
        backgroundColor: "#4DA3FF",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 14,
    },

    openButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    projectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    seeAll: {
        color: "#1D9BF0",
        fontWeight: "600",
        marginTop: 28,
    },

    projectCard: {
        marginTop: 16,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        marginBottom: 100,
    },

    projectTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    projectTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#151A2D",
    },

    projectLocation: {
        marginTop: 6,
        color: "#7A8199",
    },

    activeBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    activeText: {
        color: "#15803D",
        fontWeight: "700",
    },

    progressBar: {
        height: 10,
        backgroundColor: "#E5E7EB",
        borderRadius: 20,
        marginTop: 18,
        overflow: "hidden",
    },

    progressFill: {
        width: "10%",
        height: "100%",
        backgroundColor: "#1F2790",
    },

    projectBottom: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    progressText: {
        color: "#1F2790",
        fontWeight: "700",
    },

    dueText: {
        color: "#7A8199",
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

    activeNav: {
        fontSize: 20,
    },

    activeNavText: {
        color: "#1D9BF0",
        marginTop: 4,
        fontSize: 12,
        fontWeight: "600",
    },

    navText: {
        color: "#7A8199",
        marginTop: 4,
        fontSize: 12,
    },

});