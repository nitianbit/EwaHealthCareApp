import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { Card } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');

const services = [
  { id: 1, src: 'https://i.ibb.co/Z2sDJ7M/english-teacher-doing-her-lessons-online.jpg', text: 'Online Consultation' },
  { id: 2, src: 'https://i.ibb.co/rdnRXFt/gynecologist-evaluating-pregnancy-with-patient.jpg', text: 'OPD/Clinical Appointment' },
  { id: 3, src: 'https://i.ibb.co/89hswTM/close-up-laboratory-desk-with-professional-research-equipment-tray-vacutainers-with-blood-microscopi.jpg', text: 'Book Lab Tests' },
  { id: 4, src: 'https://i.ibb.co/7JZwFdq/450079-PEZQXQ-805.jpg', text: 'Emergency Ambulance' },
];

const carouselItems = [
  { id: 1, imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg', text: 'Your Health, Our Priority' },
  { id: 2, imageUrl: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg', text: 'Comprehensive Care for All' },
  { id: 3, imageUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg', text: 'Stay Fit, Stay Healthy' },
];

const healthTips = [
  { id: 1, icon: 'local-drink', tip: 'Stay Hydrated' },
  { id: 2, icon: 'directions-run', tip: 'Exercise Daily' },
  { id: 3, icon: 'nightlight-round', tip: 'Sleep Well' },
  { id: 4, icon: 'favorite-border', tip: 'Heart Health' },
];

const specialists = [
  { id: 1, icon: 'favorite', name: 'Cardiologist', description: 'Heart and blood vessels' },
  { id: 2, icon: 'face', name: 'Dermatologist', description: 'Skin, hair, and nails' },
  { id: 3, icon: 'visibility', name: 'Ophthalmologist', description: 'Eyes and vision' },
];

export default function HomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
    scrollX.setValue(event.nativeEvent.contentOffset.x);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Profile and Bell Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.replace('/stack/profile'); }}>
          <View style={styles.profileContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>JD</Text>
            </View>
            <Text style={styles.profileName}>John Doe</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellIcon}>
          <MaterialIcons name="notifications" size={30} color="#005a9c" />
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.carouselScrollView}
        >
          {carouselItems.map((item) => (
            <Card key={item.id} style={styles.carouselCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
              <Text style={styles.carouselText}>{item.text}</Text>
            </Card>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: index === activeIndex ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/services')}>
          <Text style={styles.exploreLink}>Explore All <MaterialIcons name="arrow-forward" size={16} /></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceContainer}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard} onPress={() => router.replace('/(tabs)/explore')}>
            <Image source={{ uri: service.src }} style={styles.serviceImage} />
            <Text style={styles.serviceText}>{service.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* New Section: Health Tips */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.healthTipsContainer}>
        {healthTips.map((tip) => (
          <View key={tip.id} style={styles.healthTipCard}>
            <MaterialIcons name={tip.icon} size={40} color="#005a9c" />
            <Text style={styles.healthTipText}>{tip.tip}</Text>
          </View>
        ))}
      </ScrollView>

      {/* New Section: Featured Specialists */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Specialists</Text>
      </View>
      <View style={styles.specialistsContainer}>
        {specialists.map((specialist) => (
          <View key={specialist.id} style={styles.specialistCard}>
            <MaterialIcons name={specialist.icon} size={40} color="#005a9c" />
            <Text style={styles.specialistName}>{specialist.name}</Text>
            <Text style={styles.specialistDescription}>{specialist.description}</Text>
            <TouchableOpacity style={styles.specialistButton}>
              <Text style={styles.specialistButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: '#F7F8FA',
    paddingTop: 70,
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#005a9c',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    color: '#333',
  },
  bellIcon: {
    marginTop: 5,
  },
  carouselContainer: {
    marginBottom: 30,
  },
  carouselScrollView: {
    paddingHorizontal: 20,
  },
  carouselCard: {
    width: screenWidth - 40,
    marginRight: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  carouselText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#005a9c',
    margin: 5,
  },
  sectionHeader: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  exploreLink: {
    fontSize: 16,
    color: '#005a9c',
    fontWeight: 'bold',
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  serviceText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  healthTipsContainer: {
    marginBottom: 20,
  },
  healthTipCard: {
    width: 120,
    backgroundColor: '#E8F4FA',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthTipText: {
    marginTop: 10,
    fontSize: 14,
    color: '#005a9c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialistsContainer: {
    marginBottom: 20,
  },
  specialistCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  specialistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  specialistDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  specialistButton: {
    backgroundColor: '#005a9c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  specialistButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
