import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera} from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isiSaldo = () => {
  const [uri, setUri] = React.useState(null);
  const [resPhoto, setResPhoto] = useState(false);

  const takePhoto = () => {
    const options = {
      maxHeight: 600,
      maxWidth: 1250,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
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

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity>
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
          1. Kirim uang ke rekening BSI : 3000044 a/n Adam Syahputra
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
          placeholder="Nominal Isi Saldo"></TextInput>
        <TouchableOpacity onPress={() => takePhoto()}>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default isiSaldo;

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
});
