import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimetableCard, TimetableSession } from '@/components/ui/TimetableCard';
import { AttendanceModal } from '@/components/ui/AttendanceModal';
import { getTimetableForUser } from '@/data/mockTimetable';

export default function CoursesScreen() {
  const [selectedView, setSelectedView] = useState('schedule');
  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timetable = getTimetableForUser('tutor');

  const handleSessionPress = (session: TimetableSession) => {
    if (session.isActive) {
      setSelectedSession(session);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          My Courses
        </Text>

        <SegmentedButtons
          value={selectedView}
          onValueChange={setSelectedView}
          buttons={[
            { value: 'schedule', label: 'Schedule' },
            { value: 'students', label: 'Students' },
            { value: 'reports', label: 'Reports' },
          ]}
          style={styles.viewSelector}
        />

        {selectedView === 'schedule' && (
          <View style={styles.scheduleContainer}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Class Schedule
            </Text>
            {timetable.map((session) => (
              <TimetableCard
                key={session.id}
                session={session}
                userRole="tutor"
                onSessionPress={handleSessionPress}
              />
            ))}
          </View>
        )}

        {selectedView === 'students' && (
          <View style={styles.studentsContainer}>
            <Text variant="bodyMedium" style={styles.placeholderText}>
              Student management coming soon...
            </Text>
          </View>
        )}

        {selectedView === 'reports' && (
          <View style={styles.reportsContainer}>
            <Text variant="bodyMedium" style={styles.placeholderText}>
              Attendance reports coming soon...
            </Text>
          </View>
        )}
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
  viewSelector: {
    marginBottom: 24,
  },
  scheduleContainer: {
    flex: 1,
  },
  studentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  placeholderText: {
    color: '#666',
    fontStyle: 'italic',
  },
});