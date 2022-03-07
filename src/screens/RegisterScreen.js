import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ww = Dimensions.get('window').width;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      roles: 'merchant',
      loading: false,
    };
  }

  Register = () => {
    this.setState({loading: true});

    // fetch('https://aplikasi-santri.herokuapp.com/api/registeruser', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: this.state.name,
    //     email: this.state.email,
    //     password: this.state.password,
    //     password_confirmation: this.state.password_confirmation,
    //     roles: this.state.roles,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
    //     if (result.code === ) {

    //     }
    //     this.props.navigation.replace('LoginScreen');
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   })
    var formdata = new FormData();
    formdata.append('name', this.state.name);
    formdata.append('email', this.state.email);
    formdata.append('password', this.state.password);
    formdata.append('password_confirmation', this.state.password_confirmation);
    formdata.append('roles', this.state.roles);

    var requestOptions = {
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
        console.log(result)
        if(result.code === 200) {
          alert("Register Success")
          this.props.navigation.navigate('LoginScreen')
        } else {
          alert("Fill the form correctly.")
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => this.setState({loading: false}));
  };

  render() {
    return (
      // <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#FFF'}}>
      //   <Text style={[styles.text1, styles.ds]}>Dompet Santri</Text>
      //   <Text style={[styles.text1, styles.rg]}>Register</Text>

      //   <View style={styles.tibox}>
      //     <View style={styles.imgisi}>
      //       <Image
      //         style={styles.imgg}
      //         source={require('../assets/images/org.png')}
      //       />
      //       <TextInput
      //         placeholder="Nama Lengkap"
      //         style={styles.ti}
      //         onChangeText={value => this.setState({name: value})}
      //       />
      //     </View>
      //     <View style={styles.imgisi}>
      //       <Image
      //         style={styles.imgg}
      //         source={require('../assets/images/mail.png')}
      //       />
      //       <TextInput
      //         placeholder="Email"
      //         style={styles.ti}
      //         onChangeText={value => this.setState({email: value})}
      //       />
      //     </View>
      //     <View style={styles.imgisi}>
      //       <Image
      //         style={styles.imgg}
      //         source={require('../assets/images/lock.png')}
      //       />
      //       <TextInput
      //         placeholder="Kata Sandi"
      //         style={styles.ti}
      //         onChangeText={value => this.setState({password: value})}
      //       />
      //     </View>
      //   </View>

      //   <View style={styles.tibutton}>
      //     <TouchableOpacity style={styles.df} onPress={() => this.Register()}>
      //       <Text style={styles.dftext}>DAFTAR</Text>
      //     </TouchableOpacity>

      //     <TouchableOpacity
      //       style={[styles.df, styles.bu2]}
      //       onPress={() => this.props.navigation.navigate('LoginScreen')}>
      //       <Text style={styles.dftext}>MASUK</Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={{alignSelf: 'flex-start', marginLeft: 50}}>
          <Text
            style={{
              color: '#8388FF',
              fontSize: 24,
              fontFamily: 'Montserrat-Bold',
            }}>
            Dompet Santri
          </Text>
          <Text
            style={{
              color: '#8388FF',
              fontSize: 24,
              alignSelf: 'flex-start',
              fontFamily: 'Montserrat-Bold',
            }}>
            Register
          </Text>
        </View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="account-outline"
                size={25}
                color="#8388FF"
                // style={{width: 24, height: 24, marginRight: 10}}
              />
              <TextInput
                placeholder="Nama Lengkap"
                style={{width: 220}}
                onChangeText={name => this.setState({name})}
                keyboardType="default"
              />
            </View>
            <View
              style={{backgroundColor: '#8388FF', height: 1, width: ww - 100}}
            />
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="email-outline"
                size={25}
                color="#8388FF"
                // style={{width: 24, height: 24, marginRight: 10}}
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
              <Icon
                name="lock-outline"
                size={25}
                color="#8388FF"
                // style={{width: 24, height: 24, marginRight: 10}}
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
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="lock-outline"
                size={25}
                color="#8388FF"
                // style={{width: 24, height: 24, marginRight: 10}}
              />
              <TextInput
                placeholder="Konfirmasi Kata Sandi"
                style={{width: 220}}
                onChangeText={password_confirmation =>
                  this.setState({password_confirmation})
                }
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
            onPress={() => this.Register()}
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
              <Text style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                DAFTAR
              </Text>
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
            }}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
              MASUK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text1: {
    color: '#8388FF',
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 45,
  },
  ds: {
    marginTop: 65,
  },
  ti: {
    width: 271,
    borderBottomWidth: 1,
    borderBottomColor: '#8388FF',
    paddingLeft: 35,
  },
  tibox: {
    alignItems: 'center',
    marginLeft: -15,
  },
  tibutton: {
    alignItems: 'center',
    marginTop: 50,
  },
  df: {
    height: 45,
    width: 271,
    backgroundColor: '#8388FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 10,
  },
  dftext: {
    color: 'white',
    fontWeight: 'bold',
  },
  bu2: {
    marginTop: 30,
  },
  imgisi: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imgg: {
    marginTop: 10,
    left: 20,
  },
});
