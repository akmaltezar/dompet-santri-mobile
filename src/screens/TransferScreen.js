import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class TransferScren extends Component {
  constructor() {
    super();
    this.state = {
      target: '',
      nominal: '',
      token: '',
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        this.setState({token: value});
      } else {
        this.props.navigation.replace('LoginScreen');
      }
    });
  }

  transfer = () => {
    this.setState({loading: true});

    var formdata = new FormData();
    formdata.append('target', this.state.target);
    formdata.append('nominal', this.state.nominal);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch('https://aplikasi-santri.herokuapp.com/api/transfer', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
      .finally(() => this.setState({loading: false}));
  };

  render() {
    return (
<<<<<<< HEAD
      <View>
        <View style={styles.kotak}>
          <TouchableOpacity style={styles.kotakin}>
             <Image source={require('../assets/images/arlf.png')} />
             </TouchableOpacity>
            <Text style={[styles.kotakin , styles.text]}>Transfer Dana</Text>
        </View>
=======
      // <View>
      //   <View style={styles.kotak}>
      //     <TouchableOpacity style={styles.kotakin}>
      //       {/* <Image source={require('./src/assets/images/arlf.png')} /> */}
      //     </TouchableOpacity>
      //     <Text style={[styles.kotakin, styles.text]}>Transfer Dana</Text>
      //   </View>
>>>>>>> 693efbfc16a998a50f8d58cb80dd3bfd4d0d06da

      //   <View style={styles.kotak2}>
      //     <TextInput style={styles.isiin} placeholder="ID Dompet Santri" />
      //     <TextInput style={styles.isiin} placeholder="Jumlah Transfer" />
      //     <TouchableOpacity style={styles.ktf}>
      //       <Text style={styles.text}>Transfer</Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
      <View style={{alignItems: 'center', flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: '#8388FF',
            height: screenHeight * 0.08,
            width: screenWidth * 1,
            paddingHorizontal: 25,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
              color: '#fff',
              marginLeft: 20,
            }}>
            Tarik Dana
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={{
              borderWidth: 1,
              width: screenWidth - 80,
              borderRadius: 5,
              paddingLeft: 20,
              marginBottom: 10,
            }}
            placeholder="ID Dompet Santri"
            onChangeText={target => this.setState({target})}
            keyboardType={'number-pad'}
          />
          <TextInput
            style={{
              borderWidth: 1,
              width: screenWidth - 80,
              borderRadius: 5,
              paddingLeft: 20,
              marginBottom: 20,
            }}
            placeholder="Jumlah Transfer"
            onChangeText={nominal => this.setState({nominal})}
            keyboardType={'number-pad'}
          />
          <TouchableOpacity
            onPress={() => this.transfer()}
            style={{
              backgroundColor: '#8388FF',
              width: screenWidth - 80,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            {this.state.loading ? (
              <ActivityIndicator size={25} color="#FFF" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Transfer
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  kotak: {
    height: 50,
    width: 540,
    backgroundColor: '#8388FF',
    flexDirection: 'row',
  },
  kotakin: {
    marginTop: 12,
    marginLeft: 8,
    fontSize: 20,
  },
  kotak2: {
    alignItems: 'center',
    marginTop: 150,
  },
  isiin: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: '#F1F1F1',
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  ktf: {
    height: 50,
    width: 200,
    backgroundColor: '#8388FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
<<<<<<< HEAD
  text:{
    fontSize : 16,
    color:'white',
    fontFamily : 'Montserrat-Bold'
  }
})
=======
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
>>>>>>> 693efbfc16a998a50f8d58cb80dd3bfd4d0d06da
