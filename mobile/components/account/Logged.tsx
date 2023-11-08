import React from 'react'
import { View } from 'react-native'
import useLogoutMutation from '../../hooks/useLogoutMutation';
import UserCard from './UserCard';
import MenuItem from '../items/MenuItem';

function Logged() {
    const logoutMutation = useLogoutMutation();

    return (
        <View className='w-full'>
            <UserCard />
            <MenuItem label='Saved posts' handler={() => console.log('Saved posts')}/>
            <MenuItem label='My posts' handler={() => console.log('My posts')}/>
            <MenuItem label='Delete my account' handler={() => console.log('Delete my account')}/>
            <MenuItem label='Log out' handler={() => logoutMutation.mutate()}/>
        </View>
    )
}

export default Logged