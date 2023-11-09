
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/shared/ErrorMessage';
import Comment, { CommentItemProps } from '../components/items/Comment';
import Post, { PostProps } from '../components/items/Post';
import NoPostsFound from '../components/shared/NothingFound';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import AppTheme from '../styles/AppTheme';
import { AuthContext } from '../context/AuthContext';
import { StackParams } from '../types/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GenerateModal from '../components/modal/GenerateModal';

export type DetailsScreenProps = {
  route: {
    params: PostProps;
  }
};

export default function Details(props: DetailsScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const current = props.route.params;
  const authContext = useContext(AuthContext);
  const queryKey = `comment-${current.id}`;

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
      headerRight: () => (
        <GenerateModal type="comment" id={current.id} keyToInvalidate={queryKey} />
      ),
    });
  }, [navigation, authContext.isAuth]);

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => AkioServices.getComments(current.id),
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
        <View className='bg-black w-full p-5'>
          <ErrorMessage message="Error while getting posts." action={query.refetch} actionMessage="Try again!" />
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <Comment key={item.id} {...item} keyToInvalidate={queryKey} />;
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        className='w-screen'
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={<Post {...current} />}
        ListEmptyComponent={<NoPostsFound type="comments"/>}
      />
    </View>
  );
}