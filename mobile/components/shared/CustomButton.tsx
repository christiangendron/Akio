import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'

type CustomButtonProps = {
    label: string,
    handler: () => void,
    isLoading?: boolean,
    extraStyles?: string,
}

function CustomButton(props: CustomButtonProps) {
    return (
        <TouchableOpacity onPress={props.handler} className={'w-full bg-black h-14 flex justify-center my-1 rounded-lg items-center' + props.extraStyles} disabled={props.isLoading}>
            {props.isLoading ? <ActivityIndicator /> : <Text className='text-center text-white'>{props.label}</Text>}
        </TouchableOpacity>
    )
}

export default CustomButton