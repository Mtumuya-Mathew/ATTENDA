import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Switch, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/services/auth/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Settings
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Preferences
            </Text>
            
            <List.Item
              title="Auto-scan"
              description="Automatically scan for nearby classes"
              right={() => <Switch value={true} onValueChange={() => {}} />}
            />
            
            <List.Item
              title="Notifications"
              description="Receive attendance reminders"
              right={() => <Switch value={true} onValueChange={() => {}} />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Device
            </Text>
            
            <List.Item
              title="Device ID"
              description="device-123456"
              left={(props) => <List.Icon {...props} icon="devices" />}
            />
            
            <List.Item
              title="Sync Status"
              description="Last synced 5 minutes ago"
              left={(props) => <List.Icon {...props} icon="sync" />}
            />
          </Card.Content>
        </Card>

        <Button
          mode="contained-tonal"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFE',
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 24,
  },
});