import React, {Component, useState} from 'react';
import {Text, View} from 'react-native';
import Tabs from 'react-native-tabs';

import {useTranslation} from 'react-i18next';

import {MainCard, CardItem, Header} from '@aaua/components/common';
import CategoriesTab from '../Catalog';
import DiscountsListTab from '../DiscountsList';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';

import styles from './styles';

const TabsComponent = () => {
  const {t} = useTranslation();
  const [page, setPage] = useState('1');

  const renderTabs = () => {
    console.log('renderTabs', page);
    switch (page) {
      case '1':
        return <CategoriesTab />;
      case '2':
        return <DiscountsListTab />;
        default:
          return <CategoriesTab />;
    }
  };

  const {tabText, selectedTabText, selectedTab} = styles;

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {t('discounts_screen.screen_header')}
      </Header>
      <CardItem
        style={{
          flex: 0,
          height: 50,
        }}>
        <Tabs
          selected={page}
          style={{
            top: 0,
          }}
          selectedStyle={selectedTabText}
          onSelect={el => setPage(el.props.nam)}>
          <Text selectedIconStyle={selectedTab} style={tabText} name="1">
            {t('discounts_screen.catalog')}
          </Text>
          <Text style={tabText} name="2" selectedIconStyle={selectedTab}>
            {t('discounts_screen.discount_cards')}
          </Text>
        </Tabs>
      </CardItem>
      <CardItem>{renderTabs()}</CardItem>
    </MainCard>
  );
};

export default TabsComponent;
