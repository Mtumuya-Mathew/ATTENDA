import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../../services/auth';

export default function TabLayout() {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const getTabsForRole = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          {
            name: 'index',
            title: 'Attendance',
            icon: 'qrcode-scan' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'timetable',
            title: 'Timetable',
            icon: 'calendar' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'profile',
            title: 'Profile',
            icon: 'account' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
        ];
      case 'tutor':
        return [
          {
            name: 'index',
            title: 'Sessions',
            icon: 'broadcast' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'courses',
            title: 'Courses',
            icon: 'book-multiple' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'reports',
            title: 'Reports',
            icon: 'chart-line' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'profile',
            title: 'Profile',
            icon: 'account' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
        ];
      case 'admin':
        return [
          {
            name: 'index',
            title: 'Dashboard',
            icon: 'view-dashboard' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'users',
            title: 'Users',
            icon: 'account-group' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'settings',
            title: 'Settings',
            icon: 'cog' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
          {
            name: 'profile',
            title: 'Profile',
            icon: 'account' as keyof typeof MaterialCommunityIcons.glyphMap,
          },
        ];
      default:
        return [];
    }
  };

  const tabs = getTabsForRole();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerShown: false,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}