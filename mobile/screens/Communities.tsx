import { View } from 'react-native';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateModal from '../components/modal/GenerateModal';
import CustomFlatList from '../components/shared/CustomFlatList';

export default function Communities() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);
  
  const queryKey = `community-list`;
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => AkioServices.getCommunities(),
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Communities',
      headerRight: () => (
        <GenerateModal type="community" id={0} keyToInvalidate={queryKey} />
      ),
    });
  }, [navigation, authContext.isAuth]);

  return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <CustomFlatList 
        type='community' 
        data={query.data ? query.data : []} 
        isLoading={query.isLoading} 
        reFetch={query.refetch} 
        isError={query.isError} 
        keyToInvalidate={queryKey}
      />
    </View>
  );
}