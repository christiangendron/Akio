import React, { useContext } from 'react'
import { Button, View, Text } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import useLogoutMutation from '../../hooks/useLogoutMutation';

function Logged() {
    const authContext = useContext(AuthContext);
    const logoutMutation = useLogoutMutation();

    return (
        <View>
            <Text>Logged in as {authContext.userEmail}</Text>
            <Button title='Log out' onPress={() => logoutMutation.mutate()}/>
        </View>
    )
}

export default Logged