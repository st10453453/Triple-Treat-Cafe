import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/itu.png')}style={styles.Logo}/>

      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('chef')}>
        <Text style={styles.buttonText}>Login to Chef</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('fullmenu')}>
        <Text style={styles.buttonText}>Full Menu</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
