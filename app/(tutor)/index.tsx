@@ .. @@
 import React, { useState } from 'react';
 import { View, StyleSheet, ScrollView } from 'react-native';
-import { Text } from 'react-native-paper';
+import { Text, Modal, Portal } from 'react-native-paper';
 import { SafeAreaView } from 'react-native-safe-area-context';
+import { MaterialIcons } from '@expo/vector-icons';
 import { useAuth } from '@/services/auth/AuthContext';
-import { useSync } from '@/services/sync/SyncContext';
-import { DashboardCard } from '@/components/ui/DashboardCard';
-import { TimetableCard, TimetableSession } from '@/components/ui/TimetableCard';
-import { AttendanceModal } from '@/components/ui/AttendanceModal';
-import { StatusCard } from '@/components/ui/StatusCard';
-import { getTimetableForUser } from '@/data/mockTimetable';
+
+interface TimetableItem {
+  id: string;
+  time: string;
+  subject: string;
+  code: string;
+  lecturer: string;
+  venue: string;
+  isActive?: boolean;
+}
+
+const timetableData: TimetableItem[] = [
+  {
+    id: '1',
+    time: '9:00 - 11:00',
+    subject: 'Mathematics 101',
+    code: 'MATH 101',
+    lecturer: 'Dr. Smith',
+    venue: 'Room 204',
+    isActive: true,
+  },
+  {
+    id: '2',
+    time: '11:00 - 13:00',
+    subject: 'Advanced Calculus',
+    code: 'MATH 201',
+    lecturer: 'Dr. Smith',
+    venue: 'Room 205',
+  },
+  {
+    id: '3',
+    time: '14:00 - 16:00',
+    subject: 'Statistics',
+    code: 'MATH 301',
+    lecturer: 'Dr. Smith',
+    venue: 'Room 206',
+  },
+];
 
 export default function TutorDashboard() {
   const { user } = useAuth();
-  const { isOnline, lastSync } = useSync();
-  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
+  const [selectedSession, setSelectedSession] = useState<TimetableItem | null>(null);
   const [modalVisible, setModalVisible] = useState(false);
 
-  const timetable = getTimetableForUser('tutor');
-  const todaysSessions = timetable.filter(session => 
-    new Date().toDateString() === new Date().toDateString()
-  );
-
-  const stats = {
-    totalStudents: 156,
-    todayPresent: 24,
-    attendanceRate: 89
-  };
-
-  const handleSessionPress = (session: TimetableSession) => {
+  const handleSessionPress = (session: TimetableItem) => {
     if (session.isActive) {
       setSelectedSession(session);
       setModalVisible(true);
     }
   };
 
+  const closeModal = () => {
+    setModalVisible(false);
+    setSelectedSession(null);
+  };
+
   return (
     <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.content}>
+        {/* Header */}
         <View style={styles.header}>
-          <Text variant="headlineMedium">Welcome, {user?.name}</Text>
-          <Text variant="bodyMedium" style={styles.subtitle}>
-            Manage your classes and attendance
-          </Text>
+          <Text style={styles.appTitle}>Attenda</Text>
         </View>
 
-        <StatusCard 
-          isOnline={isOnline}
-          status="Ready"
-          lastSync={lastSync}
-        />
+        {/* Welcome Card */}
+        <View style={styles.welcomeCard}>
+          <Text style={styles.welcomeText}>Welcome back, {user?.name || 'Dr. Smith'}</Text>
+          
+          <View style={styles.statsContainer}>
+            <View style={styles.statItem}>
+              <Text style={styles.statValue}>156</Text>
+              <Text style={styles.statLabel}>Total Students</Text>
+            </View>
+            
+            <View style={styles.divider} />
+            
+            <View style={styles.statItem}>
+              <Text style={styles.statValue}>89%</Text>
+              <Text style={styles.statLabel}>Attendance Rate</Text>
+            </View>
+          </View>
+          
+          <Text style={styles.syncText}>Last synced 08/07/2024 12:03 pm</Text>
+        </View>
 
-        <View style={styles.statsGrid}>
-          <DashboardCard
-            title="Total Students"
-            value={stats.totalStudents}
-            icon="people"
-            color="#6750A4"
-          />
-          <DashboardCard
-            title="Today Present"
-            value={stats.todayPresent}
-            subtitle="Current session"
-            icon="how-to-reg"
-            color="#4CAF50"
-          />
+        {/* Timetable Grid */}
+        <View style={styles.timetableContainer}>
+          <View style={styles.timetableGrid}>
+            {/* Time slots */}
+            <View style={styles.timeColumn}>
+              <View style={styles.timeSlot}>
+                <Text style={styles.timeText}>9:00 - 11:00</Text>
+              </View>
+              <View style={styles.timeSlot}>
+                <Text style={styles.timeText}>11:00 - 13:00</Text>
+              </View>
+              <View style={styles.timeSlot}>
+                <Text style={styles.timeText}>14:00 - 16:00</Text>
+              </View>
+            </View>
+
+            {/* Subject columns */}
+            <View style={styles.subjectsContainer}>
+              <View style={styles.subjectRow}>
+                <TouchableOpacity 
+                  style={[styles.subjectCell, styles.activeCell]}
+                  onPress={() => handleSessionPress(timetableData[0])}
+                >
+                  <Text style={[styles.subjectCode, styles.activeText]}>MATH 101</Text>
+                </TouchableOpacity>
+              </View>
+              
+              <View style={styles.subjectRow}>
+                <TouchableOpacity style={styles.subjectCell}>
+                  <Text style={styles.subjectCode}>MATH 201</Text>
+                  <Text style={styles.tapText}>Tap to view</Text>
+                </TouchableOpacity>
+              </View>
+              
+              <View style={styles.subjectRow}>
+                <TouchableOpacity style={styles.subjectCell}>
+                  <Text style={styles.subjectCode}>MATH 301</Text>
+                  <Text style={styles.tapText}>Tap to view</Text>
+                </TouchableOpacity>
+              </View>
+            </View>
+          </View>
         </View>
+      </ScrollView>
 
-        <View style={styles.section}>
-          <Text variant="titleLarge" style={styles.sectionTitle}>
-            Today's Classes
-          </Text>
-          
-          {todaysSessions.length > 0 ? (
-            todaysSessions.map((session) => (
-              <TimetableCard
-                key={session.id}
-                session={session}
-                userRole="tutor"
-                onSessionPress={handleSessionPress}
-              />
-            ))
-          ) : (
-            <Text variant="bodyMedium" style={styles.emptyText}>
-              No classes scheduled for today
+      {/* Modal */}
+      <Portal>
+        <Modal
+          visible={modalVisible}
+          onDismiss={closeModal}
+          contentContainerStyle={styles.modalContainer}
+        >
+          <View style={styles.modalContent}>
+            <Text style={styles.modalTitle}>
+              Name: {selectedSession?.subject}.
+            </Text>
+            <Text style={styles.modalSubtitle}>
+              Unit code: {selectedSession?.code}.
+            </Text>
+            <Text style={styles.modalSubtitle}>
+              Lecturer's Name: {selectedSession?.lecturer}.
+            </Text>
+            <Text style={styles.modalVenue}>
+              Lecture Venue: {selectedSession?.venue}.
+            </Text>
+            <Text style={styles.modalTime}>
+              Lecture Time: {selectedSession?.time}.
             </Text>
-          )}
-        </View>
-      </ScrollView>
-
-      <AttendanceModal
-        visible={modalVisible}
-        session={selectedSession}
-        userRole="tutor"
-        onDismiss={() => setModalVisible(false)}
-      />
+            
+            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
+              <Text style={styles.closeButtonText}>CLOSE</Text>
+            </TouchableOpacity>
+          </View>
+        </Modal>
+      </Portal>
     </SafeAreaView>
   );
 }
@@ .. @@
 const styles = StyleSheet.create({
   container: {
     flex: 1,
-    backgroundColor: '#FFFBFE',
+    backgroundColor: '#E5E5E5',
   },
   content: {
-    padding: 16,
+    padding: 20,
   },
   header: {
-    marginBottom: 24,
+    alignItems: 'center',
+    marginBottom: 20,
+  },
+  appTitle: {
+    fontSize: 24,
+    fontWeight: 'bold',
+    color: '#333',
+  },
+  welcomeCard: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 20,
+    padding: 20,
+    marginBottom: 20,
+    elevation: 2,
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 2 },
+    shadowOpacity: 0.1,
+    shadowRadius: 4,
+  },
+  welcomeText: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#333',
+    marginBottom: 20,
+  },
+  statsContainer: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    marginBottom: 15,
+  },
+  statItem: {
+    flex: 1,
+    alignItems: 'center',
+  },
+  statValue: {
+    fontSize: 36,
+    fontWeight: 'bold',
+    color: '#333',
+    marginBottom: 5,
+  },
+  statLabel: {
+    fontSize: 14,
+    color: '#666',
+    textAlign: 'center',
+  },
+  divider: {
+    width: 1,
+    height: 60,
+    backgroundColor: '#E0E0E0',
+    marginHorizontal: 20,
+  },
+  syncText: {
+    fontSize: 12,
+    color: '#999',
+  },
+  timetableContainer: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 20,
+    padding: 15,
+    elevation: 2,
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 2 },
+    shadowOpacity: 0.1,
+    shadowRadius: 4,
+  },
+  timetableGrid: {
+    flexDirection: 'row',
+  },
+  timeColumn: {
+    width: 100,
+  },
+  timeSlot: {
+    height: 80,
+    justifyContent: 'center',
+    alignItems: 'center',
+    borderBottomWidth: 1,
+    borderBottomColor: '#E0E0E0',
+  },
+  timeText: {
+    fontSize: 14,
+    color: '#666',
+    textAlign: 'center',
+  },
+  subjectsContainer: {
+    flex: 1,
+  },
+  subjectRow: {
+    flexDirection: 'row',
+    height: 80,
+  },
+  subjectCell: {
+    flex: 1,
+    justifyContent: 'center',
+    alignItems: 'center',
+    borderWidth: 1,
+    borderColor: '#E0E0E0',
+    backgroundColor: '#F8F8F8',
+    margin: 1,
+  },
+  activeCell: {
+    backgroundColor: '#A5B4FC',
+  },
+  subjectCode: {
+    fontSize: 16,
+    fontWeight: '600',
+    color: '#333',
+    marginBottom: 4,
+  },
+  activeText: {
+    color: '#FFFFFF',
+  },
+  tapText: {
+    fontSize: 12,
+    color: '#666',
+  },
+  modalContainer: {
+    margin: 20,
+  },
+  modalContent: {
+    backgroundColor: '#A5B4FC',
+    borderRadius: 20,
+    padding: 30,
+    alignItems: 'center',
+  },
+  modalTitle: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#FFFFFF',
+    textAlign: 'center',
+    marginBottom: 10,
+  },
+  modalSubtitle: {
+    fontSize: 16,
+    color: '#FFFFFF',
+    textAlign: 'center',
+    marginBottom: 8,
+  },
+  modalVenue: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#FFFFFF',
+    textAlign: 'center',
+    marginTop: 15,
+    marginBottom: 8,
+  },
+  modalTime: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#FFFFFF',
+    textAlign: 'center',
+    marginBottom: 30,
+  },
+  closeButton: {
+    backgroundColor: '#8B7CF6',
+    paddingHorizontal: 40,
+    paddingVertical: 15,
+    borderRadius: 25,
+  },
+  closeButtonText: {
+    color: '#FFFFFF',
+    fontSize: 16,
+    fontWeight: '600',
   },
-  subtitle: {
-    color: '#49454F',
-    marginTop: 4,
-  },
-  statsGrid: {
-    flexDirection: 'row',
-    marginBottom: 24,
-  },
-  section: {
-    marginBottom: 24,
-  },
-  sectionTitle: {
-    marginBottom: 16,
-    fontWeight: '600',
-  },
-  emptyText: {
-    textAlign: 'center',
-    color: '#666',
-    fontStyle: 'italic',
-    paddingVertical: 20,
-  },
 });