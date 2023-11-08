import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native'
import { AuthContext } from '../../context/AuthContext'

function UserCard() {
    const authContext = useContext(AuthContext);

    return (
        <View className='flex flex-row bg-white mb-2 rounded-lg m-1'>
            <Image source={require('../../assets/images/default-community.png')} className='h-16 w-16 rounded-full overflow-hidden m-2 border border-1' />
            <View className='flex justify-center'>
                <Text>
                    {authContext.username}
                </Text>
                <Text>
                    {authContext.userEmail}
                </Text>
                <Text>
                    Joined in 2023
                </Text>
            </View>
        </View>
    )
}

export default UserCard