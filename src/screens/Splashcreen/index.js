import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          this.props.navigation.replace('Homescreen');
        } else {
          this.props.navigation.replace('Login');
        }
      });
    }, 3000);
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#8388FF',
        }}>
        <Text
          style={{color: 'white', fontSize: 30, fontFamily: 'Montserrat-Bold'}}>
          DS
        </Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}
