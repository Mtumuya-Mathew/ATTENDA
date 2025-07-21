# Attenda - Modular React Native Frontend

A modern, modular React Native attendance tracking application built with Expo and TypeScript.

## 🏗️ Architecture Overview

### Modular Design Principles

The application follows a modular architecture with clear separation of concerns:

```
attenda/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Card, Toggle, etc.)
│   ├── attendance/      # Attendance-specific components
│   └── navigation/      # Navigation components
├── screens/             # Screen components
├── hooks/               # Custom React hooks
├── theme/               # Centralized theme system
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

### Key Features

- **Reusable Component Library**: Modular UI components with consistent styling
- **Centralized Theme System**: Colors, typography, spacing, and shadows
- **Custom Hooks**: Data fetching, filtering, and state management logic
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Flexbox layouts optimized for mobile screens
- **Accessibility**: Screen reader support and proper contrast ratios

## 🎨 Theme System

The theme system provides consistent styling across the application:

- **Colors**: Primary, secondary, status, and neutral color palettes
- **Typography**: Font sizes, weights, and line heights
- **Spacing**: Consistent spacing scale (4px base unit)
- **Shadows**: Elevation system for depth and hierarchy

## 🧩 Component Library

### Basic UI Components

- **Button**: Configurable button with variants, sizes, and icons
- **Card**: Container component with shadow and padding options
- **Toggle**: Animated toggle switch with size variants
- **SectionHeader**: Header component with icon and right element support
- **ProfileCard**: User profile display with avatar and details
- **AttendanceStatusBadge**: Status indicator with colors and icons

### Specialized Components

- **AttendanceHistoryCard**: Displays attendance session data with statistics
- **FilterModal**: Full-screen modal for filtering attendance records
- **Header**: Navigation header with back button and title
- **TabBar**: Bottom tab navigation with active state indicators

## 🔧 Custom Hooks

### Data Management

- **useAttendanceData**: Fetches and manages attendance records and sessions
- **useFilteredAttendance**: Filters and sorts attendance data based on criteria
- **useAttendanceStats**: Calculates attendance statistics (present, absent, late)
- **useFilters**: Manages filter state and operations

## 📱 Screens

### AttendanceHistoryScreen
- Displays historical attendance data with date grouping
- Integrated filtering system with modal interface
- Pull-to-refresh functionality
- Statistics visualization for each session

### SettingsScreen
- User profile management
- Preference toggles with persistent state
- Data export and privacy options
- Support and help sections
- Account management actions

## 🎯 Usage Examples

### Using the Button Component

```tsx
import { Button } from '@/components/ui/Button';

<Button
  title="Start Session"
  onPress={handleStartSession}
  variant="primary"
  size="lg"
  icon="play-arrow"
  fullWidth
/>
```

### Using the Theme System

```tsx
import { theme } from '@/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.base,
  },
});
```

### Using Custom Hooks

```tsx
import { useAttendanceData, useFilters } from '@/hooks';

function AttendanceScreen() {
  const { records, loading } = useAttendanceData();
  const { filters, updateFilters } = useFilters();
  
  // Component logic here
}
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on device/simulator:
```bash
npx expo run:android
# or
npx expo run:ios
```

## 📦 Dependencies

- **React Native**: Core framework
- **Expo**: Development platform and tools
- **TypeScript**: Type safety and developer experience
- **@expo/vector-icons**: Icon library (MaterialIcons)
- **react-native-safe-area-context**: Safe area handling

## 🎨 Design System

The application implements a comprehensive design system with:

- **8px spacing grid** for consistent layouts
- **Material Design inspired** color palette
- **Accessible contrast ratios** (WCAG AA compliant)
- **Responsive typography** scale
- **Consistent elevation** system for depth

## 🔄 State Management

The application uses React's built-in state management with:

- **useState** for local component state
- **Custom hooks** for shared logic
- **Context API** ready for global state (can be extended)

## 📱 Responsive Design

All components are built with responsive design principles:

- **Flexbox layouts** for flexible arrangements
- **Percentage-based widths** for scalability
- **Minimum touch targets** (44px) for accessibility
- **Safe area handling** for modern devices

## 🧪 Testing Considerations

The modular architecture supports easy testing:

- **Pure components** with clear props interfaces
- **Separated business logic** in custom hooks
- **Mock data structures** for consistent testing
- **TypeScript interfaces** for contract testing

## 🔧 Customization

The modular design allows easy customization:

- **Theme values** can be modified in `/theme` directory
- **Components** can be extended or replaced
- **Hooks** can be customized for different data sources
- **Screens** can be rearranged or modified

This architecture provides a solid foundation for building scalable, maintainable React Native applications with excellent user experience and developer productivity.