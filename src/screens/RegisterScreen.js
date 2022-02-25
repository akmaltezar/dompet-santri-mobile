import React, {Component} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Image} from 'react-native';
  
  
  export default class App extends Component {
    render() {
      return (
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={[styles.text1 ,styles.ds]}>Dompet Santri</Text>
            <Text style={[styles.text1 ,styles.rg]}>Register</Text>

            <View style={styles.tibox}>
              <View style={styles.imgisi}>
                <Image style={styles.imgg} source={require('./src/assets/images/org.png')}/>
                <TextInput placeholder='Nama Lengkap' style={styles.ti}/>
              </View>
              <View style={styles.imgisi}>
              <Image style={styles.imgg} source={require('./src/assets/images/mail.png')}/>
                <TextInput placeholder='Email' style={styles.ti}/>
              </View>
              <View style={styles.imgisi}>
              <Image style={styles.imgg} source={require('./src/assets/images/lock.png')}/>
                <TextInput placeholder='Kata Sandi' style={styles.ti}/>
                </View>
            </View>

            <View style={styles.tibutton}>
              
              <TouchableOpacity style={styles.df}>
                <Text style={styles.dftext}>DAFTAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.df , styles.bu2]}>
                <Text style={styles.dftext}>MASUK</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    text1:{
        color:'#8388FF',  
        fontWeight:'bold',
        fontSize:24,
        paddingLeft:45,
    },
    ds:{
      marginTop:65,
    },
    ti:{
      width:271,
      borderBottomWidth:1,
      borderBottomColor:'#8388FF',
      paddingLeft:35,

    },
    tibox:{
      alignItems:'center',
      marginLeft:-15
    },
    tibutton:{
      alignItems:'center',
      marginTop:50
    },
    df:{
      height:45,
      width:271,
      backgroundColor:'#8388FF',
      justifyContent:'center',
      alignItems:'center',
      marginTop:5,
      borderRadius:10,
    },
    dftext:{
      color:'white',
      fontWeight:'bold',
    },
    bu2:{
      marginTop:30
    },
    imgisi:{
      flexDirection:'row',
      marginTop:10,
    },
    imgg:{
      marginTop:10,
      left:20,
    }
  });