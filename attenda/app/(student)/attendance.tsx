import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimetableCard, TimetableSession } from '@/components/ui/TimetableCard';
import { AttendanceModal } from '@/components/ui/AttendanceModal';
import { getTimetableForUser } from '@/data/mockTimetable';

export default function AttendanceScreen() {
  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timetable = getTimetableForUser('student');
  const activeSessions = timetable.filter(session => session.isActive);

  const handleSessionPress = (session: TimetableSession) => {
    setSelectedSession(session);
    setModalVisible(true);
  };

  const handleQuickScan = () => {
    // Quick scan for any available sessions
    setSelectedSession(null);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Mark Attendance
        </Text>

        <Card style={styles.quickScanCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.quickScanTitle}>
              Quick Attendance
            </Text>
            <Text variant="bodyMedium" style={styles.quickScanDescription}>
              Scan for any nearby active sessions
            </Text>
            <Button
              mode="contained"
              onPress={handleQuickScan}
              icon="bluetooth-connect"
              style={styles.quickScanButton}
            >
              Start Quick Scan
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Active Sessions
          </Text>
          
          {activeSessions.length > 0 ? (
            activeSessions.map((session) => (
              <TimetableCard
                key={session.id}
                session={session}
                userRole="student"
                onSessionPress={handleSessionPress}
              />
            ))
          ) : (
            <Text variant="bodyMedium" style={styles.emptyText}>
              No active sessions available
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Today's Schedule
          </Text>
          
          {timetable.map((session) => (
            <TimetableCard
              key={session.id}
              session={session}
              userRole="student"
              onSessionPress={handleSessionPress}
            />
          ))}
        </View>
      </ScrollView>

      <AttendanceModal
        visible={modalVisible}
        session={selectedSession}
        userRole="student"
        onDismiss={() => setModalVisible(false)}
      />
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
  quickScanCard: {
    marginBottom: 24,
    backgroundColor: '#F7F2FA',
  },
  quickScanTitle: {
    marginBottom: 8,
  },
  quickScanDescription: {
    marginBottom: 16,
    color: '#666',
  },
  quickScanButton: {
    alignSelf: 'flex-start',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});