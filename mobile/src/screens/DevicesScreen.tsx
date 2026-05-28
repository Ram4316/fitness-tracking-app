import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';
import { useResource } from '../hooks/useResource';

type Device = {
  _id: string;
  provider?: string;
  status?: string;
  lastSyncedAt?: string;
};

export const DevicesScreen = () => {
  const { items, refresh, loading, error, create, client } = useResource<Device>('/devices');
  const [provider, setProvider] = useState('apple_health');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleRegister = async () => {
    await create({
      provider,
      status: 'connected',
    });
  };

  const handleSync = async (id: string) => {
    await client.post(`/devices/${id}/sync`);
    refresh();
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Wearable Integration</Text>
      <View style={styles.card}>
        <TextInput
          placeholder="Provider (apple_health/google_fit)"
          value={provider}
          onChangeText={setProvider}
          style={styles.input}
        />
        <Button title="Register device" onPress={handleRegister} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Refreshing...' : 'Refresh devices'} onPress={refresh} />
      <View style={styles.list}>
        {items.map(device => (
          <View key={device._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{device.provider}</Text>
            <Text style={styles.itemMeta}>Status {device.status}</Text>
            <Button title="Sync now" onPress={() => handleSync(device._id)} />
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
    backgroundColor: '#F0F9FF',
    gap: 8,
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
