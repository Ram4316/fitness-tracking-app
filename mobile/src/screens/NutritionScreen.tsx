import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';
import { useOfflineQueue } from '../hooks/useOfflineQueue';
import { useResource } from '../hooks/useResource';

type NutritionEntry = {
  _id: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  date?: string;
};

export const NutritionScreen = () => {
  const { items, refresh, loading, error, client } = useResource<NutritionEntry>('/nutrition');
  const { isOnline, pendingCount, queueOrPost } = useOfflineQueue(client);
  const [calories, setCalories] = useState('500');
  const [protein, setProtein] = useState('30');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = async () => {
    await queueOrPost('/nutrition', {
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Math.max(0, 200 - Number(protein || 0)),
      fat: 20,
      date: new Date().toISOString(),
    });
    if (isOnline) {
      refresh();
    }
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Nutrition Monitoring</Text>
      <Text style={styles.caption}>
        {isOnline ? 'Online' : 'Offline'} · Pending sync: {pendingCount}
      </Text>
      <View style={styles.card}>
        <TextInput
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Protein (g)"
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Log nutrition" onPress={handleAdd} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Refreshing...' : 'Refresh list'} onPress={refresh} />
      <View style={styles.list}>
        {items.map(item => (
          <View key={item._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.calories ?? 0} kcal</Text>
            <Text style={styles.itemMeta}>
              Protein {item.protein ?? 0}g · Carbs {item.carbs ?? 0}g · Fat {item.fat ?? 0}g
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
    backgroundColor: '#ECFDF3',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
