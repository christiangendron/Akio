import { useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import Post from '../components/items/Post';
import NoPostsFound from '../components/NothingFound';
import AkioServices from '../services/AkioServices';
import { PostProps } from '../types/Post';
import SearchBarComp from '../components/SearchBarComp';
import { SettingsContext } from '../context/SettingsContext';
import { CommunityNavigationProps } from '../types/Community';
import GeneratePost from '../components/buttons/GeneratePost';

export default function Community(props: CommunityNavigationProps) {
  const community = useRef(props.route.params.name);
  const community_id = useRef(props.route.params.id);
  const [keyword, setKeyword] = useState('');
  const settings = useContext(SettingsContext);
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['posts', community, community_id, keyword],
    queryFn: () => AkioServices.getPosts(community_id.current, keyword),
  });

  useEffect(() => {
    navigation.setOptions({
      title: community.current,
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
        <ErrorMessage message="Error while getting posts." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: PostProps }): JSX.Element => {
    return <Post key={item.id} {...item} />;
  };

  const search = query.data?.length != 0 ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch}/> : null

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-4' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={<View className='mt-2'/>}
        ListEmptyComponent={<NoPostsFound type="posts" />}
        ListFooterComponent={<View className='mt-2'><GeneratePost community_id={community_id.current} community_name={community.current} /></View>}
      />
    </View>
  );
}