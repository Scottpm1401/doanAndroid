import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigator';
export default function App() {
  const linking = {
    prefixes: ['/'],
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['right', 'left']} style={{ flex: 1 }}>
        <NavigationContainer linking={linking}>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
