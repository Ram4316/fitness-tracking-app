# Fitness Tracking App

Mobile-first fitness tracking platform with workout logging, nutrition monitoring, goal tracking, progress analytics (Chart.js), social features, and wearable integrations. Uses Clerk for authentication, Firebase for notifications/storage, React Native (Expo), and a Node.js + MongoDB API.

## Repo Structure

- `mobile`: Expo React Native app
- `server`: Node.js API with MongoDB models

## Mobile Setup (Expo)

1. Update `mobile/src/config/config.ts` with your Clerk publishable key, API base URL, and Firebase config.
2. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```
3. Run the app:
   ```bash
   npm run start
   ```

## API Setup

1. Copy `server/.env.example` to `server/.env` and fill in values.
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Start the API:
   ```bash
   npm run start
   ```

## Offline Support

Workout and nutrition entries are queued when offline and synced automatically once connectivity is restored.

## Endpoints

Authenticated routes:

- `/api/workouts`
- `/api/nutrition`
- `/api/goals`
- `/api/progress`
- `/api/plans`
- `/api/achievements`
- `/api/devices`
- `/api/friends`
- `/api/leaderboard`

Health check:

- `/health`