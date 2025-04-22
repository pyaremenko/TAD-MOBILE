"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { Text, TextInput, Button, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { spacing } from "../theme"
import type { RootStackParamList } from "../types/navigation"

type AddCarScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function AddCarScreen() {
  const theme = useTheme()
  const navigation = useNavigation<AddCarScreenNavigationProp>()

  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [vin, setVin] = useState("")
  const [mileage, setMileage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("Cars")
    }, 1500)
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.formGroup}>
        <Text style={styles.label}>VIN Number</Text>
        <TextInput
          mode="outlined"
          placeholder="Enter VIN number"
          value={vin}
          onChangeText={setVin}
          style={styles.input}
        />
        <Text style={styles.helperText}>
          The Vehicle Identification Number can be found on your registration or insurance documents
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Make</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. Toyota"
            value={make}
            onChangeText={setMake}
            style={styles.input}
          />
        </View>

        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. Camry"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Year</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. 2022"
            value={year}
            onChangeText={setYear}
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>

        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Mileage</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g. 15000"
            value={mileage}
            onChangeText={setMileage}
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading || !make || !model || !year || !vin}
        style={styles.submitButton}
      >
        {loading ? "Adding Car..." : "Add Car"}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontFamily: "Inter_500Medium",
  },
  input: {
    backgroundColor: "transparent",
  },
  helperText: {
    fontSize: 12,
    color: "gray",
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.md,
  },
})
