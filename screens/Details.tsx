import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import CommentItem, { CommentItemProps } from '../components/CommentItem';
import DetailsHeader from '../components/DetailsHeader';
import ErrorMessage from '../components/ErrorMessage';
import FilterBox from '../components/FilterBox';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import AppTheme from '../styles/AppTheme';

export type DetailsScreenProps = {
  route: {
    params: {
      data: string;
    }
  }
}

export default function Details(props: DetailsScreenProps) {
  const { token } = useContext(AuthContext);
  const [filter, setFilter] = useState('hot');

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <FilterBox data={{ filter, setFilter }} />
      ),
    });
  }, [navigation]);

  const comments = useQuery(`comments-for-${props.route.params.data}`, () => RedditServices.getComments(props.route.params.data, filter, token.data.data.access_token));

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <CommentItem key={item.data.id} data={item.data} />
  };

  if (comments.isLoading) {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          data={null}
          renderItem={renderItem}
          refreshing={comments.isLoading}
          onRefresh={comments.refetch}
          ListHeaderComponent={<DetailsHeader data={props.route.params.data} />}
        />
      </View>
    );
  }

  if (comments.isError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Error while getting comments." action={comments.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const commentsData = comments?.data?.data.data.children;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={commentsData}
        renderItem={renderItem}
        refreshing={comments.isLoading}
        onRefresh={comments.refetch}
        ListHeaderComponent={<DetailsHeader data={props.route.params.data} />}
      />
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
