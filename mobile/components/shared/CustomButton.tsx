import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'

type CustomButtonProps = {
    label: string,
    handler: () => void,
    isLoading?: boolean,
    extraStyles?: string,
}

function CustomButton(props: CustomButtonProps) {
    
    const content = <View className={'w-full bg-black h-14 flex justify-center my-1 rounded-lg items-center' + props.extraStyles}>
        <Text className='text-center text-white'>
            {props.isLoading ? <ActivityIndicator /> : props.label}
        </Text>
    </View>

    if (!props.isLoading) return (
        <TouchableOpacity onPress={props.handler} className='w-full'>
            {content}
        </TouchableOpacity>
    )

    return (content)
}

export default CustomButton