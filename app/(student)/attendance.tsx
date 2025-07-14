import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

interface AttendanceRecord {
  id: string;
  subject: string;
  lecturer: string;
  time: string;
  status: 'present' | 'absent';
}

const attendanceHistory: AttendanceRecord[] = [
  {
    id: '1',
    subject: 'Software Development Life Cycle',
    lecturer: 'Dr Ronald Tombe',
    time: 'Today, 09:00 am',
    status: 'present',
  },
  {
    id: '2',
    subject: 'Software Development Life Cycle',
    lecturer: 'Dr Ronald Tombe',
    time: 'Yesterday, 09:00 am',
    status: 'absent',
  },
  {
    id: '3',
    subject: 'Software Development Life Cycle',
    lecturer: 'Dr Ronald Tombe',
    time: 'Today, 09:00 am',
    status: 'present',
  },
];

export default function AttendanceScreen() {
  const [isScanning, setIsScanning] = useState(false);

  const handleQuickScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>
        </View>

        {/* Quick Attendance Card */}
        <View style={styles.quickCard}>
          <Text style={styles.quickTitle}>Quick Attendance.</Text>
          <Text style={styles.quickSubtitle}>
            Scan for any nearby active sessions.
          </Text>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={handleQuickScan}
            disabled={isScanning}
          >
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Start Quick Scan'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ongoing Class */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ongoing Class</Text>
        </View>

        <View style={styles.ongoingCard}>
          <Text style={styles.ongoingSubject}>
            Fundamentals of Software Engineering.
          </Text>
          <Text style={styles.ongoingLecturer}>
            Madam Teresa Abuya.
          </Text>
          
          <View style={styles.ongoingDetails}>
            <View style={styles.detailItem}>
              <MaterialIcons name="access-time" size={20} color="#FFFFFF" />
              <Text style={styles.detailText}>11:00 - 13:00</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="location-on" size={20} color="#FFFFFF" />
              <Text style={styles.detailText}>LH 4</Text>
            </View>
          </View>
        </View>

        {/* Attendance History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Attendance history.</Text>
        </View>

        {attendanceHistory.map((record, index) => (
          <View 
            key={record.id} 
            style={[
              styles.historyCard,
              record.status === 'absent' && styles.absentCard
            ]}
          >
            <Text style={[
              styles.historySubject,
              record.status === 'absent' && styles.absentText
            ]}>
              {record.subject}.
            </Text>
            <Text style={[
              styles.historyLecturer,
              record.status === 'absent' && styles.absentText
            ]}>
              {record.lecturer}.
            </Text>
            <Text style={[
              styles.historyTime,
              record.status === 'absent' && styles.absentText
            ]}>
              {record.time}.
            </Text>
            
            <View style={styles.statusContainer}>
              <MaterialIcons 
                name={record.status === 'present' ? 'check-circle' : 'cancel'} 
                size={24} 
                color={record.status === 'present' ? '#4CAF50' : '#F44336'} 
              />
              <Text style={[
                styles.statusText,
                { color: record.status === 'present' ? '#4CAF50' : '#F44336' }
              ]}>
                {record.status === 'present' ? 'Present' : 'Absent'}
              </Text>
            </View>
          </View>
        ))}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quickCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quickSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#A5B4FC',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  ongoingCard: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  ongoingSubject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  ongoingLecturer: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  ongoingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  historyCard: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  absentCard: {
    backgroundColor: '#FF8A80',
  },
  historySubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  historyLecturer: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  absentText: {
    color: '#FFFFFF',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
});