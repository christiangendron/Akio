import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { decode } from 'html-entities';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigator';
import { PostProp } from '../types/PostProp';
import InterfactionInfo from './IntereactionInfo';

function PostItem(props: PostProp) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const intereactionData = {
        id: props.data.id,
        ups: props.data.ups,
        num_comments: props.data.num_comments,
        created_utc: props.data.created_utc,
        subreddit: props.data.subreddit,
    };

    let image = null;

    if (props.data.thumbnail != 'default' || props.data.secure_media == null) {
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

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { data: props.data.id })}>
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
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => console.log('fullscreen')}>
                {image}
            </TouchableOpacity>
            <InterfactionInfo data={intereactionData} />
        </View >
    );
}

export default PostItem;

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
