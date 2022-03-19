import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native'


export default class TransferScren extends Component {
  render() {
    return (
      <View>
        <View style={styles.kotak}>
          <TouchableOpacity style={styles.kotakin}>
             <Image source={require('../assets/images/arlf.png')} />
             </TouchableOpacity>
            <Text style={[styles.kotakin , styles.text]}>Transfer Dana</Text>
        </View>

        <View style={styles.kotak2}>
            <TextInput style={styles.isiin} placeholder='ID Dompet Santri'/>
            <TextInput style={styles.isiin} placeholder='Jumlah Transfer'/>
            <TouchableOpacity style={styles.ktf}>
                <Text style={styles.text}>Transfer</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  kotak:{
    height:50,
    width:540,
    backgroundColor:'#8388FF',
    flexDirection:'row',
  },
  kotakin:{
    marginTop:12,
    marginLeft:8,
    fontSize:20
  },
  kotak2:{
    alignItems:'center',
    marginTop:150,

  },
  isiin:{
    height:40,
    width:200,
    borderWidth:2,
    borderColor:'#F1F1F1',
    marginBottom:10,
    borderRadius:5,
    paddingLeft:10
  },
  ktf:{
    height:50,
    width:200,
    backgroundColor:'#8388FF',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    elevation:5,
  },
  text:{
    fontSize : 16,
    color:'white',
    fontFamily : 'Montserrat-Bold'
  }
})