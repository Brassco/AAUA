import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
    MainCard,
    CardItem,
    CardComponent,
    ButtonRoundet,
    LabelOnInput,
    ModalCard,
    Spiner,
    Header
} from '../common';
import {Actions} from 'react-native-router-flux';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import {RATIO} from '../../styles/constants';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';
import {getHistory, getOrderDetails, repeatOrder} from '../../Actions/StoreAction';
import {connect} from 'react-redux';

class ListComponent extends Component {


    componentWillMount() {
        let {user, getHistory} = this.props;
        getHistory(user);
    }

    openDetails(orderId) {
        console.log(this.props, orderId);
        let {user, getOrderDetails} = this.props;
        getOrderDetails(user, orderId);
        Actions.basketList();
    }

    addToBasket(productId) {
        let {user, repeatOrder} = this.props;
        console.log('repeat order', productId, user);
        repeatOrder(user.token, user.profile.phone, productId);
        // Actions.repeatOrder(productId)
    }

    renderItem() {
        const {imageStyle, imageContainer, textContainer,componentStyle} = styles;
        let {orders} = this.props;
console.log(orders);
        if (orders.length) {
            return orders.map( order => {

                if (order.status == "completed" || order.status == "processing") {
                    let product = order.products[0];
                    let date = order.date.date.split(' ');
                    console.log(product)
                    return (
                        <CardComponent
                            key={order.ID}
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={{uri: product.details.photo}}
                                />
                            </View>
                            <View style={textContainer}>
                                <TextComponent
                                    date={date[0]}
                                    title={product.name}
                                    isPresent
                                />
                                <ButtonComponent
                                    onPress={this.addToBasket.bind(this, product.id)}
                                    price={
                                        product.details.price || 0
                                    }
                                    bonuses={
                                        product.details.bonus_price || 0
                                    }
                                />
                            </View>
                        </CardComponent>
                    )
                }
            })
        }
    }

    renderList() {
        return (
            <ScrollView style={{
                paddingLeft: 13,
                paddingRight: 14,
                marginTop: 21
            }}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
            >
                {
                    this.renderItem()
                }
            </ScrollView>
        )
    }

    renderContent(){
        let {loading} = this.props;
        if (loading ) {
            return <Spiner size="large"/>
        } else {
            return this.renderList()
        }
    }

    render() {
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ИСТОРИЯ ЗАКАЗОВ"}
                </Header>
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const styles = {
    componentStyle: {
        // backgroundColor: '#9f9f96',
        height: 115,
        minHeight: 115,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 11
    },
    imageContainer: {
        flex:2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft:12,
        paddingTop:15
    },
    iconImageStyle: {
        width: 40,
        height: 40
    },
    imageStyle: {
        width: 60,
        height: 60
    },
    textContainer: {
        flex: 8,
        paddingTop: 6 * RATIO,
        paddingLeft: 22,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        color:'#1d1d1d',
        fontSize: 15,
        fontWeight: '500'
    },
    buttonContainer: {
        flex: 3,
        margin:2,
        backgroundColor:'#982',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}

const mapStateToProps = ({auth, store, basket, history}) => {
    return {
        loading: history.loading,
        user: auth.user,
        basket: basket.basket,
        orders: history.orders
    }
}

export default connect(mapStateToProps, {getHistory, getOrderDetails, repeatOrder})(ListComponent);