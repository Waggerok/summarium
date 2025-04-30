import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from './UI/button';
import { commonStyles, componentsStyles } from '@/styles';
import { useTheme } from '@/hooks';

const uploadComponent = () => {

    const theme = useTheme()

    const uploadFile = () => {
        console.log('pressed');
    }

    return (
        <View className={`border shadow-sm h-[30%] w-full rounded-lg p-4`} style={{backgroundColor: theme.bg, borderColor: theme.stroke}}>
            <View className='border border-dashed w-full h-full border-gray-500 rounded-lg flex flex-col justify-center items-center space-y-4'>
                    <Feather name='upload' size={50} color="gray"/>
                    <Text style={{color: theme.mainText}}>Выберите файл чтобы загрузить</Text>
                    
                    
                    <Button
                        text='Выбрать файл'
                        onPress={uploadFile}
                        style={[componentsStyles.button]}
                        className='bg-gray-600'
                    />
                
            </View>
        </View>
    )
}

export default uploadComponent;