import React, { useState } from 'react';
import { View, TextInput, Text, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBarProps } from '../types/SearchBarComp';

export default function SearchBarComp(props: SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const cancel = isFocused ? <TouchableOpacity onPress={() => Keyboard.dismiss()}><Text>Cancel</Text></TouchableOpacity> : null;

    return (
        <View className='flex flex-row w-full justify-center items-center mt-1'>
            <TextInput
                className='bg-white p-3 m-3 w-3/4 rounded-full pl-5'
                placeholder="Search for this subreddit..."
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                returnKeyType="go"
                onSubmitEditing={() => props.data.handleSubmit()}
                onChangeText={text => props.data.handleChange(text)} />
            {cancel}
        </View>
    );
};