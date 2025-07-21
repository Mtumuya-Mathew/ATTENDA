import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '@/theme';
import { Header } from '@/components/navigation/Header';
import { TabBar } from '@/components/navigation/TabBar';
import { AttendanceHistoryScreen } from '@/screens/AttendanceHistoryScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('records');

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <View style={styles.placeholder} />;
      case 'attendance':
        return <View style={styles.placeholder} />;
      case 'records':
        return <AttendanceHistoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <View style={styles.placeholder} />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'attendance':
        return 'Attendance';
      case 'records':
        return 'Records';
      case 'settings':
        return 'Settings';
      default:
        return 'Attenda';
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.surface}
      />
      <View style={styles.container}>
        {activeTab !== 'records' && activeTab !== 'settings' && (
          <Header title={getHeaderTitle()} />
        )}
        
        <View style={styles.content}>
          {renderScreen()}
        </View>
        
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});