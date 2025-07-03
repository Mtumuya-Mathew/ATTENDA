import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  useTheme,
  List,
  Chip
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../services/auth';
import { databaseService } from '../../services/database';
import { Timetable, Course } from '../../types';

export default function TimetableScreen() {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [timetable, setTimetable] = useState<(Timetable & { course?: Course })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const timetableData = await databaseService.getTimetableByStudent(currentUser.id);
      
      // Load course details for each timetable entry
      const timetableWithCourses = await Promise.all(
        timetableData.map(async (item) => {
          const courses = await databaseService.getAllCourses();
          const course = courses.find(c => c.id === item.courseId);
          return { ...item, course };
        })
      );

      setTimetable(timetableWithCourses);
    } catch (error) {
      console.error('Failed to load timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dayOfWeek: number): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek] || 'Unknown';
  };

  const formatTime = (time: string): string => {
    try {
      const date = new Date(`2000-01-01T${time}`);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return time;
    }
  };

  const groupByDay = (timetable: (Timetable & { course?: Course })[]) => {
    const grouped: { [key: number]: (Timetable & { course?: Course })[] } = {};
    
    timetable.forEach(item => {
      if (!grouped[item.dayOfWeek]) {
        grouped[item.dayOfWeek] = [];
      }
      grouped[item.dayOfWeek].push(item);
    });

    // Sort each day's entries by start time
    Object.keys(grouped).forEach(day => {
      grouped[parseInt(day)].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return grouped;
  };

  const getCurrentDayClasses = () => {
    const today = new Date().getDay();
    const groupedTimetable = groupByDay(timetable);
    return groupedTimetable[today] || [];
  };

  const getUpcomingClass = () => {
    const todayClasses = getCurrentDayClasses();
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    return todayClasses.find(cls => cls.startTime > currentTime);
  };

  if (!currentUser || currentUser.role !== 'student') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
          <Text variant="bodyLarge">Timetable is only available for students</Text>
        </View>
      </SafeAreaView>
    );
  }

  const upcomingClass = getUpcomingClass();
  const groupedTimetable = groupByDay(timetable);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.cardTitle}>
              My Timetable
            </Text>
            <Text variant="bodyMedium" style={styles.cardSubtitle}>
              Your weekly class schedule
            </Text>
          </Card.Content>
        </Card>

        {upcomingClass && (
          <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.upcomingTitle}>
                Next Class
              </Text>
              <Text variant="headlineSmall" style={styles.upcomingCourse}>
                {upcomingClass.course?.name || 'Unknown Course'}
              </Text>
              <Text variant="bodyMedium" style={styles.upcomingTime}>
                {formatTime(upcomingClass.startTime)} - {formatTime(upcomingClass.endTime)}
              </Text>
              {upcomingClass.location && (
                <Text variant="bodySmall" style={styles.upcomingLocation}>
                  📍 {upcomingClass.location}
                </Text>
              )}
            </Card.Content>
          </Card>
        )}

        {Object.keys(groupedTimetable).length > 0 ? (
          Object.keys(groupedTimetable)
            .map(Number)
            .sort()
            .map(dayOfWeek => (
              <Card key={dayOfWeek} style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.dayTitle}>
                    {getDayName(dayOfWeek)}
                  </Text>
                  {groupedTimetable[dayOfWeek].map((item, index) => (
                    <List.Item
                      key={`${item.id}-${index}`}
                      title={item.course?.name || 'Unknown Course'}
                      description={`${formatTime(item.startTime)} - ${formatTime(item.endTime)}`}
                      left={(props) => <List.Icon {...props} icon="book-open-variant" />}
                      right={() => (
                        <View style={styles.classInfo}>
                          <Chip mode="outlined" compact>
                            {item.course?.code || 'N/A'}
                          </Chip>
                          {item.location && (
                            <Text variant="bodySmall" style={styles.locationText}>
                              📍 {item.location}
                            </Text>
                          )}
                        </View>
                      )}
                      style={styles.classItem}
                    />
                  ))}
                </Card.Content>
              </Card>
            ))
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No classes scheduled. Your timetable will appear here once courses are assigned.
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardSubtitle: {
    opacity: 0.7,
  },
  upcomingTitle: {
    marginBottom: 8,
  },
  upcomingCourse: {
    marginBottom: 4,
  },
  upcomingTime: {
    marginBottom: 4,
  },
  upcomingLocation: {
    opacity: 0.7,
  },
  dayTitle: {
    marginBottom: 12,
    color: '#6750A4',
  },
  classItem: {
    marginBottom: 8,
  },
  classInfo: {
    alignItems: 'flex-end',
  },
  locationText: {
    marginTop: 4,
    opacity: 0.7,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});