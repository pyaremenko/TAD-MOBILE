"use client"
import { View, ScrollView, StyleSheet } from "react-native"
import { Text, Button, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { CarSummaryCard } from "../components/CarSummaryCard"
import { PointsSummaryCard } from "../components/PointsSummaryCard"
import { HealthStatusCard } from "../components/HealthStatusCard"
import { RecentMaintenanceCard } from "../components/RecentMaintenanceCard"
import { spacing } from "../theme"
import type { RootStackParamList } from "../types/navigation"

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function HomeScreen() {
  const theme = useTheme()
  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ fontFamily: "Inter_700Bold" }}>
          Dashboard
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("AddCar")}
          icon={({ size, color }) => <Icon name="plus" size={size} color={color} />}
        >
          Add Car
        </Button>
      </View>

      <CarSummaryCard />

      <View style={styles.row}>
        <PointsSummaryCard style={styles.halfCard} />
        <HealthStatusCard style={styles.halfCard} />
      </View>

      <RecentMaintenanceCard />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing["2xl"],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  halfCard: {
    flex: 1,
  },
})
