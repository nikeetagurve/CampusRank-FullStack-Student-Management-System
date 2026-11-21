import React from 'react';
import { ActivityIndicator, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function AppButton({ title, onPress, loading, secondary = false, disabled = false }) {
 const { colors } = useTheme();
 return <Pressable disabled={disabled || loading} onPress={onPress} style={[styles.button,{backgroundColor:secondary?colors.surfaceAlt:colors.primary,borderColor:colors.border,opacity:disabled ? 0.6 : 1}]}>
  {loading ? <ActivityIndicator color={colors.text}/> : <Text style={[styles.text,{color:secondary?colors.text:'#FFFFFF'}]}>{title}</Text>}
 </Pressable>;
}
const styles=StyleSheet.create({button:{paddingVertical:14,paddingHorizontal:18,borderRadius:15,alignItems:'center',borderWidth:1},text:{fontSize:15,fontWeight:'700'}});
