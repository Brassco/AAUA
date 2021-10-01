import React, {useState, useEffect} from 'react';
import {View, Alert, Text, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';

import {useTranslation} from 'react-i18next';

import {
  MainCard,
  ButtonSquad,
  ButtonRoundet,
  Header,
  Spiner,
  CheckBox,
} from '@aaua/components/common';

import {PhoneInput, DefaultTextInput} from '@aaua/components/common/Inputs';

import Authentication from '@aaua/services/Authentification/';

import {SEND_STEP_1, STEP_1_SUCCESS} from '@aaua/actions/types';

import {WIDTH_RATIO, RATIO} from '@aaua/styles/constants';

import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';

import styles from './styles';

let labelFontSize = WIDTH_RATIO <= 1 ? 10 : 12;

const FirstStage = props => {
  const {t} = useTranslation();

  const [isAdault, setIsAdault] = useState(false);
  const [isAgrie, setIsAgrie] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const dispatch = useDispatch();

  const {error, loading, isDisabled, smsError, sms, smsSended} = useSelector(
    state => state.register,
  );

  const onPhoneChange = phone => {
    setPhone(phone);
  };

  const onCodeChange = code => {
    setCode(code);
  };

  const onSendUserData = userData => {
    sendStep1(userData);
  };

  const sendStep1 = async userData => {
    const response = await Authentication.sendStep1Data(userData);

    if (response.error > 0) {
      showAlert(response.errorMessage);
    } else {
      dispatch({
        type: STEP_1_SUCCESS,
        payload: {
          token: response.token,
          username: response.username,
        },
      });
      Actions.secondStage();
    }
  };

  const showAlert = (
    errorMessage = 'Не все поля заполнены или заполнены не верно',
  ) => {
    Alert.alert(t('modals.error_title'), t('errors.data_not_filled'), [
      {
        text: 'OK',
        onPress: () => {
          console.log('close alert');
        },
      },
    ]);
  };

  const openSecondStage = () => {
    if (phone.length > 0 && code.length > 0) {
      if (isAdault && isAgrie && isRead) {
        const userData = {
          device: DEVICE_OS,
          phone: phone,
          sms_code: code,
          x: longitude,
          y: latitude,
        };
        onSendUserData(userData);
      } else {
        showAlert();
      }
    } else {
      showAlert();
    }
  };

  const checkPhone = async () => {
    // sendSms(phone);
    const smsResponse = await Authentication.sendSms(phone);

    if (smsResponse.error == 0) {
      showAlert(t('modals.thanks_title'), t('modals.sms_sended'), 'OK');
    } else if (smsResponse.error >= 1) {
      let errorMessage = smsResponse.errorMessage;
      if (smsResponse.error == 1) {
        errorMessage = t('errors.registration_error');
      }
      showAlert(t('modals.error_title'), errorMessage, 'OK');
    }
  };

  const isFullInfo = () => {
    return isAdault && isRead && isAgrie && phone.length > 0 && code.length > 0;
  };

  const openLicence = () => {
    Actions.licence();
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
    );
  }, []);

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.loading != nextProps.loading) {
  //     if (nextProps.smsError != false) {
  //       showAlert('Ошибка', nextProps.smsError, 'OK');
  //     }
  //     if (
  //       nextProps.smsSended != false &&
  //       nextProps.smsError == false &&
  //       nextProps.loading == false
  //     ) {
  //       showAlert('Спасибо', 'Смс с кодом отправлена', 'OK');
  //     }
  //   }
  // }

  const renderButton = () => {
    if (loading === false) {
      return (
        <ButtonRoundet isDisabled={smsSended} onPress={checkPhone}>
          {t('buttons.get_sms_code')}
        </ButtonRoundet>
      );
    }
    return <Spiner />;
  };

  const {
    checkboxContainer,
    footerWrapper,
    buttonWrapper,
    labelStyle,
    inputsWrapper,
  } = styles;

  const labelTitle = t('registration_screen.agree_get_info');

  const licensLabel = '';

  return (
    <MainCard>
      <Header back={DEVICE_OS == iOS ? true : false}>
        {t('screen_headers.personal_data')}
      </Header>
      <View style={inputsWrapper}>
        <PhoneInput value={phone} onChangeText={onPhoneChange} />
        <DefaultTextInput
          secureTextEntry
          label={t('labels.code_from_sms')}
          placeholder={t('labels.code_from_sms')}
          onChangeText={onCodeChange}
          value={code}
        />
      </View>

      <View style={buttonWrapper}>{renderButton()}</View>
      <View style={checkboxContainer}>
        <CheckBox
          checkedImage={require('@aaua/images/icons/checked.png')}
          uncheckedImage={require('@aaua/images/icons/unchecked.png')}
          labelStyle={labelStyle}
          label={t('registration_screen.iam_adault')}
          checked={isAdault}
          onChange={() => setIsAdault(!isAdault)}
        />
        <CheckBox
          checkedImage={require('@aaua/images/icons/checked.png')}
          uncheckedImage={require('@aaua/images/icons/unchecked.png')}
          labelStyle={labelStyle}
          checked={isRead}
          onChange={() => setIsRead(!isRead)}
          customLabel={
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={labelStyle}>
                {t('registration_screen.agree_licence')}{' '}
              </Text>
              <Text style={[labelStyle, {color: 'blue'}]} onPress={openLicence}>
                {t('registration_screen.licence')}
              </Text>
            </View>
          }
        />
        <CheckBox
          checkedImage={require('@aaua/images/icons/checked.png')}
          uncheckedImage={require('@aaua/images/icons/unchecked.png')}
          labelStyle={labelStyle}
          label={labelTitle}
          checked={isAgrie}
          onChange={() => setIsAgrie(!isAgrie)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}>
        <View style={footerWrapper}>
          <ButtonSquad
            style={{
              backgroundColor: isFullInfo() ? '#ffc200' : '#c5c5c5',
            }}
            onPress={openSecondStage}>
            {t('buttons.next')}
          </ButtonSquad>
        </View>
      </View>
    </MainCard>
  );
};

export default FirstStage;
