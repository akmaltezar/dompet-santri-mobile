import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splashcreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Homescreen from '../screens/Homescreen';
import Bayar from '../screens/Bayar';
import IsiSaldo from '../screens/IsiSaldo';
import TarikDana from '../screens/TarikDana';
import TransferDana from '../screens/TransferDana';
import DetailTransaksi from '../screens/DetailTransaksi';
import Profile from '../screens/Profile';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

export default class Routers extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Homescreen" component={Homescreen} />
          <Stack.Screen name="IsiSaldo" component={IsiSaldo} />
          <Stack.Screen name="TarikDana" component={TarikDana} />
          <Stack.Screen name="Bayar" component={Bayar} />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerStyle: {backgroundColor: '#8388FF'},
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                color: '#FFF',
                fontWeight: '800',
              },
            }}
          />
          <Stack.Screen name="DetailTransaksi" component={DetailTransaksi} />
          <Stack.Screen name="TransferDana" component={TransferDana} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Riwayat Transaksi" component={RiwayatTransaksi} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
