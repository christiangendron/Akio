import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { StackParams } from '../../types/Navigator';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useColorScheme } from 'nativewind';

type NotAuthProps = {
    closeModal: () => void;
}

function NotAuth(props: NotAuthProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const { colorScheme } = useColorScheme();

    return (
        <View className='flex justify-center items-center bg-secondary dark:bg-backgroundDark p-5 rounded-lg'> 
            <MaterialCommunityIcons name="account-alert" size={75} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
            <Text className='text-center mb-3 dark:text-white'>You need an account to generate content</Text>
            <View className='flex flex-row'>
                <TouchableOpacity onPress={() => {
                    props.closeModal();
                    navigation.navigate('Account')
                }} className='mt-1 rounded-l-lg bg-secondaryDark'>
                    <Text className='text-center p-5 text-white'>I have an account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.closeModal();
                    navigation.navigate('Register')
                }} className='mt-1 rounded-r-lg bg-black'>
                    <Text className='text-center  p-5 text-white'>Create one</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NotAuth