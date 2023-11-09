import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { Text, Image, TouchableOpacity, View } from 'react-native'
import { StackParams } from '../../types/Navigator';

type NotAuthProps = {
    closeModal: () => void;
}

function NotAuth(props: NotAuthProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <View className='flex justify-center items-center bg-white p-5 rounded-lg'> 
            <Image source={require('../../assets/icons/noAccount.png')} className='h-20 w-20 mb-5'/>
            <Text className='text-center mb-3'>You need an account to generate content</Text>
            <TouchableOpacity onPress={() => {
                props.closeModal();
                navigation.navigate('Account')
            }} className='mt-5'>
                <Text className='text-center bg-black p-5 text-white'>I already have an account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.closeModal();
                navigation.navigate('Register')
            }} className='mt-5'>
                <Text className='text-center bg-black p-5 text-white'>Create one</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotAuth