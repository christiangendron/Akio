import { Text, View } from 'react-native';
import { CommentItemProps } from '../../types/CommentItem';

export default function Comment(props: CommentItemProps) {
    return (
        <View className="bg-white p-5">
            <Text className=''>
                {props.data.text_content}
            </Text>
            <Text className='text-sm'>
                <Text>{props.data.upvotes} · {props.data.user_id}</Text>
            </Text>
        </View>
    );
}