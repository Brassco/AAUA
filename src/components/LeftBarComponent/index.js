import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {
  LeftBarMenuItem,
  RightBarMenuItem,
  ButtonRoundet,
} from '@aaua/components/common';
import {RATIO} from '@aaua/styles/constants';

import {logOut} from '@aaua/actions/AuthAction';
import {getData} from '@aaua/actions/SubscriptionAction';

// let images = {
import wallet from '@aaua/images/icons/wallet.png';
import subscriptionIcon from '@aaua/images/icons/subscription.png';
import store from '@aaua/images/icons/store.png';
import fuel from '@aaua/images/icons/fuel2.png';
import onroad from '@aaua/images/icons/onroad.png';
import discounts from '@aaua/images/icons/discounts.png';
import insurance from '@aaua/images/icons/insurance.png';
import history from '@aaua/images/icons/history.png';
import AnQ from '@aaua/images/icons/AnQ.png';
import feedback from '@aaua/images/icons/feedback.png';
// }

import styles from './styles';

const LeftBarComponent = props => {
  const {t} = useTranslation();

  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [isActiveStatus, setIsActiveStatus] = useState(false);

  const {auth, subscription} = useSelector(state => state);

  const menuItems = [
    {
      id: 1,
      title: t('leftBarMenu.valet'),
      img: wallet,
      onPress: Actions.wallet,
    },
    {
      id: 2,
      title: t('leftBarMenu.subscription'),
      img: subscriptionIcon,
      onPress: Actions.subscriptionStack,
    },
    {
      id: 3,
      title: t('leftBarMenu.store'),
      img: store,
      onPress: Actions.categories,
    },
    {
      id: 4,
      title: t('leftBarMenu.fuel'),
      img: fuel,
      onPress: Actions.AAUA_card,
    },
    {
      id: 5,
      title: t('leftBarMenu.on_road_support'),
      img: onroad,
      onPress: Actions.onroadSupport,
    },
    {
      id: 6,
      title: t('leftBarMenu.discounts'),
      img: discounts,
      onPress: Actions.discontCards,
    },
    {
      id: 7,
      title: t('leftBarMenu.insurance'),
      img: insurance,
      onPress: Actions.insurance,
    },
    {
      id: 8,
      title: t('leftBarMenu.history'),
      img: history,
      onPress: Actions.historyStack,
    },
    {id: 9, title: t('leftBarMenu.questions'), img: AnQ, onPress: Actions.AnQ},
    {
      id: 10,
      title: t('leftBarMenu.feedback'),
      img: feedback,
      onPress: Actions.feedback,
    },
  ];

  useEffect(() => {
    console.log(
      '--- left bar useeffect =',
      subscription,
      subscription.bought_at,
    );
    if (auth.user) {
      const {name, surname} = auth.user.profile;
      const userName = name;
      const userSurName = surname ? surname : '';
      const token = auth.user.token;
      setUserName(userName);
      setUserSurName(userSurName);
    }
    if (subscription) {
      const status = subscription.bought_at == null ? false : true;
      const bought_at = subscription.bought_at;
      setIsActiveStatus(status);
    }
  }, [auth.user, subscription]);

  const onExit = () => {
    // Actions.reset('auth');
    Alert.alert('Подтверждение', 'Вы точно хотите выйти?', [
      // {text: 'Да', onPress: () => {
      //     console.log(this.props);
      //     this.props.logOut(this.props.token);
      // }},
      {text: 'Да', onPress: goToAuth},
      {
        text: 'Закрыть',
        onPress: () => {
          console.log('close alert');
        },
      },
    ]);
  };

  const goToAuth = () => {
    Actions.reset('auth');
    // logOut(token);
  };

  //   componentWillReceiveProps(nextProps) {
  //     console.log('componentWillReceiveProps0', nextProps.token);
  //     if (nextProps.token != this.props.token && !this.props.bought_at) {
  //       this.props.getData(nextProps.token);
  //     }
  //   }

  const renderStatus = () => {
    if (isActiveStatus) {
      return (
        <ButtonRoundet
          style={{
            backgroundColor: '#61a83a',
            borderColor: '#61a83a',
          }}
          textStyle={{
            fontSize: 11,
            color: '#ffffff',
            fontFamily: 'Roboto-Regular',
          }}>
          Активен
        </ButtonRoundet>
      );
    }
  };

  const {
    container,
    leftContainer,
    linksContainer,
    rightContainer,
    imageContainer,
    titleText,
  } = styles;

  return (
    <ImageBackground
      source={require('@aaua/images/transparent.png')}
      style={container}>
      <View style={leftContainer}>
        <View style={imageContainer}>
          <Image
            style={{
              width: 119,
              height: 119,
            }}
            source={require('@aaua/images/logo.png')}
          />
          <Text style={titleText}>
            {userName} {userSurName}
          </Text>
          <View
            style={{
              width: 66,
              height: 20,
            }}>
            {renderStatus()}
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={linksContainer}
          // data={menuItems}
          // renderItem={({item}) => {
          //   return (
          //     <LeftBarMenuItem
          //       title={item.title}
          //       image={item.img}
          //       onPress={item.onPress}
          //     />
          //   );
          // }}
          // keyExtractor={item => item.id}
        >
          {menuItems.map(item => {
            return (
              <LeftBarMenuItem
                title={item.title}
                image={item.img}
                onPress={item.onPress}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={rightContainer}>
        <TouchableOpacity onPress={Actions.drawerClose}>
          <RightBarMenuItem
            style={{marginTop: 25}}
            image={require('@aaua/images/icons/close.png')}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={Actions.settings}>
            <RightBarMenuItem
              style={{marginBottom: 26}}
              imageStyle={{
                width: 29,
                height: 29,
              }}
              image={require('@aaua/images/icons/option.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onExit.bind(this)}>
            <RightBarMenuItem
              imageStyle={{
                width: 21,
                height: 21,
              }}
              style={{marginBottom: 21}}
              image={require('@aaua/images/icons/exit.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
// const mapStateToProps = ({auth, subscription}) => {
//   console.log(subscription);
//   var userName = '';
//   var userSurName = '';
//   var status = false;
//   var token = null;
//   var bought_at = false;
//   if (auth.user) {
//     userName = auth.user.profile.name;
//     userSurName = auth.user.profile.surname ? auth.user.profile.surname : '';
//     status = subscription.bought_at == null ? false : true;
//     bought_at = subscription.bought_at;
//     token = auth.user.token;
//   }
//   return {
//     userName: userName + userSurName,
//     isActiveStatus: status,
//     token: token,
//     bought_at: bought_at,
//   };
// };

// export default connect(mapStateToProps, {logOut, getData})(LeftBarComponent);
export default LeftBarComponent;
