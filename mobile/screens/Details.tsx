
import { View } from 'react-native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import Post, { PostProps } from '../components/items/Post';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { StackParams } from '../types/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GenerateModal from '../components/modal/GenerateModal';
import CustomFlatList from '../components/shared/CustomFlatList';

type DetailsNavigationProps = {
  route: {
    params: PostProps;
  }
};

export default function Details(props: DetailsNavigationProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);

  const queryKey = `comment-${props.route.params.id}`;
  const query = useQuery({queryKey: [queryKey],queryFn: () => AkioServices.getComments(props.route.params.id),});
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <GenerateModal type="comment" id={props.route.params.id} keyToInvalidate={queryKey} />
      ),
    });
  }, [navigation, authContext.isAuth]);

  return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <CustomFlatList 
        type='comment' 
        data={query.data ? query.data : []} 
        isLoading={query.isLoading} reFetch={query.refetch} 
        isError={query.isError} 
        keyToInvalidate={queryKey}
        headerComponent={<Post {...props.route.params} />}
        currentPost={{...props.route.params}}
      />
    </View>
  );
}