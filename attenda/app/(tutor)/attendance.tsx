import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimetableCard, TimetableSession } from '@/components/ui/TimetableCard';
import { AttendanceModal } from '@/components/ui/AttendanceModal';
import { getTimetableForUser } from '@/data/mockTimetable';

export default function AttendanceScreen() {
  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timetable = getTimetableForUser('tutor');
  const activeSessions = timetable.filter(session => session.isActive);
  const recentSessions = timetable.filter(session => !session.isActive);

  const handleSessionPress = (session: TimetableSession) => {
    setSelectedSession(session);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Attendance Management
        </Text>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Active Sessions
          </Text>
          
          {activeSessions.length > 0 ? (
            activeSessions.map((session) => (
              <TimetableCard
                key={session.id}
                session={session}
                userRole="tutor"
                onSessionPress={handleSessionPress}
              />
            ))
          ) : (
            <Text variant="bodyMedium" style={styles.emptyText}>
              No active sessions
            </Text>
          )}
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Recent Sessions
            </Text>
            
            {recentSessions.map((session) => (
              <List.Item
                key={session.id}
                title={session.subject}
                description={`${session.time} • ${session.room}`}
                left={(props) => <List.Icon {...props} icon="history" />}
                right={() => <Chip mode="outlined">Completed</Chip>}
              />
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <AttendanceModal
        visible={modalVisible}
        session={selectedSession}
        userRole="tutor"
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});