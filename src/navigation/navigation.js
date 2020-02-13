import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';


const MainNavigator = createStackNavigator( {
    Home: HomeScreen,
    History:HistoryScreen
},{initialRouteName:'Home',defaultNavigationOptions: {headerShown:false}});

const RootContainer = createAppContainer(MainNavigator);
export default RootContainer;
