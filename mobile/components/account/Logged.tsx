import React from 'react'
import { View } from 'react-native'
import useLogoutMutation from '../../hooks/useLogoutMutation';
import UserCard from './UserCard';
import MenuItem from '../items/MenuItem';

function Logged() {
    const logoutMutation = useLogoutMutation();

    return (
        <>
            <UserCard />
            <MenuItem label='Saved posts' handler={() => console.log('Saved posts')} extraStyles=' mx-2'/>
            <MenuItem label='My posts' handler={() => console.log('My posts')} extraStyles=' mx-2 mt-2'/>
            <MenuItem label='Delete my account' handler={() => console.log('Delete my account')} extraStyles=' mx-2 mt-2'/>
            <MenuItem label='Log out' handler={() => logoutMutation.mutate()} extraStyles=' mx-2 mt-2'/>
        </>
    )
}

export default Logged