import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsGrid } from '@/components/ui/StatsGrid';

export default function AnalyticsScreen() {
  const [period, setPeriod] = React.useState('week');

  const overallStats = [
    { value: '89%', label: 'Avg Rate' },
    { value: '1,247', label: 'Students' },
    { value: '89', label: 'Tutors' },
  ];

  const weeklyStats = [
    { value: '156', label: 'Sessions' },
    { value: '2,340', label: 'Attendances' },
    { value: '92%', label: 'Rate' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Analytics
        </Text>

        <SegmentedButtons
          value={period}
          onValueChange={setPeriod}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'semester', label: 'Semester' },
          ]}
          style={styles.periodSelector}
        />

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Overall Statistics
            </Text>
            <StatsGrid stats={overallStats} />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              This Week
            </Text>
            <StatsGrid stats={weeklyStats} />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Trends
            </Text>
            <Text variant="bodyMedium">
              Attendance rates have improved by 5% compared to last week.
              Most active day: Wednesday with 95% attendance rate.
            </Text>
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
  title: {
    marginBottom: 24,
  },
  periodSelector: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
});