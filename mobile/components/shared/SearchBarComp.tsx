import React, { useState } from 'react';
import { View, TextInput, Keyboard, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type SearchBarProps = {
    keyword: string;
    handleChange: (text: string) => void;
    handleSubmit: () => void;
    placeholder: string;
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
        <View className='flex flex-row justify-center items-center mx-2 mt-2'>
            <TextInput
                className='flex flex-1 bg-white p-3 w-full rounded-lg pl-5'
                placeholder={props.placeholder}
                value={text}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                returnKeyType="search"
                onSubmitEditing={() => props.handleChange(text)}
                onChangeText={txt => setText(txt)} />
            <TouchableOpacity className='flex-row space-x-1' onPress={clear}>
                {isFocused ? <Image source={require('../../assets/icons/cancel.png')} className='mx-2 w-5 h-5' /> : null}
            </TouchableOpacity>
        </View>
    );
};