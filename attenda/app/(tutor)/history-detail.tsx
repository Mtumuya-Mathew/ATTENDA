import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface AbsentStudent {
  id: string;
  name: string;
  regNo: string;
  absentRate: string;
}

export default function HistoryDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const absentStudents: AbsentStudent[] = [
    { id: '1', name: 'Nickolas June Kiberenge', regNo: 'IN16/00024/22', absentRate: '3%' },
    { id: '2', name: 'Nickolas June Kiberenge', regNo: 'IN16/00024/22', absentRate: '31%' },
    { id: '3', name: 'Nickolas June Kiberenge', regNo: 'IN16/00024/22', absentRate: '13%' },
    { id: '4', name: 'Nickolas Junior Kibere', regNo: 'IN16/00024/23', absentRate: '5%' },
  ];

  const totalStudents = Number(params.present) + Number(params.absent);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.unitName}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {/* Date */}
        <Text style={styles.dateText}>{params.date}</Text>

        {/* Attendance Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Attendance Overview</Text>
          <Text style={styles.overviewText}>
            {params.present} Out of {totalStudents} Students marked Present
          </Text>
        </View>

        {/* Absent Students */}
        <View style={styles.absentSection}>
          <Text style={styles.sectionTitle}>Absent Students</Text>
          {absentStudents.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentRegNo}>{student.regNo}</Text>
                <Text style={styles.absentRate}>{student.absentRate} Absent rate</Text>
              </View>
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
    paddingTop: 20,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 16,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 16,
  },
  overviewCard: {
    backgroundColor: '#a78bfa',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  absentSection: {
    marginBottom: 24,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  studentInfo: {
    alignItems: 'center',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  studentRegNo: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
  },
  absentRate: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
});