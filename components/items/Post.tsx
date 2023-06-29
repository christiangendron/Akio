import { Text, View, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostInteraction from '../PostInteraction';
import { StackParams } from '../../types/Navigator';
import MediaComp from '../MediaComp';
import { PostProps } from '../../types/Post';
import { shortenString, timeSince } from '../../tools/Formating';
import { SettingsContext } from '../../context/SettingsContext';

export default function Post(props: PostProps) {
    const settings = useContext(SettingsContext);
    const currentPost = props.data.data;
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  
    const media = <MediaComp data={props.data} />

    const title = (
        <View className='p-3 flex flex-row space-x-3 items-center'>
            <TouchableOpacity onPress={() => navigation.push('Details', { data: props.data })}>
                <Text className='font-bold text-lg'>{currentPost.title}</Text> 
            </TouchableOpacity>
        </View>
    )
  
    const selfText = currentPost.selftext ? <Text className='p-3'>{props.isDetails ? currentPost.selftext : shortenString(currentPost.selftext)}</Text> : <></>

    if (props.isDetails) {
        return (
            <View className='bg-white h-auto mb-2'>
                {media}
                {selfText}
                {title}
                <PostInteraction data={props.data} />
            </View>
        );
    }

    return (
        <View className='bg-white h-auto'>
            {settings?.minimalBrowsing ? <></> : title}
            {media}
            {selfText}
            <PostInteraction data={props.data} />
        </View>
    );
}