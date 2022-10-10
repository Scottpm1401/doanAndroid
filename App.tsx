import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./modules/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./modules/login";
import Signup from "./modules/signup";

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ["/"],
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
