import { Text, View, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import RedditServices from '../services/RedditServices';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import ErrorMessage from './ErrorMessage';
import { PostProp } from '../types/PostProp';
import { decode } from 'html-entities';
import InterfactionInfo from './IntereactionInfo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigator';
import { DetailsScreenProps } from '../types/DetailsHeader';

export default function DetailsHeader(props: DetailsScreenProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const { token } = useContext(AuthContext);

    const posts = useQuery(`post-details-for-${props.data}`, () => RedditServices.getPost(props.data, token));

    if (posts.isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }

    if (posts.isError) {
        return (
            <View style={styles.container}>
                <ErrorMessage message="Error while getting details." action={posts.refetch} actionMessage="Try again!" />
            </View>
        );
    }

    const currentPost: PostProp = posts?.data?.data.data.children[0];
    let thumbnail = null;

    if (currentPost.data.secure_media == null) {
        const source = decode(currentPost.data.preview.images[0].source.url);
        thumbnail = <Image style={{ width: Dimensions.get('window').width, height: 200 }} source={{ uri: source }} />
    }

    const intereactionData = {
        id: currentPost.data.id,
        ups: currentPost.data.ups,
        num_comments: currentPost.data.num_comments,
        created_utc: currentPost.data.created_utc,
        subreddit: currentPost.data.subreddit,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentPost.data.title}</Text>
            <Text style={styles.subtext}>in {currentPost.data.subreddit} by&nbsp;
                <Text onPress={() => navigation.navigate('Overview', { data: currentPost.data.author })}>{currentPost.data.author}</Text>
            </Text>
            {thumbnail}
            <InterfactionInfo data={intereactionData} />
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
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingTop: 15,
        textAlign: 'left',
    },
    subtext: {
        fontSize: 13,
        paddingHorizontal: 15,
        textAlign: 'left',
        marginBottom: 15,
        paddingVertical: 5,
    }
});
