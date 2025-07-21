import { useState, useEffect, useMemo } from 'react';
import { AttendanceRecord, AttendanceSession, FilterOptions, AttendanceStats } from '@/types/attendance';

// Mock data
const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 'student1',
    studentName: 'Mathew Wadero',
    regNumber: 'IN16/00053/22',
    courseId: 'course1',
    courseName: 'Fundamental of Software Development',
    date: '2025-07-21',
    status: 'present',
    markedAt: '2025-07-21T09:15:00Z',
  },
  {
    id: '2',
    studentId: 'student2',
    studentName: 'Mathew Wadero Mtumuya',
    regNumber: 'IN16/00053/21',
    courseId: 'course1',
    courseName: 'Fundamental of Software Development',
    date: '2025-07-21',
    status: 'absent',
  },
  {
    id: '3',
    studentId: 'student3',
    studentName: 'Walter Bosibori',
    regNumber: 'IN16/00053/12',
    courseId: 'course1',
    courseName: 'Fundamental of Software Development',
    date: '2025-07-21',
    status: 'present',
    markedAt: '2025-07-21T09:20:00Z',
  },
  {
    id: '4',
    studentId: 'student1',
    studentName: 'Mathew Wadero',
    regNumber: 'IN16/00053/22',
    courseId: 'course2',
    courseName: 'Introduction to Machine Learning Algo.',
    date: '2025-07-20',
    status: 'present',
    markedAt: '2025-07-20T11:10:00Z',
  },
];

const mockAttendanceSessions: AttendanceSession[] = [
  {
    id: 'session1',
    courseId: 'course1',
    courseName: 'Fundamental of Software Development',
    courseCode: 'SOEN 105',
    date: '2025-07-21',
    startTime: '09:00',
    endTime: '11:00',
    venue: 'LH 4',
    tutorId: 'tutor1',
    tutorName: 'Dr. Ronald Tombe',
    totalStudents: 55,
    presentCount: 47,
    absentCount: 8,
    lateCount: 0,
    isActive: false,
  },
  {
    id: 'session2',
    courseId: 'course1',
    courseName: 'Fundamental of Software Development',
    courseCode: 'SOEN 105',
    date: '2025-07-20',
    startTime: '09:00',
    endTime: '11:00',
    venue: 'LH 4',
    tutorId: 'tutor1',
    tutorName: 'Dr. Ronald Tombe',
    totalStudents: 56,
    presentCount: 49,
    absentCount: 7,
    lateCount: 0,
    isActive: false,
  },
  {
    id: 'session3',
    courseId: 'course2',
    courseName: 'Introduction to Machine Learning Algo.',
    courseCode: 'SOEN 325',
    date: '2025-07-20',
    startTime: '11:00',
    endTime: '13:00',
    venue: 'LH 4',
    tutorId: 'tutor1',
    tutorName: 'Dr. Ronald Tombe',
    totalStudents: 55,
    presentCount: 47,
    absentCount: 8,
    lateCount: 0,
    isActive: false,
  },
];

export function useAttendanceData() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [sessions, setSessions] = useState<AttendanceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRecords(mockAttendanceRecords);
        setSessions(mockAttendanceSessions);
      } catch (err) {
        setError('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    records,
    sessions,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      // Simulate refetch
      setTimeout(() => {
        setRecords([...mockAttendanceRecords]);
        setSessions([...mockAttendanceSessions]);
        setLoading(false);
      }, 500);
    },
  };
}

export function useFilteredAttendance(
  records: AttendanceRecord[],
  sessions: AttendanceSession[],
  filters: FilterOptions
) {
  return useMemo(() => {
    let filteredRecords = [...records];
    let filteredSessions = [...sessions];

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      
      filteredRecords = filteredRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
      
      filteredSessions = filteredSessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= startDate && sessionDate <= endDate;
      });
    }

    // Filter by courses
    if (filters.courses.length > 0) {
      filteredRecords = filteredRecords.filter(record =>
        filters.courses.includes(record.courseId)
      );
      
      filteredSessions = filteredSessions.filter(session =>
        filters.courses.includes(session.courseId)
      );
    }

    // Filter by status
    if (filters.status.length > 0) {
      filteredRecords = filteredRecords.filter(record =>
        filters.status.includes(record.status)
      );
    }

    // Sort records
    filteredRecords.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'course':
          comparison = a.courseName.localeCompare(b.courseName);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    // Sort sessions
    filteredSessions.sort((a, b) => {
      const comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      return comparison;
    });

    return {
      records: filteredRecords,
      sessions: filteredSessions,
    };
  }, [records, sessions, filters]);
}

export function useAttendanceStats(records: AttendanceRecord[]): AttendanceStats {
  return useMemo(() => {
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    const total = records.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return {
      present,
      absent,
      late,
      total,
      percentage,
    };
  }, [records]);
}