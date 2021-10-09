import React, {useEffect, useState} from 'react';
import {View, Text, Linking, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {useTranslation} from 'react-i18next';

import {
  MainCard,
  CardItem,
  ButtonRoundet,
  Header,
  Spiner,
  DropDown,
  ClickableTextRow,
} from '@aaua/components/common';
import {calculateOsago, resetData} from '@aaua/actions/InsuranceAction';
import {showAlert} from '@aaua/components/Modals';

import styles from './styles';

const Osago = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    auth: {
      user: {token},
    },
    insurance: {osagoPriceLoading: loadingPrice, osagoPrice},
    citiesBrands,
  } = useSelector(state => state);

  const dropdownElements = [
    {
      title: t('insurance_screen.osago.engine_volume.xsmall'),
      id: 1,
      value: 1,
    },
    {
      title: t('insurance_screen.osago.engine_volume.small'),
      id: 2,
      value: 2,
    },
    {
      title: t('insurance_screen.osago.engine_volume.medium'),
      id: 3,
      value: 3,
    },
    {
      title: t('insurance_screen.osago.engine_volume.large'),
      id: 4,
      value: 4,
    },
  ];

  const [engineVolume, setEngineVolume] = useState(dropdownElements[0]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedCity != null) {
      dispatch(calculateOsago(token, selectedCity.id, engineVolume));
    }
  }, [engineVolume, selectedCity]);

  const onChangeVolume = itemValue => {
    setEngineVolume(itemValue);
  };

  const onOrder = () => {
    const orderData = {
      token,
      carType: engineVolume,
      cityId: selectedCity.id,
    };
    this.props.orderOsago(orderData);
  };

  const onChangeCity = city => {
    setSelectedCity(city);
  };

  const renderPrice = () => {
    if (loadingPrice) {
      return <Spiner />;
    } else {
      return <Text style={priceText}>{parseInt(osagoPrice)}грн</Text>;
    }
  };

  const {
    contentContainer,
    priceWrapper,
    priceText,
    buttonStyle,
    textColor,
    buyOnlineContainer,
    textContainer,
    orStyle,
    textStyle,
    modalContainer,
    modalButtonStyle,
  } = styles;

  return (
    <MainCard>
      <Header back>ОСАГО</Header>
      <CardItem style={contentContainer}>
        <DropDown
          fontSize={13}
          label={t('insurance_screen.osago.engine_volume.title')}
          elements={dropdownElements}
          onValueChange={onChangeVolume}
          selected={engineVolume}
        />
      </CardItem>
      <CardItem style={contentContainer}>
        <ClickableTextRow
          onPress={() =>
            Actions.InsuranceCitiesScreen({onSelectCity: onChangeCity})
          }
          label={t('insurance_screen.osago.car_city.title')}
          value={selectedCity ? selectedCity.title : null}
          placeholder={t('insurance_screen.osago.car_city.placeholder')}
        />
      </CardItem>
      <CardItem style={contentContainer}>
        <View style={priceWrapper}>{renderPrice()}</View>
      </CardItem>
      <CardItem
        style={{
          marginTop: 20,
          flex: 1,
        }}>
        <ButtonRoundet
          style={buttonStyle}
          textStyle={{color: '#1B1B1B'}}
          onPress={onOrder}>
          {t('insurance_screen.osago.get_proposal')}
        </ButtonRoundet>
      </CardItem>
      <CardItem style={buyOnlineContainer}>
        <View style={textContainer}>
          <View style={orStyle}>
            <Text style={textColor}>{t('insurance_screen.osago.or')}</Text>
          </View>
          <View style={textStyle}>
            <Text style={textColor}>{t('insurance_screen.osago.buy')}</Text>
            <Text style={textColor}>{t('insurance_screen.osago.insurance')}</Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
          }}>
          <ButtonRoundet
            style={buttonStyle}
            textStyle={{color: '#1B1B1B'}}
            onPress={Actions.WebInsurance}>
            {t('insurance_screen.osago.buy_online')}
          </ButtonRoundet>
        </View>
      </CardItem>
    </MainCard>
  );
};

export default Osago;
