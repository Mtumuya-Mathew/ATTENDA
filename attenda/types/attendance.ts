export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  regNumber: string;
  courseId: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedAt?: string;
  markedBy?: string;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  tutorId: string;
  tutorName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  isActive: boolean;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}

export interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  courses: string[];
  status: ('present' | 'absent' | 'late')[];
  sortBy: 'date' | 'course' | 'status';
  sortOrder: 'asc' | 'desc';
}

export interface Student {
  id: string;
  name: string;
  regNumber: string;
  email: string;
  course: string;
  year: string;
  semester: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  tutorId: string;
  tutorName: string;
  enrolledStudents: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    venue: string;
  }[];
}