import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {useTranslation} from 'react-i18next';

import {MainCard, CardItem, Header} from '@aaua/components/common';
import CategoryItem from '@aaua/components/Insurance/CategoryItem';
import {RATIO} from '@aaua/styles/constants';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';

const Categories = () => {
  const {t} = useTranslation();

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {t('insurance_screen.header')}
      </Header>
      <CardItem
        style={{
          paddingTop: 21 * RATIO,
        }}>
        <CategoryItem
          buttonText={t('insurance_screen.get_proposal')}
          onPress={Actions.kaskoComponent}
          imageSrc={require('@aaua/images/kasko.png')}>
          КАСКО
        </CategoryItem>
      </CardItem>
      <CardItem>
        <CategoryItem
          buttonText={t('insurance_screen.buy_online')}
          onPress={Actions.osagoComponent}
          imageSrc={require('@aaua/images/osago.png')}>
          ОСАГО
        </CategoryItem>
      </CardItem>
    </MainCard>
  );
};

export default Categories;
