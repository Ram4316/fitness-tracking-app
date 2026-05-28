import { useAuth, useUser } from '@clerk/clerk-expo';
import { Button, StyleSheet, Text, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';

export const ProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <ScreenLayout>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.itemTitle}>{user?.fullName ?? 'Fitness User'}</Text>
        <Text style={styles.itemMeta}>{user?.primaryEmailAddress?.emailAddress ?? 'No email'}</Text>
        <Button title="Sign out" onPress={() => signOut()} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
