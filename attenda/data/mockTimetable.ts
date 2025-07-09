import { TimetableSession } from '@/components/ui/TimetableCard';

export const mockTimetableData: Record<string, TimetableSession[]> = {
  student: [
    {
      id: '1',
      subject: 'Mathematics 101',
      time: '9:00 - 10:30 AM',
      room: 'Room 204',
      tutor: 'Dr. Smith',
      isActive: true,
      status: 'upcoming'
    },
    {
      id: '2',
      subject: 'Physics 201',
      time: '11:00 - 12:30 PM',
      room: 'Lab 301',
      tutor: 'Prof. Johnson',
      isActive: false,
      status: 'attended'
    },
    {
      id: '3',
      subject: 'Chemistry 301',
      time: '2:00 - 3:30 PM',
      room: 'Lab 101',
      tutor: 'Dr. Wilson',
      isActive: false,
      status: 'upcoming'
    },
    {
      id: '4',
      subject: 'English Literature',
      time: '4:00 - 5:30 PM',
      room: 'Room 105',
      tutor: 'Ms. Davis',
      isActive: false,
      status: 'missed'
    }
  ],
  tutor: [
    {
      id: '1',
      subject: 'Mathematics 101',
      time: '9:00 - 10:30 AM',
      room: 'Room 204',
      tutor: 'Dr. Smith',
      isActive: true,
      status: 'upcoming'
    },
    {
      id: '2',
      subject: 'Advanced Calculus',
      time: '2:00 - 3:30 PM',
      room: 'Room 205',
      tutor: 'Dr. Smith',
      isActive: false,
      status: 'upcoming'
    },
    {
      id: '3',
      subject: 'Statistics',
      time: '4:00 - 5:30 PM',
      room: 'Room 206',
      tutor: 'Dr. Smith',
      isActive: false,
      status: 'upcoming'
    }
  ]
};

export function getTimetableForUser(role: string): TimetableSession[] {
  return mockTimetableData[role] || [];
}