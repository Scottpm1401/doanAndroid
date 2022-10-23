import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./modules/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./modules/login";
import Signup from "./modules/signup";
import Job from "./modules/job";
import { navigationRef } from "./utils/navigation";
import { AuthProvider } from "./context/authContext";
import { ProjectProvider } from "./context/projectContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <ProjectProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
                initialRouteName="login"
              >
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="job" component={Job} />
              </Stack.Navigator>
            </NavigationContainer>
          </ProjectProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
