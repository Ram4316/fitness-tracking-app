import { SignIn } from '@clerk/clerk-expo';
import { StyleSheet, View } from 'react-native';

export const AuthScreen = () => (
  <View style={styles.container}>
    <SignIn />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
