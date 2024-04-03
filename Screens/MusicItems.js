import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MusicItem({item, index}) {
  const navigation = useNavigation();

  const [play, setplay] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.touch}
        onPress={() =>
          navigation.navigate('Music', {
            data: item,
            index: index,
            onGoBack: data => {
              console.log(data);
              setplay(data);
            },
          })
        }>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item.image}
            style={{width: 75, height: 75, borderRadius: 20}}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 15, width: 103}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Oswald-Bold',
                }}>
                {item.title}
              </Text>

              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Oswald-Bold',
                }}>
                {item.artist}
              </Text>
            </View>

            <View style={{marginLeft: Platform.OS === 'android' ? 60 : 120}}>
              <TouchableOpacity onPress={() => setplay(false)}>
                {play ? (
                  <Icon name="pause" color="white" size={30} />
                ) : (
                  <Icon name="play" color="white" size={30} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touch: {
    justifyContent: 'center',
    height: 110,
    margin: 15,
    backgroundColor: '#191919',
    borderRadius: 20,
    padding: 15,
    elevation: 30,
    opacity: 30,
    shadowColor: '#5e5e5e',
  },
});
