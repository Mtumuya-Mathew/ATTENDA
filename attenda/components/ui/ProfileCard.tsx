import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { Card } from './Card';

interface ProfileCardProps {
  name: string;
  regNumber: string;
  email?: string;
  course?: string;
  year?: string;
  semester?: string;
  avatar?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export function ProfileCard({
  name,
  regNumber,
  email,
  course,
  year,
  semester,
  onPress,
  rightElement,
}: ProfileCardProps) {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Card style={styles.card}>
      <CardComponent onPress={onPress} style={styles.container}>
        <View style={styles.avatar}>
          <MaterialIcons
            name="person"
            size={32}
            color={theme.colors.white}
          />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.regNumber}>{regNumber}</Text>
          
          {email && <Text style={styles.email}>{email}</Text>}
          
          {course && (
            <Text style={styles.course}>
              {course}
              {year && semester && ` • ${year}, ${semester}`}
            </Text>
          )}
        </View>
        
        {rightElement && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </CardComponent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[3],
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing[1],
  },
  regNumber: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing[1],
  },
  email: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing[1],
  },
  course: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  rightElement: {
    marginLeft: theme.spacing[3],
  },
});