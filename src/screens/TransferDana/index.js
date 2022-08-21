import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class TransferScren extends Component {
  constructor() {
    super();
    this.state = {
      balance: '',
      target: '',
      name: '',
      nominal: '',
      token: '',
      loading: false,
    };
  }

  onSuccess = data => {
    JSON.parse(data);
    this.setState({
      target: data.id,
      name: data.name,
    });
  };

  componentDidMount() {
    this.setState({
      balance: this.props.route.params.balance,
    });
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

    let formdata = new FormData();
    formdata.append('target', this.state.target);
    formdata.append('nominal', this.state.nominal);

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch('https://aplikasi-santri.herokuapp.com/api/transfer', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.code === 422) {
          Alert.alert(
            'Perhatian !',
            'Pastikan anda mengisi data transfer dengan benar !',
            [{text: 'ok'}],
          );
        } else {
          this.props.navigation.goBack();
        }
      })
      .catch(error => console.log('error', error));
    // .finally(() => {
    //   this.setState({loading: false});
    //   this.props.navigation.goBack()
    // });
  };
  peringatanTransferSaldo = () =>
    Alert.alert(
      'Perhatian !',
      `Anda yakin ingin mentransfer saldo sebesar ${this.state.nominal} ?`,
      [
        {
          text: 'Batal',
        },
        {
          text: 'Ya',
          onPress: () => this.transfer(),
        },
      ],
    );

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          flashMode={RNCamera.Constants.FlashMode.auto}
          bottomContent={
            <>
              <View style={styles.bottomContent}>
                <View style={styles.header}>
                  <Text style={styles.title}>Transfer Saldo</Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    onChangeText={nominal => this.setState({nominal})}
                    style={styles.input}
                    placeholder="Silahkan Isi Nominal yang akan ditransfer"
                    keyboardType="number-pad"></TextInput>
                </View>
                <View>
                  <View style={styles.detailView}>
                    <View style={styles.dataView}>
                      <Text style={styles.data}>ID Dompet Santri Penerima</Text>
                      <Text style={styles.data}>Nama Santri</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <Text style={{marginBottom: 5}}>:</Text>
                      <Text style={{marginBottom: 5}}>:</Text>
                    </View>
                    <View style={styles.valueView}>
                      <Text style={styles.value}>{this.state.target}</Text>
                      <Text style={styles.value}>{this.state.name}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => {
                      if (this.state.balance === 0) {
                        Alert.alert('Perhatian !', 'Saldo anda Rp. 0,-', [
                          {text: 'ok'},
                        ]);
                      } else if (this.state.target && this.state.name) {
                        Alert.alert(
                          'Perhatian !',
                          'Silahkan scan ID Santri dahulu',
                          [{text: 'ok'}],
                        );
                      } else if (this.state.nominal === null) {
                        Alert.alert(
                          'Perhatian !',
                          'Masukkan nominal saldo yang akan anda transfer !',
                          [{text: 'ok'}],
                        );
                      } else if (this.state.nominal > this.state.balance) {
                        Alert.alert(
                          'Perhatian !',
                          'Saldo yang anda miliki tidak cukup untuk ditransfer !',
                          [{text: 'ok'}],
                        );
                      } else {
                        this.peringatanTransferSaldo();
                      }
                    }}>
                    <Text style={styles.buyText}>Transfer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.buyText}>Batal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp('60%'),
    width: wp('100%'),
  },
  bottomContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#8388FF',
    height: hp('7.5%'),
    width: wp('100%'),
    top: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#fff',
    marginLeft: 20,
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: wp('90%'),
    height: hp('10%'),

    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    borderTopWidth: 0.4,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
  },
  dataView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp('50%'),
    height: hp('10%'),
  },
  data: {
    color: '#000',
    fontSize: 15,
    marginBottom: '2%',
    fontFamily: 'Montserrat-Regular',
  },
  valueView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp('30%'),
    height: hp('10%'),
  },
  value: {
    color: '#000',
    fontSize: 15,
    marginBottom: '2%',
    fontFamily: 'Montserrat-SemiBold',
  },
  buyButton: {
    backgroundColor: '#12E100',
    width: wp('90%'),
    height: hp('5%'),
    marginVertical: '3%',
    borderRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFF',
  },
  cancelButton: {
    backgroundColor: '#E31212',
    width: wp('90%'),
    height: hp('5%'),
    borderRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    alignItems: 'center',
    width: wp('90%'),
    height: hp('6%'),
    marginTop: '7%',
    marginBottom: '3%',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    borderTopWidth: 0.4,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
  },
  input: {
    width: wp('85%'),
  },
});
