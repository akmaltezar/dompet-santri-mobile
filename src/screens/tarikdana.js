import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Dana extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{alignItems: 'center', flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: '#8388FF',
            height: screenHeight * 0.08,
            width: screenWidth * 1,
            paddingHorizontal: 25,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
              color: '#fff',
              marginLeft: 20,
            }}>
            Tarik Dana
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={{
              borderWidth: 1,
              width: screenWidth - 80,
              borderRadius: 5,
              paddingLeft: 20,
              marginBottom: 10,
            }}
            placeholder="Nama Bank"
          />
          <TextInput
            style={{
              borderWidth: 1,
              width: screenWidth - 80,
              borderRadius: 5,
              paddingLeft: 20,
              marginBottom: 20,
            }}
            placeholder="Nomor Rekening"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#8388FF',
              width: screenWidth - 80,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Buat Pengajuan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
