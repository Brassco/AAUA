import React from 'react';
import {useSelector} from 'react-redux';

import {useTranslation} from 'react-i18next';

import {MainCard, Header} from '@aaua/components/common';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';

const CarModels = (props) => {

  const {t} = useTranslation();

  const {insurance: {carModels}} = useSelector( state => state);

  const onChangeCarModel = model => {
    props.onChangeCarModel(model);
  };

  return (
    <MainCard>
      <Header goToMain={DEVICE_OS == iOS ? true : false}>Модель авто</Header>
      <AutocompleteScreen
        defaultList={[]}
        data={carModels}
        onSelect={onChangeCarModel}
        textInputPlacehokder={t('insurance_screen.kasko.car_model.placeholder')}
      />
    </MainCard>
  );
};

export default CarModels;
