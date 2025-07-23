import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useBLE } from "@/services/ble/BLEContext";
import { useRouter } from "expo-router";


export default function AttendanceScreen() {
  const { startAdvertising, stopAdvertising, isScanning, nearbyTutors } = useBLE();
  const router = useRouter();

  const handleQuickScan = async () => {
    if (!isScanning) {
      await startAdvertising();
      setTimeout(() => {
        stopAdvertising();
      }, 30000);
    }
  };

  const handleStartSession = (sessionData: any) => {
    handleQuickScan();
    // Navigate to the attendance page with session data  
    router.push({
      pathname: '/attendance',
      params: {
        unitName: sessionData.unitName,
        unitCode: sessionData.unitCode,
        className: sessionData.className,
        classYear: sessionData.classYear,
      }
    });
  };

  const currentSession = {
    unitName: 'Software Development Life Cycle',
    unitCode: 'SOEN 105',
    time: '09:00 am',
    venue: 'LH 4',
    className: 'Software Engineering',
    classYear: 'Year One, Semester One'
  };

  const upcomingSessions = [
    {
      unitName: 'Machine Learning Algorithms',
      unitCode: 'SOEN 325',
      time: '11:00 am',
      venue: 'LH 4'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Attenda</Text>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome back, Dr. Ronald Tombe</Text>
          <Text style={styles.classCountText}>You have 3 classes today.</Text>
        </View>

        {/* Current Session */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Current session</Text>
          <View style={styles.currentSessionCard}>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionLabel}>Unit Name:</Text>
              <Text style={styles.sessionValue}>{currentSession.unitName}</Text>
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionLabel}>Unit Code:</Text>
              <Text style={styles.sessionValue}>{currentSession.unitCode}</Text>
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionLabel}>Time & Venue:</Text>
              <Text style={styles.sessionValue}>{currentSession.time}, {currentSession.venue}</Text>
            </View>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => handleStartSession(currentSession)}
            >
              <Text style={styles.startButtonText}>Start Session</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Sessions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming sessions</Text>
          {upcomingSessions.map((session, index) => (
            <View key={index} style={styles.upcomingSessionCard}>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionLabel}>Unit Name:</Text>
                <Text style={styles.sessionValue}>{session.unitName}</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionLabel}>Unit Code:</Text>
                <Text style={styles.sessionValue}>{session.unitCode}</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionLabel}>Time & Venue:</Text>
                <Text style={styles.sessionValue}>{session.time}, {session.venue}</Text>
              </View>
              <TouchableOpacity style={styles.upcomingStartButton}>
                <Text style={styles.startButtonText}>Start Session</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  classCountText: {
    fontSize: 16,
    color: '#6b7280',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  currentSessionCard: {
    backgroundColor: '#4ade80',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  upcomingSessionCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sessionInfo: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    width: 120,
    flexShrink: 0,
  },
  sessionValue: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
    fontWeight: '400',
  },
  startButton: {
    backgroundColor: '#a78bfa',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  upcomingStartButton: {
    backgroundColor: '#a78bfa',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});