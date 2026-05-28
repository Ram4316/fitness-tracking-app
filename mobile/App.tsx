import 'react-native-gesture-handler';

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appConfig } from './src/config/config';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthScreen } from './src/screens/AuthScreen';

const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  clearToken: (key: string) => SecureStore.deleteItemAsync(key),
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ClerkProvider publishableKey={appConfig.clerkPublishableKey} tokenCache={tokenCache}>
          <SignedIn>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <AuthScreen />
          </SignedOut>
        </ClerkProvider>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
