import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';
import { useResource } from '../hooks/useResource';

type Plan = {
  _id: string;
  name?: string;
  description?: string;
  active?: boolean;
};

export const PlansScreen = () => {
  const { items, refresh, loading, error, create } = useResource<Plan>('/plans');
  const [name, setName] = useState('Strength Builder');
  const [description, setDescription] = useState('4-day split with cardio finishers');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = async () => {
    await create({
      name,
      description,
      active: true,
    });
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Custom Plans</Text>
      <View style={styles.card}>
        <TextInput placeholder="Plan name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput
          placeholder="Plan description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Button title="Create plan" onPress={handleAdd} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Refreshing...' : 'Refresh plans'} onPress={refresh} />
      <View style={styles.list}>
        {items.map(item => (
          <View key={item._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemMeta}>{item.description}</Text>
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
    backgroundColor: '#F0FDF4',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
