import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import Comment from '../components/items/Comment';
import ErrorMessage from '../components/ErrorMessage';
import FilterBox from '../components/FilterBox';
import RedditServices from '../services/RedditServices';
import { CommentItemProps } from '../types/CommentItem';
import Post from '../components/items/Post';
import { DetailsScreenProps } from '../types/Details';

export default function Details(props: DetailsScreenProps) {
  const filter = useRef('best');
  const navigation = useNavigation();
  const currentPost = props.route.params.data;

  const comments = useQuery(`comments-for-${currentPost.data.id}-${filter}-${currentPost.data.subreddit}`, () => RedditServices.getComments(currentPost.data.id, currentPost.data.subreddit, filter.current));

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <FilterBox filter={filter} refetch={() => comments.refetch()}  />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <Comment key={item.data.id} data={item.data} />
  };

  if (comments.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <FlatList
          data={null}
          renderItem={renderItem}
          refreshing={comments.isLoading}
          onRefresh={comments.refetch}
          ListHeaderComponent={<Post data={currentPost} isDetails={true} />}
        />
      </View>
    );
  }

  if (comments.isError) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ErrorMessage message="Error while getting comments." action={comments.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const commentsData = comments?.data?.data[1].data.children;

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={commentsData.slice(0, -1)}
        renderItem={renderItem}
        refreshing={comments.isLoading}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={comments.refetch}
        ListHeaderComponent={<Post data={currentPost} isDetails={true} />}
      />
    </View>
  );
}