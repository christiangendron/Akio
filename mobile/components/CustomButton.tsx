import React from 'react'
import { ActivityIndicator, TouchableOpacity, View, Text } from 'react-native'

type CustomButtonProps = {
    text: string,
    onPress: () => void,
    isLoading: boolean,
}

function CustomButton(props: CustomButtonProps) {
    if (props.isLoading) {
        return (
            <View className='bg-gray-300 h-14 flex justify-center my-1'>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={props.onPress} className='bg-gray-300 h-14 flex justify-center my-1'>
            <Text className='text-center'>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton