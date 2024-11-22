import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AverageMenu = () => {
  const [averageData, setAverageData] = useState([]);

  useEffect(() => {
    const calculateAveragePrices = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('menu');
        if (savedMenu) {
          const menu = JSON.parse(savedMenu);
          const priceSums = {
            starter: 0,
            main_meal: 0,
            dessert: 0,
          };
          const count = {
            starter: 0,
            main_meal: 0,
            dessert: 0,
          };
          const dishNames = {
            starter: [],
            main_meal: [],
            dessert: [],
          };

          // Calculate total prices, counts, and collect dish names for each category
          menu.forEach(dish => {
            if (dish.courseType in priceSums) {
              priceSums[dish.courseType] += parseFloat(dish.price);
              count[dish.courseType] += 1;
              dishNames[dish.courseType].push(dish.dishName);
            }
          });

          // Calculate average prices
          const averages = {
            starter: priceSums.starter / (count.starter || 1),
            main_meal: priceSums.main_meal / (count.main_meal || 1),
            dessert: priceSums.dessert / (count.dessert || 1),
          };

          // Set up data for FlatList
          setAverageData([
            { category: 'Starter', averagePrice: averages.starter, dishes: dishNames.starter },
            { category: 'Main Meal', averagePrice: averages.main_meal, dishes: dishNames.main_meal },
            { category: 'Dessert', averagePrice: averages.dessert, dishes: dishNames.dessert },
          ]);
        }
      } catch (error) {
        console.log('Failed to load menu from AsyncStorage:', error);
      }
    };

    calculateAveragePrices();
  }, []);

  const renderAverageItem = ({ item }) => (
    <View style={styles.averageItem}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.averagePrice}>Average Price: {item.averagePrice.toFixed(2)}</Text>
      <Text style={styles.dishNames}>Dishes: {item.dishes.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average Menu Prices</Text>
      <FlatList
        data={averageData}
        keyExtractor={(item) => item.category}
        renderItem={renderAverageItem}
      />
    </View>
  );
};

export default AverageMenu;

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
  averageItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  averagePrice: {
    fontSize: 16,
  },
  dishNames: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});
