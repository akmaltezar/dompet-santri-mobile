import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class DetailRiwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      type: '',
      created_at: '',
      nominal: '',
      pict: null,
      status: '',
      username: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.route.params.id,
      type: this.props.route.params.type,
      created_at: this.props.route.params.created_at,
      nominal: this.props.route.params.nominal,
      pict: this.props.route.params.pict,
      status: this.props.route.params.status,
      username: this.props.route.params.username,
    });
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Detail Riwayat</Text>
        </View>
        <View style={styles.detailView}>
          <View style={styles.dataView}>
            <Text style={styles.data}>Nama Santri : </Text>
            <Text style={styles.data}>Id Transaksi :</Text>
            <Text style={styles.data}>Jenis Transaksi :</Text>
            <Text style={styles.data}>Tanggal Transaksi :</Text>
            <Text style={styles.data}>Nominal :</Text>
            <Text style={styles.data}>Status : </Text>
            <Text style={styles.data}>Bukti Transfer :</Text>
          </View>

          <View style={styles.valueView}>
            <Text style={styles.value}>{this.state.username}</Text>
            <Text style={styles.value}>{this.state.id}</Text>
            <Text style={styles.value}>{this.state.type}</Text>
            <Text style={styles.value}>
              {this.state.created_at.substr(0, 10)}
            </Text>
            <Text style={styles.value}>Rp. {this.state.nominal}</Text>
            {this.state.status === 'Success' ? (
              <Text style={styles.succes}>{this.state.status}</Text>
            ) : (
              <Text style={styles.canceled}>{this.state.status}</Text>
            )}
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: true})}>
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
        <Modal
          isVisible={this.state.modalVisible}
          animationIn="slideInUp"
          onBackdropPress={() => this.setState({modalVisible: false})}>
          <View style={styles.modalView}>
            <Image
              source={{uri: this.state.pict}}
              style={{width: wp('50%'), height: hp('50%')}}
            />
          </View>
        </Modal>
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
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    borderTopWidth: 0.4,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
  },
  dataView: {
    flexDirection: 'column',
  },
  valueView: {
    flexDirection: 'column',
  },
  data: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  value: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    width: wp('50%'),
    height: hp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
    left: '24%',
  },
  succes: {
    fontSize: 15,
    color: '#8388FF',
    fontFamily: 'Montserrat-SemiBold',
  },
  canceled: {
    fontSize: 15,
    color: '#E31212',
    fontFamily: 'Montserrat-SemiBold',
  },
});
