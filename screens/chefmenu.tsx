import { StyleSheet, Text, View, TextInput, Button, Alert, Platform, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // For Expo use expo-image-picker
// or import { launchImageLibrary } from 'react-native-image-picker'; for non-Expo apps

const ChefMenu = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseType, setCourseType] = useState('starter');
  const [menu, setMenu] = useState([]);
  const [imageUri, setImageUri] = useState(null); // New state for image URI
  const navigation = useNavigation();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('menu');
        if (savedMenu) {
          setMenu(JSON.parse(savedMenu));
        }
      } catch (error) {
        console.log('Failed to load menu from AsyncStorage:', error);
      }
    };

    loadMenu();
  }, []);

  const addDish = async () => {
    if (dishName && description && price) {
      const newDish = {
        dishName,
        description,
        price,
        courseType,
        imageUri // Include image URI in the dish object
      };

      const newMenu = [...menu, newDish]; // Update menu with new dish
      setMenu(newMenu);

      try {
        // Save updated menu to AsyncStorage
        await AsyncStorage.setItem('menu', JSON.stringify(newMenu));
        Alert.alert('Success', 'Dish added to menu successfully!');
        
        // Navigate to FullMenu and pass the menu as a parameter
        navigation.navigate('fullmenu', { menu: newMenu });
      } catch (error) {
        Alert.alert('Error', 'Failed to save dish. Try again.');
      }

      // Clear inputs
      setDishName('');
      setDescription('');
      setPrice('');
      setCourseType('starter');
      setImageUri(null); // Clear the image URI
    } else {
      Alert.alert('Error', 'Please fill all fields before adding the dish.');
    }
  };

  const removeLastDish = async () => {
    if (menu.length > 0) {
      const updatedMenu = menu.slice(0, -1); // Remove the last dish
      setMenu(updatedMenu);

      try {
        // Update AsyncStorage with the new menu
        await AsyncStorage.setItem('menu', JSON.stringify(updatedMenu));
        Alert.alert('Success', 'Last dish removed successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to remove dish. Try again.');
      }
    } else {
      Alert.alert('Error', 'No dish to remove.');
    }
  };

  // Image Picker function
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.uri); // Store the image URI in state
      }
    } catch (error) {
      console.log('Error picking image:', error);
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
        onValueChange={(itemValue) => setCourseType(itemValue)}
        style={Platform.OS === 'ios' ? styles.pickerIOS : styles.pickerAndroid}
      >
        <Picker.Item label="Starter" value="starter" />
        <Picker.Item label="Main Meal" value="main_meal" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>

      {/* Image Picker Button */}
      <Button title="Pick Image" onPress={pickImage} />
      
      {/* Display selected image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button title="Add Dish" onPress={addDish} />
      <View style={styles.removeButton}>
        <Button title="Remove Last Dish" color="red" onPress={removeLastDish} />
      </View>
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
  pickerIOS: {
    height: 50, // iOS picker height
    width: '100%',
    marginBottom: 20,
  },
  pickerAndroid: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  removeButton: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
