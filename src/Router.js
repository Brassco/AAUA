import React, {Component} from 'react';
import {Dimensions, ActivityIndicator, AsyncStorage} from 'react-native';
import {Router, Scene, Stack, Drawer, Tabs, Actions} from 'react-native-router-flux';

{/* AUTH */}
import LoginForm from './components/Auth/LoginForm';
import FirstStageComponent from './components/Auth/Register/FirstStageComponent';
import SecondStageComponent from './components/Auth/Register/SecondStageComponent';
import InviteFriendComponent from './components/Auth/InviteFriendComponent';
import ForgotPassComponent from './components/Auth/ForgotPassComponent';
import LicenceComponent from './components/Auth/Register/LicenceComponent';

import LeftBarComponent from './components/LeftBarComponent';
import MainComponent from './components/MainComponent';
import WalletComponent from './components/Wallet/';

import SubscriptionComponent from './components/Subscription/';

import CategoriesComponent from './components/Store/CategoriesComponent';
import DetailsComponent from './components/Store/DetailComponent';
import GoodsListComponent from './components/Store/GoodsListComponent';
import SpecialOfferComponent from './components/Store/SpecialOfferComponent';
import BasketListComponent from './components/Store/Basket/ListComponent';

import OnroadCategoriesComponent from './components/Onroad_support/CategoriesComponent';
import OnroadCategoriesDetailsComponent from './components/Onroad_support/CategoryDetailsComponent';
import OrderSupport from './components/Onroad_support/OrderSupport';

import DiscontCategoriesComponent from './components/Disconts/CategoriesScreen';
import DiscontListComponent from './components/Disconts/DiscontsListScreen';
import DiscontMapComponent from './components/Disconts/MapComponent';
import TabsComponent from './components/Disconts/TabsComponent';
import DiscontCardComponent from './components/Disconts/discontsCard/DiscontCardComponent';

import InsuranceComponent from './components/Insurance/CategoriesComponent';
import KaskoComponent from './components/Insurance/KaskoComponent';
import OsagoComponent from './components/Insurance/OsagoComponent';

import HistoryComponent from './components/History/ListComponent';
import AnQComponent from './components/Question_answear/ListComponent';
import FeedbackComponent from './components/Feedbacks/index';

import AAUAMainComponent from './components/AAUA_card/MainComponent';
import AAUAAddCardComponent from './components/AAUA_card/AddCardComponent';
import AAUAOrderCardComponent from './components/AAUA_card/OrderCardComponent';
import MyAAUACardsComponent from './components/AAUA_card/MyAAUACardsComponent';

import OrderingComponent from './components/Store/OrderingComponent';

import MessagesListComponent from './components/Messages/ListComponent';
import MessageComponent from './components/Messages/MessageComponent';

import SettingsComponent from './components/Settings';
import MenuIcon from './images/icons/bar.png';

import {connect} from 'react-redux';
import {getBrands, getCities, getNPCities, getNPsklads} from './Actions/CitiesBrands';

import FCM, { FCMEvent,
    NotificationType,
    WillPresentNotificationResult,
    RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';
import {CHECK_TOKEN_URL, SECRET_KEY} from './Actions/constants'
import axios from 'axios';
import md5 from 'js-md5';

/*Firebase Notificaion*/
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
        //this is a local notification
    }
    if(notif.opened_from_tray){
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
        if (notif._actionIdentifier === 'com.myapp.MyCategory.Confirm') {
            // handle notification action here
            // the text from user is in notif._userText if type of the action is NotificationActionType.TextInput
        }
        switch(notif._notificationType){
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
        }
    }
    FCM.on(FCMEvent.RefreshToken, (token) => {
        console.log('RefreshToken', token)
        // fcm token may not be available on first load, catch it here
    });
});

class RouterComponent extends Component {

    constructor() {
        super();
        this.state = {
            hasToken: false,
            isLoaded: false,
            hasCard: false
        };
    }

    componentWillMount() {
console.log('router component will mount')
        // AsyncStorage.clear();
        this.props.getBrands();
        this.props.getCities();
        this.props.getNPCities();
    }

    componentDidMount() {
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (err, stores) => {
        //         stores.map((result, i, store) => {
        //             // get at each store's key/value so you can work with it
        //             let key = store[i][0];
        //             let value = store[i][1];
        //             console.log(key)
        //         });
        //     });
        // });

        /*Check if User logged in*/
        AsyncStorage.getItem('user')
            .then((obj) => {
console.log(obj);
                const user = JSON.parse(obj);
                if (user !== null) {

                    const obj = {
                        "token": user.token,
                        "phone" : user.profile.phone,
                    }

                    const data = JSON.stringify(obj);
                    const signature = md5(SECRET_KEY + data)
                    axios.post(CHECK_TOKEN_URL, data, {
                            headers: {
                                'Signature' : signature,
                                'Content-Type': 'application/json',
                            }
                        }
                    )
                        .then( res => {
                        console.log(res);
                            if (res.data.error == 0) {
                                if (res.data.data == 1) {
                                    this.setState({
                                        hasToken: user.token !== null,
                                        hasCard: user.card !== null,
                                        isLoaded: true
                                    })
                                } else {
                                    AsyncStorage.removeItem('user');
                                }
                            } else {
                                this.setState({
                                    hasToken: false,
                                    hasCard: false,
                                    isLoaded: true
                                })
                            }
                        })
                } else {
console.log('user = null')
                    this.setState({
                        hasToken: false,
                        hasCard: false,
                        isLoaded: true
                    })
                }
            })
            .catch( error =>
                console.log('Error: ' + error.message)
            )

        /*Firebase*/
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
        });

        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
            console.log(notif)
        });
    }

    componentWillUnmount() {
console.log('router will unmount');
        // stop listening for events
        // this.notificationListener.remove();
    }

    render() {
        console.log(this.state);
        const {width} = Dimensions.get('window');
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <Router
                    /*backAndroidHandler={
                        () => {
                            console.log(Actions.currentScene);
                            console.log(Actions);
                            // const authRouts = ['login', 'forgot']
                            // if (Actions.currentScene == '_mainScreen') {
                            //     Actions.reset('drawer')
                            //     return true;
                            // }
                            // if (! authRouts.includes(Actions.currentScene)) {
                            //     Actions.reset('drawer')
                            //     return true;
                            // }
                        }
                    }*/
                >
                    <Stack
                        hideNavBar
                        key="root"
                        titleStyle={{alignSelf: 'center'}}
                    >

                        <Stack
                            initial={!this.state.hasToken}
                            key="auth"
                            hideNavBar
                        >
                            <Scene title="login" key="login" component={LoginForm}/>
                            <Stack
                                hideNavBar
                                key="register"
                            >
                                <Scene
                                    hideNavBar
                                    title="Персональные данные"
                                    key="firstStage"
                                    component={FirstStageComponent}/>
                                <Scene
                                    initial
                                    hideNavBar
                                    title="Персональные данные"
                                    key="secondStage"
                                    component={SecondStageComponent}/>
                                <Scene hideNavBar key="licence" component={LicenceComponent}/>
                            </Stack>
                            <Scene title="Пригласи друга" key="invite" component={InviteFriendComponent}/>
                            <Scene title="Востановление пароля" key="forgot" component={ForgotPassComponent}/>
                        </Stack>

                        <Drawer
                            drawerBackgroundColor={'transparent'}
                            initial={this.state.hasToken}
                            hideNavBar
                            key="drawer"
                            contentComponent={LeftBarComponent}
                            drawerImage={MenuIcon}
                            drawerWidth={width}
                            tapToClose={true}
                            openDrawerOffset={0.2}
                            panCloseMask={0.2}
                            negotiatePan={true}
                        >
                            {/*
                             Wrapper Scene needed to fix a bug where the tabs would
                             reload as a modal ontop of itself
                             */}
                            <Scene hideNavBar key="mainScreen" component={MainComponent} title="main_screen"/>
                            <Scene hideNavBar key="wallet" component={WalletComponent} title="Кошелек"/>
                            <Stack>
                                <Scene hideNavBar key="subscription" component={SubscriptionComponent}
                                       title="Годовая подписка"/>
                            </Stack>
                            <Stack hideNavBar key="store">
                                <Scene hideNavBar key="categories" component={CategoriesComponent} title="Store"/>
                                <Scene key="detail" component={DetailsComponent} title="Details"/>
                                <Scene key="goods" component={GoodsListComponent} title="Goods"/>
                                <Scene hideNavBar key="specialOffer" component={SpecialOfferComponent}/>
                                <Scene hideNavBar key="basketList" component={BasketListComponent}/>
                                <Scene hideNavBar key="basketOrdering" component={OrderingComponent} title="Goods"/>
                            </Stack>
                            <Stack hideNavBar key="AAUA_card">
                                <Scene
                                    // initial={!this.state.hasCard}
                                    hideNavBar
                                    key="AAUA_main"
                                    component={AAUAMainComponent} title="Карта AAUA"/>
                                <Scene hideNavBar key="add_aaua_card" component={AAUAAddCardComponent}
                                       title="Заказать карту"/>
                                <Scene
                                    // initial={this.state.hasCard}
                                    hideNavBar
                                    key="my_aaua_cards"
                                    component={MyAAUACardsComponent}
                                    title="Карта AAUA"/>
                                <Scene hideNavBar key="order_aaua_card" component={AAUAOrderCardComponent}
                                       title="Добавить карту"/>

                            </Stack>
                            <Stack hideNavBar key="onroadSupport">
                                <Scene hideNavBar key="onroadCategories" component={OnroadCategoriesComponent}
                                       title="On road"/>
                                <Scene hideNavBar key="onroadDetails" component={OnroadCategoriesDetailsComponent}
                                       title="On road"/>
                                <Scene hideNavBar key="orderOnRoadSupport" component={OrderSupport}/>
                            </Stack>
                            <Stack key="discounts">
                                <Stack key="discontCards">
                                    <Scene initial hideNavBar key="tabs" component={TabsComponent}/>
                                    <Scene hideNavBar key="discontCard" component={DiscontCardComponent}/>
                                    <Scene hideNavBar key="discontsMap" component={DiscontMapComponent}/>
                                </Stack>
                            </Stack>
                            <Stack hideNavBar key="insurance">
                                <Scene hideNavBar key="insuranceCategories" component={InsuranceComponent}/>
                                <Scene hideNavBar key="kaskoComponent" component={KaskoComponent}/>
                                <Scene hideNavBar key="osagoComponent" component={OsagoComponent}/>
                            </Stack>
                            <Stack>
                                <Scene hideNavBar key="history" component={HistoryComponent}/>
                                <Scene hideNavBar key="ordering" component={OrderingComponent}/>
                            </Stack>
                            <Scene hideNavBar key="AnQ" component={AnQComponent}/>
                            <Scene hideNavBar key="feedback" component={FeedbackComponent}/>
                            <Scene hideNavBar key="settings" component={SettingsComponent}/>
                            <Stack hideNavBar key="messages">
                                <Scene hideNavBar key="messagesList" component={MessagesListComponent}/>
                                <Scene hideNavBar key="message" component={MessageComponent}/>
                            </Stack>
                        </Drawer>
                    </Stack>
                </Router>
            )
        }
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps,{getCities, getBrands, getNPCities, getNPsklads})(RouterComponent);
