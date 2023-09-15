import { Text, View, Image, TouchableOpacity } from 'react-native';
import { roundedCount } from '../tools/Formating';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { PostProps } from '../types/Post';

export default function PostInteraction(props: PostProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View className='gap-1 flex-row p-2'>
      <TouchableOpacity className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2' onPress={() => navigation.push('Community', { name: props.name, id: props.community_id })}>
        <Text>{props.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2' onPress={() => navigation.push('Details', { ...props })}>
        <Image source={require('../assets/icons/up-arrow.png')} className='w-5 h-5' />
        <Text>{roundedCount(props.votes)}</Text>
      </TouchableOpacity>
      <TouchableOpacity className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2'>
        <Text onPress={() => navigation.navigate('Overview', { name: props.username, id: props.user_id })}>{props.username}</Text> 
      </TouchableOpacity> 
    </View>
  );
}