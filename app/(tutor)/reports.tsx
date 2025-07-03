import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsGrid } from '@/components/ui/StatsGrid';

export default function ReportsScreen() {
  const stats = [
    { value: '89%', label: 'Avg Rate' },
    { value: '156', label: 'Sessions' },
    { value: '45', label: 'Students' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Reports & Analytics
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Overview
            </Text>
            <StatsGrid stats={stats} />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Export Reports
            </Text>
            
            <List.Item
              title="Attendance Summary"
              description="Overall attendance statistics"
              left={(props) => <List.Icon {...props} icon="file-chart" />}
              right={() => <Button mode="outlined" compact>Export</Button>}
            />
            
            <List.Item
              title="Per-Student Report"
              description="Individual student records"
              left={(props) => <List.Icon {...props} icon="account-details" />}
              right={() => <Button mode="outlined" compact>Export</Button>}
            />
            
            <List.Item
              title="Absent Students"
              description="Students with low attendance"
              left={(props) => <List.Icon {...props} icon="account-alert" />}
              right={() => <Button mode="outlined" compact>Export</Button>}
            />
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
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
});