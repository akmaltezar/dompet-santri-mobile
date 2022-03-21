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
  constructor() {
    super();
    this.state = {
      id: '',
      type: '',
      created_at: '',
      nominal: '',
      pict: '',
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.route.params.id,
      type: this.props.route.params.type,
      created_at: this.props.route.params.created_at,
      nominal: this.props.route.params.nominal,
      pict: this.props.route.params.pict,
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
            <Text style={styles.data}>User Id :</Text>
            <Text style={styles.data}>Jenis Transaksi :</Text>
            <Text style={styles.data}>Tanggal Transaksi :</Text>
            <Text style={styles.data}>Nominal :</Text>
            <Text style={styles.data}>Bukti Transfer :</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.value}>{this.state.id}</Text>
            <Text style={styles.value}>{this.state.type}</Text>
            <Text style={styles.value}>
              {this.state.created_at.substr(0, 10)}
            </Text>
            <Text style={styles.value}>Rp. {this.state.nominal}</Text>
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
  dataView: {
    flexDirection: 'column',
  },
  valueView: {
    flexDirection: 'column',
  },
  data: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  value: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
});
