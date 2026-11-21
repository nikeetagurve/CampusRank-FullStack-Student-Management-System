import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function Screen({ children, scroll = true }) {
 const { colors } = useTheme();
 return scroll ? <ScrollView style={{backgroundColor:colors.background}} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
 : <View style={[styles.content,{backgroundColor:colors.background}]}>{children}</View>;
}
const styles=StyleSheet.create({content:{flexGrow:1,padding:22,paddingTop:28}});
