import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import * as SQLite from 'expo-sqlite';

interface DatabaseContextType {
  db: SQLite.SQLiteDatabase | null;
  initializeDatabase: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = React.useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      const database = await SQLite.openDatabaseAsync('attenda.db');
      
      // Create tables
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          device_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS courses (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          code TEXT UNIQUE NOT NULL,
          tutor_id TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (tutor_id) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS attendance_sessions (
          id TEXT PRIMARY KEY,
          course_id TEXT NOT NULL,
          tutor_id TEXT NOT NULL,
          start_time DATETIME NOT NULL,
          end_time DATETIME,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (course_id) REFERENCES courses (id),
          FOREIGN KEY (tutor_id) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS attendance_records (
          id TEXT PRIMARY KEY,
          session_id TEXT NOT NULL,
          student_id TEXT NOT NULL,
          marked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          proximity_distance REAL,
          is_synced BOOLEAN DEFAULT 0,
          FOREIGN KEY (session_id) REFERENCES attendance_sessions (id),
          FOREIGN KEY (student_id) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS sync_queue (
          id TEXT PRIMARY KEY,
          table_name TEXT NOT NULL,
          record_id TEXT NOT NULL,
          action TEXT NOT NULL,
          data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_attendance_records_session ON attendance_records(session_id);
        CREATE INDEX IF NOT EXISTS idx_attendance_records_student ON attendance_records(student_id);
        CREATE INDEX IF NOT EXISTS idx_sync_queue_created ON sync_queue(created_at);
      `);

      setDb(database);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  return (
    <DatabaseContext.Provider value={{ db, initializeDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}