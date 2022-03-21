import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DashboardPengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
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
      .then(() => this.getPengajuan())
      .catch(err => {
        console.log('tokennya', err);
      });
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getPengajuan();
    });
  }

  getPengajuan() {
    console.log('INI TOKEN', this.state.token);
    fetch('https://aplikasi-santri.herokuapp.com/api/coba', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('INI DATA', result.data);
        this.setState({data: result.data});
        // this.setState({
        //   created_at: result.data[0].created_at,
        //   status: result.data[0].status,
        // });
      })
      .catch(error => console.log('ini error', error));
  }

  acceptPengajuan(id) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(
      `https://aplikasi-santri.herokuapp.com/api/accept/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error))
      .finally(() => this.props.navigation.replace('HomeScreen'))
  }
  
  cancelPengajuan(id) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(
      `https://aplikasi-santri.herokuapp.com/api/cancel/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error))
      .finally(() => this.props.navigation.replace('HomeScreen'))
  }

  render() {
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
                        backgroundColor: '#FFA216',
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
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                      onPress={() => this.acceptPengajuan(value.id)}
                      style={{
                        backgroundColor: '#12E100',
                        width: '45%',
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
                        Terima Pengajuan
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.cancelPengajuan(value.id)}
                      style={{
                        backgroundColor: '#E31212',
                        width: '45%',
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
                        Tolak Pengajuan
                      </Text>
                    </TouchableOpacity>
                  </View>
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
