import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';
import { useOfflineQueue } from '../hooks/useOfflineQueue';
import { useResource } from '../hooks/useResource';

type Workout = {
  _id: string;
  name?: string;
  type?: string;
  durationMinutes?: number;
  caloriesBurned?: number;
  date?: string;
};

export const WorkoutsScreen = () => {
  const { items, refresh, loading, error, client } = useResource<Workout>('/workouts');
  const { isOnline, pendingCount, queueOrPost } = useOfflineQueue(client);
  const [name, setName] = useState('');
  const [type, setType] = useState('strength');
  const [duration, setDuration] = useState('30');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = async () => {
    await queueOrPost('/workouts', {
      name,
      type,
      durationMinutes: Number(duration) || 0,
      caloriesBurned: Number(duration) * 6,
      date: new Date().toISOString(),
    });
    if (isOnline) {
      refresh();
    }
    setName('');
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Workout Tracking</Text>
      <Text style={styles.caption}>
        {isOnline ? 'Online' : 'Offline'} · Pending sync: {pendingCount}
      </Text>
      <View style={styles.card}>
        <TextInput
          placeholder="Workout name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput placeholder="Type (strength/cardio)" value={type} onChangeText={setType} style={styles.input} />
        <TextInput
          placeholder="Duration (minutes)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Add workout" onPress={handleAdd} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Refreshing...' : 'Refresh list'} onPress={refresh} />
      <View style={styles.list}>
        {items.map(item => (
          <View key={item._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.name || 'Workout'}</Text>
            <Text style={styles.itemMeta}>
              {item.type} · {item.durationMinutes ?? 0} min · {item.caloriesBurned ?? 0} kcal
            </Text>
          </View>
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  caption: {
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  error: {
    color: '#DC2626',
  },
  list: {
    gap: 12,
  },
  listItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
