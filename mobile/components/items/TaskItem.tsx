import { Text, View } from 'react-native';
import useRetryGenerateMutation from '../../hooks/useRetryGenerationMutation';

export interface TaskProps {
    id: number;
    type: string;
    parent_id: number;
    prompt: string;
    with_image: boolean;
    model: string;
    user_id: number;
    message: string;
    created_id: number;
    status: string;
    handler: (value?: boolean) => void;
    extraStyles?: string;
}

/**
 * TaskItem component.
 * @param props TaskProps
 * @returns JSX.Element
 */
export default function TaskItem(props: TaskProps) {
    const mutation = useRetryGenerateMutation();

    // TODO : add a button to retry the task
    const retry = () => {
        mutation.mutate(props.id);
        props.handler();
    }

    return (
        <View className='bg-secondary dark:bg-secondaryDark rounded-lg mx-2 mt-2 overflow-hidden p-2'>
            <Text className='dark:text-white'>id: {props.id}</Text>
            <Text className='dark:text-white'>type: {props.type}</Text>
            <Text className='dark:text-white'>message: {props.message}</Text>
            <Text className='dark:text-white'>status: {props.status}</Text>
        </View>
    );
}