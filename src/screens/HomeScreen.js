import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {Component} from 'react';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profileBox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.profileText}>Muhammad Afif</Text>
                <Text style={styles.profileText}>ID 1234567</Text>
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
              <Text style={styles.saldoNominal}>RP 1.000.000,00</Text>
            </View>
          </View>
          <View style={styles.buttonBox}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
                <Icons name="line-scan" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.textButton}>Bayar</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
                <Icons
                  name="format-vertical-align-top"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
              <Text style={styles.textButton}>Isi Saldo</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
                <Icons
                  name="format-vertical-align-bottom"
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
              <Text style={styles.textButton}>Tarik</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
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
              <TouchableOpacity style={styles.button}>
                <Icons name="logout" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.textButton}>Keluar</Text>
            </View>
          </View>
          <View style={styles.riwayatTransaksi}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons name="format-list-bulleted" size={30} color="#8388FF" />
              <Text style={styles.textRiwayatTransaksi}>Riwayat Transaksi</Text>
            </View>
            <TouchableOpacity
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
            </TouchableOpacity>
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
});
