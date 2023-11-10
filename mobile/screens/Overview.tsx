import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/shared/ErrorMessage';
import NothingFound from '../components/shared/NothingFound';
import SearchBarComp from '../components/shared/SearchBarComp';
import SmallPost, { SmallPostProps } from '../components/items/SmallPost';
import { SettingsContext } from '../context/SettingsContext';

export type OverviewProps = {
  route: {
    params: {
      name: string;
      id: number;
    }
  }
}

export default function Overview(props: OverviewProps) {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');
  const settings = useContext(SettingsContext);

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.name,
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

  const renderItem = ({ item }: { item: SmallPostProps }): JSX.Element => {
    return <SmallPost key={item.id} {...item} />;
  };

  return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <FlatList
        className='w-screen'
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListFooterComponent={<View className='h-3'/>}
        ListHeaderComponent={settings.searchBar ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder='Search in this user posts...'/> : null}
        ListEmptyComponent={<NothingFound type="posts" />}
      />
    </View>
  );
}