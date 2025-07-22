import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function StudentLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="home" 
              size={focused ? 32 : 24} 
              color={focused ? '#8B7CF6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="check-circle" 
              size={focused ? 32 : 24} 
              color={focused ? '#8B7CF6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="assessment" 
              size={focused ? 32 : 24} 
              color={focused ? '#8B7CF6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="settings" 
              size={focused ? 32 : 24} 
              color={focused ? '#8B7CF6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}