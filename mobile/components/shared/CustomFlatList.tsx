import { View, FlatList } from 'react-native';
import { CommunityProps } from '../items/Community';
import { PostProps } from '../items/Post';
import { CommentItemProps } from '../items/Comment';
import MessagePost from '../items/MessagePost';
import { TaskProps } from '../items/TaskItem';

type CustomFlatListProps = {
    type: string;
    data : CommunityProps[] | PostProps[] | CommentItemProps[] | TaskProps[];
    isLoading : boolean;
    reFetch : () => void;
    isError : boolean;
    keyToInvalidate: string;
    headerComponent?: JSX.Element | null;
    renderItem?: ({ item }: { item: any }) => JSX.Element;
    currentPost? : any;
};

/**
 * CustomFlatList : Used by all pages to show a list of items.
 * @param props CustomFlatListProps
 * @returns JSX.Element
 */
export default function CustomFlatList(props : CustomFlatListProps) { 
  let formatedType = props.type;

  if (props.type.includes('post')) {
    formatedType = 'posts';
  }

  const emptyComp = () => {
    if (props.isError) {
      return <MessagePost message={`Error while retriving items ↺`} action={props.reFetch} />
    } else if (props.isLoading) {
      return <MessagePost message={`Loading`} />
    } else {
      return <MessagePost message={`No ${formatedType} found`} />
    }
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
        ListEmptyComponent={emptyComp}
      />
  );
}