"use client"
import { View, ScrollView, StyleSheet } from "react-native"
import { Text, useTheme, Chip } from "react-native-paper"
import { useRoute } from "@react-navigation/native"
import type { RouteProp } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import { CarHealthSummary } from "../components/CarHealthSummary"
import { CarMaintenanceHistory } from "../components/CarMaintenanceHistory"
import { CarOBDData } from "../components/CarOBDData"
import { formatMileage, formatDate, getStatusColor } from "../utils/formatters"
import { spacing } from "../theme"
import type { RootStackParamList } from "../types/navigation"

type CarDetailScreenRouteProp = RouteProp<RootStackParamList, "CarDetail">
type TabParamList = {
  Health: undefined
  Maintenance: undefined
  OBDData: undefined
}

const Tab = createMaterialTopTabNavigator<TabParamList>()

export default function CarDetailScreen() {
  const route = useRoute<CarDetailScreenRouteProp>()
  const { car } = route.params
  const theme = useTheme()
  const statusColor = getStatusColor(car.status)

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text variant="headlineSmall" style={styles.carName}>
            {car.make} {car.model}
          </Text>
          <Chip
            mode="flat"
            style={[styles.statusChip, { backgroundColor: statusColor }]}
            textStyle={{ color: "white" }}
          >
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </Chip>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Year:</Text>
            <Text style={styles.detailValue}>{car.year}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>VIN:</Text>
            <Text style={styles.detailValue}>{car.vin.slice(0, 8)}...</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mileage:</Text>
            <Text style={styles.detailValue}>{formatMileage(car.mileage)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>{formatDate(car.lastUpdate)}</Text>
          </View>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.outline,
          tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
          tabBarLabelStyle: { fontFamily: "Inter_500Medium" },
        }}
      >
        <Tab.Screen name="Health" component={HealthTab} initialParams={{ carId: car.id }} />
        <Tab.Screen name="Maintenance" component={MaintenanceTab} initialParams={{ carId: car.id }} />
        <Tab.Screen
          name="OBDData"
          component={OBDDataTab}
          options={{ title: "OBD Data" }}
          initialParams={{ carId: car.id }}
        />
      </Tab.Navigator>
    </View>
  )
}

// Tab screens
function HealthTab({ route }: { route: any }) {
  const { carId } = route.params
  return (
    <ScrollView style={styles.tabContainer} contentContainerStyle={styles.tabContent}>
      <CarHealthSummary carId={carId} />
    </ScrollView>
  )
}

function MaintenanceTab({ route }: { route: any }) {
  const { carId } = route.params
  return (
    <ScrollView style={styles.tabContainer} contentContainerStyle={styles.tabContent}>
      <CarMaintenanceHistory carId={carId} />
    </ScrollView>
  )
}

function OBDDataTab({ route }: { route: any }) {
  const { carId } = route.params
  return (
    <ScrollView style={styles.tabContainer} contentContainerStyle={styles.tabContent}>
      <CarOBDData carId={carId} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  carName: {
    fontFamily: "Inter_600SemiBold",
  },
  statusChip: {
    height: 28,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.md,
  },
  detailItem: {
    width: "50%",
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: 14,
    color: "gray",
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  tabContainer: {
    flex: 1,
  },
  tabContent: {
    padding: spacing.md,
  },
})
