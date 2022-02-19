import React, {Component} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import DashboardPengajuanScreen from '../screens/DashboardPengajuanScreen';
import Dash2 from '../screens/dash2'

const Tab = createMaterialTopTabNavigator();

export default class Dashboard extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#8388FF',
          tabBarLabelStyle: {fontSize: 14, fontFamily: 'Montserrat-SemiBold'},
          tabBarStyle: {backgroundColor: '#FFF'},
        }}>
        <Tab.Screen name="Pengajuan" component={DashboardPengajuanScreen} />
        <Tab.Screen name="Riwayat" component={Dash2} />
      </Tab.Navigator>
    );
  }
}
