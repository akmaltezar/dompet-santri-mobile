import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  getRiwayat() {
    fetch('https://aplikasi-santri.herokuapp.com/api/historydashboard', {
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
        if ((data.status = Cancelled)) {
        }
      })
      .catch(error => console.log('error', error));
  }

export default class Dashboard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: '',
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
        this.getRiwayatPengajuan();
      })
      .catch(err => {
        console.log(err);
      });
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getRiwayatPengajuan();
    });
  }

  getRiwayatPengajuan() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(
      'https://aplikasi-santri.herokuapp.com/api/historydashboard',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({data: result.data});
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 15}}>
            {/* <View style={{backgroundColor:'#8388FF',width:ww,height:50,justifyContent:'center',alignItems:'center',}}>
                <Text style={{color:'white',fontSize:16,marginLeft:10}}>Dashboard</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:ww,height:50,marginBottom:50}}>
                <Text style={{fontSize:16,color:'black'}}>Pengajuan</Text>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#8388FF',}}>Riwayat</Text>
                    <View style={{backgroundColor:'#8388FF',height:3,width:100,top:10}} />
                </View>
            </View> */}
            {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: ww - 30,
            height: 120,
            borderLeftWidth: 1,
            borderRadius: 10,
            borderEndWidth: 1,
            borderBottomWidth: 1,
            marginBottom: 20,
            borderColor: '#C4C4C4',
            marginTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: ww - 30,
              height: 60,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 110,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
              <View>
                <Text
                  style={{
                    width: '90%',
                    backgroundColor: '#FFF',
                    elevation: 3,
                    height: 100,
                    borderRadius: 5,
                    paddingHorizontal: 30,
                    marginBottom: 15,
                    justifyContent: 'center',
                  }}>
                  {value.status === 'Success' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            height: 10,
                            width: 10,
                            backgroundColor: '#8388FF',
                            borderRadius: 5,
                            marginRight: 10,
                            elevation: 3,
                          }}
                        />
                        <View>
                          <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
                            Isi Saldo
                          </Text>
                          <Text style={{fontFamily: 'Montserrat-Regular'}}>
                            {value.created_at.substr(0, 10)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: 100,
                          height: 25,
                          backgroundColor: '#8388FF',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                          elevation: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Montserrat-SemiBold',
                            color: '#FFF',
                          }}>
                          {value.status}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            height: 10,
                            width: 10,
                            backgroundColor: '#E31212',
                            borderRadius: 5,
                            marginRight: 10,
                            elevation: 3,
                          }}
                        />
                        <View>
                          <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
                            Isi Saldo
                          </Text>
                          <Text style={{fontFamily: 'Montserrat-Regular'}}>
                            {value.created_at.substr(0, 10)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: 100,
                          height: 25,
                          backgroundColor: '#E31212',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                          elevation: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Montserrat-SemiBold',
                            color: '#FFF',
                          }}>
                          {value.status}
                        </Text>
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#8388FF',
                      width: '100%',
                      height: 25,
                      borderRadius: 5,
                      elevation: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#FFF',
                      }}>
                      Lihat Data
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#8388FF',
              alignItems: 'center',
              justifyContent: 'center',
              width: ww - 90,
              height: 30,
              borderRadius: 5,
            }}
            onPress={() => this.props.navigation.navigate('DetailRiwayat')}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Lihat data
            </Text>
          </TouchableOpacity>
        </View> */}
            {this.state.data.map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '90%',
                    backgroundColor: '#FFF',
                    elevation: 3,
                    height: 100,
                    borderRadius: 5,
                    paddingHorizontal: 30,
                    marginBottom: 15,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          backgroundColor: '#FFA216',
                          borderRadius: 5,
                          marginRight: 10,
                          elevation: 3,
                        }}
                      />
                      <View>
                        <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
                          Isi Saldo
                        </Text>
                        <Text style={{fontFamily: 'Montserrat-Regular'}}>
                          {value.created_at.substr(0, 10)}
                        </Text>
                      </View>
                    </View>
                    {value.status === 'Success' ? (
                      <View
                        style={{
                          width: 100,
                          height: 25,
                          backgroundColor: '#12E100',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                          elevation: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Montserrat-SemiBold',
                            color: '#FFF',
                          }}>
                          {value.status}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 100,
                          height: 25,
                          backgroundColor: '#E31212',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                          elevation: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Montserrat-SemiBold',
                            color: '#FFF',
                          }}>
                          {value.status}
                        </Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#8388FF',
                      width: '100%',
                      height: 25,
                      borderRadius: 5,
                      elevation: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 12,
                    }}>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('DetailRiwayat')
                      }
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#FFF',
                      }}>
                      Lihat Data
                    </Text>
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
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#8388FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    // fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});
