import React, {Component} from 'react';
import HomeScreen from '../screens/HomeScreen';
import DashboardPengajuanScreen from '../screens/DashboardPengajuanScreen';
import IsiSaldoScreen from '../screens/IsiSaldoScreen';
import ScannerScreen from '../screens/ScannerScreen';

export default class Routers extends Component {
  render() {
    return (
      // <HomeScreen />
      // <DashboardPengajuanScreen />
      // <IsiSaldoScreen />
      <ScannerScreen />
    );
  }
}
