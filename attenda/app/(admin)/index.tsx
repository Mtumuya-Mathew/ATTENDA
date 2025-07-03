import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Chip,
  List
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/services/auth/AuthContext';
import { useSync } from '@/services/sync/SyncContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { isOnline, lastSync } = useSync();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineMedium">Admin Panel</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Welcome, {user?.name}
          </Text>
        </View>

        {/* System Status */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              System Status
            </Text>
            <View style={styles.statusRow}>
              <MaterialIcons 
                name={isOnline ? "wifi" : "wifi-off"} 
                size={24} 
                color={isOnline ? "#4CAF50" : "#F44336"} 
              />
              <Text variant="bodyLarge">
                {isOnline ? "Online" : "Offline"}
              </Text>
              <Chip mode="outlined" compact>
                All Systems Operational
              </Chip>
            </View>
            {lastSync && (
              <Text variant="bodySmall" style={styles.lastSync}>
                Last sync: {new Date(lastSync).toLocaleString()}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              System Overview
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">1,247</Text>
                <Text variant="bodyMedium">Total Students</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">89</Text>
                <Text variant="bodyMedium">Active Tutors</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">1,156</Text>
                <Text variant="bodyMedium">Devices</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Quick Actions
            </Text>
            
            <List.Item
              title="Manage Users"
              description="Add, edit, or remove user accounts"
              left={(props) => <List.Icon {...props} icon="account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            
            <List.Item
              title="Device Management"
              description="Bind/unbind student devices"
              left={(props) => <List.Icon {...props} icon="devices" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            
            <List.Item
              title="System Settings"
              description="Configure app-wide settings"
              left={(props) => <List.Icon {...props} icon="cog" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Recent Activity
            </Text>
            
            <View style={styles.activityItem}>
              <MaterialIcons name="person-add" size={20} color="#4CAF50" />
              <Text variant="bodyMedium">New student registered: John Doe</Text>
              <Text variant="bodySmall">2 min ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <MaterialIcons name="smartphone" size={20} color="#2196F3" />
              <Text variant="bodyMedium">Device bound to Jane Smith</Text>
              <Text variant="bodySmall">15 min ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <MaterialIcons name="warning" size={20} color="#FF9800" />
              <Text variant="bodyMedium">Sync issue resolved</Text>
              <Text variant="bodySmall">1 hour ago</Text>
            </View>
          </Card.Content>
        </Card>
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
  header: {
    marginBottom: 24,
  },
  subtitle: {
    color: '#49454F',
    marginTop: 4,
  },
  statusCard: {
    marginBottom: 16,
    backgroundColor: '#F7F2FA',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lastSync: {
    marginTop: 8,
    color: '#49454F',
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
});