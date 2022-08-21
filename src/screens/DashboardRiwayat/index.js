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
export default class Dashboard2 extends Component {
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
          this.props.navigation.replace('LoginScreen');
        }
      })
      .then(() => {
        this.getRiwayatPengajuan();
      })
      .catch(err => console.log(err));
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
      'https://aplikasi-santri.herokuapp.com/api/riwayatadmin',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({data: result.data});
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
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 15}}>
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
                            {value.type}
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
                            {value.type}
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
                    }}
                    onPress={() => this.detailPengajuan(value.id)}>
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
