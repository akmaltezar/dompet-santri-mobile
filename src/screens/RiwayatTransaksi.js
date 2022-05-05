import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class RiwayatTransaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: '',
      created_at: '',
      status: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.goBack();
        }
      })
      .then(() => {
        this.getRiwayat();
      })
      .catch(err => console.log(err));
  }

  getRiwayat() {
    fetch('https://aplikasi-santri.herokuapp.com/api/pengajuan', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({data: result.data});
      })
      .catch(error => console.log('error', error));
  }

  detailTransaksi(id) {
    var requestOptions = {
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
          this.props.navigation.navigate('Detail Pengajuan', {
            id: result.data.user_id,
            type: result.data.type,
            created_at: result.data.created_at,
            nominal: result.data.nominal,
            pict: result.data.pict,
            status: result.data.status,
          });
        } else {
          this.props.navigation.navigate('DetailRiwayat', {
            id: result.data.user_id,
            type: result.data.type,
            created_at: result.data.created_at,
            nominal: result.data.nominal,
            pict: result.data.pict,
            status: result.data.status,
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  detailPengajuan(id) {
    var requestOptions = {
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
        this.props.navigation.navigate('DetailRiwayat', {
          id: result.data.user_id,
          type: result.data.type,
          created_at: result.data.created_at,
          nominal: result.data.nominal,
          pict: result.data.pict,
          status: result.data.status,
        });
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Riwayat Transaksi</Text>
        </View>
        <ScrollView>
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
                <View key={index} style={styles.riwayatTransaksi} >
                  <TouchableOpacity
                    style={[
                      styles.riwayatBox,
                      {flexDirection: 'row', justifyContent: 'space-between'},
                    ]}
                    >
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

                    }
                  </TouchableOpacity>
                </View>
              );
            })}
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
  header: {
    backgroundColor: '#8388FF',
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  riwayatTransaksi: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  riwayatBox: {
    width: '100%',
    height: 75,
    backgroundColor: '#FFF',
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  IDNumber: {
   
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
   
    fontFamily: 'Montserrat-SemiBold',
  },
  succes: {
    fontSize: 12,
    color: '#8388FF',
 
    fontFamily: 'Montserrat-SemiBold',
  },
  canceled: {
    fontSize: 12,
    color: '#E31212',

    fontFamily: 'Montserrat-SemiBold',
  },
});
