import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenLayout } from '../components/ScreenLayout';
import { useApiClient } from '../hooks/useApiClient';

type Friend = {
  _id: string;
  friendUserId: string;
  status: string;
};

type LeaderboardEntry = {
  _id: string;
  userId: string;
  score: number;
  period: string;
};

export const SocialScreen = () => {
  const client = useApiClient();
  const [friendUserId, setFriendUserId] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadFriends = async () => {
    try {
      const response = await client.get('/friends');
      setFriends(response.data?.items ?? []);
    } catch {
      setError('Unable to load friends.');
    }
  };

  const loadLeaderboard = async () => {
    try {
      const response = await client.get('/leaderboard', {
        params: { scope: 'global', period: 'weekly' },
      });
      setLeaderboard(response.data?.items ?? []);
    } catch {
      setError('Unable to load leaderboard.');
    }
  };

  useEffect(() => {
    loadFriends();
    loadLeaderboard();
  }, []);

  const handleRequest = async () => {
    if (!friendUserId) {
      return;
    }
    try {
      await client.post('/friends/requests', { friendUserId });
      setFriendUserId('');
      loadFriends();
    } catch {
      setError('Unable to send request.');
    }
  };

  return (
    <ScreenLayout>
      <Text style={styles.title}>Social & Leaderboards</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.card}>
        <TextInput
          placeholder="Friend Clerk user ID"
          value={friendUserId}
          onChangeText={setFriendUserId}
          style={styles.input}
        />
        <Button title="Send friend request" onPress={handleRequest} />
      </View>
      <Button title="Refresh leaderboard" onPress={loadLeaderboard} />
      <View style={styles.list}>
        {leaderboard.map(entry => (
          <View key={entry._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{entry.userId}</Text>
            <Text style={styles.itemMeta}>Score {entry.score} · {entry.period}</Text>
          </View>
        ))}
      </View>
      <Button title="Refresh friends" onPress={loadFriends} />
      <View style={styles.list}>
        {friends.map(friend => (
          <View key={friend._id} style={styles.listItem}>
            <Text style={styles.itemTitle}>{friend.friendUserId}</Text>
            <Text style={styles.itemMeta}>Status {friend.status}</Text>
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
    backgroundColor: '#F3F4F6',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemMeta: {
    color: '#4B5563',
  },
});
