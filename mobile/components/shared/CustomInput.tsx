import React from 'react'
import { TextInput } from 'react-native'

type CustomInputProps = {
    placeholder: string,
    onBlur?: () => void,
    onChangeText: (text: string) => void,
    value: string,
    secureTextEntry?: boolean,
    isError: boolean | undefined,
    disabled?: boolean,
    extraStyles?: string,
}

function CustomInput(props: CustomInputProps) {
    const tailwindClass = props.isError ? 'dark:bg-secondaryDark h-14 border-2 px-2 border-red-500 my-1 w-full rounded-lg' : 'dark:bg-secondaryDark px-2 h-14 my-1 w-full rounded-lg';
    
    return (
        <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={'#9CA3AF'}
        onBlur={props.onBlur}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        className={tailwindClass + ' ' + props.extraStyles}
        editable={!props.disabled}
        />
    )
}

export default CustomInput