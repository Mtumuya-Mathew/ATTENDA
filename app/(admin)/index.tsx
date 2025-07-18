@@ .. @@
 import React from 'react';
 import { View, StyleSheet, ScrollView } from 'react-native';
-import { 
-  Text, 
-  Card, 
-  Button, 
-  Chip,
-  List
-} from 'react-native-paper';
+import { Text } from 'react-native-paper';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { MaterialIcons } from '@expo/vector-icons';
 import { useAuth } from '@/services/auth/AuthContext';
-import { useSync } from '@/services/sync/SyncContext';
 
 export default function AdminDashboard() {
   const { user } = useAuth();
-  const { isOnline, lastSync } = useSync();
 
   return (
     <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.content}>
+        {/* Header */}
         <View style={styles.header}>
-          <Text variant="headlineMedium">Admin Panel</Text>
-          <Text variant="bodyMedium" style={styles.subtitle}>
-            Welcome, {user?.name}
-          </Text>
+          <Text style={styles.appTitle}>Attenda</Text>
         </View>
 
-        {/* System Status */}
-        <Card style={styles.statusCard}>
-          <Card.Content>
-            <Text variant="titleLarge" style={styles.cardTitle}>
-              System Status
-            </Text>
-            <View style={styles.statusRow}>
-              <MaterialIcons 
-                name={isOnline ? "wifi" : "wifi-off"} 
-                size={24} 
-                color={isOnline ? "#4CAF50" : "#F44336"} 
-              />
-              <Text variant="bodyLarge">
-                {isOnline ? "Online" : "Offline"}
-              </Text>
-              <Chip mode="outlined" compact>
-                All Systems Operational
-              </Chip>
-            </View>
-            {lastSync && (
-              <Text variant="bodySmall" style={styles.lastSync}>
-                Last sync: {new Date(lastSync).toLocaleString()}
-              </Text>
-            )}
-          </Card.Content>
-        </Card>
+        {/* Welcome Card */}
+        <View style={styles.welcomeCard}>
+          <Text style={styles.welcomeText}>Welcome back, {user?.name || 'Admin User'}</Text>
+          
+          <View style={styles.statsContainer}>
+            <View style={styles.statItem}>
+              <Text style={styles.statValue}>1,247</Text>
+              <Text style={styles.statLabel}>Total Students</Text>
+            </View>
+            
+            <View style={styles.divider} />
+            
+            <View style={styles.statItem}>
+              <Text style={styles.statValue}>89</Text>
+              <Text style={styles.statLabel}>Active Tutors</Text>
+            </View>
+          </View>
+          
+          <Text style={styles.syncText}>Last synced 08/07/2024 12:03 pm</Text>
+        </View>
 
-        {/* Quick Stats */}
-        <Card style={styles.card}>
-          <Card.Content>
-            <Text variant="titleLarge" style={styles.cardTitle}>
-              System Overview
-            </Text>
-            
-            <View style={styles.statsGrid}>
-              <View style={styles.statItem}>
-                <Text variant="headlineSmall">1,247</Text>
-                <Text variant="bodyMedium">Total Students</Text>
-              </View>
-              <View style={styles.statItem}>
-                <Text variant="headlineSmall">89</Text>
-                <Text variant="bodyMedium">Active Tutors</Text>
-              </View>
-              <View style={styles.statItem}>
-                <Text variant="headlineSmall">1,156</Text>
-                <Text variant="bodyMedium">Devices</Text>
-              </View>
-            </View>
-          </Card.Content>
-        </Card>
+        {/* System Status Card */}
+        <View style={styles.statusCard}>
+          <Text style={styles.statusTitle}>System Status</Text>
+          <View style={styles.statusRow}>
+            <MaterialIcons name="wifi" size={24} color="#4CAF50" />
+            <Text style={styles.statusText}>All Systems Operational</Text>
+          </View>
+        </View>
 
-        {/* Quick Actions */}
-        <Card style={styles.card}>
-          <Card.Content>
-            <Text variant="titleLarge" style={styles.cardTitle}>
-              Quick Actions
-            </Text>
-            
-            <List.Item
-              title="Manage Users"
-              description="Add, edit, or remove user accounts"
-              left={(props) => <List.Icon {...props} icon="account" />}
-              right={(props) => <List.Icon {...props} icon="chevron-right" />}
-              onPress={() => {}}
-            />
-            
-            <List.Item
-              title="Device Management"
-              description="Bind/unbind student devices"
-              left={(props) => <List.Icon {...props} icon="devices" />}
-              right={(props) => <List.Icon {...props} icon="chevron-right" />}
-              onPress={() => {}}
-            />
-            
-            <List.Item
-              title="System Settings"
-              description="Configure app-wide settings"
-              left={(props) => <List.Icon {...props} icon="cog" />}
-              right={(props) => <List.Icon {...props} icon="chevron-right" />}
-              onPress={() => {}}
-            />
-          </Card.Content>
-        </Card>
+        {/* Quick Actions */}
+        <View style={styles.actionsCard}>
+          <Text style={styles.actionsTitle}>Quick Actions</Text>
+          
+          <View style={styles.actionItem}>
+            <MaterialIcons name="people" size={24} color="#A5B4FC" />
+            <View style={styles.actionContent}>
+              <Text style={styles.actionTitle}>Manage Users</Text>
+              <Text style={styles.actionDescription}>Add, edit, or remove user accounts</Text>
+            </View>
+            <MaterialIcons name="chevron-right" size={24} color="#666" />
+          </View>
+          
+          <View style={styles.actionItem}>
+            <MaterialIcons name="devices" size={24} color="#A5B4FC" />
+            <View style={styles.actionContent}>
+              <Text style={styles.actionTitle}>Device Management</Text>
+              <Text style={styles.actionDescription}>Bind/unbind student devices</Text>
+            </View>
+            <MaterialIcons name="chevron-right" size={24} color="#666" />
+          </View>
+          
+          <View style={styles.actionItem}>
+            <MaterialIcons name="settings" size={24} color="#A5B4FC" />
+            <View style={styles.actionContent}>
+              <Text style={styles.actionTitle}>System Settings</Text>
+              <Text style={styles.actionDescription}>Configure app-wide settings</Text>
+            </View>
+            <MaterialIcons name="chevron-right" size={24} color="#666" />
+          </View>
+        </View>
 
         {/* Recent Activity */}
-        <Card style={styles.card}>
-          <Card.Content>
-            <Text variant="titleLarge" style={styles.cardTitle}>
-              Recent Activity
-            </Text>
-            
-            <View style={styles.activityItem}>
-              <MaterialIcons name="person-add" size={20} color="#4CAF50" />
-              <Text variant="bodyMedium">New student registered: John Doe</Text>
-              <Text variant="bodySmall">2 min ago</Text>
-            </View>
-            
-            <View style={styles.activityItem}>
-              <MaterialIcons name="smartphone" size={20} color="#2196F3" />
-              <Text variant="bodyMedium">Device bound to Jane Smith</Text>
-              <Text variant="bodySmall">15 min ago</Text>
-            </View>
-            
-            <View style={styles.activityItem}>
-              <MaterialIcons name="warning" size={20} color="#FF9800" />
-              <Text variant="bodyMedium">Sync issue resolved</Text>
-              <Text variant="bodySmall">1 hour ago</Text>
-            </View>
-          </Card.Content>
-        </Card>
+        <View style={styles.activityCard}>
+          <Text style={styles.activityTitle}>Recent Activity</Text>
+          
+          <View style={styles.activityItem}>
+            <MaterialIcons name="person-add" size={20} color="#4CAF50" />
+            <View style={styles.activityContent}>
+              <Text style={styles.activityText}>New student registered: John Doe</Text>
+              <Text style={styles.activityTime}>2 min ago</Text>
+            </View>
+          </View>
+          
+          <View style={styles.activityItem}>
+            <MaterialIcons name="smartphone" size={20} color="#2196F3" />
+            <View style={styles.activityContent}>
+              <Text style={styles.activityText}>Device bound to Jane Smith</Text>
+              <Text style={styles.activityTime}>15 min ago</Text>
+            </View>
+          </View>
+          
+          <View style={styles.activityItem}>
+            <MaterialIcons name="warning" size={20} color="#FF9800" />
+            <View style={styles.activityContent}>
+              <Text style={styles.activityText}>Sync issue resolved</Text>
+              <Text style={styles.activityTime}>1 hour ago</Text>
+            </View>
+          </View>
+        </View>
       </ScrollView>
     </SafeAreaView>
   );
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
   },
-  subtitle: {
-    color: '#49454F',
-    marginTop: 4,
-  },
   statusCard: {
-    marginBottom: 16,
-    backgroundColor: '#F7F2FA',
+    backgroundColor: '#A5B4FC',
+    borderRadius: 20,
+    padding: 20,
+    marginBottom: 20,
+  },
+  statusTitle: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#FFFFFF',
+    marginBottom: 15,
   },
   statusRow: {
     flexDirection: 'row',
     alignItems: 'center',
-    gap: 12,
+    gap: 10,
+  },
+  statusText: {
+    fontSize: 16,
+    color: '#FFFFFF',
+    fontWeight: '500',
+  },
+  actionsCard: {
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
+  actionsTitle: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#333',
+    marginBottom: 15,
+  },
+  actionItem: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    paddingVertical: 15,
+    borderBottomWidth: 1,
+    borderBottomColor: '#E0E0E0',
+  },
+  actionContent: {
+    flex: 1,
+    marginLeft: 15,
+  },
+  actionTitle: {
+    fontSize: 16,
+    fontWeight: '600',
+    color: '#333',
+    marginBottom: 4,
+  },
+  actionDescription: {
+    fontSize: 14,
+    color: '#666',
+  },
+  activityCard: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 20,
+    padding: 20,
+    elevation: 2,
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 2 },
+    shadowOpacity: 0.1,
+    shadowRadius: 4,
+  },
+  activityTitle: {
+    fontSize: 18,
+    fontWeight: '600',
+    color: '#333',
+    marginBottom: 15,
   },
-  lastSync: {
-    marginTop: 8,
-    color: '#49454F',
-  },
-  card: {
-    marginBottom: 16,
-  },
-  cardTitle: {
-    marginBottom: 16,
-  },
-  statsGrid: {
-    flexDirection: 'row',
-    justifyContent: 'space-around',
-  },
-  statItem: {
-    alignItems: 'center',
-  },
   activityItem: {
     flexDirection: 'row',
     alignItems: 'center',
-    gap: 12,
     paddingVertical: 8,
+    gap: 12,
+  },
+  activityContent: {
+    flex: 1,
+  },
+  activityText: {
+    fontSize: 14,
+    color: '#333',
+    marginBottom: 2,
+  },
+  activityTime: {
+    fontSize: 12,
+    color: '#666',
   },
 });