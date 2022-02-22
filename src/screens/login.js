import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ww = Dimensions.get('window').width;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  Login = () => {
    this.setState({loading: true});

    var formdata = new FormData();
    formdata.append('email', this.state.email);
    formdata.append('password', this.state.password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://aplikasi-santri.herokuapp.com/api/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.data.token);
        if (result.message === 'Success') {
          await AsyncStorage.setItem('Token', result.data.token)
          alert('Login Success.');
          this.props.navigation.replace('HomeScreen');
        } else {
          alert('Fill the form correctly.');
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => this.setState({loading: false}));
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

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
              <TextInput
                placeholder="Email"
                style={{width: 220}}
                onChangeText={email => this.setState({email})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
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
              <TextInput
                placeholder="Kata Sandi"
                style={{width: 220}}
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
              />
            </View>
            <View
              style={{backgroundColor: '#8388FF', height: 1, width: ww - 100}}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.Login()}
            style={{
              backgroundColor: '#8388FF',
              height: 45,
              width: ww - 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginBottom: 20,
            }}>
            {this.state.loading ? (
              <ActivityIndicator size={25} color="#FFF" />
            ) : (
              <Text style={{color: 'white'}}>MASUK</Text>
            )}
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
