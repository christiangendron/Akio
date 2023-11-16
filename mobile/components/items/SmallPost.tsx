import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostInteraction from '../shared/PostInteraction';
import Media from '../shared/Media';
import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

export interface SmallPostProps {
    id: number;
    title: string;
    text_content: string;
    votes: number;
    media_url: string;
    community_id: number;
    user_id: number;
    community_name: string;
    saved: boolean;
    username: string;
    keyToInvalidate: string;
}

export default function SmallPost(props: SmallPostProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const settingContext = useContext(SettingsContext);
    const image = props.media_url ? <Media media_url={props.media_url} /> : null;
    
    return (
        <View className='bg-secondary dark:bg-secondaryDark rounded-lg mx-2 mt-2 overflow-hidden'>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })} className='p-2'>
                <Text className='font-bold text-lg dark:text-white'>{props.title}</Text>
                <Text className='dark:text-white'>{props.text_content.slice(0,200)}...</Text>
            </TouchableOpacity>
            {image}
            {settingContext.minimalBrowsing ? null : <PostInteraction {...props} keyToInvalidate={props.keyToInvalidate} />}
        </View>
    );
}