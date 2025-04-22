import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Provider as PaperProvider } from "react-native-paper"
import { NavigationContainer } from "@react-navigation/native"
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter"
import { View, Text } from "react-native"

import AppNavigator from "./src/navigation/AppNavigator"
import { theme } from "./src/theme"
import { ThemeProvider } from "./src/context/ThemeContext"

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
