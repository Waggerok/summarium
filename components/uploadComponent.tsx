import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from './UI/button';
import { componentsStyles } from '@/styles';
import { useTheme } from '@/hooks';

const uploadComponent = () => {

    const theme = useTheme()

    const uploadFile = () => {
        console.log('pressed');
    }

    return (
        <View className={`border shadow-sm h-[30%] w-full rounded-lg p-4`} style={{backgroundColor: theme.bg, borderColor: theme.stroke}}>
            <View className='border-2 border-dashed w-full h-full rounded-lg flex flex-col justify-center items-center space-y-4' style={{borderColor: theme.stroke}}>
                    <Feather name='upload' size={50} style={{color: theme.stroke}}/>
                    <Text style={{color: theme.secondaryText}}>Выберите файл чтобы загрузить</Text>
                                        
                    <Button
                        text='Выбрать файл'
                        onPress={uploadFile}
                        style={[componentsStyles.button, {backgroundColor: theme.bg ,borderColor: theme.stroke}]}
                        className='border shadow-sm'
                        textStyle={{color: theme.mainText}}
                    />                
            </View>
        </View>
    )
}

export default uploadComponent;