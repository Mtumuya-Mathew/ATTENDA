package com.anonymous.attenda.ble

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.*
import android.bluetooth.le.*
import android.content.Context
import android.content.pm.PackageManager
import android.os.ParcelUuid
import android.util.Log
import androidx.annotation.RequiresPermission
import androidx.core.app.ActivityCompat
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

    companion object {
        private const val SERVICE_UUID_STRING = "0000A7DA-0000-1000-8000-00805F9B34FB"
        val MY_SERVICE_PARCEL_UUID: ParcelUuid = ParcelUuid(UUID.fromString(SERVICE_UUID_STRING))
    }

    override fun getName(): String = "AttendaBle"

    // ------------------------ ADVERTISING ------------------------

    @RequiresPermission(Manifest.permission.BLUETOOTH_ADVERTISE)
    @ReactMethod
    fun startAdvertising(tutorId: String, courseId: String, sessionId: String, classId: String, promise: Promise) {
        if (!bluetoothAdapter.isEnabled) {
            promise.reject("BLE_DISABLED", "Bluetooth is disabled")
            return
        }

        advertiser = bluetoothAdapter.bluetoothLeAdvertiser
        if (advertiser == null) {
            promise.reject("NO_ADVERTISER", "Device does not support BLE advertising")
            return
        }


        val advertiseSettings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setConnectable(false)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
            .build()

        val dataString = "$courseId|$tutorId|$sessionId|$classId"
        val encodedData = dataString.toByteArray(StandardCharsets.UTF_8)

        val advertiseData = AdvertiseData.Builder()
            .addServiceUuid(MY_SERVICE_PARCEL_UUID)
            .addServiceData(MY_SERVICE_PARCEL_UUID, encodedData)
            .setIncludeDeviceName(false)
            .build()

        advertiseCallback = object : AdvertiseCallback() {
            override fun onStartSuccess(settingsInEffect: AdvertiseSettings) {
                Log.d("AttendaBle", "Advertising started successfully.")
                promise.resolve("Advertising started")
            }

            override fun onStartFailure(errorCode: Int) {
                Log.e("AttendaBle", "Advertising failed with error code: $errorCode")
                promise.reject("ADVERTISE_FAILED", "Failed with error code: $errorCode")
            }
        }
        advertiser?.startAdvertising(advertiseSettings, advertiseData, advertiseCallback)
        Log.d("AttendaBle", "startAdvertising called with data: $dataString")

    }

    @SuppressLint("MissingPermission")
    @ReactMethod
    fun stopAdvertising(promise: Promise) {
        advertiser?.stopAdvertising(advertiseCallback)
        advertiser = null
        advertiseCallback = null
        promise.resolve("Advertising stopped")
    }

    // ------------------------ SCANNING ------------------------

    @SuppressLint("MissingPermission")
    @ReactMethod
    fun startScanning(promise: Promise) {
        Log.d("AttendaBle", "startScanning invoked")

        if (!bluetoothAdapter.isEnabled) {
            promise.reject("BLE_DISABLED", "Bluetooth is disabled")
            return
        }

        scanner = bluetoothAdapter.bluetoothLeScanner
        if (scanner == null) {
            promise.reject("NO_SCANNER", "Device does not support BLE scanning")
            return
        }


        scanCallback = object : ScanCallback() {
            @SuppressLint("MissingPermission")
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                val scanRecord = result.scanRecord ?: return
                val serviceData = scanRecord.getServiceData(MY_SERVICE_PARCEL_UUID) ?: return
                val parsedData = parseServiceData(serviceData)

                val deviceInfo = Arguments.createMap().apply {
                    putString("id", result.device.address)
                    putString("name", result.device.name ?: "Unknown")
                    putString("courseId", parsedData["courseId"])
                    putString("tutorId", parsedData["tutorId"])
                    putString("sessionId", parsedData["sessionId"])
                    putString("classId", parsedData["classId"])
                    putInt("rssi", result.rssi)
                }

                Log.d("AttendaBle", "Scan result: ${result.device.name} - ${result.device.address} - RSSI: ${result.rssi}")
                Log.d("AttendaBle", "Parsed data: $parsedData")


                sendEvent("onDeviceFound", deviceInfo)
            }

            override fun onScanFailed(errorCode: Int) {
                Log.e("AttendaBle", "Scan failed with error code: $errorCode")

                promise.reject("SCAN_FAILED", "Scan failed with error code: $errorCode")
            }
        }

        val scanFilter = ScanFilter.Builder()
            .setServiceUuid(MY_SERVICE_PARCEL_UUID)
            .build()

        val scanSettings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build()

        scanner?.startScan(listOf(scanFilter), scanSettings, scanCallback)
        promise.resolve("Scanning started")
    }

    @SuppressLint("MissingPermission")
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
            "courseId" to (parts.getOrNull(0) ?: ""),
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
