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
            <View className='bg-black h-14 flex justify-center my-1 rounded-lg'>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={props.onPress} className='bg-black h-14 flex justify-center my-1 rounded-lg'>
            <Text className='text-center text-white'>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton