import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Item from '@aaua/components/Question_answear/Item';
import {MainCard, CardItem, Header} from '@aaua/components/common';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';

import {useTranslation} from 'react-i18next';

const List = () => {
  const {t} = useTranslation();

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {t('questions_screen.header')}
      </Header>
      <ScrollView>
        <Item
          id={1}
          style={{
            marginTop: 25,
          }}
          title={t('questions_screen.what_is_aaua.header')}>
          {t('questions_screen.what_is_aaua.description')}
        </Item>
        <Item id={2} title={t('questions_screen.how_get_card.header')}>
          {t('questions_screen.how_get_card.description')}
        </Item>
        <Item id={3} title={t('questions_screen.card_coast.header')}>
          {t('questions_screen.card_coast.description')}
        </Item>
        <Item id={4} title={t('questions_screen.bonuses.header')}>
          {t('questions_screen.bonuses.description')}
        </Item>
        <Item id={5} title={t('questions_screen.when_get_bonuses.header')}>
          {t('questions_screen.when_get_bonuses.description')}
        </Item>
        <Item id={6} title={t('questions_screen.bonuses_counts.header')}>
        {t('questions_screen.bonuses_counts.description')}
        </Item>
        <Item id={7} title={t('questions_screen.card_period.header')}>
        {t('questions_screen.card_period.description')}
        </Item>
        <Item id={8} title={t('questions_screen.bonuses_period.header')}>
        {t('questions_screen.bonuses_period.description')}
        </Item>
        <Item id={9} title={t('questions_screen.bonuses_exchange.header')}>
        {t('questions_screen.bonuses_exchange.description')}
        </Item>
        <Item id={10} title={t('questions_screen.bonuses_wog.header')}>
        {t('questions_screen.bonuses_wog.description')}
        </Item>
        <Item id={11} title={t('questions_screen.how_register.header')}>
        {t('questions_screen.how_register.description')}
        </Item>
      </ScrollView>
    </MainCard>
  );
};

export default List;
