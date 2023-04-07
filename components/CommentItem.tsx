import { Text, View } from 'react-native';
import { timeSince } from '../tools/Formating';
import { CommentItemProps } from '../types/CommentItem';

export default function CommentItem(props: CommentItemProps) {
    return (
        <View className="bg-white p-5 m-1">
            <Text className=''>
                {props.data.body}
            </Text>
            <Text className='text-sm'>
                {timeSince(props.data.created_utc)} · <Text>{props.data.ups} · {props.data.author}</Text>
            </Text>
        </View >
    );
}