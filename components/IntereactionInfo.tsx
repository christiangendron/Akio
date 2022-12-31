import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { roundedCount, timeSince } from '../tools/Formating';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigator';

interface InterfactionInfoProps {
  data: {
    id: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    subreddit: string;
  }
}

function InterfactionInfo(props: InterfactionInfoProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate('Details', { data: props.data.id })}>
          <Image source={require('../assets/icons/up-arrow.png')} style={styles.icons} />
          <Text style={styles.text}>{roundedCount(props.data.ups)}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate('Details', { data: props.data.id })}>
          <Image source={require('../assets/icons/chat.png')} style={styles.icons} />
          <Text style={styles.text}>{roundedCount(props.data.num_comments)}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate('Details', { data: props.data.id })}>
          <Image source={require('../assets/icons/clock.png')} style={styles.icons} />
          <Text style={styles.text}>{timeSince(props.data.created_utc)}</Text>
        </TouchableOpacity>
      </View>
      <Image source={require('../assets/icons/upvote.png')} style={styles.icons} />
      <Image source={require('../assets/icons/downvote.png')} style={styles.icons} />
      <Image source={require('../assets/icons/options.png')} style={styles.icons} />
    </View>
  );
}

export default InterfactionInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.white,
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-evenly',
    marginVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
  },
  icons: {
    height: 20,
    marginHorizontal: 5,
    width: 20,
  },
  votes: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  text: {
    fontSize: 12,
    marginTop: 3,
  },
  info: {
    flexDirection: 'row',
  }
});
