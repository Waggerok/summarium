import { commonStyles } from '@/styles/styles';
import * as React from 'react';
import { View, Text } from 'react-native';
import Input from './UI/input';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { Button } from './UI/button';


const authForm = () => {

    const [email,setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        console.log(email,password);
    }
    return (
        <View style={commonStyles.formAuth}>
            
            <View>
                <Text className='text-2xl font-bold text-center'>Авторизация</Text>
                <Text className='text-sm text-center text-gray-500'>Введите свои данные для входа</Text>
            </View>      
        
            <View>
                <Text className='mb-1'>Email</Text>
                <Input
                    placeholder='Email'
                    icon={<AntDesign name='user' size={18}/>} 
                    value={email} 
                    onChangeText={setEmail}
                />
            </View>

            <View>
                <Text className='mb-1'>Пароль</Text>
                <Input 
                    placeholder='Пароль' 
                    icon={<Feather name='lock' size={18}/>}
                    value={password} 
                    onChangeText={setPassword}
                />
            </View>

            <Button text='Войти' onPress={handleLogin} style={commonStyles.button}/>

        </View>
    )
}


export default authForm;