import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Modal from 'react-native-modal';

interface Student {
  id: string;
  name: string;
  regNo: string;
  isPresent: boolean | null;
}

export default function AttendancePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Mathew Wadero', regNo: 'IN16/00053/22', isPresent: true },
    { id: '2', name: 'Mathew Wadero Mtumuya', regNo: 'IN16/00053/21', isPresent: false },
    { id: '3', name: 'Walter Bosibori', regNo: 'IN16/00053/12', isPresent: null },
  ]);
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

  const presentCount = students.filter(s => s.isPresent === true).length;
  const totalCount = students.length;

  const handleStudentPress = (student: Student) => {
    setSelectedStudent(student);
    setPendingStatus(student.isPresent);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedStudent && pendingStatus !== null) {
      setStudents(prev => 
        prev.map(s => 
          s.id === selectedStudent.id 
            ? { ...s, isPresent: pendingStatus }
            : s
        )
      );
    }
    setModalVisible(false);
    setSelectedStudent(null);
    setPendingStatus(null);
  };

  const getAttendanceIcon = (isPresent: boolean | null) => {
    if (isPresent === true) return { name: 'check-circle', color: '#4ade80' };
    if (isPresent === false) return { name: 'cancel', color: '#ef4444' };
    return { name: 'radio-button-unchecked', color: '#9ca3af' };
  };

  const getAttendanceText = (isPresent: boolean | null) => {
    if (isPresent === true) return 'Present';
    if (isPresent === false) return 'Absent';
    return 'Not Marked';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.unitName || 'Software Development Life Cycle'}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Class Info Card */}
        <View style={styles.classInfoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class:</Text>
            <Text style={styles.infoValue}>{params.className || 'Software Engineering'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class:</Text>
            <Text style={styles.infoValue}>{params.classYear || 'Year One, Semester One'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Present:</Text>
            <Text style={styles.infoValue}>{presentCount} Out of {totalCount}</Text>
          </View>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Control Attendance</Text>
          </TouchableOpacity>
        </View>

        {/* Students List */}
        <View style={styles.studentsContainer}>
          <Text style={styles.sectionTitle}>Enrolled Students</Text>
          {students.map((student) => {
            const attendanceIcon = getAttendanceIcon(student.isPresent);
            return (
              <TouchableOpacity 
                key={student.id} 
                style={styles.studentCard}
                onPress={() => handleStudentPress(student)}
              >
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentRegNo}>{student.regNo}</Text>
                </View>
                <View style={styles.attendanceStatus}>
                  <MaterialIcons 
                    name={attendanceIcon.name as any} 
                    size={24} 
                    color={attendanceIcon.color} 
                  />
                  <Text style={[styles.statusText, { color: attendanceIcon.color }]}>
                    {getAttendanceText(student.isPresent)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Manual Mark Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor="rgba(0, 0, 0, 0.5)"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Manual Mark</Text>
          
          {selectedStudent && (
            <>
              <View style={styles.modalInfo}>
                <Text style={styles.modalLabel}>Name:</Text>
                <Text style={styles.modalValue}>{selectedStudent.name}</Text>
              </View>
              
              <View style={styles.modalInfo}>
                <Text style={styles.modalLabel}>Reg No:</Text>
                <Text style={styles.modalValue}>{selectedStudent.regNo}</Text>
              </View>
              
              <Text style={styles.markAsLabel}>Mark As</Text>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[
                    styles.statusButton, 
                    pendingStatus === true && styles.activeButton
                  ]}
                  onPress={() => setPendingStatus(true)}
                >
                  <Text style={[
                    styles.statusButtonText,
                    pendingStatus === true && styles.activeButtonText
                  ]}>Present</Text>
                </TouchableOpacity>
                
                <Text style={styles.orText}>Or</Text>
                
                <TouchableOpacity 
                  style={[
                    styles.statusButton, 
                    pendingStatus === false && styles.activeButton
                  ]}
                  onPress={() => setPendingStatus(false)}
                >
                  <Text style={[
                    styles.statusButtonText,
                    pendingStatus === false && styles.activeButtonText
                  ]}>Absent</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f3f4f6',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
    marginRight: 36,
  },
  classInfoCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  controlButton: {
    backgroundColor: '#a78bfa',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  studentsContainer: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  studentCard: {
    backgroundColor: '#a78bfa',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  studentRegNo: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  attendanceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    width: 80,
  },
  modalValue: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  markAsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statusButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#ffffff',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#6366f1',
  },
  orText: {
    color: '#ffffff',
    fontSize: 16,
    marginHorizontal: 16,
  },
  confirmButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});