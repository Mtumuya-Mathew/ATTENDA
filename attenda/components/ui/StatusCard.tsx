import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface StatusCardProps {
  isOnline: boolean;
  status: string;
  lastSync?: string;
}

export function StatusCard({ isOnline, status, lastSync }: StatusCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.statusRow}>
          <MaterialIcons 
            name={isOnline ? "wifi" : "wifi-off"} 
            size={24} 
            color={isOnline ? "#4CAF50" : "#F44336"} 
          />
          <Text variant="bodyLarge">
            {isOnline ? "Online" : "Offline"}
          </Text>
          <Chip mode="outlined" compact>
            {status}
          </Chip>
        </View>
        {lastSync && (
          <Text variant="bodySmall" style={styles.lastSync}>
            Last sync: {new Date(lastSync).toLocaleString()}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#F7F2FA',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lastSync: {
    marginTop: 8,
    color: '#49454F',
  },
});