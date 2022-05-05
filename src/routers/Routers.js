import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import IsiSaldoScreen from '../screens/IsiSaldoScreen';
import TarikDanaScreen from '../screens/tarikdana';
import ScannerScreen from '../screens/ScannerScreen';
import DetailRiwayat from '../screens/DetailRiwayat';
import DetailPengajuan from '../screens/Pengajuan';
import TransferScreen from '../screens/TransferScreen';
import Profile from '../screens/Profile';
import RiwayatTransaksi from '../screens/RiwayatTransaksi';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

export default class Routers extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
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
                fontFamily: 'Montserrat-Bold',
                color: '#FFF',
                fontWeight: '800',
              },
            }}
          />
          <Stack.Screen name="DetailRiwayat" component={DetailRiwayat} />
          <Stack.Screen name="Detail Pengajuan" component={DetailPengajuan} />
          <Stack.Screen name="TransferScreen" component={TransferScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Riwayat Transaksi" component={RiwayatTransaksi} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
