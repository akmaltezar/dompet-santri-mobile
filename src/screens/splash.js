import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.replace('LoginScreen');
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
        <Text style={{color: 'white', fontSize: 30}}>DS</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}
