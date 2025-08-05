import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/services/auth/AuthContext';

interface TimetableItem {
  id: string;
  time: string;
  subject: string;
  code: string;
  lecturer: string;
  venue: string;
  isActive?: boolean;
}

const timetableData: TimetableItem[] = [
  {
    id: '1',
    time: '9:00 - 11:00',
    subject: 'COMP 105',
    code: 'COMP 105',
    lecturer: '',
    venue: '',
  },
  {
    id: '2',
    time: '11:00 - 13:00',
    subject: 'SOEN 102',
    code: 'SOEN 102',
    lecturer: '',
    venue: '',
  },
  {
    id: '3',
    time: '11:00 - 13:00',
    subject: 'SOEN 105',
    code: 'SOEN 105',
    lecturer: 'Madam Teresa Abuya',
    venue: 'LH 4',
    isActive: true,
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState<TimetableItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSessionPress = (session: TimetableItem) => {
    if (session.isActive) {
      setSelectedSession(session);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSession(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Attenda</Text>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome back, {user?.role || user?.name || "Student"}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>75%</Text>
              <Text style={styles.statLabel}>This week's average</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>05%</Text>
              <Text style={styles.statLabel}>This week's improvement</Text>
            </View>
          </View>
          
          <Text style={styles.syncText}>Last synced 08/07/2024 12:03 pm</Text>
        </View>

        {/* Timetable Grid */}
        <View style={styles.timetableContainer}>
          <View style={styles.timetableGrid}>
            {/* Time slots */}
            <View style={styles.timeColumn}>
              <View style={styles.timeSlot}>
                <Text style={styles.timeText}>9:00 - 11:00</Text>
              </View>
              <View style={styles.timeSlot}>
                <Text style={styles.timeText}>11:00 - 13:00</Text>
              </View>
            </View>

            {/* Subject columns */}
            <View style={styles.subjectsContainer}>
              <View style={styles.subjectRow}>
                <TouchableOpacity style={styles.subjectCell}>
                  <Text style={styles.subjectCode}>COMP 105</Text>
                  <Text style={styles.tapText}>Tap to view</Text>
                </TouchableOpacity>
                <View style={styles.emptyCell} />
              </View>
              
              <View style={styles.subjectRow}>
                <TouchableOpacity style={styles.subjectCell}>
                  <Text style={styles.subjectCode}>SOEN 102</Text>
                  <Text style={styles.tapText}>Tap to view</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.subjectCell, styles.activeCell]}
                  onPress={() => handleSessionPress(timetableData[2])}
                >
                  <Text style={[styles.subjectCode, styles.activeText]}>SOEN 105</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Name: Fundamentals of Software Engineering.
            </Text>
            <Text style={styles.modalSubtitle}>
              Unit code: SOEN 105.
            </Text>
            <Text style={styles.modalSubtitle}>
              Lecturer's Name: Madam Teresa Abuya.
            </Text>
            <Text style={styles.modalVenue}>
              Lecture Venue: LH 4.
            </Text>
            <Text style={styles.modalTime}>
              Lecture Time: 11:00 am.
            </Text>
            
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeCard: {
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
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  syncText: {
    fontSize: 12,
    color: '#999',
  },
  timetableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timetableGrid: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 100,
  },
  timeSlot: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  subjectsContainer: {
    flex: 1,
  },
  subjectRow: {
    flexDirection: 'row',
    height: 80,
  },
  subjectCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
    margin: 1,
  },
  emptyCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    margin: 1,
  },
  activeCell: {
    backgroundColor: '#A5B4FC',
  },
  subjectCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activeText: {
    color: '#FFFFFF',
  },
  tapText: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    margin: 20,
  },
  modalContent: {
    backgroundColor: '#A5B4FC',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalVenue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 8,
  },
  modalTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: '#8B7CF6',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});