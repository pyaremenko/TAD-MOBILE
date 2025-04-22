"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MaintenanceCertificate } from "../types/data";
import { mockMaintenanceCertificates } from "../api/mockData";
import { formatDate, formatCurrency } from "../utils/formatters";
import { useTheme } from "../context/ThemeContext";
import type { RootStackParamList } from "../types/navigation";

type MaintenanceDetailRouteProp = RouteProp<
  RootStackParamList,
  "MaintenanceDetail"
>;
type MaintenanceDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MaintenanceDetail"
>;

const MaintenanceDetailScreen = () => {
  const route = useRoute<MaintenanceDetailRouteProp>();
  const navigation = useNavigation<MaintenanceDetailNavigationProp>();
  const { theme } = useTheme();
  const { id } = route.params;

  const [certificate, setCertificate] = useState<MaintenanceCertificate | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificateDetails();
  }, [id]);

  const fetchCertificateDetails = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      setTimeout(() => {
        const foundCertificate = mockMaintenanceCertificates.find(
          (cert) => cert.id === id
        );
        if (foundCertificate) {
          setCertificate(foundCertificate);
        }
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching certificate details:", error);
      setLoading(false);
    }
  };

  const handleVerifyCertificate = () => {
    if (!certificate) return;

    Alert.alert(
      "Verify Certificate",
      "This will verify the certificate on the blockchain. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Verify",
          onPress: () => {
            // In a real app, this would call a blockchain verification function
            Alert.alert("Success", "Certificate verified on blockchain!");
            setCertificate({
              ...certificate,
              blockchainVerified: true,
              blockchainTxId:
                "0x" +
                Math.random().toString(16).slice(2, 10) +
                Math.random().toString(16).slice(2, 10),
            });
          },
        },
      ]
    );
  };

  const handleShareCertificate = () => {
    Alert.alert("Share Certificate", "Share this certificate with others?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Share",
        onPress: () => {
          // In a real app, this would open a share dialog
          Alert.alert("Success", "Certificate shared successfully!");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Loading certificate details...
        </Text>
      </SafeAreaView>
    );
  }

  if (!certificate) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Certificate Details
          </Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.notFoundContainer}>
          <Ionicons
            name="document-text-outline"
            size={64}
            color={theme.textSecondary}
          />
          <Text style={[styles.notFoundText, { color: theme.textSecondary }]}>
            Certificate not found
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backButtonText, { color: theme.buttonText }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Certificate Details
        </Text>
        <TouchableOpacity onPress={handleShareCertificate}>
          <Ionicons name="share-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.certificateCard,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <View style={styles.certificateHeader}>
            <Text style={[styles.certificateTitle, { color: theme.text }]}>
              {certificate.type}
            </Text>
            <View
              style={[
                styles.verificationBadge,
                {
                  backgroundColor: certificate.blockchainVerified
                    ? theme.success
                    : theme.warning,
                },
              ]}
            >
              <Text style={styles.verificationText}>
                {certificate.blockchainVerified ? "Verified" : "Pending"}
              </Text>
            </View>
          </View>

          <View style={styles.certificateImage}>
            {/* <Image source={require("../../assets/car-maintenance.png")} style={styles.image} resizeMode="cover" /> */}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Certificate Information
            </Text>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Date
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {formatDate(certificate.date)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Vehicle
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {certificate.carName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Service Provider
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {certificate.serviceProvider}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Odometer
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {certificate.odometer} km
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Cost
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {formatCurrency(certificate.cost)}
              </Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Service Details
            </Text>
            <Text style={[styles.descriptionText, { color: theme.text }]}>
              {certificate.description}
            </Text>
          </View>

          {certificate.parts && certificate.parts.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Parts Replaced
              </Text>
              {certificate.parts.map((part, index) => (
                <View key={index} style={styles.partItem}>
                  <Text style={[styles.partName, { color: theme.text }]}>
                    {part.name}
                  </Text>
                  <Text
                    style={[styles.partInfo, { color: theme.textSecondary }]}
                  >
                    {part.partNumber} • {formatCurrency(part.cost)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {certificate.blockchainVerified && certificate.blockchainTxId && (
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Blockchain Verification
              </Text>
              <View style={styles.blockchainContainer}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.success}
                />
                <Text style={[styles.blockchainText, { color: theme.text }]}>
                  Verified on Blockchain
                </Text>
              </View>
              <View
                style={[
                  styles.txIdContainer,
                  { backgroundColor: theme.backgroundSecondary },
                ]}
              >
                <Text
                  style={[styles.txIdLabel, { color: theme.textSecondary }]}
                >
                  Transaction ID:
                </Text>
                <Text style={[styles.txId, { color: theme.primary }]}>
                  {certificate.blockchainTxId}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.viewOnExplorerButton,
                  { borderColor: theme.primary },
                ]}
                onPress={() =>
                  Alert.alert(
                    "View on Explorer",
                    "This would open the blockchain explorer in a real app."
                  )
                }
              >
                <Text
                  style={[styles.viewOnExplorerText, { color: theme.primary }]}
                >
                  View on Blockchain Explorer
                </Text>
                <Ionicons name="open-outline" size={16} color={theme.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!certificate.blockchainVerified && (
          <TouchableOpacity
            style={[styles.verifyButton, { backgroundColor: theme.primary }]}
            onPress={handleVerifyCertificate}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={theme.buttonText}
            />
            <Text
              style={[styles.verifyButtonText, { color: theme.buttonText }]}
            >
              Verify on Blockchain
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  certificateCard: {
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 16,
  },
  certificateTitle: {
    fontSize: 20,
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
  certificateImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  partItem: {
    marginBottom: 8,
  },
  partName: {
    fontSize: 14,
    fontWeight: "500",
  },
  partInfo: {
    fontSize: 12,
  },
  blockchainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  blockchainText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  txIdContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  txIdLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  txId: {
    fontSize: 14,
    fontWeight: "500",
  },
  viewOnExplorerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  viewOnExplorerText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  verifyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MaintenanceDetailScreen;
