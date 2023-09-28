import { View, ActivityIndicator, FlatList } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import Community, { CommunityProps } from '../components/items/Community';
import ErrorMessage from '../components/ErrorMessage';
import NothingFound from '../components/NothingFound';
import GenerateCommunity from '../components/buttons/GenerateCommunity';

export default function Communities() {
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['community-list'],
    queryFn: () => AkioServices.getCommunities(),
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Communities',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
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
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={<View className='mt-2'/>}
        ListEmptyComponent={<NothingFound type="posts" />}
        ListFooterComponent={<View className='mt-2'><GenerateCommunity /></View>}
      />
    </View>
  );
}