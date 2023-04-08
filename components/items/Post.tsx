import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppTheme from '../../styles/AppTheme';
import { decode } from 'html-entities';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostInteraction from '../PostInteraction';
import { StackParams } from '../../types/Navigator';
import { RedditResponseT3 } from '../../types/RedditResponseT3';

export default function Post(props: RedditResponseT3) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    let image = null;

    try {
        if (props.data.secure_media == null) {
            const screenDimensions = Dimensions.get("screen");
            const imageThumb = decode(props.data.preview.images[0].resolutions[2].url);
            const thumbHeight = props.data.preview.images[0].resolutions[2].height;
            const thumbwidth = props.data.preview.images[0].resolutions[2].width;
            const source = decode(props.data.preview.images[0].source.url);
            image = <Image style={{ resizeMode: 'cover', width: screenDimensions.width, height: thumbHeight }} source={{ uri: imageThumb }} />;

            const fullsizeData = {
                id: props.data.id,
                author_fullname: props.data.author_fullname,
                url: source,
            }
        }
    } catch (error) {
        console.log('Post with id: ' + props.data.id + ' caused an error');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { data: props })}>
                <Text style={styles.text}>
                    {props.data.title}
                </Text>
            </TouchableOpacity>
            <Text style={styles.subText}>
                in&nbsp;
                <Text onPress={() => navigation.navigate('Subreddit', { data: props.data.subreddit })}>{props.data.subreddit}</Text>
                &nbsp;by&nbsp;
                <Text onPress={() => navigation.navigate('Overview', { data: props.data.author })}>{props.data.author}</Text>
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
