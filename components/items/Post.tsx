import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppTheme from '../../styles/AppTheme';
import { decode } from 'html-entities';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostInteraction from '../PostInteraction';
import { StackParams } from '../../types/Navigator';
import { RedditResponseT3 } from '../../types/RedditResponseT3';
import FullScreenComp from '../FullScreenComp';

export default function Post(props: RedditResponseT3) {
    const currentPost = props.data;
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  
    const image = <FullScreenComp data={props} />

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { data: props })}>
                <Text style={styles.text}>
                    {currentPost.title}
                </Text>
            </TouchableOpacity>
            <Text style={styles.subText}>
                in&nbsp;
                <Text onPress={() => navigation.navigate('Subreddit', { data: currentPost.subreddit })}>{currentPost.subreddit}</Text>
                &nbsp;by&nbsp;
                <Text onPress={() => navigation.navigate('Overview', { data: currentPost.author })}>{currentPost.author}</Text>
            </Text>
            {image}
            <PostInteraction data={props} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppTheme.white,
        flex: 1,
        height: 'auto',
        marginVertical: 5,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingTop: 15,
        textAlign: 'left',
    },
    subText: {
        fontSize: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        textAlign: 'left',
        paddingVertical: 5,
    }
});
