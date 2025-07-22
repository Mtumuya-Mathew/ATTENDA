import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export interface TimetableSession {
  id: string;
  subject: string;
  date?: string;
  time: string;
  room: string;
  tutor: string;
  isActive: boolean;
  status?: 'attended' | 'missed' | 'upcoming';
}

interface TimetableCardProps {
  session: TimetableSession;
  userRole: 'student' | 'tutor';
  onSessionPress: (session: TimetableSession) => void;
}

export function TimetableCard({ session, userRole, onSessionPress }: TimetableCardProps) {
  const getStatusColor = () => {
    if (session.isActive) return '#4CAF50';
    switch (session.status) {
      case 'attended': return '#4CAF50';
      case 'missed': return '#F44336';
      case 'upcoming': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = () => {
    if (session.isActive) return 'radio-button-on';
    switch (session.status) {
      case 'attended': return 'check-circle';
      case 'missed': return 'cancel';
      case 'upcoming': return 'schedule';
      default: return 'radio-button-off';
    }
  };

  const getActionText = () => {
    if (!session.isActive) return null;
    return userRole === 'tutor' ? 'Start Attendance' : 'Mark Present';
  };

  return (
    <TouchableOpacity 
      onPress={() => onSessionPress(session)}
      disabled={!session.isActive}
      style={[styles.container, !session.isActive && styles.disabled]}
    >
      <Card style={[styles.card, session.isActive && styles.activeCard]}>
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text variant="titleMedium" style={styles.subject}>
                {session.subject}
              </Text>
              <Text variant="bodySmall" style={styles.tutor}>
                {session.tutor}
              </Text>
            </View>
            <MaterialIcons 
              name={getStatusIcon()} 
              size={24} 
              color={getStatusColor()} 
            />
          </View>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text variant="bodySmall" style={styles.detailText}>
                {session.time}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="room" size={16} color="#666" />
              <Text variant="bodySmall" style={styles.detailText}>
                {session.room}
              </Text>
            </View>
          </View>

          {session.isActive && (
            <Chip 
              mode="flat" 
              style={styles.actionChip}
              textStyle={styles.actionText}
            >
              {getActionText()}
            </Chip>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  disabled: {
    opacity: 0.7,
  },
  card: {
    elevation: 2,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  content: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleSection: {
    flex: 1,
  },
  subject: {
    fontWeight: '600',
    marginBottom: 2,
  },
  tutor: {
    color: '#666',
  },
  details: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#666',
  },
  actionChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
  },
  actionText: {
    color: '#2E7D32',
    fontSize: 12,
  },
});