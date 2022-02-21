import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const ww = Dimensions.get('window').width;

export default class Login extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={{alignSelf: 'flex-start', marginLeft: 50}}>
          <Text style={{color: '#8388FF', fontSize: 24}}>Dompet Santri</Text>
          <Text
            style={{color: '#8388FF', fontSize: 24, alignSelf: 'flex-start'}}>
            Login
          </Text>
        </View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                // source={require('../assets/images/email.png')}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <TextInput placeholder="Email" style={{width: 220}} />
            </View>
            <View
              style={{backgroundColor: '#8388FF', height: 1, width: ww - 100}}
            />
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                // source={require('../assets/images/lock.png')}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <TextInput placeholder="Kata Sandi" style={{width: 220}} />
            </View>
            <View
              style={{backgroundColor: '#8388FF', height: 1, width: ww - 100}}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')}
            style={{
              backgroundColor: '#8388FF',
              height: 45,
              width: ww - 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Text style={{color: 'white'}}>MASUK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#8388FF',
              height: 45,
              width: ww - 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>DAFTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
