//React imports
import * as React from 'react';
import { useState } from 'react';

//UI imports
import { Button } from './UI/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text } from 'react-native';
import Input from './UI/input';
import { Feather } from '@expo/vector-icons';

//Style imports
import { commonStyles, componentsStyles } from '@/styles';


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

            <Button text='Войти' onPress={handleLogin} style={componentsStyles.button}/>

        </View>
    )
}


export default authForm;