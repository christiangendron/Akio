import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import AkioServices from '../../services/AkioServices';
import CustomButton from './CustomButton';

type GeneratingProps = {
    task_id: number;
    keyToInvalidate: string;
    clear: () => void;
};

export default function Generating(props: GeneratingProps) {
    const queryClient = useQueryClient();
    const queryKey = `task-${props.task_id}`;
    const query = useQuery({
        queryKey: [queryKey],
        queryFn: () => AkioServices.getTask(props.task_id),
    });

    // if status is pending timeout for 3 seconds and call again
    if (query.data?.status === 'pending') {
        setTimeout(() => {
            query.refetch();
        }, 3000);
    } else if (query.data?.status === 'success') {
        props.clear();
        queryClient.invalidateQueries({ queryKey: props.keyToInvalidate });
    }

    if (!query.data || query.data.status === 'pending') return (
        <View className="w-full bg-background dark:bg-backgroundDark rounded-lg flex items-center p-2">
            <Text className='text-lg my-3 font-semibold dark:text-white mb-2'>
                Generating a task # {props.task_id}
            </Text>
            <ActivityIndicator />
            <CustomButton label='Clear' handler={props.clear} extraStyles=" mt-2" />
        </View>
    );

    const text_content = query.data?.status === 'failed' ? 'The task failed for the following reason: ' : 'Your task was succeded'

    return (
        <View className="w-full bg-background dark:bg-backgroundDark rounded-lg flex items-center p-2">
            <Text className='text-lg my-3 font-semibold dark:text-white'>
                Generating a task # {props.task_id}
            </Text>
            <Text className='text-white'>{text_content}</Text>
            <Text className='text-white'>{query.data.error_message}</Text>
            <CustomButton label='Try again' handler={() => console.log('recalling the task')} extraStyles=" mt-2" />
            <CustomButton label='Clear the task' handler={props.clear} extraStyles=" mt-2" />
        </View>
    );
}
