import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  FAB, 
  useTheme,
  ActivityIndicator,
  Chip,
  List
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../services/auth';
import { bluetoothService } from '../../services/bluetooth';
import { databaseService } from '../../services/database';
import { BLEDevice, AttendanceSession } from '../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<BLEDevice[]>([]);
  const [activeSessions, setActiveSessions] = useState<AttendanceSession[]>([]);

  useEffect(() => {
    if (currentUser?.role === 'tutor') {
      loadActiveSessions();
    }
  }, []);

  const loadActiveSessions = async () => {
    if (!currentUser) return;
    
    try {
      const sessions = await databaseService.getActiveSessionsByTutor(currentUser.id);
      setActiveSessions(sessions);
    } catch (error) {
      console.error('Failed to load active sessions:', error);
    }
  };

  const handleStartScanning = async () => {
    if (!currentUser || currentUser.role !== 'student') return;

    setScanning(true);
    setDiscoveredDevices([]);

    try {
      await bluetoothService.startScanning((device) => {
        setDiscoveredDevices(prev => {
          const exists = prev.find(d => d.id === device.id);
          if (exists) return prev;
          return [...prev, device];
        });
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to start scanning for attendance sessions');
      setScanning(false);
    }
  };

  const handleStopScanning = async () => {
    await bluetoothService.stopScanning();
    setScanning(false);
  };

  const handleMarkAttendance = async (device: BLEDevice) => {
    try {
      const success = await bluetoothService.connectToDevice(device.id);
      if (success) {
        Alert.alert('Success', 'Attendance marked successfully!');
        // Here you would create an attendance record
      } else {
        Alert.alert('Error', 'Failed to mark attendance');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to attendance session');
    }
  };

  const handleStartSession = async () => {
    if (!currentUser || currentUser.role !== 'tutor') return;

    // This would open a modal to create a new session
    Alert.alert('Start Session', 'This would open session creation modal');
  };

  const handleStopSession = async (sessionId: string) => {
    try {
      await databaseService.updateAttendanceSession(sessionId, { 
        isActive: false, 
        endTime: new Date().toISOString() 
      });
      await bluetoothService.stopAdvertising();
      setAdvertising(false);
      loadActiveSessions();
      Alert.alert('Success', 'Attendance session stopped');
    } catch (error) {
      Alert.alert('Error', 'Failed to stop session');
    }
  };

  const renderStudentView = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.cardTitle}>
            Mark Attendance
          </Text>
          <Text variant="bodyMedium" style={styles.cardSubtitle}>
            Scan for nearby attendance sessions
          </Text>
          
          <View style={styles.scanControls}>
            {!scanning ? (
              <Button
                mode="contained"
                onPress={handleStartScanning}
                icon="bluetooth-connect"
                style={styles.scanButton}
              >
                Start Scanning
              </Button>
            ) : (
              <Button
                mode="outlined"
                onPress={handleStopScanning}
                icon="stop"
                style={styles.scanButton}
              >
                Stop Scanning
              </Button>
            )}
          </View>

          {scanning && (
            <View style={styles.scanningIndicator}>
              <ActivityIndicator size="small" />
              <Text variant="bodySmall" style={styles.scanningText}>
                Scanning for attendance sessions...
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {discoveredDevices.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Available Sessions
            </Text>
            {discoveredDevices.map((device) => (
              <List.Item
                key={device.id}
                title={device.name || 'Unknown Session'}
                description={`Signal: ${device.rssi} dBm`}
                left={(props) => <List.Icon {...props} icon="broadcast" />}
                right={(props) => (
                  <Button
                    mode="contained"
                    compact
                    onPress={() => handleMarkAttendance(device)}
                  >
                    Mark
                  </Button>
                )}
                style={styles.deviceItem}
              />
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );

  const renderTutorView = () => (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.cardTitle}>
              Attendance Sessions
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtitle}>
              Manage your active attendance sessions
            </Text>
          </Card.Content>
        </Card>

        {activeSessions.length > 0 ? (
          activeSessions.map((session) => (
            <Card key={session.id} style={styles.card}>
              <Card.Content>
                <View style={styles.sessionHeader}>
                  <Text variant="titleMedium">{session.title}</Text>
                  <Chip icon="broadcast" mode="flat">
                    Active
                  </Chip>
                </View>
                <Text variant="bodyMedium" style={styles.sessionDetails}>
                  Started: {new Date(session.startTime).toLocaleTimeString()}
                </Text>
                {session.location && (
                  <Text variant="bodySmall" style={styles.sessionLocation}>
                    📍 {session.location}
                  </Text>
                )}
                <Button
                  mode="outlined"
                  onPress={() => handleStopSession(session.id)}
                  style={styles.stopButton}
                >
                  Stop Session
                </Button>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No active sessions. Start a new session to begin taking attendance.
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleStartSession}
      />
    </View>
  );

  const renderAdminView = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.cardTitle}>
            Admin Dashboard
          </Text>
          <Text variant="bodyMedium" style={styles.cardSubtitle}>
            System overview and management
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <Button
            mode="contained"
            icon="account-group"
            style={styles.actionButton}
            onPress={() => Alert.alert('Users', 'Navigate to user management')}
          >
            Manage Users
          </Button>
          <Button
            mode="outlined"
            icon="cog"
            style={styles.actionButton}
            onPress={() => Alert.alert('Settings', 'Navigate to system settings')}
          >
            System Settings
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );

  if (!currentUser) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
          <Text variant="bodyLarge">Please log in to continue</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {currentUser.role === 'student' && renderStudentView()}
      {currentUser.role === 'tutor' && renderTutorView()}
      {currentUser.role === 'admin' && renderAdminView()}
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
  cardTitle: {
    marginBottom: 8,
  },
  cardSubtitle: {
    opacity: 0.7,
    marginBottom: 16,
  },
  scanControls: {
    marginBottom: 16,
  },
  scanButton: {
    marginBottom: 8,
  },
  scanningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  scanningText: {
    marginLeft: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  deviceItem: {
    marginBottom: 8,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionDetails: {
    marginBottom: 4,
  },
  sessionLocation: {
    marginBottom: 16,
    opacity: 0.7,
  },
  stopButton: {
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  actionButton: {
    marginBottom: 12,
  },
});