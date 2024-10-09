import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Chef from './screens/chef';
import fullmenu from './screens/fullmenu';
import ChefMenu from './screens/chefmenu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name="home" component={Home} options={{ title: 'Triple Treat Cafe' }} />
        <Stack.Screen name="chef" component={Chef} options={{ title: 'Chef Login' }} />
        <Stack.Screen name='fullmenu' component={fullmenu} options={{ title: 'Full Menu' }} />
        <Stack.Screen name="ChefMenu" component={ChefMenu} options={{ title: 'Chef Menu' }} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
