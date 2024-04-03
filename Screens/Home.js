import React from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import MusicItem from './MusicItems';
import {musicData} from '../assets/MusicData';

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <Text
        style={{
          fontSize: 25,
          color: 'white',
          margin: 20,
          fontFamily: 'Oswald-Bold',
        }}>
        Song List
      </Text>

      <ImageBackground
        source={{
          uri: 'https://png.pngtree.com/background/20210715/original/pngtree-blue-gradient-simple-geometric-creative-light-bulb-background-picture-image_1316182.jpg',
        }}>
        <FlatList
          data={musicData}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return <MusicItem item={item} index={index} />;
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
