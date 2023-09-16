import { Text, View } from 'react-native';
import { CommentItemProps } from '../../types/CommentItem';

export default function Comment(props: CommentItemProps) {
    return (
        <View className="bg-white p-2 w-screen">
            <Text className=''>
                {props.text_content}
            </Text>
            <Text className='text-sm text-gray-500'>
                <Text>by {props.username} · {props.votes} votes</Text>
            </Text>
        </View>
    );
}