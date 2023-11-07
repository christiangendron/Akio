import { View, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import Community, { CommunityProps } from '../components/items/Community';
import ErrorMessage from '../components/ErrorMessage';
import NothingFound from '../components/NothingFound';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';

export default function Communities() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);

  const key = `community-list`;
  const query = useQuery({
    queryKey: [key],
    queryFn: () => AkioServices.getCommunities(),
  });

  const generationButtonNavigation = <TouchableOpacity onPress={() => navigation.navigate('Generate', { type: "community", id: 0, invalidate: key })}>
    <Image source={require('../assets/icons/new.png')} className='h-5 w-5 mr-3'/>
  </TouchableOpacity>

  useEffect(() => {
    navigation.setOptions({
      title: 'Communities',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
      headerRight: () => (
        authContext.isAuth ? generationButtonNavigation : null
      ),
    });
  }, [navigation]);

  if (query.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ErrorMessage message="Error while getting communities." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: CommunityProps }): JSX.Element => {
    return <Community key={item.id} {...item } />;
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        className='w-screen'
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListEmptyComponent={<NothingFound type="communities" />}
      />
    </View>
  );
}