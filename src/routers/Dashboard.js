import React, {Component} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import DashboardPengajuan from '../screens/DashboardPengajuan/index';
import DashboardRiwayat from '../screens/DashboardRiwayat/index';

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
        <Tab.Screen name="Pengajuan" component={DashboardPengajuan} />
        <Tab.Screen name="Riwayat" component={DashboardRiwayat} />
      </Tab.Navigator>
    );
  }
}
