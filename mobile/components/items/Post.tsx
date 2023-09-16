import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import { PostProps } from '../../types/Post';
import PostInteraction from '../PostInteraction';

export default function Post(props: PostProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <View className='bg-white h-auto px-2 gap-2'>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })}>
                    <Text className='font-bold text-lg'>{props.title}</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })}>
                <Text>{props.text_content}</Text>
            </TouchableOpacity>
            <PostInteraction {...props} />
        </View>
    );
}