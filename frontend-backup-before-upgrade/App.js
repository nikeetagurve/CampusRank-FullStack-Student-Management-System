import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/redux/store';
import { restoreSession } from './src/redux/slices/authSlice';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import { View, ActivityIndicator } from 'react-native';
function AppContent(){
 const dispatch=useDispatch();const initialized=useSelector(s=>s.auth.initialized);const {colors,isDark}=useTheme();
 useEffect(()=>{dispatch(restoreSession());},[dispatch]);
 if(!initialized)return <View style={{flex:1,backgroundColor:colors.background,alignItems:'center',justifyContent:'center'}}><ActivityIndicator color={colors.primary}/></View>;
 return <><StatusBar style={isDark?'light':'dark'}/><RootNavigator/></>;
}
export default function App(){return <Provider store={store}><ThemeProvider><AppContent/></ThemeProvider></Provider>;}
