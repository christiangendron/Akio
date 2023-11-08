import { useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import NoPostsFound from '../components/NothingFound';
import AkioServices from '../services/AkioServices';
import SearchBarComp from '../components/SearchBarComp';
import { SettingsContext } from '../context/SettingsContext';
import SmallPost, { SmallPostProps } from '../components/items/SmallPost';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';

export interface CommunityNavigationProps {
  route: {
    params: {
      name: string;
      id: number;
    }
  }
}

export default function Community(props: CommunityNavigationProps) {
  const community = useRef(props.route.params.name);
  const authContext = useContext(AuthContext);
  const community_id = useRef(props.route.params.id);
  const [keyword, setKeyword] = useState('');
  const settings = useContext(SettingsContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const key = `post-${community_id.current}-${community.current}-${keyword}`;

  const query = useQuery({
    queryKey: [key],
    queryFn: () => AkioServices.getPosts(community_id.current, keyword),
  });

  const generationButtonNavigation = community_id.current !== 0 ? 
  <TouchableOpacity onPress={() => navigation.navigate('Generate', { type: "post", id: community_id.current, invalidate: key })}>
    <Image source={require('../assets/icons/new.png')} className='h-5 w-5 mr-3'/>
  </TouchableOpacity> : null;

  useEffect(() => {
    navigation.setOptions({
      title: community.current,
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
      headerRight: () => (
        generationButtonNavigation
      ),
    });
  }, [navigation, authContext.isAuth]);
  
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
        <View className='bg-black w-full p-5'>
          <ErrorMessage message={`Error while getting posts for ${community.current}`} action={query.refetch} actionMessage="Try again!" />
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: SmallPostProps }): JSX.Element => {
    return <SmallPost key={item.id} {...item} keyToInvalidate={key} />;
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
        ListHeaderComponent={settings.searchBar ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder='Search in this community...'/> : null}
        ListEmptyComponent={<NoPostsFound type="posts" />}
      />
    </View>
  );
}