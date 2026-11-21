import React, { useState } from 'react';
import { Text, View, Pressable, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import Screen from '../components/Screen'; import Field from '../components/Field'; import AppButton from '../components/AppButton';
export default function RegisterScreen({navigation}) {
 const [fullName,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [role,setRole]=useState('STUDENT');const [department,setDepartment]=useState('Computer Science');const [year,setYear]=useState('1');
 const dispatch=useDispatch();const {loading}=useSelector(s=>s.auth);const {colors}=useTheme();
 const submit=async()=>{if(!fullName.trim()||!email.trim()||password.length<8){Alert.alert('Check details','Name, valid email and password (at least 8 characters) are required.');return;}
 const payload={fullName,email,password,role,department,yearOfStudy:Number(year)||1};const r=await dispatch(register(payload));if(register.rejected.match(r))Alert.alert('Registration failed',r.payload||'Please try again.');};
 return <Screen><Text style={[styles.title,{color:colors.text}]}>Create your{'\n'}account.</Text><Text style={{color:colors.muted,marginBottom:24}}>Join the CampusRank community.</Text>
 <Field label="FULL NAME" value={fullName} onChangeText={setName} placeholder="Your full name"/>
 <Field label="EMAIL ADDRESS" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address"/>
 <Field label="PASSWORD (MIN. 8 CHARACTERS)" value={password} onChangeText={setPassword} placeholder="Create a password" secureTextEntry/>
 <Text style={[styles.label,{color:colors.text}]}>I AM REGISTERING AS</Text><View style={styles.roles}>{['STUDENT','TEACHER'].map(x=><Pressable key={x} onPress={()=>setRole(x)} style={[styles.role,{backgroundColor:role===x?colors.primary:colors.surface,borderColor:colors.border}]}><Text style={{color:role===x?'white':colors.text,fontWeight:'800'}}>{x}</Text></Pressable>)}</View>
 {role==='STUDENT'?<><Field label="DEPARTMENT" value={department} onChangeText={setDepartment} placeholder="Computer Science"/><Field label="YEAR OF STUDY" value={year} onChangeText={setYear} placeholder="1" keyboardType="number-pad"/></>:null}
 <AppButton title="Create account" onPress={submit} loading={loading}/><Pressable onPress={()=>navigation.goBack()} style={{alignItems:'center',marginTop:20}}><Text style={{color:colors.primaryDark,fontWeight:'700'}}>Already registered? Sign in</Text></Pressable>
 </Screen>;
}
const styles=StyleSheet.create({title:{fontSize:36,fontWeight:'900',lineHeight:42,marginTop:12,marginBottom:8},label:{fontSize:13,fontWeight:'800',marginBottom:9},roles:{flexDirection:'row',gap:10,marginBottom:18},role:{flex:1,padding:14,borderRadius:13,borderWidth:1,alignItems:'center'}});
