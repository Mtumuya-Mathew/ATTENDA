import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip, FAB, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          User Management
        </Text>

        <Searchbar
          placeholder="Search users..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Students
            </Text>
            
            <List.Item
              title="John Doe"
              description="john.doe@student.edu"
              left={(props) => <List.Icon {...props} icon="account" />}
              right={() => <Chip mode="outlined">Active</Chip>}
            />
            
            <List.Item
              title="Jane Smith"
              description="jane.smith@student.edu"
              left={(props) => <List.Icon {...props} icon="account" />}
              right={() => <Chip mode="outlined">Active</Chip>}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Tutors
            </Text>
            
            <List.Item
              title="Dr. Smith"
              description="dr.smith@university.edu"
              left={(props) => <List.Icon {...props} icon="school" />}
              right={() => <Chip mode="outlined">Active</Chip>}
            />
            
            <List.Item
              title="Prof. Johnson"
              description="prof.johnson@university.edu"
              left={(props) => <List.Icon {...props} icon="school" />}
              right={() => <Chip mode="outlined">Active</Chip>}
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
  searchbar: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});