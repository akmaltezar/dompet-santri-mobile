import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ww = Dimensions.get('window').width;

export default class Dana extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{alignItems: 'center', flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: '#8388FF',
            width: ww,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 150,
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 24, height: 24, marginLeft: 20}}
              // source={require('../assets/images/learrow.png')}
            />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>
            Tarik Dana
          </Text>
        </View>
        <TextInput
          style={{
            borderWidth: 1,
            width: ww - 80,
            borderRadius: 5,
            paddingLeft: 20,
            marginBottom: 10,
          }}
          placeholder="Nama Bank"
        />
        <TextInput
          style={{
            borderWidth: 1,
            width: ww - 80,
            borderRadius: 5,
            paddingLeft: 20,
            marginBottom: 20,
          }}
          placeholder="Nomor Rekening"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#8388FF',
            width: ww - 80,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Buat Pengajuan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
