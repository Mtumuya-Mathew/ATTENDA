import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '@/services/auth/AuthContext';
import { DatabaseProvider } from '@/services/database/DatabaseContext';
import { SyncProvider } from '@/services/sync/SyncContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...
import { useFrameworkReady } from '@/hooks/useFrameworkReady'DefaultTheme.colors,
    primary: '#6750A4',
    primaryContainer: '#EADDFF',
    secondary: '#625B71',
    secondaryContainer: '#E8DEF8',
    tertiary: '#7D5260',
    tertiaryContainer: '#FFD8E4',
    surface: '#FFFBFE',
    surfaceVariant: '#E7E0EC',
    background: '#FFFBFE',
    error: '#BA1A1A',
    errorContainer: '#FFDAD6',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#21005D',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1D192B',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#31111D',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    onError: '#FFFFFF',
    onErrorContainer: '#410002',
    onBackground: '#1C1B1F',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: '#D0BCFF',
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <DatabaseProvider>
        <AuthProvider>
          <SyncProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tutor)" />
              <Stack.Screen name="(student)" />
              <Stack.Screen name="(admin)" />
            </Stack>
            <StatusBar style="auto" />
          </SyncProvider>
        </AuthProvider>
      </DatabaseProvider>
    </PaperProvider>
  );
}