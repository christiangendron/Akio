import { View, FlatList } from 'react-native';
import { CommunityProps } from '../items/Community';
import { PostProps } from '../items/Post';
import { CommentItemProps } from '../items/Comment';
import MessagePost from '../items/MessagePost';

type CustomFlatListProps = {
    type: string;
    data : CommunityProps[] | PostProps[] | CommentItemProps[];
    isLoading : boolean;
    reFetch : () => void;
    isError : boolean;
    keyToInvalidate: string;
    headerComponent?: JSX.Element | null;
    renderItem?: ({ item }: { item: any }) => JSX.Element;
    currentPost? : any;
};

export default function CustomFlatList(props : CustomFlatListProps) { 
  let formatedType = props.type;

  if (props.type.includes('post')) {
    formatedType = 'posts';
  }

  return (
    <FlatList
        className='w-screen'
        data={props.data}
        renderItem={props.renderItem}
        refreshing={props.isLoading}
        onRefresh={props.reFetch}
        onEndReachedThreshold={2}
        ListFooterComponent={<View className='h-3'/>}
        ListHeaderComponent={props.headerComponent}
        ListEmptyComponent={props.isError ? 
          <MessagePost message={`Error while retriving items ↺`} action={props.reFetch} /> : 
          <MessagePost message={`No ${formatedType} found`} />}
      />
  );
}