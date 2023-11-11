import { useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import AkioServices from '../services/AkioServices';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateModal from '../components/modal/GenerateModal';
import { useColorScheme } from "nativewind";
import { Ionicons } from '@expo/vector-icons'; 
import CustomFlatList from '../components/shared/CustomFlatList';
import SearchBarComp from '../components/shared/SearchBarComp';
import Icon from '../components/shared/Icon';

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
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const queryKey = `post-${community_id.current}-${community.current}-${keyword}`;

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => AkioServices.getPosts(community_id.current, keyword),
  });

  useEffect(() => {
    navigation.setOptions({
      title: community.current,
      headerRight: () => (
        community_id.current !== 0 ? 
        <GenerateModal type="post" id={community_id.current} keyToInvalidate={queryKey} /> : 
        <Icon icon={<Ionicons name="moon" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />} handler={toggleColorScheme} extraStyles='mr-3'/>
      ),
    });
  }, [navigation, authContext.isAuth, colorScheme]);
  
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