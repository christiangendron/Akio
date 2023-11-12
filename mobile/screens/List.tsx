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

type ListNavigationProps = {
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

export default function List(props: ListNavigationProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const { colorScheme } = useColorScheme();
    const authContext = useContext(AuthContext);
    
    const name = props.route.params.name;
    const id = props.route.params.id;
    const type = props.route.params.type;
    const withGeneration = props.route.params.withGeneration;
    const withSearch = props.route.params.withSearch;

    const [keyword, setKeyword] = useState('');

    const queryKey = `${type}-${id}-${name}-${keyword}`;
    const query = useQuery({queryKey: [queryKey],queryFn: () => AkioServices.getRessource(type, id, keyword) });

    useEffect(() => {
        navigation.setOptions({
        title: name,
        headerRight: () => (
            withGeneration ? <GenerateModal type={type} id={id} keyToInvalidate={queryKey} /> : null
        ),
        });
    }, [navigation, authContext.isAuth, colorScheme]);
    
    return (
        <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
        <CustomFlatList 
            type={type} 
            data={query.data ? query.data : []} 
            isLoading={query.isLoading} 
            reFetch={query.refetch} 
            isError={query.isError} 
            keyToInvalidate={queryKey}
            headerComponent={withSearch ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch} placeholder={`Search in this list...`}/> : null}
        />
        </View>
    );
}