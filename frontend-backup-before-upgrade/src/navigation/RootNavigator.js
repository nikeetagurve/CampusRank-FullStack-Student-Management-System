import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import LoginScreen from '../screens/LoginScreen';import RegisterScreen from '../screens/RegisterScreen';import DashboardScreen from '../screens/DashboardScreen';import AwardScreen from '../screens/AwardScreen';
const Stack=createNativeStackNavigator();
export default function RootNavigator(){
 const {user}=useSelector(s=>s.auth);const {colors,isDark}=useTheme();
 const navTheme={...(isDark?DarkTheme:DefaultTheme),colors:{...(isDark?DarkTheme.colors:DefaultTheme.colors),background:colors.background,card:colors.surface,text:colors.text,border:colors.border,primary:colors.primary}};
 return <NavigationContainer theme={navTheme}><Stack.Navigator screenOptions={{headerStyle:{backgroundColor:colors.surface},headerTintColor:colors.text,headerTitleStyle:{fontWeight:'800'},contentStyle:{backgroundColor:colors.background}}}>
 {!user?<><Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/><Stack.Screen name="Register" component={RegisterScreen} options={{title:'Create account'}}/></>
 :<><Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown:false}}/><Stack.Screen name="AwardSelect" component={DashboardScreen} options={{title:'Select a student'}}/><Stack.Screen name="Award" component={AwardScreen} options={{title:'Award points'}}/></>}
 </Stack.Navigator></NavigationContainer>;
}
