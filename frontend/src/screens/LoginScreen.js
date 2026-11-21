import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import Screen from '../components/Screen'; import Field from '../components/Field'; import AppButton from '../components/AppButton';
export default function LoginScreen({ navigation }) {
 const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
 const dispatch=useDispatch(); const {loading,error}=useSelector(s=>s.auth); const {colors,toggle,isDark}=useTheme();
 const submit=async()=>{if(!email.trim()||!password){Alert.alert('Missing details','Enter your email and password.');return;}const r=await dispatch(login({email,password}));if(login.rejected.match(r))Alert.alert('Login failed',r.payload||'Please try again.');};
 return <Screen><View style={styles.top}><Text style={{fontSize:13,color:colors.primaryDark,fontWeight:'800',letterSpacing:2}}>CAMPUSRANK</Text><Pressable onPress={toggle}><Text style={{color:colors.muted}}>{isDark?'☀ Light':'☾ Dark'}</Text></Pressable></View>
 <Text style={[styles.title,{color:colors.text}]}>Welcome{'\n'}back.</Text><Text style={{color:colors.muted,marginBottom:30}}>Your campus journey, beautifully organized.</Text>
 <Field label="EMAIL ADDRESS" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address"/>
 <Field label="PASSWORD" value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry/>
 {error?<Text style={{color:colors.danger,marginBottom:12}}>{error}</Text>:null}
 <AppButton title="Sign in" onPress={submit} loading={loading}/>
 <View style={styles.bottom}><Text style={{color:colors.muted}}>New to CampusRank? </Text><Pressable onPress={()=>navigation.navigate('Register')}><Text style={{color:colors.primaryDark,fontWeight:'800'}}>Create account</Text></Pressable></View>
 </Screen>;
}
const styles=StyleSheet.create({top:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:55},title:{fontSize:42,fontWeight:'900',lineHeight:47,marginBottom:10,letterSpacing:-1},bottom:{flexDirection:'row',justifyContent:'center',marginTop:24}});
