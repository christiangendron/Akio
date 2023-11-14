import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import AkioServices from '../services/AkioServices';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateModal from '../components/modal/GenerateModal';
import { useColorScheme } from "nativewind";
import CustomFlatList from '../components/shared/CustomFlatList';
import SearchBarComp from '../components/shared/SearchBarComp';
import { SettingsContext } from '../context/SettingsContext';
import OrderByModal from '../components/modal/OrderByModal';
import SwipeableDelete from '../components/shared/SwipeableDelete';
import SmallPost from '../components/items/SmallPost';

type PostsListNavigationProps = {
  route: {
    params: ListProps;
  }
}

export type ListProps = {
  id: number;
  name: string;
  type: string;
  withGeneration?: boolean;
  withSearch?: boolean;
}

export default function PostsList(props: PostsListNavigationProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const { colorScheme } = useColorScheme();
    const authContext = useContext(AuthContext);
    const settingContext = useContext(SettingsContext);
    
    const name = props.route.params.name;
    const id = props.route.params.id;
    const type = props.route.params.type;
    const withGeneration = props.route.params.withGeneration;
    const withSearch = props.route.params.withSearch && !settingContext?.hideSearchBar;

    const [keyword, setKeyword] = useState('');
    const [orderBy, setOrderBy] = useState('new');

    const queryKey = `${type}-${id}-${name}-${keyword}-${orderBy}`;
    const query = useQuery({queryKey: [queryKey],queryFn: () => AkioServices.getPosts(type, id, orderBy, keyword) });

    useEffect(() => {
      navigation.setOptions({
      title: name,
      headerRight: () => (
        <View className='flex flex-row'>
          <OrderByModal current={orderBy} setOrderBy={(value) => setOrderBy(value)} />
          {withGeneration ? <GenerateModal type={type} id={id} keyToInvalidate={queryKey} /> : null}
        </View>
      ),
      });
    }, [navigation, authContext.isAuth, colorScheme]);

    const renderItem = ({ item }: { item: any }): JSX.Element => {
      return <SwipeableDelete id={item.id} user_id={item.user_id} type='post' keyToInvalidate={queryKey} component={<SmallPost key={item.id} {...item} keyToInvalidate={queryKey} />}/>
    };

    return (
        <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
        <CustomFlatList 
            type={type} 
            data={query.data ? query.data : []} 
            renderItem={renderItem}
            isLoading={query.isLoading} 
            reFetch={query.refetch} 
            isError={query.isError} 
            keyToInvalidate={queryKey}
            headerComponent={withSearch ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder={`Search...`}/> : null}
        />
        </View>
    );
}