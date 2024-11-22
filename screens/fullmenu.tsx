import { StyleSheet, Text, View, FlatList, Platform, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const FullMenu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    // Load menu from AsyncStorage
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('menu');
        if (savedMenu) {
          const parsedMenu = JSON.parse(savedMenu);
          setMenu(parsedMenu);
          setFilteredMenu(parsedMenu); // Initially, show all items
        }
      } catch (error) {
        console.log('Failed to load menu from AsyncStorage:', error);
      }
    };

    loadMenu();
  }, []);

  useEffect(() => {
    // Filter menu based on selected filter
    if (filter === 'all') {
      setFilteredMenu(menu);
    } else {
      const filtered = menu.filter(item => item.courseType === filter);
      setFilteredMenu(filtered);
    }
  }, [filter, menu]);

  // Function to reserve a dish
  const reserveDish = async (dish) => {
    try {
      // Get existing reserved dishes from AsyncStorage
      const existingDishes = await AsyncStorage.getItem('reservedDishes');
      const reservedDishes = existingDishes ? JSON.parse(existingDishes) : [];

      // Add the new dish to the reserved dishes
      reservedDishes.push(dish);
      await AsyncStorage.setItem('reservedDishes', JSON.stringify(reservedDishes));

      // Navigate to the Reservation screen
      navigation.navigate('reservation', { selectedDish: dish });
    } catch (error) {
      console.log('Failed to reserve dish:', error);
    }
  };

  // Function to navigate to the Reservation screen
  const goToReservation = () => {
    navigation.navigate('reservation');
  };

  // Function to navigate to AverageMenu screen
  const goToAverageMenu = () => {
    navigation.navigate('averageMenu'); // Assuming 'averageMenu' is the name of the AverageMenu screen in your navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Menu</Text>

      {/* Filter Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filter}
          style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
          itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : {}}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Starter" value="starter" />
          <Picker.Item label="Main Meal" value="main_meal" />
          <Picker.Item label="Dessert" value="dessert" />
        </Picker>
      </View>

      {/* Display filtered menu */}
      {filteredMenu.length > 0 ? (
        <FlatList
          data={filteredMenu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              {/* Check if imageUri exists and is valid */}
              {item.imageUri ? (
                <Image 
                  source={{ uri: item.imageUri }} 
                  style={styles.dishImage} 
                  resizeMode="cover" 
                />
              ) : (
                <View style={styles.imagePlaceholder} />
              )}

              <View style={styles.dishDetails}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text>{item.description}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Course Type: {item.courseType}</Text>
                <Button title="Reserve" onPress={() => reserveDish(item)} />
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No items in this category</Text>
      )}

      {/* Navigate to Reservation screen button */}
      <Button title="Go to Reservations" onPress={goToReservation} color="#4CAF50" />

      {/* Button to navigate to the AverageMenu screen */}
      <Button title="Average Menu Prices" onPress={goToAverageMenu} color="#FF9800" />
    </View>
  );
};

export default FullMenu;

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
  pickerContainer: {
    marginBottom: 20,
    ...(Platform.OS === 'ios' ? { paddingHorizontal: 20 } : {}),
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerIOS: {
    height: 200,
    width: '100%',
  },
  pickerItemIOS: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
  },
  dishDetails: {
    flex: 1,
    marginLeft: 15,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});
