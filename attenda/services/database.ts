import * as SQLite from 'expo-sqlite';
import { User, Course, AttendanceSession, AttendanceRecord, Timetable } from '../types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init() {
    this.db = await SQLite.openDatabaseAsync('attenda.db');
    await this.createTables();
  }

  private async createTables() {
    if (!this.db) return;

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        deviceId TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        tutorId TEXT NOT NULL,
        description TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (tutorId) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS attendance_sessions (
        id TEXT PRIMARY KEY,
        courseId TEXT NOT NULL,
        tutorId TEXT NOT NULL,
        title TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT,
        isActive INTEGER NOT NULL DEFAULT 0,
        bleIdentifier TEXT NOT NULL,
        location TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (courseId) REFERENCES courses (id),
        FOREIGN KEY (tutorId) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS attendance_records (
        id TEXT PRIMARY KEY,
        sessionId TEXT NOT NULL,
        studentId TEXT NOT NULL,
        courseId TEXT NOT NULL,
        markedAt TEXT NOT NULL,
        method TEXT NOT NULL,
        distance REAL,
        synced INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (sessionId) REFERENCES attendance_sessions (id),
        FOREIGN KEY (studentId) REFERENCES users (id),
        FOREIGN KEY (courseId) REFERENCES courses (id)
      );

      CREATE TABLE IF NOT EXISTS timetables (
        id TEXT PRIMARY KEY,
        courseId TEXT NOT NULL,
        dayOfWeek INTEGER NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
        location TEXT,
        recurring INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (courseId) REFERENCES courses (id)
      );

      CREATE INDEX IF NOT EXISTS idx_attendance_records_student ON attendance_records (studentId);
      CREATE INDEX IF NOT EXISTS idx_attendance_records_session ON attendance_records (sessionId);
      CREATE INDEX IF NOT EXISTS idx_attendance_sessions_tutor ON attendance_sessions (tutorId);
      CREATE INDEX IF NOT EXISTS idx_courses_tutor ON courses (tutorId);
    `);
  }

  // User operations
  async createUser(user: User): Promise<void> {
    if (!this.db) return;
    
    await this.db.runAsync(
      'INSERT INTO users (id, email, name, role, deviceId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.id, user.email, user.name, user.role, user.deviceId || null, user.createdAt, user.updatedAt]
    );
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!this.db) return null;
    
    const result = await this.db.getFirstAsync<User>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    return result || null;
  }

  async getUserById(id: string): Promise<User | null> {
    if (!this.db) return null;
    
    const result = await this.db.getFirstAsync<User>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    return result || null;
  }

  // Course operations
  async createCourse(course: Course): Promise<void> {
    if (!this.db) return;
    
    await this.db.runAsync(
      'INSERT INTO courses (id, name, code, tutorId, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [course.id, course.name, course.code, course.tutorId, course.description || null, course.createdAt, course.updatedAt]
    );
  }

  async getCoursesByTutor(tutorId: string): Promise<Course[]> {
    if (!this.db) return [];
    
    const results = await this.db.getAllAsync<Course>(
      'SELECT * FROM courses WHERE tutorId = ? ORDER BY name',
      [tutorId]
    );
    
    return results;
  }

  async getAllCourses(): Promise<Course[]> {
    if (!this.db) return [];
    
    const results = await this.db.getAllAsync<Course>(
      'SELECT * FROM courses ORDER BY name'
    );
    
    return results;
  }

  // Attendance session operations
  async createAttendanceSession(session: AttendanceSession): Promise<void> {
    if (!this.db) return;
    
    await this.db.runAsync(
      'INSERT INTO attendance_sessions (id, courseId, tutorId, title, startTime, endTime, isActive, bleIdentifier, location, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        session.id,
        session.courseId,
        session.tutorId,
        session.title,
        session.startTime,
        session.endTime || null,
        session.isActive ? 1 : 0,
        session.bleIdentifier,
        session.location || null,
        session.createdAt,
        session.updatedAt
      ]
    );
  }

  async updateAttendanceSession(id: string, updates: Partial<AttendanceSession>): Promise<void> {
    if (!this.db) return;
    
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    await this.db.runAsync(
      `UPDATE attendance_sessions SET ${fields}, updatedAt = ? WHERE id = ?`,
      [...values, new Date().toISOString(), id]
    );
  }

  async getActiveSessionsByTutor(tutorId: string): Promise<AttendanceSession[]> {
    if (!this.db) return [];
    
    const results = await this.db.getAllAsync<AttendanceSession>(
      'SELECT * FROM attendance_sessions WHERE tutorId = ? AND isActive = 1 ORDER BY startTime DESC',
      [tutorId]
    );
    
    return results;
  }

  async getSessionsByTutor(tutorId: string): Promise<AttendanceSession[]> {
    if (!this.db) return [];
    
    const results = await this.db.getAllAsync<AttendanceSession>(
      'SELECT * FROM attendance_sessions WHERE tutorId = ? ORDER BY startTime DESC',
      [tutorId]
    );
    
    return results;
  }

  // Attendance record operations
  async createAttendanceRecord(record: AttendanceRecord): Promise<void> {
    if (!this.db) return;
    
    await this.db.runAsync(
      'INSERT INTO attendance_records (id, sessionId, studentId, courseId, markedAt, method, distance, synced, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        record.id,
        record.sessionId,
        record.studentId,
        record.courseId,
        record.markedAt,
        record.method,
        record.distance || null,
        record.synced ? 1 : 0,
        record.createdAt
      ]
    );
  }

  async getAttendanceRecordsByStudent(studentId: string): Promise<AttendanceRecord[]> {
    if (!this.db) return [];
    
    const results = await this.db.getAllAsync<AttendanceRecord>(
      'SELECT * FROM attendance_records WHERE studentId = ? ORDER BY markedAt DESC',
      [studentId]
    );
    
    return results;
  }

  async getAttendanceRecordsBySession(sessionId: string): Promise<AttendanceRecord[]> {
    if (!this.db) return [];
    
    const results = await this.db.getAllAsync<AttendanceRecord>(
      'SELECT * FROM attendance_records WHERE sessionId = ? ORDER BY markedAt DESC',
      [sessionId]
    );
    
    return results;
  }

  async checkAttendanceExists(sessionId: string, studentId: string): Promise<boolean> {
    if (!this.db) return false;
    
    const result = await this.db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM attendance_records WHERE sessionId = ? AND studentId = ?',
      [sessionId, studentId]
    );
    
    return (result?.count || 0) > 0;
  }

  // Timetable operations
  async createTimetable(timetable: Timetable): Promise<void> {
    if (!this.db) return;
    
    await this.db.runAsync(
      'INSERT INTO timetables (id, courseId, dayOfWeek, startTime, endTime, location, recurring) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        timetable.id,
        timetable.courseId,
        timetable.dayOfWeek,
        timetable.startTime,
        timetable.endTime,
        timetable.location || null,
        timetable.recurring ? 1 : 0
      ]
    );
  }

  async getTimetableByStudent(studentId: string): Promise<Timetable[]> {
    if (!this.db) return [];
    
    // This would need to be implemented based on student enrollment logic
    const results = await this.db.getAllAsync<Timetable>(
      'SELECT t.* FROM timetables t JOIN courses c ON t.courseId = c.id ORDER BY t.dayOfWeek, t.startTime'
    );
    
    return results;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

export const databaseService = new DatabaseService();