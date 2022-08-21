import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      roles: 'customer',
      loading: false,
      eye: true,
      eye2: true,
    };
  }

  Register = () => {
    this.setState({loading: true});
    let formdata = new FormData();
    formdata.append('name', this.state.name);
    formdata.append('email', this.state.email);
    formdata.append('password', this.state.password);
    formdata.append('password_confirmation', this.state.password_confirmation);
    formdata.append('roles', this.state.roles);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://aplikasi-santri.herokuapp.com/api/registeruser',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.code === 200) {
          alert('Register Success');
          this.props.navigation.navigate('LoginScreen');
        } else {
          alert(result.password);
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
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Dompet Santri</Text>
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.inputView}>
            <Icon name="account-outline" size={28} color="#8388FF" />
            <TextInput
              placeholder="Nama Lengkap"
              onChangeText={name => this.setState({name})}
              style={styles.input}
            />
          </View>
          <View style={styles.inputView}>
            <Icon name="email-outline" size={28} color="#8388FF" />
            <TextInput
              placeholder="Alamat Email"
              onChangeText={email => this.setState({email})}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputView2}>
            <Icon name="lock-outline" size={28} color="#8388FF" />
            <TextInput
              onChangeText={password => this.setState({password})}
              placeholder="Kata Sandi"
              secureTextEntry={this.state.eye}
              style={styles.input}
            />
            <TouchableOpacity
              onPressOut={() => this.setState({eye: !this.state.eye})}>
              <Icon name="eye-outline" size={28} color="#8388FF" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView2}>
            <Icon name="lock-check-outline" size={28} color="#8388FF" />
            <TextInput
              onChangeText={password_confirmation =>
                this.setState({password_confirmation})
              }
              secureTextEntry={this.state.eye2}
              placeholder="Konfirmasi Kata Sandi"
              style={styles.input}
            />
            <TouchableOpacity
              onPressOut={() => this.setState({eye2: !this.state.eye2})}>
              <Icon name="eye-outline" size={28} color="#8388FF" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.Register()}>
            {this.state.loading ? (
              <ActivityIndicator size={24} color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>DAFTAR</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>MASUK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    marginBottom: '10%',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: '#8388FF',
  },
  inputView: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#8388FF',
    marginBottom: '2%',
  },
  inputView2: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#8388FF',
    marginBottom: '2%',
  },
  input: {
    width: wp('65%'),
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#8388FF',
    width: wp('80%'),
    height: hp('6%'),
    marginBottom: '3%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    fontSize: 17,
  },
});
