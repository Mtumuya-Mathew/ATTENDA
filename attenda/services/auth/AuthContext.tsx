import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  regNumber: string;
  name: string;
  password?: string; // Optional for login, required for registration
  role: 'student' | 'tutor' | 'admin';
  deviceId?: string;
}

const mockUser: User = {
        id: '1',
        regNumber: 'REG12345',
        name: 'John Doe',
        // Assuming the role is passed as a parameter in the login function
        role: 'student',
        deviceId: 'device-123',
      };

interface AuthContextType {
  user: User| null;
  isLoading: boolean;
  login: (userName: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, role: string) => {
    try {
      // TODO: Replace with actual API call
      // For now, simulate login with mock data
      const mockUser: User = {
        id: '1',
        regNumber: 'REG12345', // Assuming regNumber is the email for simplicity
        name: 'John Doe',
        password: password, // Store password for registration
        role: 'admin', // Assuming role is passed as a parameter
        deviceId: 'device-123',
      };

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    try {
      // TODO: Replace with actual API call
      const newUser: User = {
        id: Date.now().toString(),
        regNumber: userData.regNumber!,
        name: userData.name!,
        role: userData.role!,
        deviceId: userData.role === 'student' ? `device-${Date.now()}` : undefined,
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}