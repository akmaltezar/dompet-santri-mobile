import React, {Component} from 'react';

import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      id: '',
      created_at: '',
      balance: '',
      subtotal: '',
    };
  }

  onSuccess = data => {
    const files = JSON.parse(data.data);
    console.log(files);
    this.setState({
      id: files.id,
      created_at: files.created_at,
      subtotal: files.subtotal,
    });
  };
  componentDidMount() {
    this.setState({
      balance: this.props.route.params.balance,
    });
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
          console.log(value);
        } else {
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  Bayar() {
    const formdata = new FormData();
    formdata.append('target', this.state.id);
    formdata.append('nominal', this.state.subtotal);

    fetch('https://aplikasi-santri.herokuapp.com/api/bayar', {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.code === 422) {
          Alert.alert(
            'Perhatian ! ',
            'Dompet Santri tidak mendeteksi adanya transaksi',
          );
        } else {
          console.log(result);
        }
      })
      .catch(error => console.log('error', error));
  }

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
                  <Text style={styles.title}>Verifikasi Pembayaran</Text>
                </View>
                <View style={styles.detailView}>
                  <View style={styles.dataView}>
                    <Text style={styles.data}>ID Transaksi</Text>
                    <Text style={styles.data}>Tanggal Transaksi</Text>
                    <Text style={styles.data}>Total Transaksi</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text style={{marginBottom: 5}}>:</Text>
                    <Text style={{marginBottom: 5}}>:</Text>
                    <Text style={{marginBottom: 5}}>:</Text>
                  </View>
                  <View style={styles.valueView}>
                    <Text style={styles.value}>{this.state.id}</Text>
                    <Text style={styles.value}>{this.state.created_at}</Text>
                    <Text style={styles.value}>{this.state.subtotal}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => {
                    if (this.state.balance === 0) {
                      Alert.alert('Perhatian !', 'Saldo anda Rp. 0,-', [
                        {text: 'ok'},
                      ]);
                    } else if (this.state.balance < this.state.subtotal) {
                      Alert.alert('Perhatian !', 'Saldo anda tidak mencukupi', [
                        {text: 'ok'},
                      ]);
                    } else if (this.state.id, this.state.created_at,this.state.subtotal === null) {
                      Alert.alert('Perhatian !', 'Data Transaksi tidak ditemukan', [
                        {text: 'ok'},
                      ]);
                    } else {
                       this.Bayar();
                       
                    }
                  }}>
                  <Text style={styles.buyText}>Lakukan Pembayaran</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.navigation.goBack()} >
                  <Text style={styles.buyText}>Batalkan Pembayaran</Text>
                </TouchableOpacity>
              </View>
            </>
          }
        />
      </View>
    );
  }
}
export default ScannerScreen;
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
    height: hp('8.5%'),
    width: wp('100%'),

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
    height: hp('15%'),
    marginVertical: '4%',
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
    width: wp('40%'),
    height: hp('10%'),
  },
  data: {
    color: '#000',
    fontSize: 15,
    marginBottom: '2%',
    fontFamily: 'Montserrat-Regular',
  },
  valueView: {
    width: wp('35%'),
    height: hp('10%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    marginBottom: '2%',
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
    marginTop : 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
