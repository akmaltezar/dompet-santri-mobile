import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  PermissionsAndroid,
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
      user_id: '',
      balance: 0,
      roles: '',
      data: [],
      uriPhoto: null,
      loading: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('Image').then(respon =>
      this.setState({uriPhoto: respon}),
    );
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
      })
      .then(() => {
        this.getTransaksi();
      })
      .then(() => {
        this.unsubscribe();
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    unsubscribe = this.props.navigation.addListener('focus', () => {
      this.userData();
      this.getTransaksi();
    });
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Dompet Santri Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.props.navigation.navigate('Bayar', {
          balance: this.state.balance,
        });
        console.log('Camera permission given');
      } else {
        ToastAndroid.show(
          'Go to App Info to allow the permission',
          ToastAndroid.SHORT,
        );
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
          user_id: result.id,
          balance: result.balance,
          roles: result.roles,
        });
        console.log(result);
      })
      .catch(error => console.log('user error', error));
  }

  getTransaksi() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    fetch('https://aplikasi-santri.herokuapp.com/api/pengajuan', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('INI DATA', result.data);
        this.setState({
          data: result.data,
        });
      })
      .catch(error => console.log('admintransaksi error', error));
  }

  detailTransaksi(id) {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(
      `https://aplikasi-santri.herokuapp.com/api/detail/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.data.status === 'Waiting') {
          this.props.navigation.navigate('DetailTransaksi', {
            id: result.data.id,
            type: result.data.type,
            created_at: result.data.created_at,
            nominal: result.data.nominal,
            pict: result.data.pict,
            status: result.data.status,
            username: result.data.user.substr(16, 14),
          });
        } else {
          this.props.navigation.navigate('DetailTransaksi', {
            id: result.data.id,
            type: result.data.type,
            created_at: result.data.created_at,
            nominal: result.data.nominal,
            pict: result.data.pict,
            status: result.data.status,
            username: result.data.user.substr(16, 14),
          });
        }
      })
      .catch(error => console.log('detail error', error));
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
      .then(response => response.json())
      .then(result => {
        console.log(result);
        AsyncStorage.clear();
        this.props.navigation.replace('Login');
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profileBox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.profileText}>Hai, {this.state.name}</Text>
                <Text style={styles.profileText}>ID {this.state.user_id}</Text>
              </View>
              {this.state.roles === 'customer' ? (
                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: '#8388FF',
                    borderRadius: 55,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Profile', {
                      name: this.state.name,
                      id: this.state.id,
                    })
                  }>
                  {this.state.uriPhoto !== null ? (
                    <Image
                      source={{uri: this.state.uriPhoto}}
                      style={styles.image}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/profile.png')}
                      style={{width: '100%', height: '100%'}}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
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
                onPress={() => this.requestCameraPermission()}>
                <Icons name="line-scan" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.textButton}>Bayar</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('IsiSaldo')}>
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
                  this.props.navigation.navigate('TarikDana', {
                    balance: this.state.balance,
                  })
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
                  this.props.navigation.navigate('TransferDana', {
                    balance: this.state.balance,
                  })
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
              onPress={() => {
                this.state.roles === 'finance'
                  ? this.props.navigation.navigate('Dashboard')
                  : this.props.navigation.navigate('Riwayat Transaksi');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons name="format-list-bulleted" size={30} color="#8388FF" />

              <Text style={styles.textRiwayatTransaksi}>Riwayat Transaksi</Text>
            </TouchableOpacity>
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
                    onPress={() => this.detailTransaksi(value.id)}>
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
                    {<Status />}
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
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
