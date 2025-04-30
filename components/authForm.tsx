//React imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks';
import Api from '@/Api';

//UI imports
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from './UI/button';
import Input from './UI/input';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

//Style imports
import { commonStyles, componentsStyles } from '@/styles';



const authForm = () => {

    const [email,setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const theme = useTheme();
    const router = useRouter();

    const handleLogin = async () => {
        const res = await Api.AuthorizationApi.loginForAccessTokenApiAuthLoginPost(
            'Android', email, password
        )

        router.push('/upload')
    }
    return (
        <View style={[commonStyles.formAuth, {backgroundColor: theme.bg}]}>
            
            <View>
                <Text className='text-2xl font-bold text-center' style={{color: theme.mainText}}>Авторизация</Text>
                <Text className='text-sm text-center text-gray-500'>Введите свои данные для входа</Text>
            </View>      
        
            <View>
                <Text className='mb-1' style={{color: theme.secondaryText}}>Email</Text>
                <Input
                    placeholder='Email'
                    icon={<AntDesign name='user' size={18}/>} 
                    value={email} 
                    onChangeText={setEmail}
                />
            </View>

            <View>
                <Text className='mb-1' style={{color: theme.secondaryText}}>Пароль</Text>
                <Input 
                    placeholder='Пароль' 
                    icon={<Feather name='lock' size={18}/>}
                    value={password} 
                    onChangeText={setPassword}
                    isPassword
                />
            </View>

            <Button
                text='Войти'
                onPress={handleLogin}
                style={[componentsStyles.button, {backgroundColor: theme.primary}]}
            />

        </View>
    )
}


export default authForm;