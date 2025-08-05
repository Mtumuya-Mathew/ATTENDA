import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { NativeModules, NativeEventEmitter, Alert, Linking } from 'react-native';

import blePermissions from '@/utils/blePermissions';

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



  const startAdvertising = async () => {
  try {
    const result = await blePermissions();
    if (!result.isGranted) {
      if (result.blockedPermissions) {
        alert('Some permissions are permanently denied. Please enable them in app settings.');
      }
      throw new Error('BLE permissions not granted.');
    }

    const courseId = '1';
    const tutorId = '3';
    const sessionId = '7';
    const classId = '001';

    await AttendaBle.startAdvertising(courseId, tutorId, sessionId, classId);
    setIsAdvertising(true);
    console.log('BLE advertising started successfully');
    
  } catch (error) {
    console.error('Error starting advertising:', error);
    alert('Failed to start BLE advertising. Please check permissions or turn on your Bluetooth and try again.');
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
    const result = await blePermissions();
    if (!result.isGranted) {
      if (result.blockedPermissions) {
        Alert.alert(
          'Permissions Required',
          'Some required permissions were permanently denied. Please open Settings and enable them.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
      }
      console.warn('BLE permissions not granted.');
      return;
    }


    bleEmitter.addListener('onDeviceFound', (device) => {
      const tutorId = device.id || 'unknown';
      const rssi = device.rssi || 0;
      console.log('Device found: ', device);


      setNearbyTutors((prev) => {
        if (prev.some((t) => t.id === tutorId)) return prev;
        return [
          ...prev,
          {
            id: tutorId,
            name: device.name || 'Unknown Tutor',
            course: 'N/A',
            distance: rssi,
          },
        ];
      });
    });

    setIsScanning(true);
    setNearbyTutors([]);
    
    console.log(nearbyTutors);


    await AttendaBle.startScanning();
  } catch (error) {
    console.error('Error starting scanning:', error);
    setIsScanning(false);
    bleEmitter.removeAllListeners('onDeviceFound');
    setNearbyTutors([]);
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