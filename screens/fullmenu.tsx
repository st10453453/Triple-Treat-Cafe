import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const fullmenu = ({ route }) => {
  const { menu } = route.params; // Get the passed menu from navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Menu</Text>
      {menu.length > 0 ? (
        <FlatList
          data={menu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text>{item.description}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Course Type: {item.courseType}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No items in the menu yet</Text>
      )}
    </View>
  );
};

export default fullmenu;

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
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
