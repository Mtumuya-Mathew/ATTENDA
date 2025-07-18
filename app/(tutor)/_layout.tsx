@@ .. @@
 import { Tabs } from 'expo-router';
 import { MaterialIcons } from '@expo/vector-icons';
-import { useTheme } from 'react-native-paper';
 
 export default function TutorLayout() {
-  const theme = useTheme();
-
   return (
     <Tabs
       screenOptions={{
-        tabBarActiveTintColor: theme.colors.primary,
-        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
+        tabBarActiveTintColor: '#FFFFFF',
+        tabBarInactiveTintColor: '#B0B0B0',
         tabBarStyle: {
-          backgroundColor: theme.colors.surface,
-          borderTopColor: theme.colors.outline,
+          backgroundColor: '#1A1A1A',
+          borderTopWidth: 0,
+          height: 80,
+          paddingBottom: 20,
+          paddingTop: 10,
         },
-        headerStyle: {
-          backgroundColor: theme.colors.surface,
+        tabBarLabelStyle: {
+          fontSize: 12,
+          fontWeight: '500',
         },
-        headerTintColor: theme.colors.onSurface,
+        headerShown: false,
       }}
     >
       <Tabs.Screen
         name="index"
         options={{
           title: 'Dashboard',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="dashboard" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="home" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />
       <Tabs.Screen
         name="courses"
         options={{
           title: 'Courses',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="school" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="school" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />
       <Tabs.Screen
         name="attendance"
         options={{
           title: 'Attendance',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="how-to-reg" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="check-circle" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />
       <Tabs.Screen
         name="reports"
         options={{
           title: 'Reports',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="assessment" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="assessment" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />
       <Tabs.Screen
         name="settings"
         options={{
           title: 'Settings',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="settings" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="settings" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />