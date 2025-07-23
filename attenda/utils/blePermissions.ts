import DeviceInfo from 'react-native-device-info';
import { PermissionsAndroid, Platform, Permission } from 'react-native';

const blePermissions = async () => {
  if (Platform.OS !== 'android') return { isGranted: true };

  const androidVersion = await DeviceInfo.getSystemVersion();
  const majorAndroidVersion = parseInt(androidVersion.split('.')[0], 10);
  console.log('Android Version:', androidVersion);

  const requiredPermissions: Permission[] = [];

  if (majorAndroidVersion >= 12) {
    requiredPermissions.push(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
    );
  } else {
    requiredPermissions.push(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }

  try {
    const grantedPermissions = await PermissionsAndroid.requestMultiple(requiredPermissions);
    console.log('Permission results:', grantedPermissions);

    const deniedPermissions: string[] = [];
    const blockedPermissions: string[] = [];

    for (const permission of requiredPermissions) {
      const status = grantedPermissions[permission];
      if (status === PermissionsAndroid.RESULTS.DENIED) {
        deniedPermissions.push(permission);
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        blockedPermissions.push(permission);
      }
    }

    if (blockedPermissions.length > 0) {
      console.warn('Permissions permanently denied:', blockedPermissions);
      return { isGranted: false, blockedPermissions };
    }

    if (deniedPermissions.length > 0) {
      console.warn('Permissions denied:', deniedPermissions);
      return { isGranted: false, deniedPermissions };
    }

    return { isGranted: true };
  } catch (err) {
    console.warn('Permission request error:', err);
    return { isGranted: false, error: err };
  }
};

export default blePermissions;
