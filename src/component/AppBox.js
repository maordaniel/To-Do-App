import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

function AppBox(props) {
    return(
        <SafeAreaView>
            <View style={{...styles.card, ...props.style}}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
   card: {
       // flex: ,
       shadowColor: 'black',
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 6,
       shadowOpacity: 0.26,
       backgroundColor: 'white',
       elevation: 5,
       padding: 20,
       borderRadius: 10,
       marginHorizontal:20,
       // left:2
   },

});

export default AppBox;
