import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { NativeModules, NativeEventEmitter, View, Text, Button } from 'react-native';

import { useBlePermissions } from '@/utils/blePermissions';

const { AttendaBle } = NativeModules;
const bleEmitter = new NativeEventEmitter(AttendaBle);

interface NearbyTutor {
  id: string;          // e.g. device address
  name: string;        // Tutor name if available (fallback: Unknown)
  course: string;      // You can update this when decoding real data
  distance: number;    // RSSI or signal estimate
}

interface BLEContextType {
  isAdvertising: boolean;
  isScanning: boolean;
  nearbyTutors: NearbyTutor[];
  startAdvertising: () => Promise<void>;
  stopAdvertising: () => Promise<void>;
  startScanning: () => Promise<void>;
  stopScanning: () => Promise<void>;
}

const BLEContext = createContext<BLEContextType | undefined>(undefined);

export function BLEProvider({ children }: { children: ReactNode }) {
  const [isAdvertising, setIsAdvertising] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyTutors, setNearbyTutors] = useState<NearbyTutor[]>([]);

  useEffect(() => {
    return () => {
      // Clean up listeners on unmount
      bleEmitter.removeAllListeners('onDeviceFound');
    };
  }, []);

  const {
  permissionStatus,
  isGranted,
  requestPermissions,
  promptOpenSettings,
} = useBlePermissions();

  const startAdvertising = async () => {
  try {
    await requestPermissions();

    if (!isGranted) {
      if (permissionStatus === 'blocked') {
        promptOpenSettings();
      }
      throw new Error('BLE permissions not granted.');
    }

    const schoolId = '1';
    const tutorId = '123'; // This should be dynamically set based on the logged-in tutor
    // Example session and class IDs, replace with actual values  
    const sessionId = '7';
    const classId = '001';

    await AttendaBle.startAdvertising(schoolId, tutorId, sessionId, classId);
    setIsAdvertising(true);

    console.log('BLE advertising started successfully');

  } catch (error) {
    console.error('Error starting advertising:', error);
    setIsAdvertising(false);
    throw error;
  }
};

  const stopAdvertising = async () => {
    try {
      console.log('Stopping BLE advertising...');
      await AttendaBle.stopAdvertising();
      setIsAdvertising(false);
    } catch (error) {
      console.error('Error stopping advertising:', error);
      throw error;
    }
  };

  const startScanning = async () => {
    try {
      await requestPermissions();
      if (!isGranted) {
        console.warn('BLE permissions not granted.');
        return;
      }

      console.log('Permissions granted. Starting BLE scan...');
      // Reset state before starting scan to avoid duplicates 
      setIsScanning(true);
      setNearbyTutors([]);

      bleEmitter.addListener('onDeviceFound', (device) => {
        console.log('Discovered device:', device);

        const tutorId = device.address || 'unknown';
        const rssi = device.rssi || 0;

        setNearbyTutors((prev) => {
          const exists = prev.find((t) => t.id === tutorId);
          if (exists) return prev;

          return [
            ...prev,
            {
              id: tutorId,
              name: device.name || 'Unknown Tutor',
              course: 'N/A', // Optional: parse real course from service data later
              distance: rssi,
            },
          ];
        });
      });

      await AttendaBle.startScanning();
    } catch (error) {
      // If an error occurs, reset scanning state and clear listeners
      console.error('Error starting scanning:', error);
      // Reset scanning state to avoid leaving it in a stuck state
      setIsScanning(false);
      // Clear any existing listeners to prevent memory leaks 
      bleEmitter.removeAllListeners('onDeviceFound');
      // Clear nearby tutors to ensure no stale data remains
      // This is important to avoid showing old devices if scan fails    
      setNearbyTutors([]);
      // Log the error and rethrow it for further handling
      console.error('Error starting scanning:', error);
      throw error;
    }
  };

  const stopScanning = async () => {
    try {
      console.log('Stopping BLE scanning...');
      await AttendaBle.stopScanning();
      bleEmitter.removeAllListeners('onDeviceFound');
      setIsScanning(false);
      setNearbyTutors([]);
    } catch (error) {
      console.error('Error stopping scanning:', error);
      throw error;
    }
  };

  return (
    <BLEContext.Provider
      value={{
        isAdvertising,
        isScanning,
        nearbyTutors,
        startAdvertising,
        stopAdvertising,
        startScanning,
        stopScanning,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
}

export function useBLE() {
  const context = useContext(BLEContext);
  if (context === undefined) {
    console.warn('useBLE hook called outside of BLEProvider');
    throw new Error('useBLE must be used within a BLEProvider');
  }
  return context;
}
export function useBLEAdvertising() {
  const { isAdvertising, startAdvertising, stopAdvertising } = useBLE();
  return { isAdvertising, startAdvertising, stopAdvertising };
}