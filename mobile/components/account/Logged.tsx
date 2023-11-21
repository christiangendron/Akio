import React, { useContext } from 'react'
import useLogoutMutation from '../../hooks/useLogoutMutation';
import UserCard from './UserCard';
import MenuItem from '../items/MenuItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import { AuthContext } from '../../context/AuthContext';

/**
 * Logged : This component is the view that is shown when the user is logged in.
 * @returns JSX.Element
 */
function Logged() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const authContext = useContext(AuthContext);
    const logoutMutation = useLogoutMutation();

    return (
        <>
            <UserCard />
            <MenuItem 
                label='Saved posts' 
                handler={() => navigation.push('Saved', { 
                    id: authContext.userInfo.id, 
                    name: 'Saved post', 
                    type: 'saved-posts', 
                    withSearch: true })} 
                extraStyles=' mx-2'
            />
            <MenuItem 
                label='My posts' 
                handler={() => navigation.push('Overview', { 
                    id: authContext.userInfo.id, 
                    name: authContext.userInfo.username, 
                    type: 'user-posts', 
                    withSearch: true })} 
                extraStyles=' mx-2 mt-2'
            />
            <MenuItem 
                label='Log out' 
                handler={() => logoutMutation.mutate()} 
                extraStyles=' mx-2 mt-2'
            />
        </>
    )
}

export default Logged