import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AttendanceHistoryCard } from '@/components/attendance/AttendanceHistoryCard';
import { FilterModal } from '@/components/attendance/FilterModal';
import { useAttendanceData, useFilteredAttendance } from '@/hooks/useAttendanceData';
import { useFilters } from '@/hooks/useFilters';
import { AttendanceSession } from '@/types/attendance';

export function AttendanceHistoryScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { sessions, loading, refetch } = useAttendanceData();
  const { filters, updateFilters, resetFilters } = useFilters();
  const { sessions: filteredSessions } = useFilteredAttendance([], sessions, filters);

  const renderHeader = () => (
    <SectionHeader
      title="History"
      rightElement={
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.filterButton}
        >
          <MaterialIcons name="filter-list" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      }
    />
  );

  const renderItem = ({ item }: { item: AttendanceSession }) => (
    <AttendanceHistoryCard session={item} />
  );

  const keyExtractor = (item: AttendanceSession) => item.id;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredSessions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onFiltersChange={updateFilters}
        onResetFilters={resetFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[6],
  },
  filterButton: {
    padding: theme.spacing[2],
  },
});