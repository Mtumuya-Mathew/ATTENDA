import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Platform, Linking, Alert } from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';

type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'unavailable';

export function useBlePermissions() {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('unavailable');

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS == 'android'){

        const apiLevel = parseInt(Platform.Version.toString(), 10);

        if (apiLevel >= 31) {
          const statuses = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);

          const scan = statuses[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN];
          const connect = statuses[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT];
          const location = statuses[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

          if ([scan, connect, location].every((s) => s === PermissionsAndroid.RESULTS.GRANTED)) {
            setPermissionStatus('granted');
          } else {
            setPermissionStatus('denied');
          }
        } else {
          const statuses = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);

          const location = statuses[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

          if (location === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionStatus('granted');
          } else if (location === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            setPermissionStatus('blocked');
          } else {
            setPermissionStatus('denied');
          }
        }
       } else if (Platform.OS === 'ios') {
        const statuses = await requestMultiple([
          PERMISSIONS.IOS.BLUETOOTH,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ]);

        const bluetooth = statuses[PERMISSIONS.IOS.BLUETOOTH];
        const location = statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];

        if ([bluetooth, location].every((s) => s === RESULTS.GRANTED)) {
          setPermissionStatus('granted');
        } else if ([bluetooth, location].some((s) => s === RESULTS.BLOCKED)) {
          setPermissionStatus('blocked');
        } else {
          setPermissionStatus('denied');
        }
      }
    } catch (err) {
      console.error('Permission error:', err);
      setPermissionStatus('unavailable');
    }
  };

  const promptOpenSettings = () => {
    Alert.alert(
      'Permissions Required',
      'Bluetooth and Location permissions are required for this feature. Please enable them in settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ],
    );
  };

  return {
    permissionStatus,
    requestPermissions,
    isGranted: permissionStatus === 'granted',
    promptOpenSettings,
  };
}
