import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, FAB, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoursesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          My Courses
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Mathematics 101"
              description="Calculus and Linear Algebra"
              left={(props) => <List.Icon {...props} icon="calculator" />}
              right={() => <Chip mode="outlined">45 Students</Chip>}
            />
            
            <List.Item
              title="Physics 201"
              description="Quantum Mechanics"
              left={(props) => <List.Icon {...props} icon="atom-variant" />}
              right={() => <Chip mode="outlined">32 Students</Chip>}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
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
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});