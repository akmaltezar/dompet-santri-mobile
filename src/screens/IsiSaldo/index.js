import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Modal from "react-native-modal"
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IsiSaldoScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [nominal, setNominal] = useState(0);
  const [uri, setUri] = React.useState(null);
  const [resPhoto, setResPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    name: '',
    uri: '',
    type: '',
  });
  
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Dompet Santri Camera Permission",
          message:"This app needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera()
        console.log("Camera permission given");
      } else {
        ToastAndroid.show("Go to App Info to allow the permission", ToastAndroid.SHORT)
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Dompet Santri Storage Permission",
          message:"This app needs access to your storage",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openGallery()
        console.log("Storage permission given");
      } else {
        ToastAndroid.show("Go to App Info to allow the permission", ToastAndroid.SHORT)
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
        setImage({
          name: res.assets[0].fileName,
          uri: res.assets[0].uri,
          type: res.assets[0].type,
        });
        setResPhoto(true);
        console.log(res);
        console.log(setUri);
        setModalVisible(!modalVisible);
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
        setImage({
          name: res.assets[0].fileName,
          uri: res.assets[0].uri,
          type: res.assets[0].type,
        });
        setResPhoto(true);
        console.log(res);
        console.log(setUri);
        setModalVisible(!modalVisible);
      }
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          setToken(value);
        } else {
          navigation.replace('LoginScreen');
        }
      })
      .catch(err => {
        console.log('ini error', err);
      });
  });

  function IsiSaldo() {
    setLoading(true);
    console.log('ini image', image);
    const formdata = new FormData();
    formdata.append('nominal', nominal);
    formdata.append('pict', image);

    fetch('https://aplikasi-santri.herokuapp.com/api/isi', {
      method: 'POST',
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('ini result', result);
        navigation.goBack('HomeScreen');
      })
      .catch(error => console.log('itu error', error))
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Isi Saldo</Text>
      </View>
      <View style={styles.mainView}>
        <Icon name="list" size={20} color="#8388FF" />
        <Text style={styles.subtitle}>Langkah - Langkah</Text>
      </View>
      <View style={styles.textFrame}>
        <Text style={styles.steps}>
          1. Kirim uang ke rekening BSI : 7154956028 a/n Akmal Tezar
        </Text>
        <Text style={styles.steps}>
          2. Tambahkan no unik pada nominal isi saldo, contoh : 50,021
        </Text>
        <Text style={styles.steps}>
          3. Tulis Nominal isi saldo dan unggah bukti transfer pada kolom di
          bawah ini
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Nominal Isi Saldo"
          value={nominal}
          onChangeText={value => setNominal(value)}></TextInput>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {resPhoto ? (
            <Image
              source={{uri: uri}}
              style={{
                height: screenHeight * 0.2,
                width: screenWidth * 0.85,
                borderRadius: 20,
                marginVertical: 15,
              }}
            />
          ) : (
            <View style={styles.upload}>
              <Text style={styles.uploadText}>+ Unggah Bukti Transfer</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => IsiSaldo()}>
          {loading ? (
            <ActivityIndicator size={22} color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Kirim</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => requestCameraPermission()}>
            <Text style={styles.modaltext}>Ambil dari Kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => requestGalleryPermission()}>
            <Text style={styles.modaltext}>Ambil dari Galeri</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default IsiSaldoScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8388FF',
    height: screenHeight * 0.08,
    width: screenWidth * 1,
    paddingHorizontal: 25,
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
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#8388FF',
    fontSize: 16,
    marginLeft: 15,
  },
  mainView: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  textFrame: {
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  steps: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  input: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.05,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  upload: {
    backgroundColor: '#C4C4C4',
    height: screenHeight * 0.2,
    width: screenWidth * 0.85,
    borderRadius: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#555555',
  },
  button: {
    backgroundColor: '#8388FF',
    width: screenWidth * 0.85,
    height: screenHeight * 0.05,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    width: wp('70%'),
    height: hp('14%'),
    left : '10%',
    borderRadius : 10,
    justifyContent: 'center',
    alignItems : 'flex-start',
    paddingLeft : '5%'
  },
  modaltext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#000000',
    margin: 8,
  },

});
