"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Surface, useTheme } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { spacing, borderRadius } from "../theme"
import { formatMileage, getStatusColor } from "../utils/formatters"
import type { Car } from "../types/data"

interface CarListItemProps {
  car: Car
  onPress: () => void
}

export function CarListItem({ car, onPress }: CarListItemProps) {
  const theme = useTheme()
  const statusColor = getStatusColor(car.status)
  const healthColor =
    car.healthScore >= 80 ? theme.colors.secondary : car.healthScore >= 60 ? theme.colors.tertiary : theme.colors.error

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Surface style={styles.card} elevation={1}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Icon name="car" size={20} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.title}>
              {car.make} {car.model}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{car.status.charAt(0).toUpperCase() + car.status.slice(1)}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="calendar" size={16} color={theme.colors.outline} />
            <Text style={styles.detailText}>{car.year}</Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="gauge" size={16} color={theme.colors.outline} />
            <Text style={styles.detailText}>{formatMileage(car.mileage)}</Text>
          </View>

          <View style={styles.detailItem}>
            <View style={[styles.healthIndicator, { backgroundColor: healthColor }]} />
            <Text style={styles.detailText}>Health: {car.healthScore}%</Text>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: spacing.xs,
    fontFamily: "Inter_600SemiBold",
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: "gray",
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})
