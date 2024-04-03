import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {musicData} from '../assets/MusicData';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

export default function Music({route}) {
  const [playing, setPlaying] = useState(false);

  const navigation = useNavigation();

  const playBackState = usePlaybackState();
  console.log(playBackState);

  const progress = useProgress();

  const {width} = Dimensions.get('screen');

  const [currentsong, setCurrentsong] = useState(route.params.index);

  const slider = useRef();

  useEffect(() => {
    setTimeout(() => {
      slider.current.scrollToIndex({
        animated: false,
        index: currentsong,
      });
    }, 300);
  }, [currentsong]);

  useEffect(() => {
    handlePlayer();
  }, []);

  async function handlePlayer() {
    try {
      await TrackPlayer.setupPlayer();

      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });

      await TrackPlayer.add(musicData);
    } catch (err) {
      console.log(err);
    }
  }

  const handleMusic = async () => {
    if (!playing) {
      setPlaying(true);
      await TrackPlayer.play();
    } else {
      setPlaying(false);
      await TrackPlayer.pause();
    }
  };

  const handleBack = () => {
    navigation.goBack();
    route.params.onGoBack({play: playing});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View
        style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-back" color="white" size={25} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 25,
            color: 'white',
            margin: 20,
            fontFamily: 'Oswald-Medium',
          }}>
          Music
        </Text>
      </View>

      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <FlatList
          ref={slider}
          horizontal
          pagingEnabled
          data={musicData}
          onScroll={event => {
            const scrollPosition = event.nativeEvent.contentOffset.x;

            const index = Math.floor(scrollPosition / width);

            const currentItem = musicData[index];

            TrackPlayer.skip(currentItem.id);
          }}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <View>
                <Image
                  source={item.image}
                  style={{
                    width: 300,
                    height: 350,
                    borderRadius: 20,
                    marginLeft: 30,
                    marginRight: 30,
                  }}
                />

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 19,
                      color: 'white',
                      margin: 5,
                      fontFamily: 'Oswald-Medium',
                    }}>
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      fontSize: 19,
                      color: 'white',
                      margin: 5,
                      fontFamily: 'Oswald-Medium',
                    }}>
                    {item.artist}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View style={{alignItems: 'center'}}></View>

      <View style={{marginLeft: 40, marginRight: 40}}>
        <Slider
          value={progress.position}
          minimumValue={0}
          style={{height: 30}}
          maximumValue={progress.duration}
          thumbTintColor="green"
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="grey"
          onValueChange={async val => await TrackPlayer.seekTo(val)}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft: 45}}>
          <Text style={{fontFamily: 'Oswald-Medium'}}>
            {new Date(progress.position * 1000).toISOString().substring(14, 19)}
          </Text>
        </View>

        <View style={{position: 'absolute', right: 45}}>
          <Text style={{fontFamily: 'Oswald-Medium'}}>
            {new Date(progress.duration * 1000).toISOString().substring(14, 19)}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          margin: 30,
        }}>
        <TouchableOpacity
          onPress={async () => {
            if (currentsong > 0) {
              setCurrentsong(currentsong - 1);
              slider.current.scrollToIndex({
                animated: true,
                index: currentsong - 1,
              });
              await TrackPlayer.skipToPrevious();
            }
          }}>
          <Icon name="play-back" color="white" size={35} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMusic}>
          {playing ? (
            <Icon name="pause" color="white" size={35} />
          ) : (
            <Icon name="play" color="white" size={35} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            if (musicData.length - 1 > currentsong) {
              setCurrentsong(currentsong + 1);
              slider.current.scrollToIndex({
                animated: true,
                index: currentsong + 1,
              });
              await TrackPlayer.skipToNext();
            }
          }}>
          <Icon name="play-forward" color="white" size={35} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {/* <TouchableOpacity>
                    <Icon name="repeat" color="white" size={35} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="shuffle" color="white" size={35} />
                </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
