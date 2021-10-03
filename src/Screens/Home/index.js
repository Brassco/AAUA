import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import {connect, useSelector, useDispatch} from 'react-redux';

import {BottomMenuItem} from '@aaua/components/common/BottomMenuItem';
import {getSliderImages, getBonusesWog} from '@aaua/actions/CitiesBrands';
import {countMessages} from '@aaua/actions/MessagesActions';

import {
  MainCard,
  CardItem,
  BottomMenu,
  Header,
  BottomMenuMessages,
} from '@aaua/components/common';

const HomeScreen = props => {
  const {auth, citiesBrands, messages} = useSelector(state => state);
  const user = auth.user;
  const bonus = auth.user ? citiesBrands.bonuses : 0;
  const bonus_wog = auth.user ? citiesBrands.bonuses_wog : 0;
  const images = citiesBrands.sliderImages;
  const messagesCounter = messages.messagesCounter;

  const dispatch = useDispatch();
  //   componentDidMount() {
  //     console.log(' MainComponent componentDidMount', this.props);
  //     if (this.props.user) {
  //       console.log('MainComponent componentWillReceiveProps', this.props);
  //       let {token} = this.props.user;
  //       this.props.getSliderImages(token);
  //       this.props.countMessages(token);
  //       this.props.getBonusesWog(token);
  //     }
  //   }

  //   shouldComponentUpdate(nextProps) {
  //     console.log('MainComponent shouldComponentUpdate', nextProps, this.props);
  //     return true;
  //   }

  //   componentWillReceiveProps() {
  //   if (this.props.user && this.props.images.length < 1) {
  //     console.log('MainComponent componentWillReceiveProps', this.props);
  //     let {token} = this.props.user;
  //     this.props.getSliderImages(token);
  //     this.props.countMessages(token);
  //     this.props.getBonusesWog(token);
  //   }
  //   }

  //   const images = [];
  // props.images.map(image => {
  //   images.push(image.url);
  // });

  useEffect(() => {
    if (user && images.length < 1) {
      console.log('=== MainComponent useEffect', user, images);
      let {token} = user;
      dispatch(getSliderImages(token));
      dispatch(countMessages(token));
      dispatch(getBonusesWog(token));
    }
  }, [user, images]);

  console.log('render MainComponent', images);
  return (
    <MainCard>
      <Header burger>{'AAUA'}</Header>
      <CardItem
        style={{
          flex: 8,
        }}>
        <ImageSlider
          onPress={image => {
            console.log('ON PRESS IMAGE', image);
            Actions.imageContent({
              images: props.images,
              index: image.index,
            });
            // this.props.images.map( imgObj => {
            //     if (imgObj.url == image.image && imgObj.is_content) {
            //         Actions.imageContent({images: imgObj});
            //         console.log(imgObj);
            //     }
            // })
          }}
          images={images}
          autoPlayWithInterval={4000}
        />
      </CardItem>
      <CardItem>
        <BottomMenu>
          <BottomMenuItem
            style={{
              justifyContent: 'center',
              // backgroundColor: '#289',
            }}
            counter={props.bonus_wog}
            imageSrc={require('@aaua/images/icons/wog.png')}>
            Бонусы WOG
          </BottomMenuItem>
          <BottomMenuItem
            style={{
              justifyContent: 'center',
              // backgroundColor: '#289',
            }}
            counter={props.bonus}
            imageSrc={require('@aaua/images/icons/aaua.png')}>
            Бонусы AAUA
          </BottomMenuItem>
          <BottomMenuMessages
            counter={props.messagesCounter}
            onPress={Actions.messages}
            imageSrc={require('@aaua/images/icons/mail.png')}>
            Уведомления
          </BottomMenuMessages>
        </BottomMenu>
      </CardItem>
    </MainCard>
  );
};
// const mapStateToProps = ({auth, citiesBrands, messages}) => {
//   return {
//     // token: auth.user.token,
//     user: auth.user,
//     bonus: auth.user ? citiesBrands.bonuses : 0,
//     bonus_wog: auth.user ? citiesBrands.bonuses_wog : 0,
//     images: citiesBrands.sliderImages,
//     messagesCounter: messages.messagesCounter,
//   };
// };

// export default connect(mapStateToProps, {
//   getSliderImages,
//   getBonusesWog,
//   countMessages,
// })(MainComponent);

export default HomeScreen;
