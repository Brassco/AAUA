import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import {connect, useSelector, useDispatch} from 'react-redux';

import {useTranslation} from 'react-i18next';

import {BottomMenuItem} from '@aaua/components/common/BottomMenuItem';
import {getSliderImages, getBonusesWog} from '@aaua/actions/CitiesBrands';
import {countMessages} from '@aaua/actions/MessagesActions';

import styles from './styles';

import {
  MainCard,
  CardItem,
  BottomMenu,
  Header,
  BottomMenuMessages,
} from '@aaua/components/common';

const HomeScreen = props => {
  const {t} = useTranslation();
  const {auth, citiesBrands, messages} = useSelector(state => state);
  const user = auth.user;
  const bonus = auth.user ? citiesBrands.bonuses : 0;
  const bonus_wog = auth.user ? citiesBrands.bonuses_wog : 0;
  const images = citiesBrands.sliderImages;
  const messagesCounter = messages.messagesCounter;

  const {sliderImageWrapper, bottomButton} = styles;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && images.length < 1) {
      let {token} = user;
      dispatch(getSliderImages(token));
      dispatch(countMessages(token));
      dispatch(getBonusesWog(token));
    }
  }, [user, images]);

  return (
    <MainCard>
      <Header burger>{'AAUA'}</Header>
      <CardItem style={sliderImageWrapper}>
        <ImageSlider
          onPress={image => {
            console.log('ON PRESS IMAGE', image);
            Actions.imageContent({
              images: images,
              index: image.index,
            });
          }}
          images={images}
          autoPlayWithInterval={4000}
        />
      </CardItem>
      <CardItem>
        <BottomMenu>
          <BottomMenuItem
            style={bottomButton}
            counter={bonus_wog}
            imageSrc={require('@aaua/images/icons/wog.png')}>
            {t('bottomMenu.bonus_wog')}
          </BottomMenuItem>
          <BottomMenuItem
            style={bottomButton}
            counter={bonus}
            imageSrc={require('@aaua/images/icons/aaua.png')}>
            {t('bottomMenu.bonus_aaua')}
          </BottomMenuItem>
          <BottomMenuMessages
            counter={messagesCounter}
            onPress={Actions.messages}
            imageSrc={require('@aaua/images/icons/mail.png')}>
            {t('bottomMenu.messages')}
          </BottomMenuMessages>
        </BottomMenu>
      </CardItem>
    </MainCard>
  );
};

export default HomeScreen;
