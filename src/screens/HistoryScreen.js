import React,{useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, FlatList, TouchableOpacity, Image, I18nManager,
} from 'react-native';
import AppBox from '../component/AppBox';
import { AsyncStorage } from 'react-native';
import AppBar from '../component/AppBar';
I18nManager.forceRTL(true);


function HistoryScreen (props) {
  const {navigate} = props.navigation;
  const [historyListToDo, setHistoryListToDo] = useState([]);

    useEffect(()=>{
        _retrieveData();
    },[]);

  const _storeData = async (item) => {
    try {
        await AsyncStorage.setItem('ToDoListHistory', JSON.stringify(item));
  } catch (error) {
    // Error saving data
  }
};
  const _retrieveData = async () => {
      try {
          const value = await AsyncStorage.getItem('ToDoListHistory');
          console.log(JSON.parse(value));
          if (value !== null) {
            setHistoryListToDo(JSON.parse(value));
          }
      } catch (error) {
          // Error saving data
      }
    };

    const deleteItem = item =>{
      const newData = historyListToDo.filter(val => val !== item);
      setHistoryListToDo(newData);
      _storeData(newData);
  };

  const clearList = async () =>{
    await AsyncStorage.removeItem('ToDoListHistory');
    setHistoryListToDo([]);
    };
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{backgroundColor:'#66788A',height:"100%"}} >
        <AppBox style={{height:"94%",marginVertical:20}}>
            <AppBar navigate={navigate}/>
            <View style={{alignItems:'center',marginBottom:20}}>
                <Text style={styles.h1}>ToDo List History</Text>
            </View>
            <FlatList
                keyExtractor={(item, index) => 'key'+index}
                data={historyListToDo}
                renderItem={({item}) =>
                <ScrollView>
                    <View style={{flexDirection:'row-reverse',paddingLeft:40,marginVertical:5}}>
                        <Text style={{fontSize:16,width:'70%',left:10,bottom:1,}}>
                            <Text style={{fontWeight: 'bold'}}>-</Text> {item.key}
                        </Text>
                    </View>
                    <View style={{position:'absolute',flexDirection:'row',top:3,left:10}}>
                        <TouchableOpacity onPress={() => deleteItem(item)}>
                            <Image style={{width:25,height:25}} source={require('../assets/icons/trash_icon.png')}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }/>
            <View style={{marginHorizontal:10,flexDirection:'row-reverse',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=> clearList()} style={{alignItems:'center'}}>
                    <Text style={{fontSize:15,color:'blue'}}>Clear History</Text>
                </TouchableOpacity>
            </View>
        </AppBox>
    </SafeAreaView>
    </>
    );
}


const styles = StyleSheet.create({
    h1:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 23,
        letterSpacing: 0.996,
        color: '#66788A',
        textDecorationLine: 'underline',
    },
    h2:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.996,
        color: 'black',
    }
});
export default HistoryScreen;
