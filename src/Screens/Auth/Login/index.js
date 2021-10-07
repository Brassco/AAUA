import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useSelector, useDispatch} from 'react-redux';

import {useTranslation} from 'react-i18next';

import {loginUser, getPushToken} from '@aaua/actions/AuthAction';
import {getBrands, getCities} from '@aaua/actions/CitiesBrands';
import {getToken} from '@aaua/actions/constants';
import {LOGIN_USER} from '@aaua/actions/types';

import {showAlert} from '@aaua/components/Modals';
import {MainCard, Spiner} from '@aaua/components/common';
import ButtonRoundet from '@aaua/components/common/Buttons/RoundButton';
import {PhoneInput, PasswordInput} from '@aaua/components/common/Inputs';

import {MIN_HEIGHT, RATIO} from '@aaua/styles/constants';

import styles from './styles';

let listener = null;

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('+380968266485');
  const [password, setPassword] = useState('ojf1T');

  const {t} = useTranslation();

  const {user, error, loginError, loading, pushToken} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();

  console.log('render NEW LOGIN', {
    user,
    error,
    loginError,
    loading,
    pushToken,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const showAlert = () => {
    // showAlert(
    //   'Ошибка',
    //   'Не все поля заполнены или заполнены не верно',
    //   'OK',
    //   console.log('onSubmit'),
    // );
  };

  useEffect(() => {
    if (user !== null) {
      Actions.drawer();
    }
  }, [user]);

  const onLogin = () => {
    if (phone && password) {
      setIsLoading(true);
      dispatch(loginUser(phone, password, pushToken));
    } else {
      showAlert();
    }
  };

  const onPhoneChange = formatted => {
    console.log('onPhoneChange', formatted);
    setPhone(formatted);
  };

  const onPasswordChange = txt => {
    setPassword(txt);
  };

  const renderButton = () => {
    if (isLoading === false) {
      return (
        <View style={loginButtonWrapper}>
          <ButtonRoundet onPress={onLogin}>{t('buttons.enter')}</ButtonRoundet>
        </View>
      );
    }
    return <Spiner />;
  };

  const {
    footerLinksContainer,
    linkStyle,
    linkText,
    imageWrapper,
    imageStyle,
    loginButtonWrapper,
    inputsWrapper,
    buttonContainer,
  } = styles;

  return (
    <MainCard>
      <View style={imageWrapper}>
        <View>
          <Image style={imageStyle} source={require('@aaua/images/logo.png')} />
        </View>
        <View>
          <Text>{t('login_screen.asociation')}</Text>
          <Text>{t('login_screen.driwers')}</Text>
          <Text>{t('login_screen.ukraine')}</Text>
        </View>
      </View>

      <View style={inputsWrapper}>
        <PhoneInput value={phone} onChangeText={onPhoneChange} />
        <PasswordInput
          label={t('labels.password')}
          placeholder={t('labels.password')}
          onChangeText={onPasswordChange}
          value={password}
        />
      </View>

      <View style={buttonContainer}>{renderButton()}</View>

      <View style={footerLinksContainer}>
        <View style={linkStyle}>
          <TouchableOpacity onPress={Actions.forgot}>
            <Text style={linkText}>{t('login_screen.forgot_pass')}?</Text>
          </TouchableOpacity>
        </View>
        <View style={[linkStyle, {alignItems: 'flex-end'}]}>
          <TouchableOpacity onPress={Actions.register}>
            <Text style={linkText}>{t('login_screen.registration')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainCard>
  );
};

export default Login;
