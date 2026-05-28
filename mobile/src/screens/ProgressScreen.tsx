import { useEffect, useMemo, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ChartWebView } from '../components/ChartWebView';
import { ScreenLayout } from '../components/ScreenLayout';
import { useResource } from '../hooks/useResource';

type ProgressEntry = {
  _id: string;
  weightKg?: number;
  bodyFatPct?: number;
  date?: string;
};

export const ProgressScreen = () => {
  const { items, refresh, loading, error, create } = useResource<ProgressEntry>('/progress');
  const [weight, setWeight] = useState('70');
  const [bodyFat, setBodyFat] = useState('18');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const chartData = useMemo(() => {
    const sorted = [...items].sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
    return {
      labels: sorted.map(item => (item.date ? new Date(item.date).toLocaleDateString() : '')),
      data: sorted.map(item => item.weightKg ?? 0),
    };
  }, [items]);

  const handleAdd = async () => {
    await create({
      weightKg: Number(weight) || 0,
      bodyFatPct: Number(bodyFat) || 0,
      date: new Date().toISOString(),
    });
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Progress Analytics</Text>
      {chartData.data.length ? (
        <ChartWebView labels={chartData.labels} data={chartData.data} title="Weight (kg)" />
      ) : (
        <Text style={styles.caption}>Log entries to see your Chart.js progress trend.</Text>
      )}
      <View style={styles.card}>
        <TextInput
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Body fat (%)"
          value={bodyFat}
          onChangeText={setBodyFat}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Add entry" onPress={handleAdd} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Refreshing...' : 'Refresh progress'} onPress={refresh} />
      <View style={styles.list}>
        {items.map(item => (
          <View key={item._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.weightKg ?? 0} kg</Text>
            <Text style={styles.itemMeta}>Body fat {item.bodyFatPct ?? 0}%</Text>
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
    backgroundColor: '#EDE9FE',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
