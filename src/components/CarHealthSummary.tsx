"use client"
import { View, StyleSheet } from "react-native"
import { Text, Surface, ProgressBar, useTheme } from "react-native-paper"

import { getMockCarById } from "../api/mockData"
import { spacing, borderRadius } from "../theme"
import { getHealthScoreColor } from "../utils/formatters"

interface CarHealthSummaryProps {
  carId: string
}

export function CarHealthSummary({ carId }: CarHealthSummaryProps) {
  const theme = useTheme()
  const car = getMockCarById(carId)

  if (!car) {
    return (
      <View style={styles.errorContainer}>
        <Text>Car not found</Text>
      </View>
    )
  }

  const healthComponents = [
    { name: "Engine", score: car.engineHealth, description: "Engine performance and condition" },
    { name: "Battery", score: car.batteryHealth, description: "Battery charge and health status" },
    { name: "Brakes", score: car.brakeHealth, description: "Brake pads and system condition" },
    { name: "Transmission", score: car.transmissionHealth, description: "Transmission fluid and performance" },
    { name: "Tires", score: car.tireHealth, description: "Tire tread depth and pressure" },
  ]

  if (car.oilLife !== null) {
    healthComponents.push({
      name: "Oil Life",
      score: car.oilLife,
      description: "Remaining oil life percentage",
    })
  }

  return (
    <View style={styles.container}>
      {healthComponents.map((component, index) => (
        <Surface key={index} style={styles.card} elevation={1}>
          <View style={styles.header}>
            <Text style={styles.componentName}>{component.name}</Text>
            <Text style={[styles.scoreText, { color: getHealthScoreColor(component.score) }]}>{component.score}%</Text>
          </View>

          <ProgressBar
            progress={component.score / 100}
            color={getHealthScoreColor(component.score)}
            style={styles.progressBar}
          />

          <Text style={styles.description}>{component.description}</Text>
        </Surface>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  componentName: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  scoreText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  errorContainer: {
    padding: spacing.md,
    alignItems: "center",
  },
})
