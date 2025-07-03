import { BleManager, Device, State, Characteristic } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { BLEDevice } from '../types';

const ATTENDANCE_SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
const ATTENDANCE_CHARACTERISTIC_UUID = '87654321-4321-4321-4321-cba987654321';

class BluetoothService {
  private manager: BleManager;
  private isScanning = false;
  private isAdvertising = false;
  private discoveredDevices: Map<string, Device> = new Map();

  constructor() {
    this.manager = new BleManager();
  }

  async init(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        await this.requestAndroidPermissions();
      }

      const state = await this.manager.state();
      if (state !== State.PoweredOn) {
        console.log('Bluetooth is not powered on');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Bluetooth initialization failed:', error);
      return false;
    }
  }

  private async requestAndroidPermissions(): Promise<void> {
    if (Platform.OS !== 'android') return;

    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ];

    // For Android 12+ (API level 31+)
    if (Platform.Version >= 31) {
      permissions.push(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      );
    }

    const granted = await PermissionsAndroid.requestMultiple(permissions);
    
    for (const permission of permissions) {
      if (granted[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error(`Permission ${permission} not granted`);
      }
    }
  }

  // Student role - BLE Central (Scanner)
  async startScanning(onDeviceFound: (device: BLEDevice) => void): Promise<void> {
    if (this.isScanning) return;

    try {
      this.isScanning = true;
      this.discoveredDevices.clear();

      this.manager.startDeviceScan(
        [ATTENDANCE_SERVICE_UUID],
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.error('Scan error:', error);
            return;
          }

          if (device && device.name) {
            this.discoveredDevices.set(device.id, device);
            
            const bleDevice: BLEDevice = {
              id: device.id,
              name: device.name,
              rssi: device.rssi || -100,
              serviceUUIDs: device.serviceUUIDs || [],
              manufacturerData: device.manufacturerData || undefined,
            };

            onDeviceFound(bleDevice);
          }
        }
      );
    } catch (error) {
      console.error('Failed to start scanning:', error);
      this.isScanning = false;
    }
  }

  async stopScanning(): Promise<void> {
    if (!this.isScanning) return;

    try {
      this.manager.stopDeviceScan();
      this.isScanning = false;
    } catch (error) {
      console.error('Failed to stop scanning:', error);
    }
  }

  async connectToDevice(deviceId: string): Promise<boolean> {
    try {
      const device = this.discoveredDevices.get(deviceId);
      if (!device) return false;

      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();

      // Read attendance session data
      const characteristic = await connectedDevice.readCharacteristicForService(
        ATTENDANCE_SERVICE_UUID,
        ATTENDANCE_CHARACTERISTIC_UUID
      );

      if (characteristic.value) {
        // Process attendance data
        console.log('Attendance data received:', characteristic.value);
      }

      await connectedDevice.cancelConnection();
      return true;
    } catch (error) {
      console.error('Failed to connect to device:', error);
      return false;
    }
  }

  // Tutor role - BLE Peripheral (Advertiser)
  async startAdvertising(sessionData: string): Promise<boolean> {
    if (this.isAdvertising) return true;

    try {
      // Note: BLE advertising as peripheral is limited on React Native
      // This would typically require a custom native module
      // For now, we'll simulate the advertising functionality
      
      this.isAdvertising = true;
      console.log('Started advertising with session data:', sessionData);
      
      // In a real implementation, you would:
      // 1. Create a custom native module for BLE peripheral mode
      // 2. Advertise the attendance service UUID
      // 3. Set up characteristics with session data
      
      return true;
    } catch (error) {
      console.error('Failed to start advertising:', error);
      return false;
    }
  }

  async stopAdvertising(): Promise<void> {
    if (!this.isAdvertising) return;

    try {
      // Stop advertising implementation
      this.isAdvertising = false;
      console.log('Stopped advertising');
    } catch (error) {
      console.error('Failed to stop advertising:', error);
    }
  }

  async updateAdvertisingData(sessionData: string): Promise<void> {
    if (!this.isAdvertising) return;

    try {
      // Update advertising data implementation
      console.log('Updated advertising data:', sessionData);
    } catch (error) {
      console.error('Failed to update advertising data:', error);
    }
  }

  getDiscoveredDevices(): BLEDevice[] {
    return Array.from(this.discoveredDevices.values()).map(device => ({
      id: device.id,
      name: device.name || 'Unknown',
      rssi: device.rssi || -100,
      serviceUUIDs: device.serviceUUIDs || [],
      manufacturerData: device.manufacturerData,
    }));
  }

  isCurrentlyScanning(): boolean {
    return this.isScanning;
  }

  isCurrentlyAdvertising(): boolean {
    return this.isAdvertising;
  }

  destroy(): void {
    this.stopScanning();
    this.stopAdvertising();
    this.manager.destroy();
  }
}

export const bluetoothService = new BluetoothService();