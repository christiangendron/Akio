import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import CommentItem, { CommentItemProps } from '../components/CommentItem';
import DetailsHeader from '../components/DetailsHeader';
import ErrorMessage from '../components/ErrorMessage';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import AppTheme from '../styles/AppTheme';

export type OverviewProps = {
  route: {
    params: {
      data: string;
    }
  }
}

export default function Overview(props: OverviewProps) {
  const { token } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.data,
    });
  }, [navigation]);

  const user = useQuery(`overview-for-${props.route.params.data}`, () => RedditServices.getOverview(props.route.params.data, token.data.data.access_token));

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <CommentItem key={item.data.id} data={item.data} />
  };

  if (user.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (user.isError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Error while getting user info." action={user.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const currentUserInfo = user?.data?.data.data.children[0].data;

  return (
    <View style={styles.container}>
      <Text>Overview for {currentUserInfo.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.lightgray,
    flex: 1,
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
});
