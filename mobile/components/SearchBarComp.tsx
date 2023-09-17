import React, { useState } from 'react';
import { View, TextInput, Text, Keyboard, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBarProps } from '../types/SearchBarComp';

export default function SearchBarComp(props: SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.keyword);

    const cancel = isFocused ? (
        <TouchableOpacity className='flex-row space-x-1' onPress={() => Keyboard.dismiss()}>
            <Image source={require('../assets/icons/cancel.png')} className='mx-2 w-5 h-5' />
        </TouchableOpacity>
    ) : null;

    return (
        <View className='flex flex-row w-screen justify-center items-center p-2 mb-2'>
            <TextInput
                className='flex-1 bg-white p-3 w-full rounded-lg pl-5'
                placeholder="Search in this community..."
                value={text}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                returnKeyType="go"
                onSubmitEditing={() => props.handleChange(text)}
                onChangeText={txt => setText(txt)} />
            {cancel}
        </View>
    );
};