import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { db } from '../services/firebase';
import { ref, update, onValue } from 'firebase/database';

const TripleToggleSwitch = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Mặc định 'Stop'
  const [animation] = useState(new Animated.Value(60)); // Vị trí khởi đầu cho 'Stop'
  const [motorValue, setMotorValue] = useState(null);

  const switchPositions = [0, 60, 120]; // Vị trí cho Up, Stop, Down
  const labels = ["Up", "Stop", "Down"];

  const handlePress = (index) => {
    Animated.timing(animation, {
      toValue: switchPositions[index],
      duration: 300,
      useNativeDriver: true, // Sử dụng native driver cho hiệu suất tốt hơn
    }).start();
    setSelectedIndex(index);
    updateMotorValue(labels[index]);
  };

  const updateMotorValue = async (value) => {
    value = value.toLowerCase();
    try {
      await update(ref(db, 'Car/'), { motor: value });
    } catch (error) {
      console.error('Lỗi cập nhật dữ liệu: ', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const motorRef = ref(db, "Car/");
        onValue(motorRef, (snapshot) => {
          const data = snapshot.val();
          setMotorValue(data?.motor || 'stop'); // Mặc định là 'stop' nếu dữ liệu không có
        });
      } catch (error) {
        console.error('Lỗi lấy dữ liệu: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const index = determineIndex();
    Animated.timing(animation, {
      toValue: switchPositions[index],
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSelectedIndex(index);
  }, [motorValue]);

  const determineIndex = () => {
    switch (motorValue) {
      case 'up': return 0;
      case 'down': return 2;
      default: return 1; // Mặc định là 'Stop'
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Animated.View
          style={[
            styles.switch,
            { transform: [{ translateY: animation }] },
          ]}
        />
        {labels.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.labelContainer}
            onPress={() => handlePress(index)}
          >
            <Text style={[styles.label, selectedIndex === index && styles.selectedLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'column',
    alignItems: 'center',
    width: 100,
    height: 180,
    borderRadius: 25,
    backgroundColor: '#4d4d4d',
    position: 'relative',
  },
  switch: {
    position: 'absolute',
    height: 60,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  selectedLabel: {
    color: 'black',
  },
});

export default TripleToggleSwitch;
