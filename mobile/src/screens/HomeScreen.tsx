import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';

const destinations = [
  { title: 'Workout Tracking', route: 'Workouts' },
  { title: 'Nutrition Monitoring', route: 'Nutrition' },
  { title: 'Goals', route: 'Goals' },
  { title: 'Progress Analytics', route: 'Progress' },
  { title: 'Custom Plans', route: 'Plans' },
  { title: 'Social & Leaderboards', route: 'Social' },
  { title: 'Wearable Sync', route: 'Devices' },
  { title: 'Profile', route: 'Profile' },
];

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <Text style={styles.title}>Fitness Hub</Text>
      <Text style={styles.subtitle}>Track your workouts, nutrition, goals, and community.</Text>
      <View style={styles.grid}>
        {destinations.map(item => (
          <Pressable
            key={item.route}
            style={styles.card}
            onPress={() => navigation.navigate(item.route as never)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#4B5563',
  },
  grid: {
    gap: 12,
  },
  card: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: '600',
  },
});
