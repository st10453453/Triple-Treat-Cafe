import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const ChefMenu = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseType, setCourseType] = useState('starter');
  const [menu, setMenu] = useState([]);
  const navigation = useNavigation();

  const addDish = () => {
    if (dishName && description && price) {
      const newDish = {
        dishName,
        description,
        price,
        courseType
      };

      setMenu([...menu, newDish]); // Add new dish to the menu list

      Alert.alert('Success', 'Dish added to menu successfully!');
      
      // Navigate to FullMenu and pass the menu as a parameter
      navigation.navigate('fullmenu', { menu });

      // Clear inputs
      setDishName('');
      setDescription('');
      setPrice('');
      setCourseType('starter');
    } else {
      Alert.alert('Error', 'Please fill all fields before adding the dish.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name"
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Course Type</Text>
      <Picker
        selectedValue={courseType}
        style={styles.picker}
        onValueChange={(itemValue) => setCourseType(itemValue)}
      >
        <Picker.Item label="Starter" value="starter" />
        <Picker.Item label="Main Meal" value="main_meal" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>

      <Button title="Add Dish" onPress={addDish} />
    </View>
  );
};

export default ChefMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

