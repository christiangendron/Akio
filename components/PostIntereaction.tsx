import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {roundedCount, timeSince} from '../tools/Formating';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigator';

interface PostIntereactionProps {
  data: {
    id: string;
    ups: number;
    num_comment: number;
    created_utc: number;
    subreddit: string;
  }
}

function PostIntereaction(props:PostIntereactionProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/up-arrow.png')} style={styles.icons}/>
      <Text style={styles.text}>{roundedCount(props.data.ups)}</Text>
      <Image source={require('../assets/icons/chat.png')} style={styles.icons}/>
      <Text style={styles.text}>{roundedCount(props.data.num_comment)}</Text>
      <Image source={require('../assets/icons/clock.png')} style={styles.icons}/>
      <Text style={styles.text}>{timeSince(props.data.created_utc)}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Subreddit", {data: props.data.subreddit})}>
        <Image source={require('../assets/icons/placeholder.png')} style={styles.icons}/>
        <Text style={styles.text}>{props.data.subreddit}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostIntereaction;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.white,
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    padding: 5,
  },
  icons: {
    height: 20,
    marginHorizontal: 5,
    width: 20,
  },
  text: {
    fontSize: 15,
  },
});
