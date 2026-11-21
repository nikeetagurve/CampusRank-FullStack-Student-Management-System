import React, { useState } from 'react';
import { Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { awardPoints, fetchLeaderboard } from '../redux/slices/leaderboardSlice';
import { useTheme } from '../context/ThemeContext';
import Screen from '../components/Screen'; import Field from '../components/Field'; import AppButton from '../components/AppButton';
export default function AwardScreen({route,navigation}) {
 const student=route.params?.student;const [points,setPoints]=useState('10');const [reason,setReason]=useState('Excellent work');const dispatch=useDispatch();const {awardLoading}=useSelector(s=>s.leaderboard);const {colors}=useTheme();
 const submit=async()=>{const n=Number(points);if(!Number.isInteger(n)||n<1||n>1000||!reason.trim()){Alert.alert('Invalid award','Enter 1–1000 points and a reason.');return;}
 const r=await dispatch(awardPoints({studentId:student.id,points:n,reason}));if(awardPoints.fulfilled.match(r)){await dispatch(fetchLeaderboard({page:0,size:20}));Alert.alert('Points awarded',`${n} points awarded to ${student.fullName}.`,[{text:'Great',onPress:()=>navigation.popToTop()}]);}else Alert.alert('Could not award points',r.payload||'Try again.');};
 return <Screen><Text style={{color:colors.primaryDark,fontWeight:'800',letterSpacing:2}}>TEACHER TOOLS</Text><Text style={{color:colors.text,fontSize:30,fontWeight:'900',marginTop:12,marginBottom:8}}>Celebrate progress.</Text><Text style={{color:colors.muted,marginBottom:28}}>Award points to recognize student achievements.</Text>
 <Text style={{color:colors.text,fontWeight:'800',fontSize:17,marginBottom:5}}>{student?.fullName||'Choose a student'}</Text><Text style={{color:colors.muted,marginBottom:24}}>{student?.email||''}</Text>
 <Field label="POINTS (1–1000)" value={points} onChangeText={setPoints} keyboardType="number-pad" placeholder="10"/>
 <Field label="REASON" value={reason} onChangeText={setReason} placeholder="Excellent project work"/>
 <AppButton title="Confirm point award" onPress={submit} loading={awardLoading}/>
 </Screen>;
}
