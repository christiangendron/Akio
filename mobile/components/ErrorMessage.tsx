import {Text, View, TouchableOpacity} from 'react-native';
import { ErrorMessageProps } from '../types/ErrorMessage';

export default function ErrorMessage(props:ErrorMessageProps) {
  return (
    <View className='flex flex-col items-center justify-center h-full'>
      <Text className='text-lg mb-6'>
        {props.message}
      </Text>
      <TouchableOpacity onPress={props.action} className='bg-lightBlue rounded-full text-center p-5'>
        <Text className='text-white text-lg'>
          {props.actionMessage}
        </Text>
      </TouchableOpacity>
    </View>
  );
}