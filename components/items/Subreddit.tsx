import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';

/**
 * Setting component for items in the setting screen
 * @param props needs a label, current set and a handler
 */
export default function Subreddit() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <TouchableOpacity>
            <View className='flex flex-row bg-slate-300 p-3 justify-between rounded-lg m-1'>
                <Text className='text-center text-lg'>/r/politics</Text>
            </View>
        </TouchableOpacity>
    );
}