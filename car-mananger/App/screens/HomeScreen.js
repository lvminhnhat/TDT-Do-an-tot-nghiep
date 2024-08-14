// src/screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TripleToggleSwitch from '../components/TripleToggleSwitch';
import ToggleSwitch from '../components/ToggleSwitch'; // Fixed the import path
import SpeechToTextWebComponent from '../components/SpeechToTextWeb';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        
        <View style={styles.section}>
            <Text style={styles.label}>Điều khiển Kính</Text>
            <TripleToggleSwitch />
        </View>
        <View style={styles.section}>
            <Text style={styles.label}>Nhìn ra ngoài</Text>
            <ToggleSwitch />
        </View>
        
        <view style={styles.section}>
            <Text style={styles.label}>Nhận dạng giọng nói</Text>
            <SpeechToTextWebComponent />

        </view>

        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
