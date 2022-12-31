import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppTheme from '../styles/AppTheme';

function SearchBarComp() {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Subreddit, user, or post..."
            ></TextInput>
        </View>
    );
};

export default SearchBarComp;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        marginTop: 8,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: AppTheme.white,
        width: '90%',
        borderRadius: 20,
    },
});