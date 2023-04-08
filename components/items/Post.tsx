import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostInteraction from '../PostInteraction';
import { StackParams } from '../../types/Navigator';
import FullScreenComp from '../FullScreenComp';
import { PostProps } from '../../types/Post';
import { shortenString } from '../../tools/Formating';

export default function Post(props: PostProps) {
    const currentPost = props.data.data;
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  
    const image = <FullScreenComp data={props.data} />

    const title = <View className='p-3'><TouchableOpacity
    onPress={() => navigation.navigate('Details', { data: props.data })}>
    <Text className='font-bold'>{currentPost.title}</Text>
</TouchableOpacity>
    <Text>
        <Text className='text-sm' onPress={() => navigation.navigate('Subreddit', { data: currentPost.subreddit })}>{currentPost.subreddit}</Text>
        &nbsp;by&nbsp;
        <Text className='text-sm' onPress={() => navigation.navigate('Overview', { data: currentPost.author })}>{currentPost.author}</Text>
    </Text></View>

    const selfText = <Text className='p-3'>{props.isDetails ? currentPost.selftext : shortenString(currentPost.selftext)}</Text>
    
    // TODO deal with gallery posts
    if (currentPost.is_gallery != undefined) {
        console.log('This post is a gallery with ' + currentPost.gallery_data.items.length + ' items')
        return (<></>)
    }

    return (
        <View className='bg-white h-auto'>
            {!props.isDetails ? title : <></>}
            {!props.isDetails && currentPost.selftext ? selfText : <></>}
            {image}
            {props.isDetails ? title : <></>}
            {props.isDetails && currentPost.selftext ? selfText : <></>}
            <PostInteraction data={props.data} />
        </View >
    );
}