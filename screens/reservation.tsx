import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const Reservation = () => {
  const [reservedDishes, setReservedDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [numPeople, setNumPeople] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const savedDishes = await AsyncStorage.getItem('reservedDishes');
        if (savedDishes) {
          const dishes = JSON.parse(savedDishes);
          setReservedDishes(dishes);
          const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
          setTotalPrice(total);
        }
      } catch (error) {
        console.log('Failed to load reservations from AsyncStorage:', error);
      }
    };

    loadReservations();
  }, []);

  const clearReservations = async () => {
    try {
      await AsyncStorage.removeItem('reservedDishes');
      setReservedDishes([]);
      setTotalPrice(0);
      setDate(new Date());
    } catch (error) {
      console.log('Failed to clear reservations:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const validateInputs = () => {
    // Check if name is empty
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return false;
    }

    // Check if cellphone number is valid
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit number format
    if (!phoneRegex.test(cellphone)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit cellphone number.');
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }

    // Check if number of people is a positive integer
    if (isNaN(numPeople) || numPeople <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid number of people.');
      return false;
    }

    return true;
  };

  const completeReservation = () => {
    // Validate inputs before proceeding
    if (validateInputs()) {
      navigation.navigate('completereservation', {
        reservedDishes,
        date,
        totalPrice,
        name,
        cellphone,
        email,
        numPeople,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation</Text>
      <ScrollView>
        {reservedDishes.length > 0 ? (
          <View>
            {reservedDishes.map((dish, index) => (
              <View key={index} style={styles.dishItem}>
                <Text style={styles.dishName}>{dish.dishName}</Text>
                <Text>{dish.description}</Text>
                <Text>Price: {dish.price}</Text>
                <Text>Course Type: {dish.courseType}</Text>
              </View>
            ))}
            <Text style={styles.total}>Total: {totalPrice.toFixed(2)}</Text>
          </View>
        ) : (
          <Text>No dishes reserved yet.</Text>
        )}

        {/* New Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your cellphone number"
            value={cellphone}
            onChangeText={setCellphone}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Number of people"
            value={numPeople}
            onChangeText={setNumPeople}
            keyboardType="numeric"
          />
        </View>

        {/* Date and Time Selection */}
        <View style={styles.dateContainer}>
          <Button title="Choose Date and Time" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.dateText}>
            Selected: {date.toLocaleString()}
          </Text>
        </View>
      </ScrollView>

      <Button title="Complete Reservation" onPress={completeReservation} color="#4CAF50" />
      <Button title="Clear Reservations" onPress={clearReservations} color="#ff4d4d" />
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dishItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dateContainer: {
    marginTop: 20,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

