import { Text, TouchableOpacity } from 'react-native';

export interface TaskProps {
    id: number;
    type: string;
    parent_id: number;
    prompt: string;
    with_image: boolean;
    model: string;
    user_id: number;
    error_message: string;
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

    const error = props.error_message ? <Text className='dark:text-white'>error: {props.error_message}</Text> : null;

    return (
        <TouchableOpacity 
            className={'bg-secondary dark:bg-secondaryDark p-3 rounded-lg' + props.extraStyles} 
            onPress={() => props.handler()} >
            <Text className='dark:text-white'>id: {props.id}</Text>
            <Text className='dark:text-white'>type: {props.type}</Text>
            <Text className='dark:text-white'>status: {props.status}</Text>
            {error}
        </TouchableOpacity>
    );
}