import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card, 
  SegmentedButtons,
  Snackbar,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/services/auth/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password, role as 'student' | 'tutor' | 'admin');
      
      switch (role) {
        case 'tutor':
          router.replace('/(tutor)');
          break;
        case 'student':
          router.replace('/(student)');
          break;
        case 'admin':
          router.replace('/(admin)');
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Attenda
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Proximity-based attendance system
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.cardTitle}>
              Sign In
            </Text>

            <SegmentedButtons
              value={role}
              onValueChange={setRole}
              buttons={[
                { value: 'student', label: 'Student' },
                { value: 'tutor', label: 'Tutor' },
                { value: 'admin', label: 'Admin' },
              ]}
              style={styles.roleSelector}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={isLoading}
              style={styles.loginButton}
            >
              {isLoading ? <ActivityIndicator color="white" /> : 'Sign In'}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={4000}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFE',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    color: '#6750A4',
    marginBottom: 8,
  },
  subtitle: {
    color: '#49454F',
    textAlign: 'center',
  },
  card: {
    elevation: 2,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#1C1B1F',
  },
  roleSelector: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
});