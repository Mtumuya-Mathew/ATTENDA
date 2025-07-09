import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Modal, 
  Portal, 
  Text, 
  Button, 
  Card, 
  ActivityIndicator,
  List,
  Chip
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TimetableSession } from './TimetableCard';
import { useBLE } from '@/services/ble/BLEContext';

interface AttendanceModalProps {
  visible: boolean;
  session: TimetableSession | null;
  userRole: 'student' | 'tutor';
  onDismiss: () => void;
}

export function AttendanceModal({ visible, session, userRole, onDismiss }: AttendanceModalProps) {
  const { 
    isAdvertising, 
    isScanning, 
    nearbyTutors, 
    startAdvertising, 
    stopAdvertising, 
    startScanning, 
    stopScanning 
  } = useBLE();
  
  const [attendanceStarted, setAttendanceStarted] = useState(false);
  const [studentsPresent, setStudentsPresent] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) {
      setAttendanceStarted(false);
      setStudentsPresent([]);
      if (isAdvertising) stopAdvertising();
      if (isScanning) stopScanning();
    }
  }, [visible]);

  const handleStartAttendance = async () => {
    if (userRole === 'tutor') {
      try {
        await startAdvertising();
        setAttendanceStarted(true);
      } catch (error) {
        console.error('Failed to start advertising:', error);
      }
    } else {
      try {
        await startScanning();
      } catch (error) {
        console.error('Failed to start scanning:', error);
      }
    }
  };

  const handleStopAttendance = async () => {
    if (userRole === 'tutor') {
      await stopAdvertising();
    } else {
      await stopScanning();
    }
    setAttendanceStarted(false);
  };

  const handleMarkPresent = async (tutorId: string) => {
    // TODO: Implement actual attendance marking logic
    console.log('Marking present for tutor:', tutorId);
    await stopScanning();
    onDismiss();
  };

  if (!session) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Card>
          <Card.Content>
            <View style={styles.header}>
              <Text variant="headlineSmall">{session.subject}</Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                {session.time} • {session.room}
              </Text>
            </View>

            {userRole === 'tutor' ? (
              <TutorAttendanceView
                isAdvertising={isAdvertising}
                attendanceStarted={attendanceStarted}
                studentsPresent={studentsPresent}
                onStart={handleStartAttendance}
                onStop={handleStopAttendance}
              />
            ) : (
              <StudentAttendanceView
                isScanning={isScanning}
                nearbyTutors={nearbyTutors}
                onStart={handleStartAttendance}
                onMarkPresent={handleMarkPresent}
              />
            )}

            <View style={styles.actions}>
              <Button mode="outlined" onPress={onDismiss}>
                Close
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
}

function TutorAttendanceView({ 
  isAdvertising, 
  attendanceStarted, 
  studentsPresent, 
  onStart, 
  onStop 
}: {
  isAdvertising: boolean;
  attendanceStarted: boolean;
  studentsPresent: string[];
  onStart: () => void;
  onStop: () => void;
}) {
  return (
    <View style={styles.content}>
      <View style={styles.statusSection}>
        <View style={styles.statusRow}>
          <MaterialIcons 
            name={isAdvertising ? "bluetooth-connected" : "bluetooth-disabled"} 
            size={24} 
            color={isAdvertising ? "#4CAF50" : "#666"} 
          />
          <Text variant="bodyLarge">
            {isAdvertising ? "Broadcasting" : "Ready to start"}
          </Text>
        </View>
        
        {isAdvertising && (
          <Text variant="bodySmall" style={styles.helpText}>
            Students can now mark their attendance
          </Text>
        )}
      </View>

      {!attendanceStarted ? (
        <Button
          mode="contained"
          onPress={onStart}
          icon="bluetooth-connect"
          style={styles.actionButton}
        >
          Start Attendance Session
        </Button>
      ) : (
        <Button
          mode="contained-tonal"
          onPress={onStop}
          icon="stop"
          style={styles.actionButton}
        >
          Stop Attendance Session
        </Button>
      )}

      {studentsPresent.length > 0 && (
        <View style={styles.studentsSection}>
          <Text variant="titleMedium">Students Present ({studentsPresent.length})</Text>
          {studentsPresent.map((student, index) => (
            <List.Item
              key={index}
              title={student}
              left={(props) => <List.Icon {...props} icon="account-check" />}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function StudentAttendanceView({ 
  isScanning, 
  nearbyTutors, 
  onStart, 
  onMarkPresent 
}: {
  isScanning: boolean;
  nearbyTutors: any[];
  onStart: () => void;
  onMarkPresent: (tutorId: string) => void;
}) {
  return (
    <View style={styles.content}>
      <View style={styles.statusSection}>
        <View style={styles.statusRow}>
          <MaterialIcons 
            name={isScanning ? "bluetooth-searching" : "bluetooth-disabled"} 
            size={24} 
            color={isScanning ? "#2196F3" : "#666"} 
          />
          <Text variant="bodyLarge">
            {isScanning ? "Scanning for tutor..." : "Ready to scan"}
          </Text>
        </View>
        
        {isScanning && (
          <ActivityIndicator size="small" style={styles.loader} />
        )}
      </View>

      {!isScanning ? (
        <Button
          mode="contained"
          onPress={onStart}
          icon="bluetooth-connect"
          style={styles.actionButton}
        >
          Scan for Attendance
        </Button>
      ) : nearbyTutors.length > 0 ? (
        <View style={styles.tutorsSection}>
          <Text variant="titleMedium">Available Sessions</Text>
          {nearbyTutors.map((tutor, index) => (
            <List.Item
              key={index}
              title={tutor.name}
              description={`Signal: ${tutor.distance} dBm`}
              left={(props) => <List.Icon {...props} icon="school" />}
              right={(props) => (
                <Button 
                  mode="contained" 
                  compact
                  onPress={() => onMarkPresent(tutor.id)}
                >
                  Mark Present
                </Button>
              )}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text variant="bodyMedium" style={styles.emptyText}>
            No active sessions found nearby
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  content: {
    marginBottom: 20,
  },
  statusSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  helpText: {
    color: '#666',
    textAlign: 'center',
  },
  loader: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 16,
  },
  studentsSection: {
    marginTop: 16,
  },
  tutorsSection: {
    marginTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});