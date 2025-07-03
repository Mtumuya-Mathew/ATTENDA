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
          System Settings
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              General
            </Text>
            
            <List.Item
              title="Auto-sync"
              description="Automatically sync data when online"
              right={() => <Switch value={true} onValueChange={() => {}} />}
            />
            
            <List.Item
              title="Device binding approval"
              description="Require admin approval for new devices"
              right={() => <Switch value={true} onValueChange={() => {}} />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Attendance
            </Text>
            
            <List.Item
              title="Proximity threshold"
              description="10 meters"
              left={(props) => <List.Icon {...props} icon="map-marker-radius" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            
            <List.Item
              title="Session timeout"
              description="15 minutes"
              left={(props) => <List.Icon {...props} icon="timer" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              System
            </Text>
            
            <List.Item
              title="Database backup"
              description="Last backup: 2 hours ago"
              left={(props) => <List.Icon {...props} icon="database" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            
            <List.Item
              title="Export data"
              description="Export all system data"
              left={(props) => <List.Icon {...props} icon="export" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
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