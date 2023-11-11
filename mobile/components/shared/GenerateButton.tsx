import { View } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { useEffect } from 'react';
import useGenerateMutation from '../../hooks/useGenerateMutation';
import Option from '../items/Option';

type GenerateCommentProps = {
    id: number;
    type: string;
    inspiration?: string;
    with_image?: boolean;
    keyToInvalidate: string;
    onComplete: () => void;
}

export type GenerateItemVariables = {
    id: number;
    type: string;
    inspiration?: string;
    with_image?: boolean;
}

export default function GenerateButton(props: GenerateCommentProps) {
    const mutation = useGenerateMutation(props.keyToInvalidate);

    const variables = {
        id: props.id,
        type: props.type,
        inspiration: props.inspiration,
        with_image: props.with_image,
    };

    useEffect(() => {
        if (mutation.isSuccess) {
            props.onComplete();
        }
    }, [mutation.isSuccess]);

    if (mutation.isLoading) return (
        <Option label='Generate' handler={() => mutation.mutate(variables)} isLoading={true} />
    )

    if (mutation.error instanceof Error) {
        const errorMessage = (mutation.error as any).response?.data?.message;

        return (
            <View className='bg-black p-5 w-full rounded-lg'>
                <ErrorMessage message={errorMessage} actionMessage="Try again" action={() => mutation.mutate(variables)} />
            </View>
        )
    }

    return (
        <Option label='Generate' handler={() => mutation.mutate(variables)} />
    );
}