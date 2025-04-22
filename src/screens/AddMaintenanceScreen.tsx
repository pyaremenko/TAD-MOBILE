"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Picker } from "@react-native-picker/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTheme } from "../context/ThemeContext"
import type { RootStackParamList } from "../types/navigation"
import { mockCars } from "../api/mockData"

type AddMaintenanceNavigationProp = StackNavigationProp<RootStackParamList, "AddMaintenance">

const AddMaintenanceScreen = () => {
  const navigation = useNavigation<AddMaintenanceNavigationProp>()
  const { theme } = useTheme()

  const [selectedCar, setSelectedCar] = useState("")
  const [maintenanceType, setMaintenanceType] = useState("")
  const [serviceProvider, setServiceProvider] = useState("")
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [odometer, setOdometer] = useState("")
  const [cost, setCost] = useState("")
  const [description, setDescription] = useState("")

  const maintenanceTypes = [
    "Oil Change",
    "Tire Rotation",
    "Brake Service",
    "Air Filter Replacement",
    "Transmission Service",
    "Coolant Flush",
    "Battery Replacement",
    "Spark Plug Replacement",
    "Wheel Alignment",
    "Other",
  ]

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShowDatePicker(false)
    setDate(currentDate)
  }

  const handleSubmit = () => {
    // Validate form
    if (!selectedCar) {
      Alert.alert("Error", "Please select a vehicle")
      return
    }

    if (!maintenanceType) {
      Alert.alert("Error", "Please select a maintenance type")
      return
    }

    if (!serviceProvider) {
      Alert.alert("Error", "Please enter a service provider")
      return
    }

    if (!odometer) {
      Alert.alert("Error", "Please enter the odometer reading")
      return
    }

    if (!cost) {
      Alert.alert("Error", "Please enter the maintenance cost")
      return
    }

    // In a real app, this would call an API to save the maintenance certificate
    Alert.alert("Success", "Maintenance certificate added successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ])
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Add Maintenance Certificate</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.formCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Vehicle Information</Text>

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Select Vehicle</Text>
            <View
              style={[
                styles.pickerContainer,
                { backgroundColor: theme.backgroundSecondary, borderColor: theme.border },
              ]}
            >
              <Picker
                selectedValue={selectedCar}
                onValueChange={(itemValue) => setSelectedCar(itemValue)}
                style={[styles.picker, { color: theme.text }]}
                dropdownIconColor={theme.text}
              >
                <Picker.Item label="Select a vehicle" value="" />
                {mockCars.map((car) => (
                  <Picker.Item key={car.id} label={car.make + " " + car.model} value={car.id} />
                ))}
              </Picker>
            </View>

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Maintenance Type</Text>
            <View
              style={[
                styles.pickerContainer,
                { backgroundColor: theme.backgroundSecondary, borderColor: theme.border },
              ]}
            >
              <Picker
                selectedValue={maintenanceType}
                onValueChange={(itemValue) => setMaintenanceType(itemValue)}
                style={[styles.picker, { color: theme.text }]}
                dropdownIconColor={theme.text}
              >
                <Picker.Item label="Select maintenance type" value="" />
                {maintenanceTypes.map((type, index) => (
                  <Picker.Item key={index} label={type} value={type} />
                ))}
              </Picker>
            </View>

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Service Provider</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border },
              ]}
              placeholder="Enter service provider"
              placeholderTextColor={theme.textSecondary}
              value={serviceProvider}
              onChangeText={setServiceProvider}
            />

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Service Date</Text>
            <TouchableOpacity
              style={[
                styles.datePickerButton,
                { backgroundColor: theme.backgroundSecondary, borderColor: theme.border },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: theme.text }]}>{date.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={20} color={theme.textSecondary} />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
            )}

            <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>Service Details</Text>

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Odometer Reading (km)</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border },
              ]}
              placeholder="Enter odometer reading"
              placeholderTextColor={theme.textSecondary}
              value={odometer}
              onChangeText={setOdometer}
              keyboardType="numeric"
            />

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Cost ($)</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border },
              ]}
              placeholder="Enter cost"
              placeholderTextColor={theme.textSecondary}
              value={cost}
              onChangeText={setCost}
              keyboardType="numeric"
            />

            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Description</Text>
            <TextInput
              style={[
                styles.textArea,
                { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border },
              ]}
              placeholder="Enter service description"
              placeholderTextColor={theme.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
            <Text style={[styles.submitButtonText, { color: theme.buttonText }]}>Add Certificate</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  formCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 48,
  },
  datePickerButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  textArea: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 100,
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
})

export default AddMaintenanceScreen
