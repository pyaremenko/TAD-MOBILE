"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useTheme } from "../context/ThemeContext"
import type { RootStackParamList } from "../types/navigation"
import { mockRewards, mockUserPoints } from "../api/mockData"

type RewardsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">

const RewardsScreen = () => {
  const navigation = useNavigation<RewardsScreenNavigationProp>()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [rewards, setRewards] = useState(mockRewards)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      setTimeout(() => {
        setUserPoints(mockUserPoints)
        setRewards(mockRewards)
        setLoading(false)
        setRefreshing(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching rewards data:", error)
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const handleRedeemReward = (rewardId: string, pointsCost: number) => {
    if (userPoints < pointsCost) {
      alert("Not enough points to redeem this reward")
      return
    }

    // In a real app, this would call an API to redeem the reward
    setUserPoints(userPoints - pointsCost)
    alert("Reward redeemed successfully!")
  }

  const renderRewardItem = ({ item }: { item: (typeof mockRewards)[0] }) => (
    <View style={[styles.rewardCard, { backgroundColor: theme.cardBackground }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.rewardImage} resizeMode="cover" />
      <View style={styles.rewardContent}>
        <Text style={[styles.rewardTitle, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.rewardDescription, { color: theme.textSecondary }]}>{item.description}</Text>
        <View style={styles.rewardFooter}>
          <View style={[styles.pointsBadge, { backgroundColor: theme.backgroundSecondary }]}>
            <Ionicons name="star" size={16} color={theme.warning} />
            <Text style={[styles.pointsText, { color: theme.text }]}>{item.pointsCost} points</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.redeemButton,
              {
                backgroundColor: userPoints >= item.pointsCost ? theme.primary : theme.backgroundSecondary,
                borderColor: userPoints >= item.pointsCost ? theme.primary : theme.border,
              },
            ]}
            onPress={() => handleRedeemReward(item.id, item.pointsCost)}
            disabled={userPoints < item.pointsCost}
          >
            <Text
              style={[
                styles.redeemButtonText,
                { color: userPoints >= item.pointsCost ? theme.buttonText : theme.textSecondary },
              ]}
            >
              Redeem
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Rewards</Text>
      </View>

      <View style={[styles.pointsCard, { backgroundColor: theme.primary }]}>
        <View style={styles.pointsContent}>
          <Text style={[styles.pointsLabel, { color: theme.buttonText }]}>Your Points</Text>
          <Text style={[styles.pointsValue, { color: theme.buttonText }]}>{userPoints}</Text>
        </View>
        <View style={styles.pointsIconContainer}>
          <Ionicons name="star" size={48} color={theme.buttonText} />
        </View>
      </View>

      <View style={styles.rewardsHeader}>
        <Text style={[styles.rewardsTitle, { color: theme.text }]}>Available Rewards</Text>
        <TouchableOpacity onPress={() => alert("View all rewards")}>
          <Text style={[styles.viewAllText, { color: theme.primary }]}>View History</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading rewards...</Text>
        </View>
      ) : (
        <FlatList
          data={rewards}
          renderItem={renderRewardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="gift-outline" size={64} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No rewards available at the moment</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pointsCard: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pointsContent: {
    flex: 1,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  pointsIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  rewardsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  rewardCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rewardImage: {
    width: "100%",
    height: 150,
  },
  rewardContent: {
    padding: 16,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  rewardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  rewardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  redeemButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginTop: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
})

export default RewardsScreen
