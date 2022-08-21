import React from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Dana extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loading: false,
      balance: 0,
    };
  }
  componentDidMount() {
    this.setState({
      balance: this.props.route.params.balance,
    });
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.navigate('HomeScreen');
        }
      })
      .then(() => console.log(this.state.token))
      .catch(err => {
        console.log(err);
      });
  }

  tarikDana() {
    this.setState({loading: true});
    fetch('https://aplikasi-santri.herokuapp.com/api/tarik', {
      method: 'POST',
      headers: {Authorization: `Bearer ${this.state.token}`},
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
      .finally(() => {
        this.setState({loading: false});
        this.props.navigation.navigate('HomeScreen');
      });
  }

  peringatanTarikDana = () =>
    Alert.alert(
      'Perhatian !',
      'Anda yakin ingin menarik semua saldo yang ada di dompet anda ?',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Ya',
          onPress: () => this.tarikDana(),
        },
      ],
    );

  render() {
    const navigation = this.props.navigation;
    return (
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            placeholder="Nama Bank"
          />
          <TextInput
            style={{
              borderWidth: 1,
              width: screenWidth - 80,
              borderRadius: 5,
              paddingLeft: 20,
              marginBottom: 20,
            }}
            placeholder="Nomor Rekening"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#8388FF',
              width: screenWidth - 80,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              if (this.state.balance === 0) {
                Alert.alert('Perhatian !', 'Saldo anda Rp. 0,-', [
                  {text: 'ok'},
                ]);
              } else {
                this.peringatanTarikDana();
              }
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
                Buat Pengajuan
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
