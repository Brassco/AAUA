import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import I18n from '@aaua/i18n';

import {changeCardNumber, addCard} from '@aaua/actions/AAUA_CardAction';
import {
  MainCard,
  CardItem,
  ButtonRoundet,
  Header,
  CreditCardInput,
} from '@aaua/components/common';
import {showAlert} from '@aaua/Modals';

const AddCard = () => {

  const {
    AAUA_Card,
    auth: {
      user: {token},
    },
  } = useSelector( state => state);

  const [cardNumber, setCardNumber] = useState('');

  const onCodeChange = text => {
    setCardNumber(text);
  };

  const onPress = () => {
    const validNumber = cardNumber.replace(/\-/g, '');
    const card = {
      token: token,
      number: validNumber,
    };
    addCard(card);
  };

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.addCardError != null) {
  //         showAlert(
  //             'Ошибка',
  //             nextProps.addCardError,
  //             'Закрыть',
  //         )
  //     }
  // }

  return (
    <MainCard>
      <Header back>{I18n.t('fuel_screen.add_card.header')}</Header>
      <CardItem
        style={{
          flex: 0,
          height: 230,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <CreditCardInput
          label={I18n.t('fuel_screen.add_card.card_number')}
          value={cardNumber}
          onChangeText={onCodeChange}
          placeholder={'XXXX XXXX XXXX XXX'}
        />
      </CardItem>
      <CardItem
        style={{
          marginTop: 57,
        }}>
        <ButtonRoundet
          style={{
            marginRight: 45,
            marginLeft: 45,
            height: 45,
          }}
          onPress={onPress}>
          {I18n.t('fuel_screen.add_card.add_card')}
        </ButtonRoundet>
      </CardItem>
    </MainCard>
  );
};

// const mapStateToProps = ({AAUA_Card, auth}) => {
//   return {
//     token: auth.user.token,
//     card_number: AAUA_Card.card_number,
//     addCardError: AAUA_Card.addCardError,
//   };
// };

// export default connect(mapStateToProps, {changeCardNumber, addCard})(
//   AddCardComponent,
// );

export default AddCard;
