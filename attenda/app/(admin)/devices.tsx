import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DevicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Device Management
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Bound Devices
            </Text>
            
            <List.Item
              title="John Doe's Device"
              description="device-123456 • Last seen 5 min ago"
              left={(props) => <List.Icon {...props} icon="smartphone" />}
              right={() => (
                <View style={styles.rightContent}>
                  <Chip mode="flat" compact>Online</Chip>
                  <Button mode="outlined" compact>Unbind</Button>
                </View>
              )}
            />
            
            <List.Item
              title="Jane Smith's Device"
              description="device-789012 • Last seen 2 hours ago"
              left={(props) => <List.Icon {...props} icon="smartphone" />}
              right={() => (
                <View style={styles.rightContent}>
                  <Chip mode="outlined" compact>Offline</Chip>
                  <Button mode="outlined" compact>Unbind</Button>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Pending Bindings
            </Text>
            
            <List.Item
              title="New Student Device"
              description="device-345678 • Waiting for approval"
              left={(props) => <List.Icon {...props} icon="smartphone-off" />}
              right={() => (
                <View style={styles.rightContent}>
                  <Button mode="contained" compact>Approve</Button>
                  <Button mode="outlined" compact>Reject</Button>
                </View>
              )}
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