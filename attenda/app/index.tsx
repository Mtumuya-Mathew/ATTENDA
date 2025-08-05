import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '@/services/auth/AuthContext';

export default function Index() {
  const { user, isLoading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        // First launch ever
        await AsyncStorage.setItem('hasLaunched', 'true');
        router.replace('/onboarding');
      } else {
        setCheckingOnboarding(false);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (!isLoading && !checkingOnboarding) {
      if (user) {
        switch (user.role) {
          case 'Tutor':
            router.replace('/(tutor)');
            break;
          case 'Student':
            router.replace('/(student)');
            break;
          case 'Admin':
            router.replace('/(admin)');
            break;
          default:
            router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [user, isLoading, checkingOnboarding]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>Loading Attenda...</Text>
    </View>
  );
}
