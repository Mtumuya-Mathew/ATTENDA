import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Switch, 
  Chip,
  FAB,
  Portal,
  Dialog,
  TextInput
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/services/auth/AuthContext';
import { useBLE } from '@/services/ble/BLEContext';
import { useSync } from '@/services/sync/SyncContext';

export default function TutorDashboard() {
  const { user } = useAuth();
  const { isAdvertising, startAdvertising, stopAdvertising } = useBLE();
  const { isOnline, lastSync } = useSync();
  const [attendanceWindow, setAttendanceWindow] = useState(false);
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState('15');

  const handleToggleAdvertising = async () => {
    if (isAdvertising) {
      await stopAdvertising();
      setAttendanceWindow(false);
    } else {
      await startAdvertising();
      setAttendanceWindow(true);
    }
  };

  const handleTimedAttendance = () => {
    setShowTimerDialog(true);
  };

  const startTimedAttendance = async () => {
    const minutes = parseInt(timerMinutes);
    if (minutes > 0) {
      await startAdvertising();
      setAttendanceWindow(true);
      
      // Set timer to stop advertising
      setTimeout(async () => {
        await stopAdvertising();
        setAttendanceWindow(false);
      }, minutes * 60 * 1000);
    }
    setShowTimerDialog(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineMedium">Welcome back, {user?.name}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Tutor Dashboard
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
                {isAdvertising ? "Broadcasting" : "Idle"}
              </Chip>
            </View>
            {lastSync && (
              <Text variant="bodySmall" style={styles.lastSync}>
                Last sync: {new Date(lastSync).toLocaleString()}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Attendance Control */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Attendance Control
            </Text>
            
            <View style={styles.controlRow}>
              <Text variant="bodyLarge">Attendance Window</Text>
              <Switch
                value={attendanceWindow}
                onValueChange={handleToggleAdvertising}
              />
            </View>

            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={handleToggleAdvertising}
                style={[styles.button, { flex: 1 }]}
                disabled={isAdvertising}
              >
                Start Manual
              </Button>
              <Button
                mode="outlined"
                onPress={handleTimedAttendance}
                style={[styles.button, { flex: 1 }]}
                disabled={isAdvertising}
              >
                Start Timed
              </Button>
            </View>

            {isAdvertising && (
              <Button
                mode="contained-tonal"
                onPress={handleToggleAdvertising}
                style={styles.stopButton}
              >
                Stop Attendance
              </Button>
            )}
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Today's Overview
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">24</Text>
                <Text variant="bodyMedium">Present</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">3</Text>
                <Text variant="bodyMedium">Absent</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall">89%</Text>
                <Text variant="bodyMedium">Rate</Text>
              </View>
            </View>
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
              <Text variant="bodyMedium">John Doe marked present</Text>
              <Text variant="bodySmall">2 min ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <MaterialIcons name="person-add" size={20} color="#4CAF50" />
              <Text variant="bodyMedium">Jane Smith marked present</Text>
              <Text variant="bodySmall">5 min ago</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Timer Dialog */}
      <Portal>
        <Dialog visible={showTimerDialog} onDismiss={() => setShowTimerDialog(false)}>
          <Dialog.Title>Set Attendance Timer</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Minutes"
              value={timerMinutes}
              onChangeText={setTimerMinutes}
              keyboardType="numeric"
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTimerDialog(false)}>Cancel</Button>
            <Button onPress={startTimedAttendance}>Start</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    marginVertical: 4,
  },
  stopButton: {
    marginTop: 8,
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