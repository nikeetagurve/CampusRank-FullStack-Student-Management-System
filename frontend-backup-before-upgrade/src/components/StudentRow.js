import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function StudentRow({ item, highlight, onPress }) {
 const { colors } = useTheme();
 return <View style={[styles.row,{backgroundColor:highlight?colors.surfaceAlt:colors.surface,borderColor:colors.border}]}>
  <View style={[styles.rank,{backgroundColor:colors.primary}]}><Text style={{color:'#fff',fontWeight:'800'}}>#{item.rank}</Text></View>
  <View style={{flex:1}}><Text style={[styles.name,{color:colors.text}]}>{item.fullName}</Text><Text style={{color:colors.muted,fontSize:12}}>{item.department || 'Student'} · Year {item.yearOfStudy || 1}</Text></View>
  <Text style={[styles.points,{color:colors.primaryDark}]}>{item.totalPoints} pts</Text>
 </View>;
}
const styles=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',padding:14,borderRadius:16,borderWidth:1,marginBottom:10,gap:12},rank:{width:38,height:38,borderRadius:13,alignItems:'center',justifyContent:'center'},name:{fontWeight:'800',fontSize:14,marginBottom:3},points:{fontWeight:'800'}});
