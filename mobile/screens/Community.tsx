import { useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/shared/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import NoPostsFound from '../components/shared/NothingFound';
import AkioServices from '../services/AkioServices';
import SearchBarComp from '../components/shared/SearchBarComp';
import { SettingsContext } from '../context/SettingsContext';
import SmallPost, { SmallPostProps } from '../components/items/SmallPost';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateModal from '../components/modal/GenerateModal';
import { useColorScheme } from "nativewind";
import { Ionicons } from '@expo/vector-icons'; 
import SwipeableDelete from '../components/shared/SwipeableDelete';

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
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const key = `post-${community_id.current}-${community.current}-${keyword}`;

  const query = useQuery({
    queryKey: [key],
    queryFn: () => AkioServices.getPosts(community_id.current, keyword),
  });

  useEffect(() => {
    navigation.setOptions({
      title: community.current,
      headerRight: () => (
        community_id.current !== 0 ? 
        <GenerateModal type="post" id={community_id.current} keyToInvalidate={key} /> : 
        <TouchableOpacity onPress={toggleColorScheme} className='mr-3'>
          <Ionicons name="moon" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, authContext.isAuth, colorScheme]);
  
  if (query.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
        <ActivityIndicator />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
        <View className='bg-black w-full p-5'>
          <ErrorMessage message={`Error while getting posts for ${community.current}`} action={query.refetch} actionMessage="Try again!" />
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: SmallPostProps }): JSX.Element => {
    return <SwipeableDelete id={item.id} user_id={item.user_id} type='post' keyToInvalidate={key} component={<SmallPost key={item.id} {...item} keyToInvalidate={key} />}/> ;
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
        ListHeaderComponent={settings.searchBar ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder='Search in this community...'/> : null}
        ListEmptyComponent={<NoPostsFound type="posts" />}
      />
    </View>
  );
}