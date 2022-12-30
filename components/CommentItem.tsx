import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppTheme from '../styles/AppTheme';

export interface CommentItemProps {
    data: {
        id: string;
        author: string;
        body: string;
    }
}

function CommentItem(props: CommentItemProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.author}>
                {props.data.author}
            </Text>
            <Text>
                {props.data.body}
            </Text>
        </View >
    );
}

export default CommentItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppTheme.white,
        flex: 1,
        height: 'auto',
        marginVertical: 5,
        padding: 10,
    },
    author: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});
