import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import CustomFlatList from '../components/shared/CustomFlatList';
import SearchBarComp from '../components/shared/SearchBarComp';

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
  const queryKey = `user-posts-${props.route.params.id}-${keyword}`;

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.name,
    });
  }, [navigation]);

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => AkioServices.getUserPosts(props.route.params.id, keyword),
  });

  return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <CustomFlatList 
        type='post' 
        data={query.data ? query.data : []} 
        isLoading={query.isLoading} 
        reFetch={query.refetch} 
        isError={query.isError} 
        keyToInvalidate={queryKey}
        searchComponent={<SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder='Search in this community...'/>}
      />
    </View>
  );
}