import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/services/auth/AuthContext';
import { useSync } from '@/services/sync/SyncContext';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { TimetableCard, TimetableSession } from '@/components/ui/TimetableCard';
import { AttendanceModal } from '@/components/ui/AttendanceModal';
import { StatusCard } from '@/components/ui/StatusCard';
import { getTimetableForUser } from '@/data/mockTimetable';

export default function TutorDashboard() {
  const { user } = useAuth();
  const { isOnline, lastSync } = useSync();
  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timetable = getTimetableForUser('tutor');
  const todaysSessions = timetable.filter(session => 
    new Date().toDateString() === new Date().toDateString()
  );

  const stats = {
    totalStudents: 156,
    todayPresent: 24,
    attendanceRate: 89
  };

  const handleSessionPress = (session: TimetableSession) => {
    if (session.isActive) {
      setSelectedSession(session);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineMedium">Welcome, {user?.name}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Manage your classes and attendance
          </Text>
        </View>

        <StatusCard 
          isOnline={isOnline}
          status="Ready"
          lastSync={lastSync}
        />

        <View style={styles.statsGrid}>
          <DashboardCard
            title="Total Students"
            value={stats.totalStudents}
            icon="people"
            color="#6750A4"
          />
          <DashboardCard
            title="Today Present"
            value={stats.todayPresent}
            subtitle="Current session"
            icon="how-to-reg"
            color="#4CAF50"
          />
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Today's Classes
          </Text>
          
          {todaysSessions.length > 0 ? (
            todaysSessions.map((session) => (
              <TimetableCard
                key={session.id}
                session={session}
                userRole="tutor"
                onSessionPress={handleSessionPress}
              />
            ))
          ) : (
            <Text variant="bodyMedium" style={styles.emptyText}>
              No classes scheduled for today
            </Text>
          )}
        </View>
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
  header: {
    marginBottom: 24,
  },
  subtitle: {
    color: '#49454F',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 24,
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