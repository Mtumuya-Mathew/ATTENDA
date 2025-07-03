export const APP_CONFIG = {
  name: 'Attenda',
  version: '1.0.0',
  ble: {
    serviceUUID: '12345678-1234-1234-1234-123456789abc',
    characteristicUUID: '87654321-4321-4321-4321-cba987654321',
    scanTimeout: 30000,
    advertisingTimeout: 300000, // 5 minutes
  },
  sync: {
    interval: 300000, // 5 minutes
    retryAttempts: 3,
    retryDelay: 5000,
  },
  attendance: {
    proximityThreshold: 10, // meters
    markingWindow: 900000, // 15 minutes
  },
};

export const ROLES = {
  STUDENT: 'student',
  TUTOR: 'tutor',
  ADMIN: 'admin',
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
} as const;