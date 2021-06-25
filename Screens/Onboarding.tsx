import {Image} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async () => {
  try {
    await AsyncStorage.setItem('onBoarded', JSON.stringify({onboard: false}));
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

function done(replace) {
  replace('Main');
  saveData();
}
const Intro = ({navigation: {replace}}) => (
  <Onboarding
    onDone={() => {
      done(replace);
    }}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={{uri: 'http'}} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={{uri: 'http'}} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image source={{uri: 'http'}} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default Intro;
