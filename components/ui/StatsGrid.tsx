import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface StatItem {
  value: string | number;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <View style={styles.grid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <Text variant="headlineSmall">{stat.value}</Text>
          <Text variant="bodyMedium">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
});