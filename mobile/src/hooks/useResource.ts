import { useCallback, useState } from 'react';

import { useApiClient } from './useApiClient';

export const useResource = <T,>(path: string) => {
  const client = useApiClient();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get(path);
      const data = response.data?.items ?? response.data ?? [];
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Unable to load data.');
    } finally {
      setLoading(false);
    }
  }, [client, path]);

  const create = useCallback(
    async (payload: Record<string, unknown>) => {
      setError(null);
      try {
        const response = await client.post(path, payload);
        const item = response.data?.item ?? response.data;
        if (item) {
          setItems(prev => [item, ...prev]);
        }
        return { success: true };
      } catch (err) {
        setError('Unable to save data.');
        return { success: false };
      }
    },
    [client, path],
  );

  return { items, loading, error, refresh, create, client };
};
