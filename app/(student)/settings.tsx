import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/services/auth/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [autoMarkAttendance, setAutoMarkAttendance] = useState(true);
  const [bluetoothStatus, setBluetoothStatus] = useState(true);
  const [restrictToClassHours, setRestrictToClassHours] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Account Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account</Text>
        </View>

        <View style={styles.accountCard}>
          <View style={styles.profileContainer}>
            <View style={styles.profileIcon}>
              <MaterialIcons name="person" size={40} color="#FFFFFF" />
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Name: Mathew Wadero</Text>
              <Text style={styles.profileReg}>Reg No: IN16/00053/22</Text>
            </View>
          </View>
          
          <Text style={styles.syncInfo}>
            Last sync: 10 July 2025 at 09:30 AM
          </Text>
          
          <TouchableOpacity style={styles.changePasswordButton}>
            <Text style={styles.changePasswordText}>Change password</Text>
          </TouchableOpacity>
        </View>

        {/* Attendance Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Attendance settings</Text>
        </View>

        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Auto - mark attendance</Text>
            <Switch
              value={autoMarkAttendance}
              onValueChange={setAutoMarkAttendance}
              trackColor={{ false: '#E0E0E0', true: '#FFD54F' }}
              thumbColor={autoMarkAttendance ? '#FFC107' : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Bluetooth status</Text>
            <Switch
              value={bluetoothStatus}
              onValueChange={setBluetoothStatus}
              trackColor={{ false: '#E0E0E0', true: '#FFD54F' }}
              thumbColor={bluetoothStatus ? '#FFC107' : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Restrict to class hours</Text>
            <Switch
              value={restrictToClassHours}
              onValueChange={setRestrictToClassHours}
              trackColor={{ false: '#E0E0E0', true: '#FFD54F' }}
              thumbColor={restrictToClassHours ? '#FFC107' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Privacy and Security */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Privacy and security</Text>
        </View>

        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Auto - sync</Text>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#E0E0E0', true: '#FFD54F' }}
              thumbColor={autoSync ? '#FFC107' : '#FFFFFF'}
            />
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  accountCard: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileReg: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  syncInfo: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  changePasswordButton: {
    backgroundColor: '#B8E6B8',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  settingsCard: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#B8E6B8',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
});