import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-generator';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [token, setToken] = useState('');
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(null);
  const [id, setId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [uri, setUri] = React.useState(null);
  const [resPhoto, setResPhoto] = useState(false);
  const navigation = useNavigation();

  const openCamera = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      type: 'image/jpeg',
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User canceled camera');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        setUri(res.assets[0].uri);
        setResPhoto(true);
        console.log(res);
        console.log(setUri);
      }
    });
  };

  const openGallery = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      type: 'image/jpeg',
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User Canceled Gallery');
      } else if (res.errorCode) {
        console.log(res.errorCode);
      } else {
        setUri(res.assets[0].uri);
        setResPhoto(true);
        console.log(res);
        console.log(setUri);
      }
    });
  };

  useEffect(() => {
    console.log(uri);
    // AsyncStorage.getItem('Image').then(respon => setUri(respon));
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          setToken(value);
        }
      })
      .then(() => {
        userData();
      })
      .catch(error => {
        console.log(error);
      });
    if (uri !== null) {
      AsyncStorage.setItem('Image', uri);
    } else {
      console.log('no photo');
    }
  }, [uri]);

  userData = () => {
    fetch('https://aplikasi-santri.herokuapp.com/api/user', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        setData(result);
        setName(result.name);
        setId(result.id);
        setBalance(result.balance);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.imageView}>
          {resPhoto ? (
            <Image source={{uri: uri}} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.image}
            />
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setModalVisible2(true)}>
            <Icon name="image-edit-outline" size={22} color="#8388FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileView}>
          <Text style={styles.profileText}>{name}</Text>
          <Text style={styles.profileText}>{id}</Text>
        </View>
      </View>
      <View style={styles.balanceView}>
        <Text style={styles.balance}>Rp. {balance},-</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Icon name="qrcode-scan" size={25} color="#FFFFFF" />
        <Text style={styles.buttonText}>ID Dompet Saya</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Riwayat Transaksi')}>
        <Icon name="history" size={25} color="#FFFFFF" />
        <Text style={styles.buttonText}>Riwayat Transaksi</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.qrText}>
            Tunjukkan ini untuk transfer sesama Santri
          </Text>

          <QRCode
            value={JSON.stringify(data)}
            size={200}
            bgColor="black"
            fgColor="white"
          />
        </View>
      </Modal>

      <Modal
        isVisible={modalVisible2}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible2(false)}>
        <View style={styles.modalView2}>
          <TouchableOpacity onPress={() => openCamera()}>
            <Text style={styles.modaltext}>Ambil dari Kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openGallery()}>
            <Text style={styles.modaltext}>Ambil dari Galeri</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#8388FF',
    height: hp('45%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '7%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  buttonView: {
    width: wp('90%'),
    position: 'absolute',
    top: '5%',
  },
  imageView: {
    marginVertical: '5%',
    backgroundColor: '#8388FF',
    width: '35%',
    height: '43%',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
  penView: {
    width: 30,
    height: 30,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: '12%',
    right: '-5%',
  },
  profileView: {
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFF',
  },
  button: {
    backgroundColor: '#8388FF',
    width: wp('90%'),
    height: hp('7%'),
    marginTop: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFF',
    marginLeft: 10,
  },
  modalView: {
    backgroundColor: '#ffffff',
    elevation: 20,
    paddingVertical: 20,
    borderRadius: 10,
    top: hp('7%'),
    left: wp('5%'),
    width: wp('80%'),
    height: hp('35%'),
    alignItems: 'center',
  },
  modalView2: {
    backgroundColor: '#FFFFFF',
    width: wp('70%'),
    height: hp('12%'),
    left: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '5%',
  },
  qrText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '5%',
    bottom: '6%',
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: 99,
  },
  balanceView: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C4C4C4',
    width: wp('90%'),
    height: hp('8%'),
    borderRadius: 15,
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    position: 'absolute',
    top: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: '#000000',
  },
  modaltext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#000000',
    margin: 8,
  },
});

// import {
//   Text,
//   StyleSheet,
//   View,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Modal,
// } from 'react-native';
// import React, {Component} from 'react';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import QRCode from 'react-native-qrcode-generator';
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;
// class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token: '',
//       data: '',
//       name: '',
//       balance: 0,
//       id: '',
//       modalVisible: false,
//     };
//   }
//   componentDidMount() {
//     console.log(this.state.uri)
//     AsyncStorage.getItem('token')
//       .then(value => {
//         if (value != null) {
//           this.setState({token: value});
//           console.log(value);
//         } else {
//           this.props.navigation.goBack();
//         }
//       })
//       .then(() => {
//         this.userData();
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   }
//   userData() {
//     fetch('https://aplikasi-santri.herokuapp.com/api/user', {
//       method: 'GET',
//       redirect: 'follow',
//       headers: {
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then(response => response.json())
//       .then(result => {
//         this.setState({
//           data: result,
//           name: result.name,
//           id: result.id,
//           balance: result.balance,
//         });
//         console.log(result);
//       })
//       .catch(error => console.log('error', error));

//   }

//   render() {
//     return (
// <View style={styles.container}>
//   <View style={styles.header}>
//     <TouchableOpacity
//       style={styles.buttonView}
//       onPress={() => this.props.navigation.goBack()}>
//       <Icon name="arrow-left" size={24} color="#fff" />
//     </TouchableOpacity>
//     <View style={styles.imageView}>
//         <Image
//           source={require('../assets/images/profile.png')}
//           style={styles.image}
//         />
//     </View>

//     <View style={styles.profileView}>
//       <Text style={styles.profileText}>{this.state.name}</Text>
//       <Text style={styles.profileText}>ID {this.state.id}</Text>
//     </View>
//   </View>
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => this.setState({modalVisible: true})}>
//     <Icon name="qrcode-scan" size={25} color="#FFFFFF" />
//     <Text style={styles.buttonText}>ID Dompet Saya</Text>
//   </TouchableOpacity>
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => this.props.navigation.navigate('Riwayat Transaksi')}>
//     <Icon name="history" size={25} color="#FFFFFF" />
//     <Text style={styles.buttonText}>Riwayat Transaksi</Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={styles.button}>
//     <Icon name="information" size={25} color="#FFFFFF" />
//     <Text style={styles.buttonText}>Tentang Dompet Santri</Text>
//   </TouchableOpacity>
//   <Modal
//     visible={this.state.modalVisible}
//     animationType="slide"
//     transparent={true}
//     onRequestClose={() => {
//       Alert.alert('Modal has been closed.');
//       this.setState({modalVisible: false});
//     }}>
//     <View style={styles.modalView}>
//       <TouchableOpacity
//         style={{left: 7, top: 7, position: 'absolute'}}
//         onPress={() => this.setState({modalVisible: false})}>
//         <Icon name="close" size={25} color="#000000" />
//       </TouchableOpacity>

//       <QRCode
//         value={JSON.stringify(this.state.data)}
//         size={200}
//         bgColor="black"
//         fgColor="white"
//       />
//       <Text style={styles.qrText}>
//         Tunjukkan ini untuk transfer sesama Santri
//       </Text>
//     </View>
//   </Modal>
// </View>
//     );
//   }
// }
// export default Profile;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//   },
//   header: {
//     backgroundColor: '#8388FF',
//     height: hp('45%'),
//     width: wp('100%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     borderBottomRightRadius: 15,
//     borderBottomLeftRadius: 15,
//   },
//   buttonView: {
//     width: wp('90%'),
//     position: 'absolute',
//     top: '5%',
//   },
//   imageView: {
//     marginVertical: '5%',
//     backgroundColor: '#8388FF',
//     width: '35%',
//     height: '38%',
//     borderRadius: 55,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 99,
//   },
//   penView: {
//     width: 30,
//     height: 30,
//     borderRadius: 55,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     position: 'absolute',
//     bottom: '12%',
//     right: '-5%',
//   },
//   profileView: {
//     alignItems: 'center',
//   },
//   profileText: {
//     fontSize: 17,
//     fontFamily: 'Montserrat-SemiBold',
//     color: '#FFF',
//   },
//   button: {
//     backgroundColor: '#8388FF',
//     width: wp('90#'),
//     height: hp('7%'),
//     marginTop: '5%',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//   },
//   buttonText: {
//     fontSize: 15,
//     fontFamily: 'Montserrat-SemiBold',
//     color: '#FFF',
//     marginLeft: 10,
//   },
//   modalView: {
//     backgroundColor: '#ffffff',
//     paddingVertical: 20,
//     borderRadius: 12,
//     elevation: 30,
//     position: 'absolute',
//     top: hp('34%'),
//     left: wp('12%'),
//     width: wp('80%'),
//     height: hp('35%'),
//     alignItems: 'center',
//   },
//   modalView2: {
//     backgroundColor: '#ffffff',
//     padding: 10,
//     borderRadius: 12,
//     elevation: 30,
//     position: 'absolute',
//     top: hp('34%'),
//     left: wp('22%'),
//   },
//   qrText: {
//     fontSize: 14,
//     fontFamily: 'Montserrat-Regular',
//     color: '#000',
//     marginVertical: 10,
//   },
// });
