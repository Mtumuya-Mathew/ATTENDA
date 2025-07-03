import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TimetableScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          My Timetable
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Today - Monday
            </Text>
            
            <List.Item
              title="Mathematics 101"
              description="9:00 AM - 10:30 AM • Room 204"
              left={(props) => <List.Icon {...props} icon="calculate" />}
              right={() => <Chip mode="flat">Attended</Chip>}
            />
            
            <List.Item
              title="Physics 201"
              description="11:00 AM - 12:30 PM • Room 301"
              left={(props) => <List.Icon {...props} icon="science" />}
              right={() => <Chip mode="outlined">Attended</Chip>}
            />
            
            <List.Item
              title="Chemistry 301"
              description="2:00 PM - 3:30 PM • Lab 101"
              left={(props) => <List.Icon {...props} icon="biotech" />}
              right={() => <Chip mode="outlined">Upcoming</Chip>}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Tomorrow - Tuesday
            </Text>
            
            <List.Item
              title="English Literature"
              description="10:00 AM - 11:30 AM • Room 105"
              left={(props) => <List.Icon {...props} icon="book" />}
            />
            
            <List.Item
              title="Computer Science"
              description="1:00 PM - 2:30 PM • Lab 201"
              left={(props) => <List.Icon {...props} icon="computer" />}
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