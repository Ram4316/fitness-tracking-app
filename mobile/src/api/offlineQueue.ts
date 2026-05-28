import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosInstance } from 'axios';

type QueueItem = {
  id: string;
  method: 'post';
  path: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

const QUEUE_KEY = 'offline-queue';

const readQueue = async (): Promise<QueueItem[]> => {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as QueueItem[];
  } catch {
    return [];
  }
};

const writeQueue = async (queue: QueueItem[]) =>
  AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));

export const queuePost = async (path: string, payload: Record<string, unknown>) => {
  const queue = await readQueue();
  const next = [
    ...queue,
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      method: 'post',
      path,
      payload,
      createdAt: new Date().toISOString(),
    },
  ];
  await writeQueue(next);
  return next.length;
};

export const flushQueue = async (client: AxiosInstance) => {
  const queue = await readQueue();
  if (!queue.length) {
    return 0;
  }

  const remaining: QueueItem[] = [];
  for (const entry of queue) {
    try {
      await client.post(entry.path, entry.payload);
    } catch {
      remaining.push(entry);
    }
  }

  await writeQueue(remaining);
  return remaining.length;
};

export const getQueueSize = async () => {
  const queue = await readQueue();
  return queue.length;
};
