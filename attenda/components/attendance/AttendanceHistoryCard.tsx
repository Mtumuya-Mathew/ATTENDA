import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { Card } from '@/components/ui/Card';
import { AttendanceSession } from '@/types/attendance';

interface AttendanceHistoryCardProps {
  session: AttendanceSession;
}

export function AttendanceHistoryCard({ session }: AttendanceHistoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(session.date)}</Text>
      </View>
      
      <View style={styles.courseCard}>
        <Text style={styles.courseName}>{session.courseName}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Present</Text>
            <Text style={styles.statValue}>{session.presentCount}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Absent</Text>
            <Text style={styles.statValue}>{session.absentCount}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Late</Text>
            <Text style={styles.statValue}>{session.lateCount}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginVertical: theme.spacing[2],
  },
  header: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[2],
  },
  date: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  courseCard: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    margin: theme.spacing[4],
    marginTop: 0,
  },
  courseName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing[4],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
    marginBottom: theme.spacing[1],
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.white,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.white,
    opacity: 0.3,
  },
});