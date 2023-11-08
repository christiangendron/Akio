import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native'
import { StackParams } from '../../types/Navigator';

function NotAuth() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View className='flex flex-1 justify-center items-center'> 
                <Image source={require('../../assets/icons/noAccount.png')} className='h-20 w-20 mb-5'/>
                <Text className='text-center mb-3'>You need an account to generate content</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Account')} className='mt-5'>
                    <Text className='text-center bg-black p-5 text-white'>I already have an account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} className='mt-5'>
                    <Text className='text-center bg-black p-5 text-white'>Create one</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default NotAuth