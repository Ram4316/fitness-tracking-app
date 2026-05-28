import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

type ScreenLayoutProps = {
  children: ReactNode;
};

export const ScreenLayout = ({ children }: ScreenLayoutProps) => (
  <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
});
