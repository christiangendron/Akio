import {Text, TouchableOpacity} from 'react-native';

interface ErrorMessageProps {
  message: string;
  action: () => void;
  actionMessage: string;
}

export default function ErrorMessage(props:ErrorMessageProps) {
  return (
    <TouchableOpacity onPress={props.action} className='flex flex-col items-center justify-center'>
      <Text className='text-white'>
        {props.message}
      </Text>
      <Text className='text-white'>
        ↺ {props.actionMessage}
      </Text>
    </TouchableOpacity>
  );
}