import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Card } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';

const manageOptions = [
  { id: 1, title: 'General Consultation', icon: 'hospital-box' },
  { id: 2, title: 'Specialist', icon: 'account-heart' },
  { id: 3, title: 'Telehealth', icon: 'video' },
  { id: 4, title: 'Diagnostic Services', icon: 'microscope' },
];

const services = [
  { name: "Cardiology", icon: "heart-pulse" },
  { name: "Clinical Genetics", icon: "dna" },
  { name: "Clinical Immunology", icon: "shield-virus" },
  { name: "Dermatology", icon: "hand-water" },
  { name: "Endocrinology", icon: "blood-bag" },
  { name: "General Medicine", icon: "stethoscope" },
  { name: "Gerontology", icon: "human-cane" },
  { name: "Haematology", icon: "test-tube" },
  { name: "Hospital-in-the-Home", icon: "home-heart" },
  { name: "Infectious Disease", icon: "biohazard" },
  { name: "Maternity", icon: "baby" },
  { name: "Nephrology", icon: "kidney" },
  { name: "Neurology", icon: "brain" },
  { name: "Neuropsychology", icon: "brain" },
  { name: "Oncology", icon: "ribbon" },
  { name: "Paediatrics", icon: "baby-face-outline" },
  { name: "Radiation", icon: "radiation" },
  { name: "Rehabilitation", icon: "human-walker" },
  { name: "Respiratory Medicine", icon: "lungs" },
  { name: "Rheumatology", icon: "bone" },
  { name: "Sleep Centre", icon: "power-sleep" },
];


const subServices = {
  Cardiology: [
    { title: "ECG", description: "Electrocardiogram for heart monitoring", price: "$50" },
    { title: "Stress Test", description: "Heart stress testing", price: "$100" },
  ],
  Dermatology: [
    { title: "Skin Check", description: "Comprehensive skin analysis", price: "$80" },
    { title: "Mole Removal", description: "Safe and effective mole removal", price: "$120" },
  ],
};

const telehealthDescription = {
  title: "Telehealth Services",
  description: "Get medical advice from the comfort of your home through our telehealth services.",
  callToAction: "Start a Telehealth Session",
};

const diagnosticDescription = {
  title: "Diagnostic Services",
  description: "Comprehensive diagnostic services including lab tests, imaging, and more.",
  callToAction: "Request Diagnostic Services via WhatsApp",
};

export default function ServicesPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableTimeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
  ];

  const toggleService = (service) => {
    setExpandedService((prevService) => (prevService === service ? null : service));
  };

  const handleTelehealthSession = () => {
    if (selectedDate && selectedTime) {
      Alert.alert("Telehealth Session", `Your session is scheduled for ${selectedDate} at ${selectedTime}`);
    } else {
      Alert.alert("Telehealth Session", "Please select a date and time for the session.");
    }
  };

  const handleDiagnosticRequest = () => {
    const message = "Hello, I would like to request diagnostic services. Please let me know the next steps.";
    const url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=+1234567890`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open WhatsApp. Please ensure it is installed on your device.");
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Manage Options</Text>
      <View style={styles.gridContainer}>
        {manageOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.gridCard}
            onPress={() => setSelectedOption(option.id)}
          >
            <MaterialCommunityIcons
              name={option.icon}
              size={36}
              color="#079094"
              style={styles.optionIcon}
            />
            <Text style={styles.gridCardText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption === 1 && (
        <View>
          <Text style={styles.sectionTitle}>Services</Text>
          {services.map((service) => (
            <View key={service.name}>
              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => toggleService(service.name)}
              >
                <View style={styles.iconWithText}>
                  <MaterialCommunityIcons
                    name={service.icon}
                    size={24}
                    color="#079094"
                    style={styles.serviceIcon}
                  />
                  <Text style={styles.serviceText}>{service.name}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>

              {expandedService === service.name && subServices[service.name] && (
                <View style={styles.subServiceContainer}>
                  {subServices[service.name].map((subService, index) => (
                    <Card key={index} style={styles.subServiceCard}>
                      <Text style={styles.subServiceTitle}>{subService.title}</Text>
                      <Text style={styles.subServiceDescription}>{subService.description}</Text>
                      <View style={styles.priceBar}>
                        <Text style={styles.priceText}>{subService.price}</Text>
                      </View>
                    </Card>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {selectedOption === 2 && (
        <View>
          <Text style={styles.sectionTitle}>Top Specialists</Text>
          { [
  "Cardiologists",
  "Dermatologists",
  "Endocrinologists",
  "Neurologists",
  "Pediatricians",
  "Oncologists",
].map((specialist) => (
            <TouchableOpacity key={specialist} style={styles.serviceItem}>
              <Text style={styles.serviceText}>{specialist}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedOption === 3 && (
        <View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{telehealthDescription.title}</Text>
            <Text style={styles.descriptionText}>{telehealthDescription.description}</Text>

            <Text style={styles.descriptionTitle}>Select a Date</Text>
            <Calendar
              markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
              onDayPress={(day) => setSelectedDate(day.dateString)}
            />

            {selectedDate && (
              <>
                <Text style={styles.descriptionTitle}>Select a Time Slot</Text>
                {availableTimeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={styles.timeSlot}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={styles.timeSlotText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {selectedDate && selectedTime && (
              <TouchableOpacity style={styles.callToActionButton} onPress={handleTelehealthSession}>
                <Text style={styles.callToActionText}>{telehealthDescription.callToAction}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {selectedOption === 4 && (
        <View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{diagnosticDescription.title}</Text>
            <Text style={styles.descriptionText}>{diagnosticDescription.description}</Text>
            <TouchableOpacity style={styles.callToActionButton} onPress={handleDiagnosticRequest}>
              <Text style={styles.callToActionText}>{diagnosticDescription.callToAction}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F7F8FA",
    paddingTop: 100,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
  },
  gridCardText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  optionIcon: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceIcon: {
    marginRight: 10,
  },
  serviceText: {
    fontSize: 16,
    color: "#333",
  },
  subServiceContainer: {
    paddingLeft: 15,
    paddingTop: 10,
  },
  subServiceCard: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  subServiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subServiceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  priceBar: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 5,
  },
  priceText: {
    fontSize: 14,
    color: "#333",
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 2,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  timeSlot: {
    padding: 10,
    backgroundColor: "#F0F8FF",
    borderRadius: 8,
    marginBottom: 10,
  },
  timeSlotText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  callToActionButton: {
    marginTop: 20,
    backgroundColor: "#079094",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  callToActionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

