import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { OverviewProps } from '../types/Overview';

export default function Overview(props: OverviewProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.name,
    });
  }, [navigation]);

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>Overview for user {props.route.params.name} with ID #{props.route.params.id}</Text>
    </View>
  );
}