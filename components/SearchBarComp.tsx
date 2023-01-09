import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppTheme from '../styles/AppTheme';

type SearchBarProps = {
    data: {
        keyword: string;
        handleChange: (text: string) => void;
        handleSubmit: () => void;
    }
}

function SearchBarComp(props: SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const cancel = isFocused ? <TouchableOpacity onPress={() => Keyboard.dismiss()}><Text>Cancel</Text></TouchableOpacity> : null;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="I want dogs..."
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                returnKeyType="go"
                onSubmitEditing={() => props.data.handleSubmit()}
                onChangeText={text => props.data.handleChange(text)} />
            {cancel}
        </View>
    );
};

export default SearchBarComp;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        height: 50,
        marginTop: 8,
        padding: 8,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        paddingLeft: 20,
        flex: 1,
        backgroundColor: AppTheme.white,
        borderRadius: 20,
    },
});