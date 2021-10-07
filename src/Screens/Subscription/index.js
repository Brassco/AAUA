import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {useTranslation} from 'react-i18next';

import {getData, buySubscription} from '@aaua/actions/SubscriptionAction';
import {showAlert} from '@aaua/components/Modals';
import DetailsItem from './DetailsItem';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';
import ModalAddAutoNumber from '@aaua/components/Modals/AddAutoNumber';
import {
  MainCard,
  CardItem,
  ButtonRoundet,
  Header,
  Spiner,
} from '@aaua/components/common';
import {RATIO, WIDTH_RATIO} from '@aaua/styles/constants';

import styles from './styles';

const {width} = Dimensions.get('window');
const bannerWidth = width * 0.98;
const bannerHeight = width * 0.61;
const imgBanner = require('@aaua/images/subscription_banner.png');

const Subscription = () => {

  const {t} = useTranslation();

  const {
    subscription: {price_month, price, bought_at, loading},
    auth: {
      user: {token},
    },
    citiesBrands: {sliderImages: images},
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const [showModalNumber, setShowModalNumber] = useState(false);
  const [type, setType] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getData(token));
    }
  }, [token]);

  const onShowModalNumber = type => {
    if (bought_at != null) {
      showAlert('Ошибка', 'У Вас уже есть активная подписка', 'Закрыть');
    } else {
      setShowModalNumber(true);
      setType(type);
    }
  };

  const addToBalance = (number, type) => {
    if (number.length > 0) {
      dispatch(buySubscription(token, type, number));
    }
    setShowModalNumber(false);
  };

  const renderPrice = () => {
    const {amountContainer, amountStyle} = styles;
    if (loading == false) {
      return (
        <View style={amountContainer}>
          <Text style={amountStyle}>{price} грн/год</Text>
        </View>
      );
    }
    return (
      <View style={amountContainer}>
        <Spiner />
      </View>
    );
  };

  const renderMonthPrice = () => {
    const {amountContainer, amountStyle} = styles;
    if (loading == false) {
      return (
        <View style={amountContainer}>
          <Text style={amountStyle}>{price_month} грн/месяц</Text>
        </View>
      );
    }
    return (
      <View style={amountContainer}>
        <Spiner />
      </View>
    );
  };

  const {textStyle, imageContainer, checkboxesContainer} = styles;

  return (
    <MainCard>
      <ModalAddAutoNumber
        show={showModalNumber}
        callback={addToBalance}
        type={type}
      />
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
      {t('subscription_screen.screen_header')}
      </Header>
      <ScrollView>
        <CardItem style={imageContainer}>
          <Image
            resizeMode={'contain'}
            style={{
              width: bannerWidth,
              height: bannerHeight,
              resizeMode: 'contain',
            }}
            source={imgBanner}
          />
        </CardItem>
        <CardItem
          style={{
            flex: 0,
            height: 83 * RATIO,
            // backgroundColor: '#9f9f96',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 10,
          }}>
          {renderPrice()}
        </CardItem>
        <CardItem
          style={{
            flex: 0,
            height: 66 * RATIO,
          }}>
          <ButtonRoundet
            style={{
              marginRight: 45,
              marginLeft: 45,
              height: 45,
            }}
            onPress={() => onShowModalNumber(false)}>
            {t('buttons.buy')}
          </ButtonRoundet>
        </CardItem>
        <CardItem
          style={{
            flex: 0,
            height: 83 * RATIO,
            // backgroundColor: '#9f9f96',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 10,
          }}>
          {renderMonthPrice()}
        </CardItem>
        <CardItem
          style={{
            flex: 0,
            height: 66 * RATIO,
          }}>
          <ButtonRoundet
            style={{
              marginRight: 45,
              marginLeft: 45,
              height: 45,
            }}
            onPress={() => onShowModalNumber(true)}>
            {t('buttons.buy')}
          </ButtonRoundet>
        </CardItem>
        <CardItem style={checkboxesContainer}>
          <Text style={textStyle}>{t('subscription_screen.description_header')}</Text>
          <DetailsItem>
          {t('subscription_screen.description_tech_asist')}
          </DetailsItem>
          <DetailsItem>
          {t('subscription_screen.description_legal_asist')}
          </DetailsItem>
          <DetailsItem>
          {t('subscription_screen.description_insurance_asist')}
          </DetailsItem>
          <DetailsItem>{t('subscription_screen.description_bonus_system')}</DetailsItem>
          <DetailsItem>{t('subscription_screen.description_services')}</DetailsItem>
          {/*
                    <DetailsItem >
                        Первичные консультации в случае ДТП.
                    </DetailsItem>
                    <DetailsItem >
                        Доступ к базе образцов документов.
                    </DetailsItem>
                    <DetailsItem >
                        Консультации по вопросам выплат и взаимодействия со страховыми компаниями.
                    </DetailsItem>
                    <DetailsItem >
                        Консьерж-сервис 24/7
                    </DetailsItem>
                    */}
        </CardItem>
        <CardItem>
          <TouchableOpacity
            onPress={() => {
              Actions.SubscriptionDetailsComponent();
            }}
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#423486',
                fontSize: 15,
                fontWeight: '600',
              }}>
              {t('subscription_screen.description_details')}
            </Text>
          </TouchableOpacity>
        </CardItem>
        <CardItem>
          <TouchableOpacity
            onPress={Actions.PDFScreen}
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#423486',
                fontSize: 15,
              }}>
              {t('subscription_screen.description_contract')}
            </Text>
          </TouchableOpacity>
        </CardItem>
      </ScrollView>
    </MainCard>
  );
};


export default Subscription;
