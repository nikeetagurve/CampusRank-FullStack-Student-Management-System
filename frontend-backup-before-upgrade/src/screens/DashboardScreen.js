import React, { useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../redux/slices/leaderboardSlice';
import { logout } from '../redux/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import Screen from '../components/Screen'; import AppButton from '../components/AppButton'; import StudentRow from '../components/StudentRow';
export default function DashboardScreen({navigation}) {
 const dispatch=useDispatch();const {user}=useSelector(s=>s.auth);const board=useSelector(s=>s.leaderboard);const {colors,toggle,isDark}=useTheme();
 useEffect(()=>{dispatch(fetchLeaderboard({page:0,size:20}));},[dispatch]);
 const isTeacher=user?.role==='TEACHER';
 return <Screen><View style={styles.header}><View><Text style={{color:colors.primaryDark,fontWeight:'800',letterSpacing:2,fontSize:12}}>CAMPUSRANK</Text><Text style={[styles.heading,{color:colors.text}]}>Hello, {user?.fullName?.split(' ')[0]||'there'} ✨</Text></View><Pressable onPress={toggle} style={[styles.theme,{backgroundColor:colors.surface,borderColor:colors.border}]}><Text style={{color:colors.text}}>{isDark?'☀':'☾'}</Text></Pressable></View>
 <View style={[styles.hero,{backgroundColor:colors.surfaceAlt,borderColor:colors.border}]}><Text style={{color:colors.muted,fontWeight:'700',fontSize:12}}>{isTeacher?'TEACHER WORKSPACE':'YOUR CAMPUS COMMUNITY'}</Text><Text style={[styles.heroTitle,{color:colors.text}]}>{isTeacher?'Inspire. Recognize.':'Grow at your pace.'}</Text><Text style={{color:colors.muted,lineHeight:21}}>{isTeacher?'Celebrate student achievements by awarding points for great work.':'Track your progress and see how you rank among your peers.'}</Text></View>
 <View style={styles.sectionHead}><Text style={[styles.sectionTitle,{color:colors.text}]}>Leaderboard</Text><Text style={{color:colors.muted,fontSize:12}}>{board.totalElements} students</Text></View>
 {board.error?<Text style={{color:colors.danger,marginBottom:12}}>{board.error}</Text>:null}
 {board.loading?<Text style={{color:colors.muted,padding:20}}>Loading leaderboard…</Text>:board.content.map(item=><Pressable key={item.id} onPress={()=>isTeacher?navigation.navigate('Award',{student:item}):null}><StudentRow item={item} highlight={item.fullName===user?.fullName}/></Pressable>)}
 <View style={{marginTop:12}}><AppButton title={isTeacher?'Award student points':'Refresh leaderboard'} onPress={()=>isTeacher?navigation.navigate('AwardSelect'):dispatch(fetchLeaderboard({page:0,size:20}))} secondary={!isTeacher}/></View>
 <Pressable onPress={()=>Alert.alert('Sign out','Are you sure you want to sign out?', [{text:'Cancel'},{text:'Sign out',style:'destructive',onPress:()=>dispatch(logout())}])} style={{alignItems:'center',padding:22}}><Text style={{color:colors.muted,fontWeight:'700'}}>Sign out</Text></Pressable>
 </Screen>;
}
const styles=StyleSheet.create({header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:25},heading:{fontSize:27,fontWeight:'900',marginTop:8},theme:{width:42,height:42,borderRadius:14,borderWidth:1,alignItems:'center',justifyContent:'center'},hero:{padding:21,borderRadius:22,borderWidth:1,marginBottom:28},heroTitle:{fontSize:24,fontWeight:'900',marginVertical:8},sectionHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:14},sectionTitle:{fontSize:20,fontWeight:'900'}});
