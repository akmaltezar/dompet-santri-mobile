import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DashboardPengajuanScreen from '../screens/DashboardPengajuanScreen';
import IsiSaldoScreen from '../screens/IsiSaldoScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Stack = createNativeStackNavigator();

export default class Routers extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DashboardPengajuanScreen" component={DashboardPengajuanScreen} />
          <Stack.Screen name="IsiSaldoScreen" component={IsiSaldoScreen} />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
