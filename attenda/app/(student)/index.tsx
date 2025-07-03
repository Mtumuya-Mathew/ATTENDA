import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Chip,
  ProgressBar,
  List
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/services/auth/AuthContext';
import { useBLE } from '@/services/ble/BLEContext';
import { useSync } from '@/services/sync/SyncContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { isScanning, startScanning, stopScanning, nearbyTutors } = useBLE();
  const { isOnline, lastSync } = useSync();
  const [attendanceRate, setAttendanceRate] = useState(0.85);

  const handleToggleScanning = async () => {
    if (isScanning) {
      await stopScanning();
    } else {
      await startScanning();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineMedium">Hello, {user?.name}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Student Dashboard
          </Text>
        </View>

        {/* Connection Status */}
        <Card style={styles.statusCard}>
          <Card.Content>
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
                {isScanning ? "Scanning" : "Idle"}
              </Chip>
            </View>
            {lastSync && (
              <Text variant="bodySmall" style={styles.lastSync}>
                Last sync: {new Date(lastSync).toLocaleString()}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Attendance Scanner */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Mark Attendance
            </Text>
            
            <Button
              mode={isScanning ? "contained-tonal" : "contained"}
              onPress={handleToggleScanning}
              icon={isScanning ? "stop" : "bluetooth-connect"}
              style={styles.scanButton}
            >
              {isScanning ? "Stop Scanning" : "Start Scanning"}
            </Button>

            {nearbyTutors.length > 0 && (
              <View style={styles.nearbySection}>
                <Text variant="titleMedium" style={styles.nearbyTitle}>
                  Nearby Classes
                </Text>
                {nearbyTutors.map((tutor, index) => (
                  <List.Item
                    key={index}
                    title={tutor.name}
                    description={`${tutor.course} - ${tutor.distance}m away`}
                    left={(props) => <List.Icon {...props} icon="school" />}
                    right={(props) => (
                      <Button mode="contained" compact>
                        Mark Present
                      </Button>
                    )}
                  />
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Attendance Overview */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Attendance Overview
            </Text>
            
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text variant="bodyLarge">Overall Rate</Text>
                <Text variant="headlineSmall">{Math.round(attendanceRate * 100)}%</Text>
              </View>
              <ProgressBar 
                progress={attendanceRate} 
                style={styles.progressBar}
              />
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">42</Text>
                <Text variant="bodyMedium">Present</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">8</Text>
                <Text variant="bodyMedium">Absent</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">50</Text>
                <Text variant="bodyMedium">Total</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Today's Schedule */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Today's Schedule
            </Text>
            
            <List.Item
              title="Mathematics"
              description="9:00 AM - 10:30 AM"
              left={(props) => <List.Icon {...props} icon="calculator" />}
              right={() => <Chip mode="outlined">Attended</Chip>}
            />
            
            <List.Item
              title="Physics"
              description="11:00 AM - 12:30 PM"
              left={(props) => <List.Icon {...props} icon="atom-variant" />}
              right={() => <Chip mode="outlined">Upcoming</Chip>}
            />
            
            <List.Item
              title="Chemistry"
              description="2:00 PM - 3:30 PM"
              left={(props) => <List.Icon {...props} icon="flask" />}
              right={() => <Chip mode="outlined">Upcoming</Chip>}
            />
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
  scanButton: {
    marginBottom: 16,
  },
  nearbySection: {
    marginTop: 16,
  },
  nearbyTitle: {
    marginBottom: 8,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
});