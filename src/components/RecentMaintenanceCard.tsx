"use client"

import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Surface, Divider, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { getMockCertificates, getMockCarById } from "../api/mockData"
import { spacing, borderRadius } from "../theme"
import { formatDate } from "../utils/formatters"
import type { RootStackParamList } from "../types/navigation"
import type { MaintenanceCertificate } from "../types/data"

type RecentMaintenanceCardNavigationProp = NativeStackNavigationProp<RootStackParamList>

export function RecentMaintenanceCard() {
  const theme = useTheme()
  const navigation = useNavigation<RecentMaintenanceCardNavigationProp>()
  const certificates = getMockCertificates().slice(0, 3) // Get only 3 most recent

  const handleCardPress = () => {
    navigation.navigate("Maintenance")
  }

  const handleCertificatePress = (certificate: MaintenanceCertificate) => {
    // TODO: CertificateDetailScreen
    navigation.navigate("CertificateDetail", { certificate })
  }

  return (
    <Surface style={styles.card} elevation={1}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Icon name="certificate" size={20} color={theme.colors.primary} />
          <Text variant="titleMedium" style={styles.title}>
            Recent Maintenance
          </Text>
        </View>
        <TouchableOpacity onPress={handleCardPress}>
          <Icon name="chevron-right" size={24} color={theme.colors.outline} />
        </TouchableOpacity>
      </View>

      <Text variant="bodySmall" style={styles.subtitle}>
        Your latest maintenance records
      </Text>

      <View style={styles.certificatesContainer}>
        {certificates.length > 0 ? (
          certificates.map((cert, index) => {
            const car = getMockCarById(cert.carId)
            return (
              <React.Fragment key={cert.id}>
                {index > 0 && <Divider style={styles.divider} />}
                <TouchableOpacity style={styles.certificateItem} onPress={() => handleCertificatePress(cert)}>
                  <View>
                    <Text style={styles.certificateTitle}>{cert.type}</Text>
                    <Text style={styles.certificateSubtitle}>
                      {car ? `${car.make} ${car.model}` : "Unknown Vehicle"} • {formatDate(cert.date)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: cert.verified ? theme.colors.secondary : theme.colors.surfaceVariant },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: cert.verified ? "white" : theme.colors.onSurfaceVariant }]}
                    >
                      {cert.verified ? "Verified" : "Pending"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            )
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No maintenance records found</Text>
          </View>
        )}
      </View>
    </Surface>
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
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: spacing.xs,
    fontFamily: "Inter_600SemiBold",
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    color: "gray",
  },
  certificatesContainer: {
    marginTop: spacing.xs,
  },
  certificateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  certificateTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  certificateSubtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  divider: {
    marginVertical: spacing.xs,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  emptyText: {
    color: "gray",
  },
})
