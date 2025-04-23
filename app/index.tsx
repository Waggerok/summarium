import React from 'react';
import { View, Text, Image, Button } from "react-native";
import { commonStyles } from '../styles/styles';
import AuthForm from '@/components/authForm';

export default function Index() {
  return (
    <View style={commonStyles.container}>
    
      <View className='absolute top-0 left-0 right-0 bottom-0'>
        <Image 
          source={require('../assets/images/background.png')}
          style={commonStyles.background}
          resizeMode='cover'
        />
      </View>
      <AuthForm/>
    </View>
  );
}