"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { Text, Button, Searchbar, useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { CarListItem } from "../components/CarListItem"
import { getMockCars } from "../api/mockData"
import { spacing } from "../theme"
import type { RootStackParamList } from "../types/navigation"
import type { Car } from "../types/data"

type CarsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function CarsScreen() {
  const theme = useTheme()
  const navigation = useNavigation<CarsScreenNavigationProp>()
  const [searchQuery, setSearchQuery] = useState("")
  const cars = getMockCars()

  // Filter cars based on search query
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCarPress = (car: Car) => {
    navigation.navigate("CarDetail", { car })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ fontFamily: "Inter_700Bold" }}>
          My Cars
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("AddCar")}
          icon={({ size, color }) => <Icon name="plus" size={size} color={color} />}
        >
          Add Car
        </Button>
      </View>

      <Searchbar
        placeholder="Search cars..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarListItem car={item} onPress={() => handleCarPress(item)} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="car" size={64} color={theme.colors.outline} />
            <Text style={styles.emptyText}>No cars found</Text>
            <Text style={styles.emptySubtext}>Add a car to get started</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  searchBar: {
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.md,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  emptySubtext: {
    marginTop: spacing.xs,
    color: "gray",
  },
})
