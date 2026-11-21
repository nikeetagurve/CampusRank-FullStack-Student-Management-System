import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function Field({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, multiline }) {
 const { colors } = useTheme();
 return <View style={{marginBottom:15}}><Text style={[styles.label,{color:colors.text}]}>{label}</Text>
 <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted}
  secureTextEntry={secureTextEntry} keyboardType={keyboardType} multiline={multiline}
  style={[styles.input,{color:colors.text,backgroundColor:colors.surface,borderColor:colors.border}]} /></View>;
}
const styles=StyleSheet.create({label:{fontSize:13,fontWeight:'700',marginBottom:7},input:{borderWidth:1,borderRadius:13,padding:14,fontSize:15}});
