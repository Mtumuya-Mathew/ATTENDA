import { useState, useCallback } from 'react';
import { FilterOptions } from '@/types/attendance';

const defaultFilters: FilterOptions = {
  dateRange: {
    start: '',
    end: '',
  },
  courses: [],
  status: [],
  sortBy: 'date',
  sortOrder: 'desc',
};

export function useFilters(initialFilters: Partial<FilterOptions> = {}) {
  const [filters, setFilters] = useState<FilterOptions>({
    ...defaultFilters,
    ...initialFilters,
  });

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const updateDateRange = useCallback((start: string, end: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end },
    }));
  }, []);

  const toggleCourse = useCallback((courseId: string) => {
    setFilters(prev => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter(id => id !== courseId)
        : [...prev.courses, courseId],
    }));
  }, []);

  const toggleStatus = useCallback((status: 'present' | 'absent' | 'late') => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status],
    }));
  }, []);

  const setSortBy = useCallback((sortBy: FilterOptions['sortBy']) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
    }));
  }, []);

  const setSortOrder = useCallback((sortOrder: FilterOptions['sortOrder']) => {
    setFilters(prev => ({
      ...prev,
      sortOrder,
    }));
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
    updateDateRange,
    toggleCourse,
    toggleStatus,
    setSortBy,
    setSortOrder,
  };
}