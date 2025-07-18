@@ .. @@
 import { Tabs } from 'expo-router';
 import { MaterialIcons } from '@expo/vector-icons';
-import { useTheme } from 'react-native-paper';
 
 export default function AdminLayout() {
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
         name="users"
         options={{
           title: 'Users',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="people" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="people" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />
       <Tabs.Screen
         name="devices"
         options={{
           title: 'Devices',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="devices" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="devices" 
+              size={focused ? 32 : 24} 
+              color={focused ? '#8B7CF6' : color} 
+            />
           ),
         }}
       />
       <Tabs.Screen
         name="analytics"
         options={{
           title: 'Analytics',
-          tabBarIcon: ({ color, size }) => (
-            <MaterialIcons name="analytics" size={size} color={color} />
+          tabBarIcon: ({ color, size, focused }) => (
+            <MaterialIcons 
+              name="analytics" 
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