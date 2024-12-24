import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  // Handler for the call button press
  const handleCallPress = () => {
    console.log("Call button pressed");
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#079094', // Custom active tab color
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: 'Appointments',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-check-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wellness"
          options={{
            title: 'Wellness',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart-pulse" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: 'Services',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="stethoscope" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="view-dashboard-outline" size={30} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Floating Call Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleCallPress}
      >
        <MaterialCommunityIcons name="phone-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#079094',
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
