import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import CustomActivityIndicator from './CustomActivityIndicator'

type CustomButtonProps = {
    label: string,
    handler: () => void,
    isLoading?: boolean,
    extraStyles?: string,
}

function CustomButton(props: CustomButtonProps) {
    return (
        <TouchableOpacity onPress={props.handler} className='w-full bg-black h-14 flex justify-center my-1 rounded-lg items-center'>
            <Text className='text-center text-white'>
                {props.isLoading ? <CustomActivityIndicator /> : props.label}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton