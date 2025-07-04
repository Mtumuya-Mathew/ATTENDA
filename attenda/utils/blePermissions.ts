import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/**
 * Requests the necessary Bluetooth permissions based on platform and Android API level.
 * @returns {Promise<boolean>} - True if all required permissions are granted.
 */
export async function requestBlePermissions(): Promise<boolean> {
  try {
    // For Android, we need to handle location permissions for Bluetooth scanning
    // and Bluetooth permissions for scanning and connecting.
    if (Platform.OS === 'android') {
      // Check Android API level to determine permission requirements
      // As of Android 12 (API level 31), new permissions are required for Bluetooth
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      // For API levels below 31, we need location permission for Bluetooth scanning
      // For API levels 31 and above, we need BLUETOOTH_SCAN and BLUETOOTH_CONNECT permissions
      // Note: ACCESS_FINE_LOCATION is still required for Bluetooth scanning on Android 12 and below  
      if (apiLevel < 31) {
    
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth scanning requires access to your location.',
            buttonPositive: 'OK',
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      const scanGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Bluetooth Scan Permission',
          message: 'App needs permission to scan nearby Bluetooth devices.',
          buttonPositive: 'OK',
        }
      );

      const connectGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Bluetooth Connect Permission',
          message: 'App needs permission to connect to Bluetooth devices.',
          buttonPositive: 'OK',
        }
      );

      return (
        
        scanGranted === PermissionsAndroid.RESULTS.GRANTED &&
        connectGranted === PermissionsAndroid.RESULTS.GRANTED
      );
    } else if (Platform.OS === 'ios') {
      // For iOS, we need to check Bluetooth permissions
      // iOS requires explicit permission for Bluetooth usage   
      const status = await check(PERMISSIONS.IOS.BLUETOOTH);
      if (status === RESULTS.DENIED) {
         const result = await request(PERMISSIONS.IOS.BLUETOOTH);
        return result === RESULTS.GRANTED;
      }
      return status === RESULTS.GRANTED;
    } else {
      return false;
    }
  } catch (error) {
    console.error('BLE permission error:', error);
    return false;
  }
}
