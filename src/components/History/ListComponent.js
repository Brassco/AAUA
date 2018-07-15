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
import {getHistory, getOrderDetails} from '../../Actions/StoreAction';
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

    renderItem() {
        const {imageStyle, imageContainer, textContainer,componentStyle} = styles;
        let {orders} = this.props;
        if (orders.length) {
            return orders.map( order => {
                console.log(order);
                let product = order.products[0];
                return (
                    <CardComponent
                        style={componentStyle}
                    >
                        <View style={imageContainer}>
                            <Image
                                resizeMode={'contain'}
                                style={imageStyle}
                                source={{uri: product.photo}}
                            />
                        </View>
                        <View style={textContainer}>
                            <TextComponent
                                title={product.name}
                                isPresent
                            />
                            <ButtonComponent
                                onPress={Actions.ordering}
                                price={
                                    product.price || 0
                                }
                                bonuses={
                                    product.bonus_price || 0
                                }
                            />
                        </View>
                    </CardComponent>
                )
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
console.log(this.props)
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

const mapStateToProps = ({auth, store}) => {
    return {
        loading: store.loading,
        user: auth.user,
        basket: store.basket,
        orders: store.orders
    }
}

export default connect(mapStateToProps, {getHistory, getOrderDetails})(ListComponent);