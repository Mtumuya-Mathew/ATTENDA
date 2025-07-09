import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color?: string;
  onPress?: () => void;
}

export function DashboardCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = '#6750A4',
  onPress 
}: DashboardCardProps) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <MaterialIcons name={icon as any} size={24} color={color} />
          </View>
        </View>
        
        <Text variant="headlineMedium" style={styles.value}>
          {value}
        </Text>
        
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        
        {subtitle && (
          <Text variant="bodySmall" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    elevation: 2,
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
  },
});