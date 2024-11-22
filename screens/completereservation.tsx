import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CompleteReservation = ({ route }) => {
  const { reservedDishes, date, totalPrice, name, cellphone, email, numPeople } = route.params;

  // Generate a random reservation number (you can also use any other method like timestamp, etc.)
  const reservationNumber = Math.floor(Math.random() * 1000000);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation Complete!</Text>
      <Text style={styles.details}>Thank you for your reservation, {name}!</Text>

      <Text style={styles.details}>Reservation Number: {reservationNumber}</Text>
      <Text style={styles.details}>Number of People: {numPeople}</Text>

      <Text style={styles.details}>Date and Time: {date.toLocaleString()}</Text>
      <Text style={styles.details}>Total Price: {totalPrice.toFixed(2)}</Text>

      <Text style={styles.details}>Reserved Dishes:</Text>
      {reservedDishes.map((dish, index) => (
        <Text key={index} style={styles.details}>{dish.dishName}</Text>
      ))}

      <Text style={styles.notification}>
        Please keep your reservation number safe for future reference.
      </Text>
    </View>
  );
};

export default CompleteReservation;

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
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  notification: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
