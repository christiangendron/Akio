import React, { useState } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'; 
import { useColorScheme } from 'nativewind';

type SearchBarProps = {
    keyword: string;
    handleChange: (text: string) => void;
    handleSubmit: () => void;
    placeholder: string;
}

export default function SearchBarComp(props: SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.keyword);
    const { colorScheme } = useColorScheme();

    const clear = () => {
        setText('');
        props.handleChange('');
        Keyboard.dismiss();
    };

    const clearButton = <TouchableOpacity className='flex-row space-x-1 mx-3' onPress={clear}>
        {isFocused ? <Feather name="x-circle" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} /> : null}
    </TouchableOpacity>

    return (
        <View className='flex flex-row justify-center items-center mx-2 mt-2'>
            <TextInput
                placeholderTextColor='#ccc'
                className='flex flex-1 bg-secondary dark:bg-secondaryDark p-3 w-full rounded-lg pl-5 dark:text-white'
                placeholder={props.placeholder}
                value={text}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                returnKeyType="search"
                onSubmitEditing={() => props.handleChange(text)}
                onChangeText={txt => setText(txt)} />
            {isFocused ? clearButton : null}
        </View>
    );
};