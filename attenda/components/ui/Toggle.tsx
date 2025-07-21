import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { theme } from '@/theme';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  size = 'md',
  style,
}: ToggleProps) {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const trackWidth = size === 'sm' ? 40 : size === 'lg' ? 60 : 50;
  const trackHeight = size === 'sm' ? 20 : size === 'lg' ? 30 : 25;
  const thumbSize = size === 'sm' ? 16 : size === 'lg' ? 26 : 21;

  const trackStyle = [
    styles.track,
    {
      width: trackWidth,
      height: trackHeight,
      backgroundColor: value ? theme.colors.primary : theme.colors.gray300,
    },
    disabled && styles.disabled,
  ];

  const thumbStyle = [
    styles.thumb,
    {
      width: thumbSize,
      height: thumbSize,
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [2, trackWidth - thumbSize - 2],
          }),
        },
      ],
    },
  ];

  return (
    <TouchableOpacity
      style={[trackStyle, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Animated.View style={thumbStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});