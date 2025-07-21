import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  shadow?: boolean;
}

export function Card({ children, style, padding = 4, shadow = true }: CardProps) {
  const cardStyles = [
    styles.base,
    shadow && theme.shadows.base,
    { padding: theme.spacing[padding] },
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing[2],
  },
});