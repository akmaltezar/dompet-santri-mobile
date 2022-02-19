import React from 'react'
import {
  View, Text,Dimensions,TouchableOpacity
} from 'react-native'

const ww = Dimensions.get('window').width;

export default class Dashboard2 extends React.Component {
    render(){
        const navigation = this.props.navigation;
    return (
        <View style={{alignItems:'center',flex:1,backgroundColor:'white'}}>
            {/* <View style={{backgroundColor:'#8388FF',width:ww,height:50,justifyContent:'center',alignItems:'center',}}>
                <Text style={{color:'white',fontSize:16,marginLeft:10}}>Dashboard</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:ww,height:50,marginBottom:50}}>
                <Text style={{fontSize:16,color:'black'}}>Pengajuan</Text>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#8388FF',}}>Riwayat</Text>
                    <View style={{backgroundColor:'#8388FF',height:3,width:100,top:10}} />
                </View>
            </View> */}
            <View style={{justifyContent:'center',alignItems:'center',width:ww-30,height:120,borderLeftWidth:1,borderRadius:10,borderEndWidth:1,borderBottomWidth:1,marginBottom:20,borderColor:'#C4C4C4',marginTop:15}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:ww-30,height:60,}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:110,}}>
                        <View style={{width:20,height:20,backgroundColor:'red',borderRadius:10}} />
                        <View >
                            <Text style={{color:'black',fontSize:16}}>Isi saldo</Text>
                            <Text >12/12/2021</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'red',width:100,height:30,justifyContent:'center',alignItems:'center',borderRadius:5}}>
                        <Text style={{color:'white',fontSize:16}}>Dibatalkan</Text>
                    </View>
                </View>
                <TouchableOpacity style={{backgroundColor:'#8388FF',alignItems:'center',justifyContent:'center',width:ww-90,height:30,borderRadius:5}}>
                    <Text style={{color:'white',fontSize:16}}>Lihat data</Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',width:ww-30,height:120,borderLeftWidth:1,borderRadius:10,borderEndWidth:1,borderBottomWidth:1,borderColor:'#C4C4C4'}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:ww-30,height:60,}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:110,}}>
                        <View style={{width:20,height:20,backgroundColor:'#8388FF',borderRadius:10}} />
                        <View >
                            <Text style={{color:'black',fontSize:16}}>Isi saldo</Text>
                            <Text >12/12/2021</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#8388FF',width:100,height:30,justifyContent:'center',alignItems:'center',borderRadius:5}}>
                        <Text style={{color:'white',fontSize:16}}>Sukses</Text>
                    </View>
                </View>
                <TouchableOpacity style={{backgroundColor:'#8388FF',alignItems:'center',justifyContent:'center',width:ww-90,height:30,borderRadius:5}}>
                    <Text style={{color:'white',fontSize:16}}>Lihat data</Text>
                </TouchableOpacity>
            </View>
        </View>
      )
    }
  }