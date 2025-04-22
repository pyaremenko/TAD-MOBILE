"use client"
import { View, StyleSheet, Dimensions } from "react-native"
import { Text, Surface, useTheme } from "react-native-paper"
import { LineChart } from "react-native-chart-kit"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { getMockOBDData } from "../api/mockData"
import { spacing, borderRadius } from "../theme"

interface CarOBDDataProps {
  carId: string
}

export function CarOBDData({ carId }: CarOBDDataProps) {
  const theme = useTheme()
  const obdData = getMockOBDData(carId)
  const screenWidth = Dimensions.get("window").width - spacing.md * 2

  if (!obdData) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="gauge" size={48} color={theme.colors.outline} />
        <Text style={styles.emptyText}>No OBD data available</Text>
      </View>
    )
  }

  // Prepare chart data
  const prepareChartData = (dataPoints: any[] | null | undefined, label: string) => {
    if (!dataPoints) return null

    return {
      labels: dataPoints.map((point) => {
        const date = new Date(point.timestamp)
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
      }),
      datasets: [
        {
          data: dataPoints.map((point) => point.value),
          color: () => theme.colors.primary,
          strokeWidth: 2,
        },
      ],
      legend: [label],
    }
  }

  const speedData = prepareChartData(obdData.speed, "Speed (km/h)")
  const rpmData = prepareChartData(obdData.engineRPM, "Engine RPM")
  const tempData = prepareChartData(obdData.coolantTemp, "Coolant Temp (°F)")
  const fuelData = prepareChartData(obdData.fuelLevel, "Fuel Level (%)")
  const batteryData = prepareChartData(obdData.batteryLevel, "Battery Level (%)")

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: () => theme.colors.primary,
    labelColor: () => theme.colors.onSurface,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "1",
      stroke: theme.colors.primary,
    },
  }

  return (
    <View style={styles.container}>
      {speedData && (
        <Surface style={styles.card} elevation={1}>
          <Text style={styles.chartTitle}>Speed</Text>
          <LineChart
            data={speedData}
            width={screenWidth - spacing.md * 2}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Surface>
      )}

      {rpmData && (
        <Surface style={styles.card} elevation={1}>
          <Text style={styles.chartTitle}>Engine RPM</Text>
          <LineChart
            data={rpmData}
            width={screenWidth - spacing.md * 2}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Surface>
      )}

      {tempData && (
        <Surface style={styles.card} elevation={1}>
          <Text style={styles.chartTitle}>Coolant Temperature</Text>
          <LineChart
            data={tempData}
            width={screenWidth - spacing.md * 2}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Surface>
      )}

      {fuelData && (
        <Surface style={styles.card} elevation={1}>
          <Text style={styles.chartTitle}>Fuel Level</Text>
          <LineChart
            data={fuelData}
            width={screenWidth - spacing.md * 2}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Surface>
      )}

      {batteryData && (
        <Surface style={styles.card} elevation={1}>
          <Text style={styles.chartTitle}>Battery Level</Text>
          <LineChart
            data={batteryData}
            width={screenWidth - spacing.md * 2}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Surface>
      )}
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
  chartTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  chart: {
    borderRadius: borderRadius.md,
    paddingRight: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.md,
    color: "gray",
  },
})
