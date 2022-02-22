import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/HomeScreen';
import IsiSaldoScreen from '../screens/IsiSaldoScreen';
import TarikDanaScreen from '../screens/tarikdana';
import ScannerScreen from '../screens/ScannerScreen';

import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

export default class Routers extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="IsiSaldoScreen" component={IsiSaldoScreen} />
          <Stack.Screen name="TarikDanaScreen" component={TarikDanaScreen} />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerStyle: {backgroundColor: '#8388FF'},
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#FFF',
                fontWeight: '800',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
