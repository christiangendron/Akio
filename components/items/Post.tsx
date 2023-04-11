import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostInteraction from '../PostInteraction';
import { StackParams } from '../../types/Navigator';
import MediaComp from '../MediaComp';
import { PostProps } from '../../types/Post';
import { shortenString } from '../../tools/Formating';

export default function Post(props: PostProps) {
    const currentPost = props.data.data;
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  
    const media = <MediaComp data={props.data} />

    const title = (
        <View className='p-3'>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { data: props.data })}>
                <Text className='font-bold'>{currentPost.title}</Text>
            </TouchableOpacity>
            <View className='flex flex-row space-x-2'>
                <Text className='text-sm' onPress={() => navigation.navigate('Subreddit', { data: currentPost.subreddit })}>{currentPost.subreddit}</Text>
                <Text className='text-sm' onPress={() => navigation.navigate('Overview', { data: currentPost.author })}>{currentPost.author}</Text>
            </View>
        </View>
    )

    const selfText = currentPost.selftext ? <Text className='p-3'>{props.isDetails ? currentPost.selftext : shortenString(currentPost.selftext)}</Text> : <></>
    
    // TODO deal with gallery posts
    if (currentPost.is_gallery != undefined) {
        console.log('This post is a gallery with ' + currentPost.gallery_data.items.length + ' items')
        return (<></>)
    }

    if (props.isDetails) {
        return (
            <View className='bg-white h-auto'>
                {media}
                {selfText}
                {title}
                <PostInteraction data={props.data} />
            </View>
        );
    }

    return (
        <View className='bg-white h-auto'>
            {title}
            {media}
            {selfText}
            <PostInteraction data={props.data} />
        </View>
    );
}