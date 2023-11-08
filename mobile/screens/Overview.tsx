import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/ErrorMessage';
import AppTheme from '../styles/AppTheme';
import NothingFound from '../components/NothingFound';
import SearchBarComp from '../components/SearchBarComp';
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

  const renderItem = ({ item }: { item: SmallPostProps }): JSX.Element => {
    return <SmallPost key={item.id} {...item} />;
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
        ListHeaderComponent={settings.searchBar ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder='Search in this user posts...'/> : null}
        ListEmptyComponent={<NothingFound type="posts" />}
      />
    </View>
  );
}