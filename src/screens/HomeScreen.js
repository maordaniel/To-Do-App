import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,TextInput,FlatList,Button,TouchableOpacity,Image,I18nManager
} from 'react-native';
import AppBox from '../component/AppBox';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
I18nManager.forceRTL(true);


function HomeScreen (props) {
  const {navigate} = props.navigation;
  const [textValue, setTextValue] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [restList,setRestList] = useState(0);

    useEffect(()=>{
        _retrieveData();
    },[]);

  const _storeData = async (item) => {
      try {
        await AsyncStorage.setItem('ToDoList', JSON.stringify(item));
        const value = JSON.parse(await AsyncStorage.getItem('ToDoListHistory'));
        if (value !== null) {
            let merge = (a, b, p) => a.filter( aa => ! b.find ( bb => aa[p] === bb[p]) ).concat(b);
            let data = merge(value,item,"key");
            await AsyncStorage.setItem('ToDoListHistory', JSON.stringify(data));
        }else {
            await AsyncStorage.setItem('ToDoListHistory', JSON.stringify(item));
        }
      } catch (error) {
          console.log(error)
        // Error saving data
      }
    };

  const _retrieveData = async () => {
      try {
          const value = await AsyncStorage.getItem('ToDoList');
          if (value !== null) {
            setToDoList(JSON.parse(value));
            for (let i =0; i < JSON.parse(value).length;i++){
                if(JSON.parse(value)[i].strike){
                setRestList(i + 1);
                }
            }
          }
      } catch (error) {
      }
    };

  const capitalizeFirstLetter = string=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const is_empty = (x)=> {
   return (
        (typeof x == 'undefined')
                    ||
        (x == null)
                    ||
        (x === false)  //same as: !x
                    ||
        (x.length === 0)
                    ||
        (x === "")
                    ||
        (x.replace(/\s/g,"") === "")
                    ||
        (!/[^\s]/.test(x))
                    ||
        (/^\s*$/.test(x))
  );
};

  const addToList = () => {
    if (is_empty(textValue)) {
        alert('Sorry Your Input Is Not Valid.')
    }else if (toDoList.some(item => item.key.toLowerCase() === textValue.toLowerCase())){
        alert('Sorry Your Input Is Already In The List.')
    }
    else {
        let newData = [...toDoList, {key: capitalizeFirstLetter(textValue.toLowerCase()),strike:false}];
        setToDoList(newData);
        _storeData(newData);
        setTextValue("");
    }
    };

    const markItem = item =>{
      const newData = toDoList.map(el => {
                if(el === item)
                   return Object.assign({}, el, {strike:true});
                return el
            });
      setToDoList(newData);
      _storeData(newData);
      for (let i =0; i < newData.length;i++){
        if(newData[i].strike){
           setRestList(i + 1);
        }
    }
  };

    const removeMarkItem = item =>{
      const newData = toDoList.map(el => {
                if(el === item)
                   return Object.assign({}, el, {strike:false});
                return el
            });
      setToDoList(newData);
      setRestList(restList - 1 );
      _storeData(newData);
  };

    const deleteItem = item =>{
        const newData = toDoList.filter(value => value !== item);
      setToDoList(newData);
      _storeData(newData);
    };

    const clearList = async () =>{
        await AsyncStorage.removeItem('ToDoList');
        setToDoList([]);
        setRestList(0)
    };

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{backgroundColor:'#66788A',height:"100%"}} >
        <AppBox style={{flexDirection:'row-reverse',marginVertical:20,justifyContent:'center'}}>
                <Text style={styles.h1}>ToDo List</Text>
        </AppBox>
        <AppBox style={{height:"90%"}}>
        <View style={{flexDirection:'row-reverse',marginVertical:20,justifyContent:'center'}}>
            <TextInput  style={{ width:wp('70%'), height: hp('5.5%'), borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => setTextValue(text)} value={textValue}/>
            <Button title={"Add"} onPress={()=> addToList()}/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:10,bottom:5}}>
            <Text style={styles.h2}>{`${toDoList.length - restList} Remaining out of ${toDoList.length}`}</Text>
        </View>
        <FlatList
            data={toDoList}
            renderItem={({item}) =>
            <ScrollView>
                <TouchableOpacity onPress={()=> item.strike ? removeMarkItem(item) : markItem(item)}
                                  style={{flexDirection:'row-reverse',paddingLeft:10,marginVertical:5}}>
                    {item.strike ?
                    <Image style={{top:3,width:17,height:17}} source={require('../assets/icons/point.png')}/> :
                    <Image style={{top:3,width:17,height:17}} source={require('../assets/icons/empty_icon.png')}/>}
                    <Text style={{textAlign:'right', width:'70%',left:10 ,textDecorationLine: item.strike ?'line-through' :null,
                        fontSize:16,textDecorationStyle: item.strike ?'solid':null}}>
                    {item.key}
                    </Text>
                </TouchableOpacity>
                <View style={{position:'absolute',flexDirection:'row',top:7,left:10}}>
                {item.strike ?
                        <Image style={{width:17,height:17}} source={require('../assets/icons/ic_success.png')}/>
                    : <TouchableOpacity onPress={() => deleteItem(item)}>
                            <Image style={{bottom:5, width:25, height:25}} source={require('../assets/icons/trash_icon.png')}/>
                        </TouchableOpacity>}
                </View>
            </ScrollView>
        }/>
            <View style={{marginHorizontal:10,flexDirection:'row-reverse',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> clearList()} >
                    <Text style={{fontSize:15,color:'blue'}}>Clear List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("History")}>
                    <Text style={{fontSize:15,color:'blue'}}>History List</Text>
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
        color: '#66788A',},
    h2:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.996,
        color: 'black',
    }
});
export default HomeScreen;
