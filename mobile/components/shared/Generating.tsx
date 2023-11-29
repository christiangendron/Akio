import React from 'react';
import { View, Text } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import AkioServices from '../../services/AkioServices';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';

type GeneratingProps = {
    task_id: number;
    keyToInvalidate: string;
    clear: () => void;
};

export default function Generating(props: GeneratingProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const queryClient = useQueryClient();

    const queryKey = `task-${props.task_id}`;
    const query = useQuery({
        queryKey: [queryKey],
        queryFn: () => AkioServices.getTask(props.task_id),
    });

    const viewTask = () => {
        props.clear();
        navigation.push('Tasks');
    };

    // if status is pending timeout for 3 seconds and call again
    if (query.data?.status === 'pending') {
        setTimeout(() => {
            query.refetch();
        }, 3000);
    } else if (query.data?.status === 'success') {
        props.clear();
        queryClient.invalidateQueries({ queryKey: props.keyToInvalidate });
    }

    return (
        <View className="w-full bg-background dark:bg-backgroundDark rounded-lg flex items-center p-3">
            <Text className='text-lg font-semibold dark:text-white'>
                Task # {props.task_id}
            </Text>
            <Text className='dark:text-white'>{query?.data?.message ? query?.data?.message : 'Retrieving your task...'}</Text>
            {query?.data?.status === 'failed' ? <CustomButton label='View my tasks' handler={viewTask} extraStyles=" mt-2" /> : null}
            {query?.data?.status === 'failed' ? <CustomButton label='Clear the task' handler={props.clear} extraStyles=" mt-2" /> : null}
        </View>
    );
}
