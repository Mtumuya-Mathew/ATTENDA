import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AttendanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Mark Attendance
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Available Sessions
            </Text>
            
            <List.Item
              title="Mathematics 101"
              description="Dr. Smith - Room 204"
              left={(props) => <List.Icon {...props} icon="radio" />}
              right={() => (
                <View style={styles.rightContent}>
                  <Chip mode="flat" compact>5m away</Chip>
                  <Button mode="contained" compact>Mark</Button>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Today's Attendance
            </Text>
            
            <List.Item
              title="Physics 201"
              description="Marked at 11:15 AM"
              left={(props) => <List.Icon {...props} icon="check-circle" />}
              right={() => <Chip mode="outlined">Present</Chip>}
            />
            
            <List.Item
              title="Chemistry 301"
              description="Session at 2:00 PM"
              left={(props) => <List.Icon {...props} icon="clock" />}
              right={() => <Chip mode="outlined">Upcoming</Chip>}
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
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});