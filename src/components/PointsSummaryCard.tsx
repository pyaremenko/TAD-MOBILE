"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Surface, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { getMockUser } from "../api/mockData"
import { spacing, borderRadius } from "../theme"
import type { RootStackParamList } from "../types/navigation"

type PointsSummaryCardNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface PointsSummaryCardProps {
  style?: object
}

export function PointsSummaryCard({ style }: PointsSummaryCardProps) {
  const theme = useTheme()
  const navigation = useNavigation<PointsSummaryCardNavigationProp>()
  const user = getMockUser()

  const handlePress = () => {
    navigation.navigate("Rewards")
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={style}>
      <Surface style={[styles.card, { backgroundColor: theme.colors.tertiary }]} elevation={2}>
        <View style={styles.content}>
          <Icon name="trophy" size={32} color="white" style={styles.icon} />
          <Text style={styles.pointsValue}>{user.points}</Text>
          <Text style={styles.pointsLabel}>Reward Points</Text>
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
  pointsValue: {
    color: "white",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  pointsLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
})
