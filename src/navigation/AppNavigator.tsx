"use client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import CarsScreen from "../screens/CarsScreen";
import CarDetailScreen from "../screens/CarDetailScreen";
import AddCarScreen from "../screens/AddCarScreen";
import MaintenanceScreen from "../screens/MaintenanceScreen";
import MaintenanceDetailScreen from "../screens/MaintenanceDetailScreen";
import AddMaintenanceScreen from "../screens/AddMaintenanceScreen";
import RewardsScreen from "../screens/RewardsScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import SettingsScreen from "../screens/SettingsScreen";

import type { RootStackParamList, MainTabParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveTintColor: theme.primary,
        // tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          // backgroundColor: theme.cardBackground,
          // borderTopColor: theme.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cars"
        component={CarsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="CarDetail" component={CarDetailScreen} />
        <Stack.Screen name="AddCar" component={AddCarScreen} />
        <Stack.Screen
          name="MaintenanceDetail"
          component={MaintenanceDetailScreen}
        />
        <Stack.Screen name="AddMaintenance" component={AddMaintenanceScreen} />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
