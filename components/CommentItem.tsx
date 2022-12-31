import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { timeSince } from '../tools/Formating';

export interface CommentItemProps {
    data: {
        id: string;
        author: string;
        body: string;
        ups: number;
        created_utc: number;
        edited: boolean;
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
            <Text style={styles.subText}>
                {timeSince(props.data.created_utc)} · <Text style={styles.votes}>{props.data.ups}</Text>
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
    subText: {
        marginTop: 8,
        color: AppTheme.gray,
    },
    votes: {
        color: AppTheme.gray,
    }
});
