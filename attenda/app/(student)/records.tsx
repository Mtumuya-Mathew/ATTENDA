import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsGrid } from '@/components/ui/StatsGrid';

export default function RecordsScreen() {
  const stats = [
    { value: '42', label: 'Present' },
    { value: '8', label: 'Absent' },
    { value: '84%', label: 'Rate' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Attendance Records
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
              Recent Records
            </Text>
            
            <List.Item
              title="Mathematics 101"
              description="Today, 9:15 AM"
              left={(props) => <List.Icon {...props} icon="check-circle" />}
              right={() => <Chip mode="flat">Present</Chip>}
            />
            
            <List.Item
              title="Physics 201"
              description="Today, 11:10 AM"
              left={(props) => <List.Icon {...props} icon="check-circle" />}
              right={() => <Chip mode="flat">Present</Chip>}
            />
            
            <List.Item
              title="Chemistry 301"
              description="Yesterday, 2:00 PM"
              left={(props) => <List.Icon {...props} icon="close-circle" />}
              right={() => <Chip mode="outlined">Absent</Chip>}
            />
          </Card.Content>
        </Card>

        <Button
          mode="outlined"
          style={styles.exportButton}
        >
          Export Records
        </Button>
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
  exportButton: {
    marginTop: 16,
  },
});