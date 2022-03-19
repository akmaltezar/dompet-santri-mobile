import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      token: '',
      name: '',
      id: '',
      balance: 0,
      data: [],
      detail_id: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.replace('LoginScreen');
        }
      })
      .then(() => {
        this.userData();
        this.getPengajuan();
      })
      .catch(err => {
        console.log(err);
      });
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.userData();
      this.getPengajuan();
    });
  }

  userData() {
    fetch('https://aplikasi-santri.herokuapp.com/api/user', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          name: result.name,
          id: result.id,
          balance: result.balance,
        });
        // console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  getPengajuan() {
    // console.log('INI TOKEN', this.state.token);
    fetch('https://aplikasi-santri.herokuapp.com/api/pengajuan', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('INI DATA', result.data);
        this.setState({data: result.data});
        // this.setState
        // ({created_at : result.data[0].created_at,
        //   status : result.data[0].status
        // })
      })
      .catch(error => console.log('itu error', error));
  }

  detailPengajuan() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch('https://aplikasi-santri.herokuapp.com/api/detail/1', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  logOut() {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch('https://aplikasi-santri.herokuapp.com/api/logout', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        AsyncStorage.clear();
        this.props.navigation.replace('LoginScreen');
        // alert(result.message);
      })
      .catch(error => console.log('error', error));
  }

  WarningLogout = () =>
    Alert.alert('Perhatian !', 'Anda yakin ingin keluar ?', [
      {
        text: 'Batal',
      },
      {
        text: 'Ya',
        onPress: () => this.logOut(),
      },
    ]);

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profileBox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.profileText}>{this.state.name}</Text>
                <Text style={styles.profileText}>ID {this.state.id}</Text>
              </View>
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: '#FFF',
                  borderRadius: 55,
                }}>
                <Image
                  source={require('../assets/images/profilePicture.png')}
                  style={{width: 55, height: 55}}
                />
              </View>
            </View>
            <View style={styles.saldoBox}>
              <Text style={styles.saldoText}>Saldo</Text>
              <Text style={styles.saldoNominal}>
                Rp. {this.state.balance},-
              </Text>
            </View>
          </View>
          <View style={styles.buttonBox}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('ScannerScreen')}>
                <Icons name="line-scan" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.textButton}>Bayar</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('IsiSaldoScreen')
                }>
                <Icons
                  name="format-vertical-align-top"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
              <Text style={styles.textButton}>Isi Saldo</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('TarikDanaScreen')
                }>
                <Icons
                  name="format-vertical-align-bottom"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
              <Text style={styles.textButton}>Tarik</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('TransferScreen')
                }>
                <Icons
                  name="format-horizontal-align-right"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
              <Text style={styles.textButton}>Transfer</Text>
            </View>
          </View>
          <View
            style={[
              styles.buttonGroup,
              {
                alignSelf: 'center',
                width: '80%',
                alignItems: 'flex-start',
                marginTop: 10,
              },
            ]}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.WarningLogout()}>
                <Icons name="logout" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.textButton}>Keluar</Text>
            </View>
          </View>
          <View style={styles.riwayatTransaksi}>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('Dashboard')}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons name="format-list-bulleted" size={30} color="#8388FF" />
              <Text style={styles.textRiwayatTransaksi}>Riwayat Transaksi</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                styles.riwayatBox,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name="arrow-bottom-left" size={30} color="#8388FF" />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.IDNumber}>Bayar : ID 001100011100</Text>
                  <Text style={styles.dates}>08-12-2020</Text>
                  <Text style={styles.priceIsi}>RP 1.000.000,00</Text>
                </View>
              </View>
              <Text style={styles.wait}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.riwayatBox,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name="arrow-bottom-left" size={30} color="#8388FF" />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.IDNumber}>Isi Saldo</Text>
                  <Text style={styles.dates}>08-12-2020</Text>
                  <Text style={styles.priceIsi}>RP 1.000.000,00</Text>
                </View>
              </View>
              <Text style={styles.wait}>Menunggu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.riwayatBox,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name="arrow-top-right" size={30} color="#E31212" />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.IDNumber}>Isi Saldo</Text>
                  <Text style={styles.dates}>08-12-2020</Text>
                  <Text style={styles.priceTarik}>RP 1.000.000,00</Text>
                </View>
              </View>
              <Text style={styles.succes}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.riwayatBox,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name="arrow-top-right" size={30} color="#E31212" />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.IDNumber}>Isi Saldo</Text>
                  <Text style={styles.dates}>08-12-2020</Text>
                  <Text style={styles.priceTarik}>RP 1.000.000,00</Text>
                </View>
              </View>
              <Text style={styles.succes}>Sukses</Text>
            </TouchableOpacity> */}
            {this.state.data.map((value, index) => {
              const Status = () => {
                if (value.status === 'Success') {
                  return <Text style={styles.succes}>{value.status}</Text>;
                } else if (value.status === 'Waiting') {
                  return <Text style={styles.wait}>{value.status}</Text>;
                } else if (value.status === 'Cancelled') {
                  return <Text style={styles.canceled}>{value.status}</Text>;
                }
              };
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.riwayatBox,
                      {flexDirection: 'row', justifyContent: 'space-between'},
                    ]}
                    onPress={() => this.detailPengajuan()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {value.type === 'Isi Saldo' ? (
                        <Icons
                          name="arrow-bottom-left"
                          size={30}
                          color="#8388FF"
                        />
                      ) : (
                        <Icons
                          name="arrow-top-right"
                          size={30}
                          color="#E31212"
                        />
                      )}
                      <View style={{marginLeft: 10}}>
                        {value.type === 'Transfer Dana' ? (
                          <Text style={styles.IDNumber}>
                            {value.type} : ID {value.target}
                          </Text>
                        ) : (
                          <Text style={styles.IDNumber}>{value.type}</Text>
                        )}
                        <Text style={styles.dates}>
                          {value.created_at.substr(0, 10)}
                        </Text>
                        <Text style={styles.priceTarik}>
                          Rp. {value.nominal} ,-
                        </Text>
                      </View>
                    </View>
                    {
                      <Status />
                      /* {value.status === 'Waiting' ? (
                      <Text style={styles.wait}>{value.status}</Text>
                    ) : (
                      <Text style={styles.succes}>{value.status}</Text>
                    )} */
                    }
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileBox: {
    height: 145,
    width: '100%',
    backgroundColor: '#8388FF',
    padding: 30,
  },
  profileText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#FFF',
    // fontWeight: 'bold',
  },
  saldoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
  saldoText: {
    color: '#444',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  saldoNominal: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#444',
    // fontWeight: 'bold',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#E6E7FD',
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 90,
  },
  buttonGroup: {
    alignItems: 'center',
  },
  textButton: {
    marginTop: 10,
    color: '#555',
    fontFamily: 'Montserrat-Regular',
  },
  riwayatTransaksi: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  textRiwayatTransaksi: {
    marginLeft: 10,
    color: '#8388FF',
    // fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  riwayatBox: {
    width: '100%',
    height: 75,
    backgroundColor: '#FFF',
    elevation: 3,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  IDNumber: {
    // fontWeight: 'bold',
    fontSize: 12,
    color: '#444',
    fontFamily: 'Montserrat-SemiBold',
  },
  dates: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Montserrat-Regular',
  },
  priceIsi: {
    fontSize: 12,
    color: '#8388FF',
    fontFamily: 'Montserrat-Regular',
  },
  priceTarik: {
    fontSize: 12,
    color: '#E31212',
    fontFamily: 'Montserrat-Regular',
  },
  wait: {
    fontSize: 12,
    color: '#FFA216',
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
  },
  succes: {
    fontSize: 12,
    color: '#8388FF',
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
  },
  canceled: {
    fontSize: 12,
    color: '#E31212',
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
  },
});
