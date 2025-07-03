import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SyncContextType {
  isOnline: boolean;
  lastSync: string | null;
  syncData: () => Promise<void>;
  queueForSync: (tableName: string, recordId: string, action: string, data: any) => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    loadLastSync();
    // TODO: Add network state listener
  }, []);

  const loadLastSync = async () => {
    try {
      const stored = await AsyncStorage.getItem('lastSync');
      if (stored) {
        setLastSync(stored);
      }
    } catch (error) {
      console.error('Error loading last sync:', error);
    }
  };

  const syncData = async () => {
    try {
      // TODO: Implement actual sync logic with backend
      console.log('Syncing data...');
      
      const now = new Date().toISOString();
      await AsyncStorage.setItem('lastSync', now);
      setLastSync(now);
      
      console.log('Sync completed');
    } catch (error) {
      console.error('Error syncing data:', error);
      throw error;
    }
  };

  const queueForSync = async (tableName: string, recordId: string, action: string, data: any) => {
    try {
      // TODO: Add to sync queue in database
      console.log(`Queued for sync: ${tableName}/${recordId} - ${action}`);
    } catch (error) {
      console.error('Error queuing for sync:', error);
      throw error;
    }
  };

  return (
    <SyncContext.Provider value={{
      isOnline,
      lastSync,
      syncData,
      queueForSync,
    }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
}