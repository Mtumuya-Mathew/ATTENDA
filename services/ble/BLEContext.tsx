import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NearbyTutor {
  id: string;
  name: string;
  course: string;
  distance: number;
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

  const startAdvertising = async () => {
    try {
      // TODO: Implement native BLE advertising
      console.log('Starting BLE advertising...');
      setIsAdvertising(true);
    } catch (error) {
      console.error('Error starting advertising:', error);
      throw error;
    }
  };

  const stopAdvertising = async () => {
    try {
      // TODO: Implement native BLE advertising stop
      console.log('Stopping BLE advertising...');
      setIsAdvertising(false);
    } catch (error) {
      console.error('Error stopping advertising:', error);
      throw error;
    }
  };

  const startScanning = async () => {
    try {
      // TODO: Implement native BLE scanning
      console.log('Starting BLE scanning...');
      setIsScanning(true);
      
      // Mock nearby tutors for demo
      setTimeout(() => {
        setNearbyTutors([
          { id: '1', name: 'Dr. Smith', course: 'Mathematics', distance: 5 },
          { id: '2', name: 'Prof. Johnson', course: 'Physics', distance: 12 },
        ]);
      }, 2000);
    } catch (error) {
      console.error('Error starting scanning:', error);
      throw error;
    }
  };

  const stopScanning = async () => {
    try {
      // TODO: Implement native BLE scanning stop
      console.log('Stopping BLE scanning...');
      setIsScanning(false);
      setNearbyTutors([]);
    } catch (error) {
      console.error('Error stopping scanning:', error);
      throw error;
    }
  };

  return (
    <BLEContext.Provider value={{
      isAdvertising,
      isScanning,
      nearbyTutors,
      startAdvertising,
      stopAdvertising,
      startScanning,
      stopScanning,
    }}>
      {children}
    </BLEContext.Provider>
  );
}

export function useBLE() {
  const context = useContext(BLEContext);
  if (context === undefined) {
    throw new Error('useBLE must be used within a BLEProvider');
  }
  return context;
}