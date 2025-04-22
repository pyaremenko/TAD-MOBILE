"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Surface, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { getMockCars } from "../api/mockData"
import { spacing, borderRadius } from "../theme"
import { getHealthScoreColor } from "../utils/formatters"
import type { RootStackParamList } from "../types/navigation"

type HealthStatusCardNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface HealthStatusCardProps {
  style?: object
}

export function HealthStatusCard({ style }: HealthStatusCardProps) {
  const theme = useTheme()
  const navigation = useNavigation<HealthStatusCardNavigationProp>()
  const cars = getMockCars()

  // Calculate average health score
  const healthScores = cars.map((car) => car.healthScore)
  const avgHealth = healthScores.length ? Math.round(healthScores.reduce((a, b) => a + b, 0) / healthScores.length) : 0

  const healthColor = getHealthScoreColor(avgHealth)

  const handlePress = () => {
    navigation.navigate("Cars")
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={style}>
      <Surface
        style={[
          styles.card,
          { backgroundColor: "#6366f1" }, // Indigo color
        ]}
        elevation={2}
      >
        <View style={styles.content}>
          <Icon name="heart-pulse" size={32} color="white" style={styles.icon} />
          <Text style={[styles.healthValue, { color: healthColor }]}>{avgHealth}%</Text>
          <Text style={styles.healthLabel}>Avg. Health</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: spacing.xs,
  },
  healthValue: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  healthLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
})
