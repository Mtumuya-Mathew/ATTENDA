import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Modal from 'react-native-modal';

interface HistoryRecord {
  id: string;
  date: string;
  unitName: string;
  present: number;
  absent: number;
  late: number;
}

export default function RecordsPage() {
  const router = useRouter();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const historyRecords: HistoryRecord[] = [
    {
      id: '1',
      date: '21/07/2025',
      unitName: 'Fundamental of Software Development',
      present: 47,
      absent: 8,
      late: 0,
    },
    {
      id: '2',
      date: '20/07/2025',
      unitName: 'Fundamental of Software Development',
      present: 49,
      absent: 7,
      late: 0,
    },
    {
      id: '3',
      date: '19/07/2025',
      unitName: 'Introduction to Machine Learning Algo.',
      present: 47,
      absent: 8,
      late: 0,
    },
  ];

  const handleRecordPress = (record: HistoryRecord) => {
    router.push({
      pathname: '/history-detail',
      params: {
        unitName: record.unitName,
        date: record.date,
        present: record.present,
        absent: record.absent,
        late: record.late,
      }
    });
  };

  const menuOptions = [
    { icon: 'filter-list', label: 'Filter' },
    { icon: 'search', label: 'Search Records' },
    { icon: 'file-download', label: 'Export Records' },
    { icon: 'help', label: 'Help' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <MaterialIcons name="menu" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {historyRecords.map((record) => (
          <View key={record.id} style={styles.recordContainer}>
            <Text style={styles.dateText}>{record.date}</Text>
            <TouchableOpacity 
              style={styles.recordCard}
              onPress={() => handleRecordPress(record)}
            >
              <Text style={styles.unitName}>{record.unitName}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Present</Text>
                  <Text style={styles.statValue}>{record.present}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Absent</Text>
                  <Text style={styles.statValue}>{record.absent}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Late</Text>
                  <Text style={styles.statValue}>{record.late}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Menu Modal */}
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => setMenuVisible(false)}
        backdropColor="rgba(0, 0, 0, 0.5)"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.modal}
      >
        <View style={styles.menuContent}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Options</Text>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <MaterialIcons name="close" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>
          {menuOptions.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                // Handle menu option selection here
              }}
            >
              <MaterialIcons name={option.icon as any} size={24} color="#6366f1" />
              <Text style={styles.menuOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recordContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  recordCard: {
    backgroundColor: '#a78bfa',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  unitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 0,
  },
  menuContent: {
    backgroundColor: '#ffffff',
    width: 250,
    height: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuOptionText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 16,
  },
});