export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'tutor' | 'admin';
  deviceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  tutorId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  tutorId: string;
  title: string;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  bleIdentifier: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  courseId: string;
  markedAt: string;
  method: 'ble' | 'manual';
  distance?: number;
  synced: boolean;
  createdAt: string;
}

export interface Timetable {
  id: string;
  courseId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  location?: string;
  recurring: boolean;
}

export interface BLEDevice {
  id: string;
  name?: string;
  rssi: number;
  serviceUUIDs?: string[];
  manufacturerData?: string;
}

export interface SyncStatus {
  lastSync: string;
  pendingRecords: number;
  isOnline: boolean;
}