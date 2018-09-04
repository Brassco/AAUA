import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    AsyncStorage,
    Platform,
    BackHandler,
    TouchableOpacity,
} from "react-native";
import {
    MainCard,
    CardItem,
    BottomMenu,
    Header,
    BottomMenuMessages
} from './common';
import ImageSlider from 'react-native-image-slider';
import {BottomMenuItem} from "./common/BottomMenuItem";
import {Actions} from 'react-native-router-flux';
import {getSliderImages, getBonusesWog} from '../Actions/CitiesBrands';
import {countMessages} from '../Actions/MessagesActions';

import {connect} from 'react-redux';

class MainComponent extends Component {

    componentDidMount() {
        console.log('componentDidMount', this.props);
    }

    shouldComponentUpdate(nextProps) {
        console.log('shouldComponentUpdate', nextProps, this.props);
        return true;
    }

    componentWillReceiveProps() {
        if (this.props.user && this.props.images.length < 1) {
            console.log('componentWillReceiveProps', this.props);
            let {token} = this.props.user;
            this.props.getSliderImages(token)
            this.props.countMessages(token)
            this.props.getBonusesWog(token)
        }
    }

    render() {
console.log('render Main Component');
        const images = [];
        this.props.images.map( image => {
            images.push(image.url)
        })
        return (
            <MainCard>
                <Header burger >
                    {"AAUA"}
                </Header>
                <CardItem style={{
                    flex:8,
                }}>
                    <ImageSlider
                        onPress={(image) =>{
                            Actions.imageContent({images: this.props.images, index: image.index});
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
                            counter={this.props.bonus_wog}
                            imageSrc={require('../images/icons/wog.png')}
                        >
                            Бонусы WOG
                        </BottomMenuItem>
                        <BottomMenuItem
                            style={{
                                justifyContent: 'center',
                                // backgroundColor: '#289',
                            }}
                            counter={this.props.bonus}
                            imageSrc={require('../images/icons/aaua.png')}
                        >
                            Бонусы AAUA
                        </BottomMenuItem>
                        <BottomMenuMessages
                            counter={this.props.messagesCounter}
                            onPress={Actions.messages}
                            imageSrc={require('../images/icons/mail.png')}
                        >
                            Уведомления
                        </BottomMenuMessages>
                    </BottomMenu>
                </CardItem>

            </MainCard>
        )
    }
}

const mapStateToProps = ({auth, citiesBrands, messages}) => {
    console.log(auth);
    return {
        // token: auth.user.token,
        user: auth.user,
        bonus: auth.user ? auth.user.bonus : 0,
        bonus_wog: auth.user ? citiesBrands.bonuses_wog : 0,
        images: citiesBrands.sliderImages,
        messagesCounter: messages.messagesCounter
    }
}

export default connect(mapStateToProps, { getSliderImages, getBonusesWog,
    countMessages})(MainComponent);