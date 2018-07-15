import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    CardComponent,
    ButtonRoundet,
    LabelOnInput,
    ModalCard,
    Spiner,
    Header
} from '../../common';
import {Actions} from 'react-native-router-flux';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import {RATIO} from '../../../styles/constants';
import {connect} from 'react-redux';
import {deleteFromBasket} from '../../../Actions/StoreAction';

class ListComponent extends Component {

    state = {
        sumPrice: 0,
        sumBonusPrice: 0
    }

    onDeleteItem(id) {
        this.props.deleteFromBasket(id)
    }

    componentDidMount() {
        let sum = 0;
        let sumBonus = 0;
        this.props.basket.map( products => {
            products.map( product => {
                let price = product.price == '' ? 0 :product.price;
                let bonus_price = product.bonus_price == '' ? 0 :product.bonus_price;
                sum = sum + price,
                sumBonus = sumBonus + bonus_price
            })
console.log(
    sum, sumBonus,
);
        })
        let {sumPrice, sumBonusPrice} = this.state;
        this.setState({
            sumPrice: sumPrice + sum,
            sumBonusPrice: sumBonusPrice + sumBonus
        })
    }

    renderList() {
        const {
            imageStyle,
            imageContainer,
            textContainer,
            componentStyle} = styles;
console.log(this.props.basket);
        if (this.props.basket) {
            return this.props.basket.map(product => {
console.log(product[0], product.length)
                return (
                    <CardComponent
                        key={product[0].id}
                        style={componentStyle}
                    >
                        <View style={imageContainer}>
                            <Image
                                resizeMode={'contain'}
                                style={imageStyle}
                                source={require('../../../images/shell.png')}
                            />
                        </View>
                        <View style={textContainer}>
                            <TextComponent
                                onDelete={this.onDeleteItem.bind(this, product[0].id)}
                                title={product[0].name}
                                isPresent
                            />
                            <ButtonComponent
                                count={product.length}
                                onPress={Actions.ordering}
                                price={product[0].price || 0}
                                bonuses={product[0].bonus_price || 0}
                            />
                        </View>
                    </CardComponent>
                )
            })
        }
    }

    render() {
        const {
            imageStyle,
            imageContainer,
            textContainer,
            componentStyle,
            fixedFooterStyle,
            priceText,
            bonusText,
            buttonText} = styles;
        return (
            <MainCard>
                <Header burger >
                    корзина
                </Header>
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
                        this.renderList()
                    }
                </ScrollView>
                <View style={fixedFooterStyle}>
                    <View>
                        <Text style={priceText}>
                            {this.state.sumPrice} грн
                        </Text>
                        <Text style={bonusText}>
                            {this.state.sumBonusPrice} бонусов
                        </Text>
                    </View>
                    <View style={{
                        height: 36
                    }}>
                        <ButtonRoundet
                            onPress={Actions.basketOrdering}
                            style= {{
                                backgroundColor: '#ffc200',
                                borderColor: '#ffc200',
                            }}
                            textStyle={buttonText}
                        >
                            Купить
                        </ButtonRoundet>
                    </View>
                </View>
            </MainCard>
        )
    }
}

const styles = {
    componentStyle: {
        // backgroundColor: '#9f9f96',
        height: 111,
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
    },
    fixedFooterStyle: {
        height: 63,
        width: '100%',
        alignSelf: 'stretch',
        position: 'absolute',
        bottom: 0,
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        elevation:5,
        borderTopWidth:2,
        borderTopColor: '#a8a8a8',
        shadowColor: '#a8a8a8',
        shadowOffset: {width:2, height: 2},
        shadowOpacity: 0.2
    },
    buttonText: {
        fontFamily: 'SFUIText-Medium',
        color: '#1b1b1b',
        fontSize: 16,
        marginLeft: 50,
        marginRight: 50,
    },
    priceText: {
        fontFamily: 'SFUIText-Bold',
        color: '#423486',
        fontSize: 20
    },
    bonusText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 14
    },
}

const mapStateToProps = ({store}) => {
    return {
        basket: store.basket
    }
}

export default connect(mapStateToProps, {deleteFromBasket})(ListComponent);