import React, {useState} from 'react';
import {View} from 'react-native';

import {useTranslation} from 'react-i18next';

import {MainCard, Header} from '@aaua/components/common';
import {PhoneInput} from '@aaua/components/common/Inputs';
import ButtonRoundet from '@aaua/components/common/Buttons/RoundButton';

import {sendData} from '@aaua/actions/ForgotPassAction';

import styles from './styles';

const ForgotPassword = props => {
  const {t} = useTranslation();

  const [phone, setPhone] = useState('');

  const onPhoneChange = phone => {
    setPhone(phone);
  };

  const onSubmit = () => {
    sendData(phone);
  };

  const {inputWrapper, buttonWrapper} = styles;

  return (
    <MainCard>
      <Header back>{t('screen_headers.restore_pass')}</Header>
      <View style={inputWrapper}>
        <PhoneInput value={phone} onChangeText={onPhoneChange} />
      </View>
      <View style={buttonWrapper}>
        <ButtonRoundet onPress={() => onSubmit()}>
          {t('buttons.restore_pass')}
        </ButtonRoundet>
      </View>
    </MainCard>
  );
};

export default ForgotPassword;
