package com.anonymous.attenda.ble

import android.bluetooth.*
import android.bluetooth.le.*
import android.content.Context
import android.os.ParcelUuid
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.nio.charset.StandardCharsets
import java.util.*

class AttendaBleModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val bluetoothManager: BluetoothManager =
        reactContext.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private val bluetoothAdapter: BluetoothAdapter = bluetoothManager.adapter
    private var scanner: BluetoothLeScanner? = null
    private var advertiser: BluetoothLeAdvertiser? = null
    private var advertiseCallback: AdvertiseCallback? = null
    private var scanCallback: ScanCallback? = null

    override fun getName(): String = "AttendaBle"

    // ------------------------ ADVERTISING ------------------------

    @ReactMethod
    fun startAdvertising(schoolId: String, tutorId: String, sessionId: String, classId: String, promise: Promise) {
        if (!bluetoothAdapter.isEnabled) {
            promise.reject("BLE_DISABLED", "Bluetooth is disabled")
            return
        }

        advertiser = bluetoothAdapter.bluetoothLeAdvertiser
        if (advertiser == null) {
            promise.reject("NO_ADVERTISER", "Device does not support BLE advertising")
            return
        }

        val serviceUuid = UUID.fromString("0000A7DA-0000-1000-8000-00805F9B34FB")

        val advertiseSettings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setConnectable(false)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
            .build()

        val dataString = "$schoolId|$tutorId|$sessionId|$classId"
        val encodedData = dataString.toByteArray(StandardCharsets.UTF_8)

        val advertiseData = AdvertiseData.Builder()
            .addServiceUuid(ParcelUuid(serviceUuid))
            .addServiceData(ParcelUuid(serviceUuid), encodedData)
            .setIncludeDeviceName(false)
            .build()

        advertiseCallback = object : AdvertiseCallback() {
            override fun onStartSuccess(settingsInEffect: AdvertiseSettings) {
                promise.resolve("Advertising started")
            }

            override fun onStartFailure(errorCode: Int) {
                promise.reject("ADVERTISE_FAILED", "Failed with error code: $errorCode")
            }
        }

        advertiser?.startAdvertising(advertiseSettings, advertiseData, advertiseCallback)
    }

    @ReactMethod
    fun stopAdvertising(promise: Promise) {
        advertiser?.stopAdvertising(advertiseCallback)
        advertiser = null
        advertiseCallback = null
        promise.resolve("Advertising stopped")
    }

    // ------------------------ SCANNING ------------------------

    @ReactMethod
    fun startScanning(promise: Promise) {
        if (!bluetoothAdapter.isEnabled) {
            promise.reject("BLE_DISABLED", "Bluetooth is disabled")
            return
        }

        scanner = bluetoothAdapter.bluetoothLeScanner
        if (scanner == null) {
            promise.reject("NO_SCANNER", "Device does not support BLE scanning")
            return
        }

        val serviceUuid = ParcelUuid(UUID.fromString("0000A7DA-0000-1000-8000-00805F9B34FB"))

        scanCallback = object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                val scanRecord = result.scanRecord ?: return
                val serviceData = scanRecord.getServiceData(serviceUuid) ?: return
                val parsedData = parseServiceData(serviceData)

                val deviceInfo = Arguments.createMap().apply {
                    putString("id", result.device.address)
                    putString("name", result.device.name ?: "Unknown")
                    putString("schoolId", parsedData["schoolId"])
                    putString("tutorId", parsedData["tutorId"])
                    putString("sessionId", parsedData["sessionId"])
                    putString("classId", parsedData["classId"])
                    putInt("rssi", result.rssi)
                }

                sendEvent("onDeviceFound", deviceInfo)
            }

            override fun onScanFailed(errorCode: Int) {
                promise.reject("SCAN_FAILED", "Scan failed with error code: $errorCode")
            }
        }

        val scanFilter = ScanFilter.Builder()
            .setServiceUuid(serviceUuid)
            .build()

        val scanSettings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build()

        scanner?.startScan(listOf(scanFilter), scanSettings, scanCallback)
        promise.resolve("Scanning started")
    }

    @ReactMethod
    fun stopScanning(promise: Promise) {
        if (scanner != null && scanCallback != null) {
            scanner?.stopScan(scanCallback)
        }
        scanCallback = null
        scanner = null
        promise.resolve("Scanning stopped")
    }

    // ------------------------ UTILITIES ------------------------

    private fun parseServiceData(bytes: ByteArray): Map<String, String> {
        val payload = bytes.toString(StandardCharsets.UTF_8)
        val parts = payload.split("|")
        return mapOf(
            "schoolId" to (parts.getOrNull(0) ?: ""),
            "tutorId" to (parts.getOrNull(1) ?: ""),
            "sessionId" to (parts.getOrNull(2) ?: ""),
            "classId" to (parts.getOrNull(3) ?: "")
        )
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}
    

//     )
//   }  