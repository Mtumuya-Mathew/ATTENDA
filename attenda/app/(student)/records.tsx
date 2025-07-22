import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

interface AttendanceRecord {
  id: string;
  subject: string;
  lecturer: string;
  time: string;
  status: 'present' | 'absent';
}

const attendanceRecords: AttendanceRecord[] = [
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
    time: 'Today, 15:00 am',
    status: 'present',
  },
  {
    id: '3',
    subject: 'Software Development Life Cycle',
    lecturer: 'Dr Ronald Tombe',
    time: 'Tuesday, 09:00 am',
    status: 'present',
  },
];

export default function RecordsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>History</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons name="menu" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Attendance Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Attendance summary</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.attendanceRate}>Attendance Rate: 86%</Text>
          <Text style={styles.attendanceStats}>
            Present: 24  Absent: 3  Late: 1
          </Text>
          
          <View style={styles.achievementBadge}>
            <Text style={styles.achievementText}>
              3 classes attended in a row!
            </Text>
          </View>
        </View>

        {/* Today Section */}
        <View style={styles.daySection}>
          <Text style={styles.dayTitle}>Today</Text>
        </View>

        {attendanceRecords.slice(0, 2).map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <Text style={styles.recordSubject}>{record.subject}.</Text>
            <Text style={styles.recordLecturer}>{record.lecturer}.</Text>
            <Text style={styles.recordTime}>{record.time}.</Text>
            
            <View style={styles.statusContainer}>
              <MaterialIcons 
                name="check-circle" 
                size={24} 
                color="#4CAF50" 
              />
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>
        ))}

        {/* This Week Section */}
        <View style={styles.daySection}>
          <Text style={styles.dayTitle}>This week</Text>
        </View>

        {attendanceRecords.slice(2).map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <Text style={styles.recordSubject}>{record.subject}.</Text>
            <Text style={styles.recordLecturer}>{record.lecturer}.</Text>
            <Text style={styles.recordTime}>{record.time}.</Text>
            
            <View style={styles.statusContainer}>
              <MaterialIcons 
                name="check-circle" 
                size={24} 
                color="#4CAF50" 
              />
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Menu Modal */}
      <Portal>
        <Modal
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          contentContainerStyle={styles.menuModal}
        >
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Filter records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Export records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Help</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
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
  summarySection: {
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  attendanceRate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  attendanceStats: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  achievementBadge: {
    backgroundColor: '#B8E6B8',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  achievementText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  daySection: {
    marginBottom: 15,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  recordCard: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  recordSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  recordLecturer: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  recordTime: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
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
    color: '#4CAF50',
  },
  menuModal: {
    margin: 20,
    marginTop: 100,
    alignSelf: 'flex-end',
    width: 200,
  },
  menuContent: {
    backgroundColor: '#A5B4FC',
    borderRadius: 15,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});