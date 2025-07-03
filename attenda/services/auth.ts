import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import DeviceInfo from 'react-native-device-info';
import { User } from '../types';
import { databaseService } from './database';
import uuid from 'react-native-uuid';

const AUTH_TOKEN_KEY = 'auth_token';
const CURRENT_USER_KEY = 'current_user';

class AuthService {
  private currentUser: User | null = null;

  async init(): Promise<void> {
    try {
      const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Failed to initialize auth service:', error);
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // In a real app, this would make an API call to authenticate
      // For now, we'll check the local database
      const user = await databaseService.getUserByEmail(email);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // For students, check device binding
      if (user.role === 'student') {
        const deviceId = await DeviceInfo.getUniqueId();
        
        if (user.deviceId && user.deviceId !== deviceId) {
          return { 
            success: false, 
            error: 'This account is bound to another device. Contact admin to unbind.' 
          };
        }

        // Bind device if not already bound
        if (!user.deviceId) {
          user.deviceId = deviceId;
          // Update user in database (implementation needed)
        }
      }

      // Store auth token and user data
      const token = uuid.v4() as string;
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      this.currentUser = user;
      
      return { success: true, user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  async register(
    email: string, 
    password: string, 
    name: string, 
    role: 'student' | 'tutor' | 'admin'
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Check if user already exists
      const existingUser = await databaseService.getUserByEmail(email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      const deviceId = role === 'student' ? await DeviceInfo.getUniqueId() : undefined;
      
      const user: User = {
        id: uuid.v4() as string,
        email,
        name,
        role,
        deviceId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await databaseService.createUser(user);
      
      // Auto-login after registration
      const loginResult = await this.login(email, password);
      return loginResult;
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      this.currentUser = null;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async getAuthToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  async unbindDevice(userId: string): Promise<boolean> {
    try {
      // This would typically be an admin-only operation
      // Implementation would update the user's deviceId to null
      console.log('Unbinding device for user:', userId);
      return true;
    } catch (error) {
      console.error('Failed to unbind device:', error);
      return false;
    }
  }
}

export const authService = new AuthService();