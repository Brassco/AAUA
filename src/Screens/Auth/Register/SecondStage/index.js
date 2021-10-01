import React, {useRef, useState} from 'react';
import {View, ScrollView, Alert, TouchableOpacity, Text} from 'react-native';
import {useSelector, useReducer} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {useTranslation} from 'react-i18next';

import {
  changePass,
  changeCar,
  changeCity,
  changeEmail,
  changeName,
  changeYear,
  changeConfirmPass,
  sendStep2,
  onChangeBrand,
  onSelectBrand,
} from '@aaua/actions/RegisterAction';

import {
  MainCard,
  CardItem,
  ButtonSquad,
  Header,
  Spiner,
  CustomTextRow,
} from '@aaua/components/common';
import {TextInput, PasswordInput} from '@aaua/components/common/Inputs';

import {ClickableTextRow} from '@aaua/components/common/ClickableTextRow';

import {showAlert} from '@aaua/components/Modals';

import {CITIES} from '@aaua/actions/constants';

import styles from './styles';

const SecondStage = props => {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     enableScrollViewScroll: true,
  //     searchedCities: [],
  //     searchedBrands: [],
  //   };
  // }
  const {t} = useTranslation();

  const scrollElement = useRef(null);

  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true);

  const {citiesBrands, register, auth} = useSelector(state => state);

  const {
    name,
    city,
    cityId,
    car,
    brandId,
    email,
    year,
    password,
    confirm_password,
    token,
    username,
    phone,
    sendingStep2,
  } = register;

  const {brands, cities} = citiesBrands;

  const {pushToken} = auth;

  const onChangeName = val => {
    changeName(val);
  };
  const onChangeYear = year => {
    changeYear(year);
  };
  const onChangeEmail = email => {
    changeEmail(email);
  };
  const onChangePassword = pass => {
    changePass(pass);
  };
  const onChangeConfirmPass = pass => {
    changeConfirmPass(pass);
  };

  const onChangeBrand = title => {
    if (title.length >= 2) {
      searchedBrands(title);
    }
    onChangeBrand(title);
    this.refs._scrollView.scrollTo({x: 800, y: 500, animated: true});
  };
  const onSelectBrand = brandObj => {
    this.setState({searchedBrands: []});
    onSelectBrand(brandObj);
  };
  const onChangeCity = title => {
    if (title.length >= 2) {
      searchedCities(title);
    }
    changeCity(title);
    if (title.length == 1) {
      this.refs._scrollView.scrollTo({x: 800, y: 500, animated: true});
    }
  };

  const onSelectCity = cityObj => {
    this.setState({searchedCities: []});
    selectCity(cityObj);
  };

  const searchedCities = searchedText => {
    var searchedItems = cities.filter(function (item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      onSelectCity(searchedItems[0]);
      this.setState({searchedCities: []});
    }
    cities.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        onSelectCity(e);
        this.setState({searchedCities: []});
      }
    });
    this.setState({searchedCities: searchedItems.slice(0, 30)});
  };

  const searchedBrands = searchedText => {
    var searchedItems = brands.filter(function (item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      onSelectBrand(searchedItems[0]);
      this.setState({searchedBrands: []});
    }
    this.props.brands.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        onSelectBrand(e);
        this.setState({searchedBrands: []});
      }
    });
    this.setState({searchedBrands: searchedItems.slice(0, 30)});
  };

  const showAlert = () => {
    Alert.alert('Ошибка', 'Не все поля заполнены или заполнены не верно', [
      {
        text: 'OK',
        onPress: () => {
          console.log('close alert');
        },
      },
    ]);
  };

  const onSubmit = () => {
    const userData = {
      token: token,
      name: name,
      city_id: cityId,
      email: email,
      year: year,
      brand_id: brandId,
      password: password,
      phone: phone,
      pushToken: pushToken,
    };
    if (
      name.length > 0 &&
      cityId > 0 &&
      year.length > 0 &&
      email.length &&
      password.length > 0 &&
      confirm_password.length > 0 &&
      brandId > 0
    ) {
      if (validate(email)) {
        if (password == confirm_password) {
          sendStep2(userData);
        } else {
          showAlert(
            t('modals.error_title'),
            t('errors.password_not_matches'),
            t('modals.close_title'),
          );
        }
      } else {
        showAlert(
          t('modals.error_title'),
          t('errors.wrong_email_format'),
          t('modals.close_title'),
        );
      }
    } else {
      showAlert();
    }
  };

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const isFullInfo = () => {
    // let {city, name, car, year, email, password, confirm_password} = props;
    return (
      city.length > 0 &&
      name.length > 0 &&
      car.length > 0 &&
      year.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirm_password.length > 0
    );
  };

  const {inputsWrapper} = styles;

  return (
    <MainCard>
      <Header>{t('screen_headers.personal_data')}</Header>
      <ScrollView ref={scrollElement} scrollEnabled={enableScrollViewScroll}>
        <View style={inputsWrapper}>
          <TextInput
            label={t('labels.name')}
            placeholder={t('placeholders.name')}
            onChangeText={onChangeName.bind(this)}
            value={name}
          />
          <ClickableTextRow
            onPress={Actions.AutocompleteScreen}
            label={t('labels.city')}
            value={city ? city : null}
            placeholder={t('placeholders.auto_brand')}
          />
          <ClickableTextRow
            onPress={Actions.CarsScreen}
            label={t('labels.auto_brand')}
            value={car ? car : null}
            placeholder={t('placeholders.auto_brand')}
          />
          <TextInput
            label={t('labels.car_year')}
            placeholder={'0000'}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={onChangeYear}
            value={year}
          />
          <TextInput
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'sample@index.com'}
            onChangeText={onChangeEmail}
            value={email}
          />
          <PasswordInput onChangeText={onChangePassword} value={password} />

          <PasswordInput
            label={t('labels.repeat_pass')}
            onChangeText={onChangeConfirmPass}
            value={confirm_password}
          />
        </View>
        <View style={styles.footerWrapper}>
          {sendingStep2 ? (
            <Spiner size="small" />
          ) : (
            <ButtonSquad
              style={{
                backgroundColor: isFullInfo() ? '#ffc200' : '#c5c5c5',
              }}
              disabled={sendingStep2}
              onPress={onSubmit}>
              {t('buttons.next')}
            </ButtonSquad>
          )}
        </View>
      </ScrollView>
    </MainCard>
  );
};

export default SecondStage;
