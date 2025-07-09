import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimetableCard, TimetableSession } from '@/components/ui/TimetableCard';
import { AttendanceModal } from '@/components/ui/AttendanceModal';
import { getTimetableForUser } from '@/data/mockTimetable';

export default function TimetableScreen() {
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timetable = getTimetableForUser('student');

  const handleSessionPress = (session: TimetableSession) => {
    if (session.isActive) {
      setSelectedSession(session);
      setModalVisible(true);
    }
  };

  const getFilteredSessions = () => {
    // For demo purposes, showing all sessions
    // In real app, filter by selected day
    return timetable;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          My Timetable
        </Text>

        <SegmentedButtons
          value={selectedDay}
          onValueChange={setSelectedDay}
          buttons={[
            { value: 'today', label: 'Today' },
            { value: 'tomorrow', label: 'Tomorrow' },
            { value: 'week', label: 'This Week' },
          ]}
          style={styles.daySelector}
        />

        <View style={styles.sessionsContainer}>
          {getFilteredSessions().map((session) => (
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
  daySelector: {
    marginBottom: 24,
  },
  sessionsContainer: {
    flex: 1,
  },
});