import { View, FlatList } from 'react-native';
import Community, { CommunityProps } from '../items/Community';
import SwipeableDelete from './SwipeableDelete';
import Post, { PostProps } from '../items/Post';
import SmallPost from '../items/SmallPost';
import Comment, { CommentItemProps } from '../items/Comment';
import MessagePost from '../items/MessagePost';

type CustomFlatListProps = {
    type: string;
    data : CommunityProps[] | PostProps[] | CommentItemProps[];
    isLoading : boolean;
    reFetch : () => void;
    isError : boolean;
    keyToInvalidate: string;
    headerComponent?: JSX.Element | null;
    currentPost? : any;
};

export default function CustomFlatList(props : CustomFlatListProps) { 
  const renderItem = ({ item }: { item: any }): JSX.Element => {
    if (props.type === 'post' || props.type === 'user-posts') {
        return <SwipeableDelete id={item.id} user_id={item.user_id} type='post' keyToInvalidate={props.keyToInvalidate} component={<SmallPost key={item.id} {...item} keyToInvalidate={props.keyToInvalidate} />}/> ;
    } else if (props.type === 'comment') {
        return <SwipeableDelete id={item.id} user_id={item.user_id} type='comment' keyToInvalidate={props.keyToInvalidate} component={<Comment key={item.id} {...item} />}/> ;
    } else {
        return <SwipeableDelete id={item.id} user_id={item.user_id} type='community' keyToInvalidate={props.keyToInvalidate} component={<Community key={item.id} {...item } />} />;
    }
  };

  return (
    <FlatList
        className='w-screen'
        data={props.data}
        renderItem={renderItem}
        refreshing={props.isLoading}
        onRefresh={props.reFetch}
        onEndReachedThreshold={2}
        ListFooterComponent={<View className='h-3'/>}
        ListHeaderComponent={props.headerComponent}
        ListEmptyComponent={props.isError ? 
          <MessagePost message={`Error while retriving items ↺`} action={props.reFetch} /> : 
          <MessagePost message={`No ${props.type === 'post' || props.type === 'user-posts' ? 'post' : props.type} found`} />}
      />
  );
}