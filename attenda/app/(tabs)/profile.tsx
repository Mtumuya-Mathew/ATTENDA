import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  List, 
  useTheme,
  Divider 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { authService } from '../../services/auth';
import { syncService } from '../../services/sync';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const handleSyncData = async () => {
    try {
      const success = await syncService.forcSync();
      Alert.alert(
        'Sync',
        success ? 'Data synced successfully!' : 'Sync failed. Please try again.'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to sync data');
    }
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
          <Text variant="bodyLarge">Please log in to view profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <MaterialCommunityIcons 
                name="account-circle" 
                size={80} 
                color={theme.colors.primary} 
              />
              <Text variant="headlineSmall" style={styles.userName}>
                {currentUser.name}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {currentUser.email}
              </Text>
              <Text variant="labelMedium" style={[styles.userRole, { color: theme.colors.primary }]}>
                {currentUser.role.toUpperCase()}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Account Information
            </Text>
            <List.Item
              title="User ID"
              description={currentUser.id}
              left={(props) => <List.Icon {...props} icon="identifier" />}
            />
            <Divider />
            <List.Item
              title="Member Since"
              description={new Date(currentUser.createdAt).toLocaleDateString()}
              left={(props) => <List.Icon {...props} icon="calendar" />}
            />
            {currentUser.deviceId && (
              <>
                <Divider />
                <List.Item
                  title="Device ID"
                  description={currentUser.deviceId}
                  left={(props) => <List.Icon {...props} icon="cellphone" />}
                />
              </>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Actions
            </Text>
            <Button
              mode="outlined"
              icon="sync"
              style={styles.actionButton}
              onPress={handleSyncData}
            >
              Sync Data
            </Button>
            <Button
              mode="outlined"
              icon="download"
              style={styles.actionButton}
              onPress={() => Alert.alert('Export', 'Export functionality coming soon')}
            >
              Export Data
            </Button>
            <Button
              mode="outlined"
              icon="help-circle"
              style={styles.actionButton}
              onPress={() => Alert.alert('Help', 'Help documentation coming soon')}
            >
              Help & Support
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Button
              mode="contained"
              icon="logout"
              style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
              onPress={handleLogout}
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  userName: {
    marginTop: 16,
    marginBottom: 4,
  },
  userEmail: {
    marginBottom: 8,
    opacity: 0.7,
  },
  userRole: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 8,
  },
});