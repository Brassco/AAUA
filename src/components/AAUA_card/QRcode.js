import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import QRcode from 'react-native-qrcode-svg';
// import DeviceBrightness from "react-native-device-brightness";

import I18n from '@aaua/i18n';


import {MainCard, CardItem, ButtonRoundet} from '@aaua/components/common';
import {WIDTH, RATIO, WIDTH_RATIO} from '@aaua/styles/constants';
import {SECRET_KEY, ACTIVATION_URL} from '@aaua/actions/constants';

const QRcodeComponent = () => {
  const {
    AAUA_Card: {myCards: card, QrError},

    auth: {
      user: {token},
    },
  } = useSelector(state => state);

  const [sendRequest, setSendRequest] = useState(false);
  const [luminous, setLuminous] = useState(0.5);
  // state = {
  //   luminous: 0.5,
  //   sendRequest: false,
  // };

  // componentDidMount() {
  //   // DeviceBrightness.setBrightnessLevel(0.8);
  // }

  // componentWillUnmount() {
  //   // DeviceBrightness.setBrightnessLevel(this.state.luminous);
  // }

  const openUrl = url => {
    // let url = 'https://wog.ua/ua/registration/';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:0800300525';
    } else {
      phoneNumber = 'telprompt:0800300525';
    }

    openUrl(phoneNumber);
  };

  const activationRequest = () => {
    const data = {
      token: token,
    };
    // const signature = md5(SECRET_KEY + data);
    axios
      .post(ACTIVATION_URL, data)
      .then(response => {
        Alert.alert('', I18n.t('fuel_screen.qr_code.modal.requested'));
        setSendRequest(true);
      });
  };

  const renderQr = () => {
    console.log('RENDER QR WIDTH', WIDTH);
    const {container, text} = styles;
    // const {card, error} = this.props;
    const qrWidth = WIDTH < 350 ? WIDTH - 20 : 500;
    return (
      <MainCard
        style={[
          container,
          {
            paddingLeft: 10,
            paddingRight: 10,
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            top: 70,
            left: 30,
            backgroundColor: '#FFF',
            height: 30,
            zIndex: 1000,
          }}>
          <TouchableOpacity onPress={Actions.select_azs}>
            <Text
              style={{
                fontSize: 30,
                color: '#1b1b1b',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'orange',
          }}>
          <View
            style={{
              borderColor: '#ffc200',
              borderWidth: 5,
            }}>
            <QRcode
              value={card.qr.QRCode}
              size={WIDTH * 0.6}
              color="#000"
              backgroundColor="white"
            />
          </View>
        </View>
      </MainCard>
    );
  };

  const renderError = () => {
    const {container, text} = styles;
    // const {card, QrError} = this.props;
    // const {sendRequest} = this.state;

    let errorMessage = I18n.t('fuel_screen.qr_code.errors.wrong_token');
    if (QrError == 2) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.wrong_code');
    } else if (QrError == 3) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.unknown_card');
    } else if (QrError == 12) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.wrong_phone');
    } else if (QrError == 59) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.card_is_blocked');
    }
    return (
      <MainCard style={container}>
        <CardItem
          style={{
            backgroundColor: '#FFF',
            height: 50,
            padding: 20,
          }}>
          <TouchableOpacity onPress={Actions.select_azs}>
            <Text
              style={{
                fontSize: 30,
                color: '#1b1b1b',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </CardItem>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CardItem
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0,
              paddingBottom: 50,
            }}>
            <Text
              style={[
                text,
                {
                  fontSize: 20,
                  color: '#db1924',
                  marginHorizontal: 15,
                },
              ]}>
              {errorMessage}
            </Text>
            <Text style={[text, {marginTop: 15, marginHorizontal: 15}]}>
              {I18n.t('fuel_screen.qr_code.message')}
            </Text>
          </CardItem>
          <CardItem
            style={{
              backgroundColor: '#fff',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0,
              height: 22,
            }}>
            <Text style={[text, {fontSize: 22}]}>{card.card}</Text>
          </CardItem>
          <View
            style={{
              paddingTop: 30,
              // backgroundColor: '#158',
              width: WIDTH * 0.8,
            }}>
            <Text
              style={[
                text,
                {
                  fontSize: 16,
                },
              ]}>
                {I18n.t('fuel_screen.qr_code.this_is_your_card_text')}
                {' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => openUrl('https://wog.ua/ua/registration/')}>
                https://wog.ua/ua/registration/{' '}
              </Text>
              {I18n.t('fuel_screen.qr_code.or_call')}{' '}
              <Text style={{color: 'blue'}} onPress={dialCall}>
                0800 300 525
              </Text>
            </Text>

            <View style={styles.buttonContainer}>
              {sendRequest === false ? (
                <ButtonRoundet
                  style={styles.buttonStyle}
                  textStyle={{color: '#fff'}}
                  onPress={activationRequest}>
                    {I18n.t('fuel_screen.qr_code.activation_request')}
                </ButtonRoundet>
              ) : (
                <Text style={styles.text}>{I18n.t('fuel_screen.qr_code.activation_requested')}</Text>
              )}
            </View>
          </View>
        </View>
      </MainCard>
    );
  };

  return card.qr == null || QrError !== null
    ? renderError()
    : renderQr();
};

// const mapStateToProps = ({AAUA_Card, auth}) => {
//   return {
//     card: AAUA_Card.myCards,
//     QrError: AAUA_Card.QrError,
//     token: auth.user.token,
//   };
// };

// export default connect(mapStateToProps)(QRcodeComponent);

const styles = {
  container: {
    backgroundColor: '#FFF',
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    // backgroundColor: '#294',
    color: '#1b1b1b',
    fontSize: 18,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    height: 53,
    paddingTop: 7,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  buttonStyle: {
    marginRight: 45 * WIDTH_RATIO,
    marginLeft: 45 * WIDTH_RATIO,
    height: 43,
    backgroundColor: '#423486',
    borderColor: '#423486',
  },
};


export default QRcodeComponent;