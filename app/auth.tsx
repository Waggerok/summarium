import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Auth = () => {
    const router = useRouter();

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl mb-4">Страница авторизации</Text>
            <TouchableOpacity 
                onPress={() => router.push('/')}
                className="bg-blue-500 px-4 py-2 rounded-lg"
            >
                <Text className="text-white">Перейти на главную</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Auth;