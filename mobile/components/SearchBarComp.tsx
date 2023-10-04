import React, { useEffect, useState } from 'react';
import { View, TextInput, Keyboard, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type SearchBarProps = {
    keyword: string;
    handleChange: (text: string) => void;
    handleSubmit: () => void;
}

export default function SearchBarComp(props: SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.keyword);

    const clear = () => {
        setText('');
        props.handleChange('');
        Keyboard.dismiss();
    };

    return (
        <View className='flex flex-row w-screen justify-center items-center p-2 mb-2'>
            <TextInput
                className='flex-1 bg-white p-3 w-full rounded-lg pl-5'
                placeholder="Search in this community..."
                value={text}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                returnKeyType="search"
                onSubmitEditing={() => props.handleChange(text)}
                onChangeText={txt => setText(txt)} />
            <TouchableOpacity className='flex-row space-x-1' onPress={clear}>
                {isFocused ? <Image source={require('../assets/icons/cancel.png')} className='mx-2 w-5 h-5' /> : null}
            </TouchableOpacity>
        </View>
    );
};