@@ .. @@
 import React, { useState } from 'react';
-import { View, StyleSheet, ScrollView } from 'react-native';
-import { 
-  Text, 
-  TextInput, 
-  Button, 
-  Card, 
-  SegmentedButtons,
-  Snackbar,
-  ActivityIndicator
-} from 'react-native-paper';
+import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
+import { Text, TextInput } from 'react-native-paper';
 import { SafeAreaView } from 'react-native-safe-area-context';
+import { MaterialIcons } from '@expo/vector-icons';
 import { useAuth } from '@/services/auth/AuthContext';
 import { router } from 'expo-router';
 
 export default function LoginScreen() {
   const [role, setRole] = useState('student');
-  const [email, setEmail] = useState('');
+  const [regNumber, setRegNumber] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
-  const [error, setError] = useState('');
   const { login } = useAuth();
 
   const handleLogin = async () => {
-    if (!email || !password) {
-      setError('Please fill in all fields');
+    if (!regNumber || !password) {
+      Alert.alert('Error', 'Please fill in all fields');
       return;
     }
 
     setIsLoading(true);
-    setError('');
 
     try {
-      await login(email, password, role as 'student' | 'tutor' | 'admin');
+      await login(regNumber, password, role as 'student' | 'tutor' | 'admin');
       
       switch (role) {
         case 'tutor':
@@ -1,7 +1,7 @@
           break;
       }
     } catch (err) {
-      setError(err instanceof Error ? err.message : 'Login failed');
+      Alert.alert('Error', err instanceof Error ? err.message : 'Login failed');
     } finally {
       setIsLoading(false);
     }
@@ .. @@
   return (
     <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContent}>
+        {/* Header */}
         <View style={styles.header}>
-          <Text variant="displaySmall" style={styles.title}>
-            Attenda
-          </Text>
-          <Text variant="bodyLarge" style={styles.subtitle}>
-            Proximity-based attendance system
-          </Text>
+          <Text style={styles.title}>Attenda</Text>
+          <Text style={styles.subtitle}>Proximity-based attendance system</Text>
         </View>
 
-        <Card style={styles.card}>
-          <Card.Content>
-            <Text variant="headlineSmall" style={styles.cardTitle}>
-              Sign In
-            </Text>
+        {/* Login Card */}
+        <View style={styles.loginCard}>
+          <Text style={styles.cardTitle}>Sign In</Text>
 
-            <SegmentedButtons
-              value={role}
-              onValueChange={setRole}
-              buttons={[
-                { value: 'student', label: 'Student' },
-                { value: 'tutor', label: 'Tutor' },
-                { value: 'admin', label: 'Admin' },
-              ]}
-              style={styles.roleSelector}
-            />
+          {/* Role Selector */}
+          <View style={styles.roleSelector}>
+            <TouchableOpacity
+              style={[styles.roleButton, role === 'student' && styles.activeRole]}
+              onPress={() => setRole('student')}
+            >
+              <Text style={[styles.roleText, role === 'student' && styles.activeRoleText]}>
+                Student
+              </Text>
+            </TouchableOpacity>
+            <TouchableOpacity
+              style={[styles.roleButton, role === 'tutor' && styles.activeRole]}
+              onPress={() => setRole('tutor')}
+            >
+              <Text style={[styles.roleText, role === 'tutor' && styles.activeRoleText]}>
+                Tutor
+              </Text>
+            </TouchableOpacity>
+            <TouchableOpacity
+              style={[styles.roleButton, role === 'admin' && styles.activeRole]}
+              onPress={() => setRole('admin')}
+            >
+              <Text style={[styles.roleText, role === 'admin' && styles.activeRoleText]}>
+                Admin
+              </Text>
+            </TouchableOpacity>
+          </View>
 
-            <TextInput
-              label="Email"
-              value={email}
-              onChangeText={setEmail}
-              mode="outlined"
-              keyboardType="email-address"
-              autoCapitalize="none"
-              style={styles.input}
-            />
+          <TextInput
+            label={role === 'student' ? 'Registration Number' : 'Email'}
+            value={regNumber}
+            onChangeText={setRegNumber}
+            mode="outlined"
+            autoCapitalize="none"
+            style={styles.input}
+          />
 
-            <TextInput
-              label="Password"
-              value={password}
-              onChangeText={setPassword}
-              mode="outlined"
-              secureTextEntry
-              style={styles.input}
-            />
+          <TextInput
+            label="Password"
+            value={password}
+            onChangeText={setPassword}
+            mode="outlined"
+            secureTextEntry
+            style={styles.input}
+          />
 
-            <Button
-              mode="contained"
-              onPress={handleLogin}
-              disabled={isLoading}
-              style={styles.loginButton}
-            >
-              {isLoading ? <ActivityIndicator color="white" /> : 'Sign In'}
-            </Button>
-          </Card.Content>
-        </Card>
+          <TouchableOpacity
+            style={[styles.loginButton, isLoading && styles.disabledButton]}
+            onPress={handleLogin}
+            disabled={isLoading}
+          >
+            {isLoading ? (
+              <MaterialIcons name="hourglass-empty" size={20} color="#FFFFFF" />
+            ) : (
+              <Text style={styles.loginButtonText}>Sign In</Text>
+            )}
+          </TouchableOpacity>
+        </View>
       </ScrollView>
-
-      <Snackbar
-        visible={!!error}
-        onDismiss={() => setError('')}
-        duration={4000}
-      >
-        {error}
-      </Snackbar>
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
   scrollContent: {
     flexGrow: 1,
     justifyContent: 'center',
-    padding: 24,
+    padding: 20,
   },
   header: {
     alignItems: 'center',
-    marginBottom: 32,
+    marginBottom: 40,
   },
   title: {
+    fontSize: 32,
     fontWeight: 'bold',
-    color: '#6750A4',
-    marginBottom: 8,
+    color: '#333',
+    marginBottom: 10,
   },
   subtitle: {
-    color: '#49454F',
+    fontSize: 16,
+    color: '#666',
     textAlign: 'center',
   },
-  card: {
+  loginCard: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 20,
+    padding: 30,
     elevation: 2,
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 2 },
+    shadowOpacity: 0.1,
+    shadowRadius: 4,
   },
   cardTitle: {
+    fontSize: 24,
+    fontWeight: '600',
     textAlign: 'center',
-    marginBottom: 24,
-    color: '#1C1B1F',
+    color: '#333',
+    marginBottom: 30,
   },
   roleSelector: {
-    marginBottom: 24,
+    flexDirection: 'row',
+    backgroundColor: '#F5F5F5',
+    borderRadius: 25,
+    marginBottom: 25,
+    padding: 4,
+  },
+  roleButton: {
+    flex: 1,
+    paddingVertical: 12,
+    alignItems: 'center',
+    borderRadius: 20,
+  },
+  activeRole: {
+    backgroundColor: '#A5B4FC',
+  },
+  roleText: {
+    fontSize: 14,
+    fontWeight: '500',
+    color: '#666',
+  },
+  activeRoleText: {
+    color: '#FFFFFF',
   },
   input: {
-    marginBottom: 16,
+    marginBottom: 20,
+    backgroundColor: '#FFFFFF',
   },
   loginButton: {
-    marginTop: 8,
-    paddingVertical: 4,
+    backgroundColor: '#A5B4FC',
+    borderRadius: 25,
+    paddingVertical: 15,
+    alignItems: 'center',
+    justifyContent: 'center',
+    marginTop: 10,
+  },
+  disabledButton: {
+    opacity: 0.6,
+  },
+  loginButtonText: {
+    color: '#FFFFFF',
+    fontSize: 16,
+    fontWeight: '600',
   },
 });