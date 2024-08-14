import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { db } from '../services/firebase';
import { ref, update, onValue } from 'firebase/database';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false); // State to manage switch status
  const [animation] = useState(new Animated.Value(0)); // Animation state
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Vị trí của switch cho từng trạng thái
  const switchPosition = isOn ? 50 : 0; // Toggle between 0 and 50
  const switchColor = isOn ? 'green' : 'red'; // Toggle color based on status

  // Function to handle toggle press
  const handlePress = () => {
    // Update the Firebase database
    update(ref(db, 'Car/'), { led: isOn ? 'off' : 'on' });

    // Toggle the switch state
    setIsOn(!isOn);
  };

  useEffect(() => {
    const fetchData = () => {
      const ledRef = ref(db, 'Car/');
      const unsubscribe = onValue(ledRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newIsOn = data.led === 'on';
          if (newIsOn !== isOn) {
            setIsOn(newIsOn);
          }
        }
        setLoading(false); // Set loading to false once data is fetched
      });

      return () => unsubscribe(); // Cleanup the subscription on unmount
    };

    fetchData();
  }, [isOn]); // Dependency array to refetch data when `isOn` changes

  useEffect(() => {
    // Animate the switch position when `isOn` changes
    Animated.timing(animation, {
      toValue: switchPosition,
      duration: 300,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [isOn]); // Dependency array to trigger animation when `isOn` changes

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Animated.View
          style={[
            styles.switch,
            { transform: [{ translateX: animation }], backgroundColor: switchColor },
          ]}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>{isOn ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    position: 'relative',
  },
  switch: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  toggleButton: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ToggleSwitch;
