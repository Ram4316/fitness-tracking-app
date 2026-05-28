import { useNetInfo } from '@react-native-community/netinfo';
import { AxiosInstance } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { flushQueue, getQueueSize, queuePost } from '../api/offlineQueue';

export const useOfflineQueue = (client: AxiosInstance) => {
  const netInfo = useNetInfo();
  const [pendingCount, setPendingCount] = useState(0);

  const sync = useCallback(async () => {
    if (!netInfo.isConnected) {
      return;
    }
    const remaining = await flushQueue(client);
    setPendingCount(remaining);
  }, [client, netInfo.isConnected]);

  useEffect(() => {
    getQueueSize().then(setPendingCount);
  }, []);

  useEffect(() => {
    sync();
  }, [sync]);

  const queueOrPost = useCallback(
    async (path: string, payload: Record<string, unknown>) => {
      if (netInfo.isConnected) {
        return client.post(path, payload);
      }
      const count = await queuePost(path, payload);
      setPendingCount(count);
      return { queued: true };
    },
    [client, netInfo.isConnected],
  );

  return {
    isOnline: Boolean(netInfo.isConnected),
    pendingCount,
    queueOrPost,
    syncQueue: sync,
  };
};
