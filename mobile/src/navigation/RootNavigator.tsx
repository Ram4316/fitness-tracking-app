import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DevicesScreen } from '../screens/DevicesScreen';
import { GoalsScreen } from '../screens/GoalsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NutritionScreen } from '../screens/NutritionScreen';
import { PlansScreen } from '../screens/PlansScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { SocialScreen } from '../screens/SocialScreen';
import { WorkoutsScreen } from '../screens/WorkoutsScreen';

export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Nutrition: undefined;
  Goals: undefined;
  Progress: undefined;
  Plans: undefined;
  Social: undefined;
  Devices: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Workouts" component={WorkoutsScreen} />
    <Stack.Screen name="Nutrition" component={NutritionScreen} />
    <Stack.Screen name="Goals" component={GoalsScreen} />
    <Stack.Screen name="Progress" component={ProgressScreen} />
    <Stack.Screen name="Plans" component={PlansScreen} />
    <Stack.Screen name="Social" component={SocialScreen} />
    <Stack.Screen name="Devices" component={DevicesScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);
