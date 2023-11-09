import { View, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import Community, { CommunityProps } from '../components/items/Community';
import ErrorMessage from '../components/shared/ErrorMessage';
import NothingFound from '../components/shared/NothingFound';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateModal from '../components/modal/GenerateModal';

export default function Communities() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);

  const key = `community-list`;
  const query = useQuery({
    queryKey: [key],
    queryFn: () => AkioServices.getCommunities(),
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Communities',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
      headerRight: () => (
        <GenerateModal type="community" id={0} keyToInvalidate={key} />
      ),
    });
  }, [navigation, authContext.isAuth]);

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
          <ErrorMessage message="Error while getting communities" action={query.refetch} actionMessage="Try again!" />
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CommunityProps }): JSX.Element => {
    return <Community key={item.id} {...item } keyToInvalidate={key} />;
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        className='w-screen mt-2'
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListEmptyComponent={<NothingFound type="communities" />}
      />
    </View>
  );
}