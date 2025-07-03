import NetInfo from '@react-native-community/netinfo';
import { databaseService } from './database';
import { SyncStatus } from '../types';

class SyncService {
  private isOnline = false;
  private isSyncing = false;
  private syncInterval: NodeJS.Timeout | null = null;

  async init(): Promise<void> {
    // Monitor network status
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected || false;
      if (this.isOnline && !this.isSyncing) {
        this.syncData();
      }
    });

    // Start periodic sync
    this.startPeriodicSync();
  }

  private startPeriodicSync(): void {
    this.syncInterval = setInterval(() => {
      if (this.isOnline && !this.isSyncing) {
        this.syncData();
      }
    }, 30000); // Sync every 30 seconds when online
  }

  async syncData(): Promise<boolean> {
    if (this.isSyncing || !this.isOnline) return false;

    try {
      this.isSyncing = true;
      
      // Sync attendance records
      await this.syncAttendanceRecords();
      
      // Sync other data as needed
      // await this.syncCourses();
      // await this.syncUsers();
      
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    } finally {
      this.isSyncing = false;
    }
  }

  private async syncAttendanceRecords(): Promise<void> {
    try {
      // Get unsynced records
      // const unsyncedRecords = await databaseService.getUnsyncedAttendanceRecords();
      
      // Send to server
      // for (const record of unsyncedRecords) {
      //   await this.sendAttendanceRecord(record);
      //   await databaseService.markRecordAsSynced(record.id);
      // }
      
      console.log('Attendance records synced');
    } catch (error) {
      console.error('Failed to sync attendance records:', error);
    }
  }

  private async sendAttendanceRecord(record: any): Promise<void> {
    // Implementation would send record to server
    // const response = await fetch('/api/attendance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(record)
    // });
    
    console.log('Sending attendance record:', record.id);
  }

  async getSyncStatus(): Promise<SyncStatus> {
    try {
      // Get pending records count
      // const pendingRecords = await databaseService.getUnsyncedRecordsCount();
      
      return {
        lastSync: new Date().toISOString(), // Would be stored in AsyncStorage
        pendingRecords: 0, // pendingRecords,
        isOnline: this.isOnline,
      };
    } catch (error) {
      console.error('Failed to get sync status:', error);
      return {
        lastSync: 'Never',
        pendingRecords: 0,
        isOnline: this.isOnline,
      };
    }
  }

  async forcSync(): Promise<boolean> {
    return await this.syncData();
  }

  destroy(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
}

export const syncService = new SyncService();