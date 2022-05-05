import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class DetailPengajuan extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      id: '',
      type: '',
      created_at: '',
      nominal: '',
      pict: null,
      status: '',
      roles: '',
      username: '',
      modalVisible: false,
    };
  }
  acceptPengajuan(id) {
    fetch(`https://aplikasi-santri.herokuapp.com/api/accept/${id}`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.props.navigation.goBack();
      })
      .catch(error => console.log('accept error', error));
  }

  cancelPengajuan(id) {
    this.setState({loading: true});
    fetch(`https://aplikasi-santri.herokuapp.com/api/cancel/${id}`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.props.navigation.goBack();
      })
      .catch(error => console.log('cancel error', error));
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
      .catch(error => {
        console.log('token error', error);
      });
    this.setState({
      id: this.props.route.params.id,
      type: this.props.route.params.type,
      created_at: this.props.route.params.created_at,
      nominal: this.props.route.params.nominal,
      pict: this.props.route.params.pict,
      status: this.props.route.params.status,
      username: this.props.route.params.username,
      roles: this.props.route.params.roles,
    });
  }
  render() {
    const navigation = this.props.navigation;
    console.log(this.state.roles);
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
            <Text style={styles.variable}>Nama Santri :</Text>
            <Text style={styles.variable}>Id Transaksi :</Text>
            <Text style={styles.variable}>Jenis Transaksi :</Text>
            <Text style={styles.variable}>Tanggal Transaksi :</Text>
            <Text style={styles.variable}>Nominal :</Text>
            <Text style={styles.variable}>Status : </Text>
            <Text style={styles.variable}>Bukti Transfer :</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{this.state.username}</Text>
            <Text style={styles.value}>{this.state.id}</Text>
            <Text style={styles.value}>{this.state.type}</Text>
            <Text style={styles.value}>
              {this.state.created_at.substr(0, 10)}
            </Text>
            <Text style={styles.value}>Rp.{this.state.nominal},-</Text>
            <Text style={styles.status}>{this.state.status}</Text>
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
        <View>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => this.acceptPengajuan(this.state.id)}>
            <Text style={styles.buttonText}>Terima Pengajuan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.cancelPengajuan(this.state.id)}>
            {this.state.loading ? (
              <ActivityIndicator size={25} color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Tolak Pengajuan</Text>
            )}
          </TouchableOpacity>
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
export default DetailPengajuan;
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
  variableView: {
    flexDirection: 'column',
  },
  valueView: {
    flexDirection: 'column',
  },
  variable: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  value: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#000000',
  },
  status: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFA216',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    width: wp('50%'),
    height: hp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
    left: '24%',
  },
  acceptButton: {
    backgroundColor: '#12E100',
    width: wp('90%'),
    height: hp('7%'),
    marginTop: '5%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E31212',
    width: wp('90%'),
    height: hp('7%'),
    marginTop: '5%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
});
