import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Home from './modules/home';
export default function App() {
  const linking = {
    prefixes: ['/'],
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
       <Home/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
