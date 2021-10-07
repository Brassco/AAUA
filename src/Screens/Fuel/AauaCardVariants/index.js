import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modalbox';

import {useTranslation} from 'react-i18next';

import {
  MainCard,
  CardItem,
  Header,
  ModalCard,
  Spiner,
} from '@aaua/components/common';
import CardComponent from '@aaua/components/AAUA_card/CardComponent';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';
import {RATIO, WIDTH_RATIO} from '@aaua/styles/constants';
import {getMyCard, orderCard} from '@aaua/actions/AAUA_CardAction';

import styles from './styles';

const AddAauaCard = () => {
  const {
    AAUA_Card: {orderVirtualCardSuccess, myCards, loading},
    auth: {
      user: {token},
    },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const onAddCardPressed = () => {
    Actions.add_aaua_card();
  };

  const onOrderCard = () => {
    Actions.order_aaua_card();
  };

  useEffect(() => {
    if (orderVirtualCardSuccess) {
      showAlert();
    }
  }, []);

  const orderVirtualCard = () => {
    const orderData = {
      token: token,
      isvirtual: 1,
    };
    dispatch(orderCard(orderData));
  };

  const showAlert = () => {
    Alert.alert(
      'Ваша виртуальная карта создана',
      'Спасибо за заказ',
      [
        {
          text: 'Закрыть',
          onPress: () => {
            Actions.AAUA_main();
          },
        },
      ],
      {cancelable: false},
    );
  };

  // componentWillReceiveProps(nextProp) {
  //     if (nextProp.orderVirtualCardSuccess) {
  //         this.showAlert();
  //     }
  // }
  //   console.log(this.props);
  const {modal, modalTextContainer, modalText} = styles;

  return (
    <MainCard>
      <Header back goToMain={DEVICE_OS == iOS ? true : false}>
        {t('fuel_screen.aaua_card.header')}
      </Header>
      <CardItem
        style={{
          flex: 4,
          paddingTop: 21 * RATIO,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}>
        <CardComponent
          isDisabled={myCards != null && myCards.card != null}
          imageSrc={require('@aaua/images/icons/add_card.png')}
          onPress={onAddCardPressed}>
          {t('fuel_screen.aaua_card.add_card')}
        </CardComponent>
        <CardComponent
          isDisabled={myCards != null && myCards.card != null}
          imageSrc={require('@aaua/images/icons/order_card.png')}
          onPress={() => setIsOpen(true)}>
          {t('fuel_screen.aaua_card.add_virtual_card')}
        </CardComponent>
      </CardItem>
      <CardItem
        style={{
          flex: 5,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingHorizontal: 15,
        }}>
        <Text style={styles.textStyle}>
          {t('fuel_screen.aaua_card.description')}
        </Text>
        <Text style={styles.textStyle}>
          {t('fuel_screen.aaua_card.description_site')}{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://wog.ua/ua/registration/')}>
            {' '}
            https://wog.ua/ua/registration/
          </Text>{' '}
          {t('fuel_screen.aaua_card.description_phone')}
        </Text>
      </CardItem>
      <Modal
        style={modal}
        position={'bottom'}
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}>
        <ModalCard
          style={{
            flexDirection: 'column',
            height: 100,
          }}>
          <TouchableOpacity
            isDisabled={true}
            onPress={orderVirtualCard}
            style={modalTextContainer}>
            <Text style={modalText}>{t('fuel_screen.aaua_card.order_virtual_card')}</Text>
          </TouchableOpacity>
          {/*
                    <TouchableOpacity style={modalTextContainer}
                                      onPress={() => {
                                          Actions.order_aaua_card()
                                      }}
                    >
                        <Text style={modalText}>
                            Заказать карту
                        </Text>
                    </TouchableOpacity>
                    */}
        </ModalCard>
        <ModalCard
          style={{
            height: 50,
          }}>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={modalTextContainer}>
            <Text style={[modalText, {color: '#ffc200'}]}>{t('fuel_screen.aaua_card.close')}</Text>
          </TouchableOpacity>
        </ModalCard>
      </Modal>
    </MainCard>
  );
};

export default AddAauaCard;
