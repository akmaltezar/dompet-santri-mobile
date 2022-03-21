import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import React, {Component} from 'react';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  class DetailRiwayat extends Component {
    render() {
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Lihat Pengajuan</Text>
          </View>
          <View style={styles.detailView}>
            <View style={styles.variableView}>
              <Text style={styles.variable}>User Id :</Text>
              <Text style={styles.variable}>Jenis Transaksi :</Text>
              <Text style={styles.variable}>Tanggal Transaksi :</Text>
              <Text style={styles.variable}>Nominal :</Text>
              <Text style={styles.variable}>Bukti Transfer :</Text>
            </View>
            <View style={styles.valueView}>
              <Text style={styles.value}>00044555</Text>
              <Text style={styles.value}>Isi Saldo</Text>
              <Text style={styles.value}>22/2/2022</Text>
              <Text style={styles.value}>Rp. 50.021</Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 14,
                    color: '#8388FF',
                  }}>
                  Lihat Gambar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{backgroundColor:'lightgreen',width:screenWidth-40,height:50,alignItems:'center',justifyContent:'center',borderRadius:10,marginTop:20}}>
            <Text style={{color:'white'}}>Terima Pengajuan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'red',width:screenWidth-40,height:50,alignItems:'center',justifyContent:'center',borderRadius:10,marginTop:20}}>
            <Text style={{color:'white'}}>Tolak Pengajuan</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  export default DetailRiwayat;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      backgroundColor: '#8388FF',
      height: screenHeight * 0.075,
      width: screenWidth * 1,
      paddingHorizontal: 25,
      marginBottom: 20,
      justifyContent: 'flex-start',
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
      width: screenWidth * 0.9,
      height: screenHeight * 0.15,
      borderRadius: 10,
      borderBottomWidth: 1,
      borderColor: '#C4C4C4',
      borderTopWidth: 0.4,
      borderLeftWidth: 0.4,
      borderRightWidth: 0.4,
    },
    variableView: {
      flexDirection: 'column',
    },
    valueView: {
      flexDirection: 'column',
    },
    variable: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
    },
    value: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 14,
    },
  });
  