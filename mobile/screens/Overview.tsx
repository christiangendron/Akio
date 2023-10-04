import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { OverviewProps } from '../types/Overview';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/ErrorMessage';
import Post, { PostProps } from '../components/items/Post';
import AppTheme from '../styles/AppTheme';
import NothingFound from '../components/NothingFound';
import SearchBarComp from '../components/SearchBarComp';

export default function Overview(props: OverviewProps) {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.name,
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

  const query = useQuery({
    queryKey: ['user-posts', props.route.params.id, keyword],
    queryFn: () => AkioServices.getUserPosts(props.route.params.id, keyword),
  });

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
        <ErrorMessage message="Error while getting posts." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: PostProps }): JSX.Element => {
    return <Post key={item.id} {...item} />;
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-4' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={<SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch}/>}
        ListEmptyComponent={<NothingFound type="posts" />}
      />
    </View>
  );
}