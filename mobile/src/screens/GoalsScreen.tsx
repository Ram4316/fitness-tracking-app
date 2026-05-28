import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';
import { useResource } from '../hooks/useResource';

type Goal = {
  _id: string;
  type?: string;
  targetValue?: number;
  currentValue?: number;
  status?: string;
};

export const GoalsScreen = () => {
  const { items, refresh, loading, error, create } = useResource<Goal>('/goals');
  const [type, setType] = useState('steps');
  const [target, setTarget] = useState('10000');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = async () => {
    await create({
      type,
      targetValue: Number(target) || 0,
      currentValue: 0,
      status: 'active',
    });
    setTarget('');
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Goals</Text>
      <View style={styles.card}>
        <TextInput placeholder="Goal type" value={type} onChangeText={setType} style={styles.input} />
        <TextInput
          placeholder="Target value"
          value={target}
          onChangeText={setTarget}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Add goal" onPress={handleAdd} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Refreshing...' : 'Refresh goals'} onPress={refresh} />
      <View style={styles.list}>
        {items.map(item => (
          <View key={item._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.type}</Text>
            <Text style={styles.itemMeta}>
              Target {item.targetValue ?? 0} · Status {item.status ?? 'active'}
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
    backgroundColor: '#FEF3C7',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
