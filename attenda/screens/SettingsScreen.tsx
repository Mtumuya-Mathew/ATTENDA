import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { Card } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProfileCard } from '@/components/ui/ProfileCard';

interface SettingsState {
  notifications: boolean;
  autoSync: boolean;
  biometricAuth: boolean;
  darkMode: boolean;
  offlineMode: boolean;
}

export function SettingsScreen() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    autoSync: true,
    biometricAuth: false,
    darkMode: false,
    offlineMode: true,
  });

  const updateSetting = (key: keyof SettingsState, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // Handle logout logic
          console.log('Logging out...');
        }},
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This will export all your attendance records to a CSV file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => {
          // Handle export logic
          console.log('Exporting data...');
        }},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Handle account deletion
          console.log('Deleting account...');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Settings" />

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <ProfileCard
            name="Dr. Ronald Tombe"
            regNumber="STAFF001"
            email="ronald.tombe@university.edu"
            course="Computer Science Department"
            onPress={() => {
              // Navigate to profile edit screen
              console.log('Edit profile');
            }}
            rightElement={
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            }
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons
                  name="notifications"
                  size={24}
                  color={theme.colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Receive attendance reminders and updates
                  </Text>
                </View>
              </View>
              <Toggle
                value={settings.notifications}
                onValueChange={(value) => updateSetting('notifications', value)}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons
                  name="sync"
                  size={24}
                  color={theme.colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Auto Sync</Text>
                  <Text style={styles.settingDescription}>
                    Automatically sync data when connected
                  </Text>
                </View>
              </View>
              <Toggle
                value={settings.autoSync}
                onValueChange={(value) => updateSetting('autoSync', value)}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons
                  name="fingerprint"
                  size={24}
                  color={theme.colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Biometric Authentication</Text>
                  <Text style={styles.settingDescription}>
                    Use fingerprint or face ID to unlock
                  </Text>
                </View>
              </View>
              <Toggle
                value={settings.biometricAuth}
                onValueChange={(value) => updateSetting('biometricAuth', value)}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons
                  name="dark-mode"
                  size={24}
                  color={theme.colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>
                    Switch to dark theme
                  </Text>
                </View>
              </View>
              <Toggle
                value={settings.darkMode}
                onValueChange={(value) => updateSetting('darkMode', value)}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons
                  name="offline-pin"
                  size={24}
                  color={theme.colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Offline Mode</Text>
                  <Text style={styles.settingDescription}>
                    Allow attendance marking offline
                  </Text>
                </View>
              </View>
              <Toggle
                value={settings.offlineMode}
                onValueChange={(value) => updateSetting('offlineMode', value)}
              />
            </View>
          </Card>
        </View>

        {/* Data & Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <Card>
            <TouchableOpacity style={styles.actionItem} onPress={handleExportData}>
              <MaterialIcons
                name="file-download"
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Export Data</Text>
                <Text style={styles.settingDescription}>
                  Download your attendance records
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <MaterialIcons
                name="privacy-tip"
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Privacy Policy</Text>
                <Text style={styles.settingDescription}>
                  Read our privacy policy
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <MaterialIcons
                name="description"
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Terms of Service</Text>
                <Text style={styles.settingDescription}>
                  Read our terms of service
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card>
            <TouchableOpacity style={styles.actionItem}>
              <MaterialIcons
                name="help"
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Help Center</Text>
                <Text style={styles.settingDescription}>
                  Get help and support
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <MaterialIcons
                name="feedback"
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Send Feedback</Text>
                <Text style={styles.settingDescription}>
                  Help us improve the app
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <MaterialIcons
                name="info"
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>About</Text>
                <Text style={styles.settingDescription}>
                  App version and information
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            icon="logout"
            fullWidth
            style={styles.logoutButton}
          />
          
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            variant="outline"
            icon="delete"
            fullWidth
            style={[styles.logoutButton, styles.deleteButton]}
            textStyle={styles.deleteButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[6],
  },
  section: {
    marginBottom: theme.spacing[6],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing[3],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: theme.spacing[3],
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing[1],
  },
  settingDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  logoutButton: {
    marginBottom: theme.spacing[3],
  },
  deleteButton: {
    borderColor: theme.colors.error,
  },
  deleteButtonText: {
    color: theme.colors.error,
  },
});