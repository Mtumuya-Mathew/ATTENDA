import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { FilterOptions } from '@/types/attendance';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
}

const courseOptions = [
  { id: 'course1', name: 'Fundamental of Software Development' },
  { id: 'course2', name: 'Introduction to Machine Learning Algo.' },
  { id: 'course3', name: 'Database Management Systems' },
  { id: 'course4', name: 'Web Development' },
];

const statusOptions = [
  { value: 'present' as const, label: 'Present', color: theme.colors.present },
  { value: 'absent' as const, label: 'Absent', color: theme.colors.absent },
  { value: 'late' as const, label: 'Late', color: theme.colors.late },
];

const sortOptions = [
  { value: 'date' as const, label: 'Date' },
  { value: 'course' as const, label: 'Course' },
  { value: 'status' as const, label: 'Status' },
];

export function FilterModal({
  visible,
  onClose,
  filters,
  onFiltersChange,
  onResetFilters,
}: FilterModalProps) {
  const toggleCourse = (courseId: string) => {
    const newCourses = filters.courses.includes(courseId)
      ? filters.courses.filter(id => id !== courseId)
      : [...filters.courses, courseId];
    
    onFiltersChange({ courses: newCourses });
  };

  const toggleStatus = (status: 'present' | 'absent' | 'late') => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({ status: newStatus });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Filter Records</Text>
          <TouchableOpacity onPress={onResetFilters} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Courses Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Courses</Text>
            {courseOptions.map(course => (
              <View key={course.id} style={styles.filterItem}>
                <Text style={styles.filterLabel}>{course.name}</Text>
                <Toggle
                  value={filters.courses.includes(course.id)}
                  onValueChange={() => toggleCourse(course.id)}
                />
              </View>
            ))}
          </View>

          {/* Status Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            {statusOptions.map(status => (
              <View key={status.value} style={styles.filterItem}>
                <View style={styles.statusLabelContainer}>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: status.color },
                    ]}
                  />
                  <Text style={styles.filterLabel}>{status.label}</Text>
                </View>
                <Toggle
                  value={filters.status.includes(status.value)}
                  onValueChange={() => toggleStatus(status.value)}
                />
              </View>
            ))}
          </View>

          {/* Sort Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.sortItem}
                onPress={() => onFiltersChange({ sortBy: option.value })}
              >
                <Text style={styles.filterLabel}>{option.label}</Text>
                <MaterialIcons
                  name={filters.sortBy === option.value ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={24}
                  color={filters.sortBy === option.value ? theme.colors.primary : theme.colors.gray400}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Sort Order */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort Order</Text>
            <TouchableOpacity
              style={styles.sortItem}
              onPress={() => onFiltersChange({ sortOrder: 'asc' })}
            >
              <Text style={styles.filterLabel}>Ascending</Text>
              <MaterialIcons
                name={filters.sortOrder === 'asc' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color={filters.sortOrder === 'asc' ? theme.colors.primary : theme.colors.gray400}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortItem}
              onPress={() => onFiltersChange({ sortOrder: 'desc' })}
            >
              <Text style={styles.filterLabel}>Descending</Text>
              <MaterialIcons
                name={filters.sortOrder === 'desc' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color={filters.sortOrder === 'desc' ? theme.colors.primary : theme.colors.gray400}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Apply Filters"
            onPress={onClose}
            variant="primary"
            fullWidth
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  closeButton: {
    padding: theme.spacing[2],
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  resetButton: {
    padding: theme.spacing[2],
  },
  resetText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing[4],
  },
  section: {
    marginVertical: theme.spacing[4],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing[3],
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  filterLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  statusLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing[2],
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  footer: {
    padding: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});