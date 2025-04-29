import React, { useEffect, useState } from 'react';
import { View, Image, Pressable } from "react-native";
import { commonStyles } from '@/styles';
import AuthForm from '@/components/authForm';

import Fontisto from '@expo/vector-icons/Fontisto';
import { useTheme } from '@/hooks/useTheme';
import { useUIStore } from '@/store/store';

export default function Index() {
  
  const {theme, toggleTheme} = useUIStore((state) => state);
  
  return (
    <>
      <View style={commonStyles.container}>
        <View className='absolute top-0 left-0 right-0 bottom-0'>
          <Image 
            source={require('../assets/images/background.png')}
            style={commonStyles.background}
            resizeMode='cover'
          />
        </View>

        <Pressable 
          className='rounded-full p-2 absolute top-14 right-6 border-2 border-gray-100'
          onPress={toggleTheme}
        >
          {theme === 'light' ? (
            <Fontisto name='day-sunny' size={24} color='yellow'/>
          ) : (
            <Fontisto name='night-clear' size={24} color='white'/>
          )}
          
        </Pressable>

        <AuthForm/>
      </View>
    </>
    
  );
}