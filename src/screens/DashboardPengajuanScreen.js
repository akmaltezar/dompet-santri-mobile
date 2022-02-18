import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

export default class DashboardPengajuan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 30,
            width: '100%',
            justifyContent: 'space-evenly',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
                color: '#8388FF',
                marginBottom: 15,
              }}>
              Pengajuan
            </Text>
            <View style={{height: 2, backgroundColor: '#8388FF', width: 100}} />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                marginBottom: 15,
                fontFamily: 'Montserrat-Regular',
              }}>
              Riwayat
            </Text>
            <View style={{height: 2, backgroundColor: '#FFF', width: 100}} />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: '90%',
              backgroundColor: '#FFF',
              elevation: 3,
              height: 100,
              borderRadius: 5,
              paddingHorizontal: 30,
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
                    12/12/2021
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
                  Menunggu
                </Text>
              </View>
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
                style={{
                  fontSize: 12,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#FFF',
                }}>
                Lihat Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
