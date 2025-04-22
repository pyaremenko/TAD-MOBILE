"use client"

import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Surface, Divider, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { getMockCertificatesByCar } from "../api/mockData"
import { spacing, borderRadius } from "../theme"
import { formatDate } from "../utils/formatters"
import type { RootStackParamList } from "../types/navigation"
import type { MaintenanceCertificate } from "../types/data"

type CarMaintenanceHistoryNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface CarMaintenanceHistoryProps {
  carId: string
}

export function CarMaintenanceHistory({ carId }: CarMaintenanceHistoryProps) {
  const theme = useTheme()
  const navigation = useNavigation<CarMaintenanceHistoryNavigationProp>()
  const certificates = getMockCertificatesByCar(carId)

  const handleCertificatePress = (certificate: MaintenanceCertificate) => {
    navigation.navigate("CertificateDetail", { certificate })
  }

  if (certificates.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="wrench" size={48} color={theme.colors.outline} />
        <Text style={styles.emptyText}>No maintenance history found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {certificates.map((cert, index) => (
        <React.Fragment key={cert.id}>
          {index > 0 && (
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
          )}
          <TouchableOpacity onPress={() => handleCertificatePress(cert)}>
            <Surface style={styles.card} elevation={1}>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Icon name="wrench" size={20} color={theme.colors.primary} />
                  <Text style={styles.title}>{cert.type}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: cert.verified ? theme.colors.secondary : theme.colors.surfaceVariant },
                  ]}
                >
                  <Text style={[styles.statusText, { color: cert.verified ? "white" : theme.colors.onSurfaceVariant }]}>
                    {cert.verified ? "Verified" : "Pending"}
                  </Text>
                </View>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Icon name="calendar" size={16} color={theme.colors.outline} />
                  <Text style={styles.detailText}>{formatDate(cert.date)}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Icon name="account" size={16} color={theme.colors.outline} />
                  <Text style={styles.detailText}>{cert.technician}</Text>
                </View>
              </View>

              <Text style={styles.description}>{cert.description}</Text>
            </Surface>
          </TouchableOpacity>
        </React.Fragment>
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
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: spacing.xs,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
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
  detailsContainer: {
    flexDirection: "row",
    marginBottom: spacing.sm,
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
  description: {
    fontSize: 14,
    color: "gray",
  },
  dividerContainer: {
    paddingVertical: spacing.xs,
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
