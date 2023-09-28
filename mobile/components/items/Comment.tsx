import { Text, View } from 'react-native';

export interface CommentItemProps {
    id: string;
    text_content: string;
    votes: number;
    user_id: number;
    post_id: number;
    username: string;
}

export default function Comment(props: CommentItemProps) {
    return (
        <View className="bg-white p-2 w-screen">
            <Text>{props.text_content}</Text>
            <Text className='text-sm text-gray-500'>
                by {props.username} · {props.votes} ↑
            </Text>
        </View>
    );
}