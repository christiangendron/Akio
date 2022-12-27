import {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PostItem from '../components/PostItem';
import AppTheme from '../styles/AppTheme';
import {AuthContext} from '../context/AuthContext';
import RedditPosts from '../services/RedditPost';
import RedditToken from '../services/RedditToken';

export default function Home() {
  const {token, setToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    RedditToken.requestBasicToken().then((res) => {
      console.log('Setting token: ' + res.data.access_token);
      setToken(res.data.access_token);
    });
  }, []);

  function getPosts() {
    setIsLoading(true);

    RedditPosts.getPosts('all', token).then((res) => {
      setPosts(res.data.data.children);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const renderItem = ({item}) => (
    <PostItem key={item.id} data={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={posts}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={getPosts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.white,
    flex: 1,
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
});
