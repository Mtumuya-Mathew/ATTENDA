import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Easing
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  iconType: 'ionicons' | 'material' | 'fontawesome5';
  iconName: string;
  backgroundColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to Attenda',
    subtitle: 'Smart Attendance Made Simple',
    description: 'Revolutionary attendance monitoring system designed for modern educational institutions using cutting-edge Bluetooth technology.',
    icon: Ionicons,
    iconType: 'ionicons',
    iconName: 'school-outline',
    backgroundColor: '#6B46C1',
  },
  {
    id: 2,
    title: 'Bluetooth Low Energy',
    subtitle: 'Seamless Connection Technology',
    description: 'Tutors broadcast BLE signals while students automatically connect and mark their attendance without any manual intervention.',
    icon: MaterialIcons,
    iconType: 'material',
    iconName: 'bluetooth-connected',
    backgroundColor: '#10B981',
  },
  {
    id: 3,
    title: 'Automatic Detection',
    subtitle: 'No More Manual Check-ins',
    description: 'Students are automatically detected when they enter the classroom range. No need to remember to sign in or scan QR codes.',
    icon: FontAwesome5,
    iconType: 'fontawesome5',
    iconName: 'user-check',
    backgroundColor: '#6B46C1',
  },
  {
    id: 4,
    title: 'Real-time Analytics',
    subtitle: 'Instant Attendance Insights',
    description: 'Get real-time attendance reports, analytics, and insights to help track student engagement and participation.',
    icon: Ionicons,
    iconType: 'ionicons',
    iconName: 'analytics-outline',
    backgroundColor: '#10B981',
  },
];



export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const navigateToLogin = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      router.replace('/login'); // or '/(auth)/login' if nested
    });
  };


  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      // Animation before completing onboarding
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        navigateToLogin();
      });
    }
  };

  const skipOnboarding = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      navigateToLogin();
    });
  };

  const renderIcon = (slide: OnboardingSlide) => {
    const IconComponent = slide.icon;
    return (
      <IconComponent
        name={slide.iconName}
        size={120}
        color="white"
        style={styles.slideIcon}
      />
    );
  };

  const renderSlide = (slide: OnboardingSlide, index: number) => (
    <View key={slide.id} style={styles.slide}>
      {/* Header with Skip Button */}
      {index === 0 && (
        <View style={styles.header}>
          <TouchableOpacity onPress={skipOnboarding} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: slide.backgroundColor }]}>
        {renderIcon(slide)}
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        {/* Page Indicators */}
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToSlide(i)}
              style={[
                styles.paginationDot,
                i === currentIndex ? styles.paginationDotActive : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={() => goToSlide(currentIndex - 1)}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#6B46C1" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={nextSlide} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <Ionicons 
              name={currentIndex === slides.length - 1 ? "checkmark" : "chevron-forward"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  slide: {
    width,
    height,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#6B6B6B',
    fontWeight: '500',
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 15,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  slideIcon: {
    marginBottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: width - 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B46C1',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
    maxWidth: 320,
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  paginationDotActive: {
    backgroundColor: '#6B46C1',
  },
  paginationDotInactive: {
    backgroundColor: '#C4B5FD',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B46C1',
    marginLeft: 4,
    fontWeight: '500',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B46C1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#392072ff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 15,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 8,
  },
});