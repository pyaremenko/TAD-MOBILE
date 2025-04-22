"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Surface, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { getMockCars } from "../api/mockData"
import { spacing, borderRadius } from "../theme"
import type { RootStackParamList } from "../types/navigation"

type CarSummaryCardNavigationProp = NativeStackNavigationProp<RootStackParamList>

export function CarSummaryCard() {
  const theme = useTheme()
  const navigation = useNavigation<CarSummaryCardNavigationProp>()
  const cars = getMockCars()

  const totalCars = cars.length
  const connectedCars = cars.filter((car) => car.status === "connected").length
  const offlineCars = totalCars - connectedCars

  const handlePress = () => {
    navigation.navigate("Cars")
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Surface style={[styles.card, { backgroundColor: theme.colors.primary }]} elevation={2}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Icon name="car" size={24} color="white" />
            <Text variant="titleLarge" style={styles.title}>
              My Vehicles
            </Text>
          </View>
          <Text style={styles.subtitle}>View and manage your connected vehicles</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalCars}</Text>
            <Text style={styles.statLabel}>Total Vehicles</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{connectedCars}</Text>
            <Text style={styles.statLabel}>Connected</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{offlineCars}</Text>
            <Text style={styles.statLabel}>Offline</Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  title: {
    color: "white",
    marginLeft: spacing.xs,
    fontFamily: "Inter_600SemiBold",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
})
