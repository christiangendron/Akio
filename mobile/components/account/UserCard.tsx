import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native'
import { AuthContext } from '../../context/AuthContext'

function UserCard() {
    const authContext = useContext(AuthContext);

    return (
        <View className='flex flex-row bg-secondary dark:bg-secondaryDark rounded-lg m-2'>
            <Image source={require('../../assets/images/default-community.png')} className='h-16 w-16 rounded-full overflow-hidden m-2 border border-1' />
            <View className='flex justify-center'>
                <Text className='dark:text-white'>
                    {authContext.username}
                </Text>
                <Text className='dark:text-white'>
                    {authContext.userEmail}
                </Text>
                <Text className='dark:text-white'>
                    Joined in 2023
                </Text>
            </View>
        </View>
    )
}

export default UserCard