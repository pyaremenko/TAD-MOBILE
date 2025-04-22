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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { MaintenanceCertificate } from "../types/data"
import { mockMaintenanceCertificates } from "../api/mockData"
import { formatDate } from "../utils/formatters"
import { useTheme } from "../context/ThemeContext"
import type { RootStackParamList } from "../types/navigation"

type MaintenanceScreenNavigationProp = StackNavigationProp<RootStackParamList, "Maintenance">

type FilterOption = "all" | "verified" | "pending" | "recent"

const MaintenanceScreen = () => {
  const navigation = useNavigation<MaintenanceScreenNavigationProp>()
  const { theme } = useTheme()
  const [certificates, setCertificates] = useState<MaintenanceCertificate[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filterOption, setFilterOption] = useState<FilterOption>("all")

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      setTimeout(() => {
        setCertificates(mockMaintenanceCertificates)
        setLoading(false)
        setRefreshing(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching maintenance certificates:", error)
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchCertificates()
  }

  const navigateToCertificateDetail = (id: string) => {
    navigation.navigate("MaintenanceDetail", { id })
  }

  const getFilteredCertificates = () => {
    switch (filterOption) {
      case "verified":
        return certificates.filter((cert) => cert.blockchainVerified)
      case "pending":
        return certificates.filter((cert) => !cert.blockchainVerified)
      case "recent":
        return [...certificates].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
      default:
        return certificates
    }
  }

  const FilterButton = ({ title, option }: { title: string; option: FilterOption }) => (
    <TouchableOpacity
      style={[styles.filterButton, { backgroundColor: filterOption === option ? theme.primary : theme.cardBackground }]}
      onPress={() => setFilterOption(option)}
    >
      <Text style={[styles.filterButtonText, { color: filterOption === option ? theme.buttonText : theme.text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  const renderCertificateItem = ({ item }: { item: MaintenanceCertificate }) => (
    <TouchableOpacity
      style={[styles.certificateCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => navigateToCertificateDetail(item.id)}
    >
      <View style={styles.certificateHeader}>
        <Text style={[styles.certificateTitle, { color: theme.text }]}>{item.type}</Text>
        <View
          style={[
            styles.verificationBadge,
            { backgroundColor: item.blockchainVerified ? theme.success : theme.warning },
          ]}
        >
          <Text style={styles.verificationText}>{item.blockchainVerified ? "Verified" : "Pending"}</Text>
        </View>
      </View>

      <View style={styles.certificateDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>{formatDate(item.date)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="car-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>{item.carName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="business-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>{item.serviceProvider}</Text>
        </View>
      </View>

      <View style={styles.certificateFooter}>
        {item.blockchainVerified && (
          <View style={styles.blockchainInfo}>
            <Ionicons name="link-outline" size={14} color={theme.primary} />
            <Text style={[styles.blockchainText, { color: theme.primary }]}>Blockchain Verified</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Maintenance Certificates</Text>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton title="All" option="all" />
        <FilterButton title="Verified" option="verified" />
        <FilterButton title="Pending" option="pending" />
        <FilterButton title="Recent" option="recent" />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading certificates...</Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredCertificates()}
          renderItem={renderCertificateItem}
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
              <Ionicons name="document-text-outline" size={64} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No maintenance certificates found</Text>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.primary }]}
                onPress={() => navigation.navigate("AddMaintenance")}
              >
                <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Add Certificate</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("AddMaintenance")}
      >
        <Ionicons name="add" size={24} color={theme.buttonText} />
      </TouchableOpacity>
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  certificateCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  certificateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  verificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verificationText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  certificateDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  certificateFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  blockchainInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  blockchainText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
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
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default MaintenanceScreen
