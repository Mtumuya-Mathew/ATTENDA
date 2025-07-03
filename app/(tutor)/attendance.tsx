import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AttendanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Attendance Sessions
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Active Sessions
            </Text>
            
            <List.Item
              title="Mathematics 101"
              description="Started 15 minutes ago"
              left={(props) => <List.Icon {...props} icon="radio" />}
              right={() => <Chip mode="flat">24 Present</Chip>}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Recent Sessions
            </Text>
            
            <List.Item
              title="Physics 201"
              description="Yesterday, 2:00 PM"
              left={(props) => <List.Icon {...props} icon="history" />}
              right={() => <Chip mode="outlined">30/32</Chip>}
            />
            
            <List.Item
              title="Mathematics 101"
              description="Yesterday, 9:00 AM"
              left={(props) => <List.Icon {...props} icon="history" />}
              right={() => <Chip mode="outlined">42/45</Chip>}
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