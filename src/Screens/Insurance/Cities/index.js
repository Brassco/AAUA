import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {MainCard, Header} from '@aaua/components/common';

import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';

import styles from './styles';

const Cities = ({onSelectCity}) => {
  const {t} = useTranslation();

  const {
    citiesBrands: {cities},
  } = useSelector(state => state);

  const defaultCities = [
    {id: '181', title: 'Київ'},
    {id: '409', title: 'Харків'},
    {id: '115', title: 'Дніпропетровськ'},
    {id: '291', title: 'Одеса'},
    {id: '238', title: 'Львів'},
  ];

  return (
    <MainCard>
      <Header>Город</Header>
      <AutocompleteScreen
        defaultList={defaultCities}
        data={cities}
        onSelect={onSelectCity}
        textInputPlacehokder={t('insurance_screen.osago.select_city')}
      />
    </MainCard>
  );
};

export default Cities;
