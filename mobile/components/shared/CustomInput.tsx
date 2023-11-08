import React from 'react'
import { TextInput } from 'react-native'

type CustomInputProps = {
    placeholder: string,
    onBlur?: () => void,
    onChangeText: (text: string) => void,
    value: string,
    secureTextEntry?: boolean,
    isError: boolean | undefined,
}

function CustomInput(props: CustomInputProps) {
    const tailwindClass = props.isError ? 'bg-gray-200 h-14 border-2 px-2 border-red-500 my-1' : 'bg-gray-200 px-2 h-14 my-1';
    return (
        <TextInput
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        className={tailwindClass}
        />
    )
}

export default CustomInput