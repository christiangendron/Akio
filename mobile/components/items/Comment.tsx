import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';

export interface CommentItemProps {
    id: number;
    text_content: string;
    user_id: number;
    post_id: number;
    username: string;
}

export default function Comment(props: CommentItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <View className="bg-secondary dark:bg-secondaryDark p-2 rounded-lg mt-2 mx-2">
            <Text className='dark:text-white'>{props.text_content}</Text>
            <TouchableOpacity 
                onPress={() => navigation.push('Overview', { 
                    name: props.username, 
                    id: props.user_id, 
                    type: 'user-posts', 
                    withSearch: true }
                 )}>
                <Text className='text-sm font-bold dark:text-white'>
                    by {props.username}
                </Text>
            </TouchableOpacity> 
        </View>
    );
}