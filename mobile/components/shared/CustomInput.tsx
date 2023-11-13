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
    const isError = props.isError ? 'border-2 border-red-500 ' : '';
    
    return (
        <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={'#9CA3AF'}
        onBlur={props.onBlur}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        className={isError + 'bg-secondary dark:bg-secondaryDark dark:text-white px-2 h-14 my-1 w-full rounded-lg ' + props.extraStyles}
        editable={!props.disabled}
        />
    )
}

export default CustomInput