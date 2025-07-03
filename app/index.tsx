import { useEffect } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAuth } from '@/services/auth/AuthContext';

export default function Index() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Navigate to role-specific screen
        switch (user.role) {
          case 'tutor':
            router.replace('/(tutor)');
            break;
          case 'student':
            router.replace('/(student)');
            break;
          case 'admin':
            router.replace('/(admin)');
            break;
          default:
            router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [user, isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>Loading Attenda...</Text>
    </View>
  );
}