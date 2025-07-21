import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';

interface AttendanceStatusBadgeProps {
  status: 'present' | 'absent' | 'late';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showText?: boolean;
}

export function AttendanceStatusBadge({
  status,
  size = 'md',
  showIcon = true,
  showText = true,
}: AttendanceStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'present':
        return {
          color: theme.colors.present,
          backgroundColor: `${theme.colors.present}20`,
          icon: 'check-circle' as const,
          text: 'Present',
        };
      case 'absent':
        return {
          color: theme.colors.absent,
          backgroundColor: `${theme.colors.absent}20`,
          icon: 'cancel' as const,
          text: 'Absent',
        };
      case 'late':
        return {
          color: theme.colors.late,
          backgroundColor: `${theme.colors.late}20`,
          icon: 'schedule' as const,
          text: 'Late',
        };
    }
  };

  const config = getStatusConfig();
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const fontSize = size === 'sm' ? theme.typography.fontSize.xs : 
                   size === 'lg' ? theme.typography.fontSize.base : 
                   theme.typography.fontSize.sm;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          paddingHorizontal: size === 'sm' ? theme.spacing[2] : theme.spacing[3],
          paddingVertical: size === 'sm' ? theme.spacing[1] : theme.spacing[2],
        },
      ]}
    >
      {showIcon && (
        <MaterialIcons
          name={config.icon}
          size={iconSize}
          color={config.color}
          style={showText ? styles.icon : undefined}
        />
      )}
      {showText && (
        <Text
          style={[
            styles.text,
            {
              color: config.color,
              fontSize,
            },
          ]}
        >
          {config.text}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: theme.spacing[1],
  },
  text: {
    fontWeight: theme.typography.fontWeight.medium,
  },
});