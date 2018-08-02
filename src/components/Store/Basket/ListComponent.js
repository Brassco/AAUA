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
import {deleteFromBasket, addToBasket} from '../../../Actions/StoreAction';

class ListComponent extends Component {

    state = {
        sumPrice: 0,
        sumBonusPrice: 0
    }

    componentDidMount() {
        let sum = 0;
        let sumBonus = 0;
        if (this.props.basket.length) {
            this.props.basket.map(products => {
                products.map(product => {
                    let price = product.price == '' ? 0 : product.price;
                    let bonus_price = product.bonus_price == '' ? 0 : product.bonus_price;
                    sum = sum + parseInt(price),
                        sumBonus = sumBonus + parseInt(bonus_price)
                })

            })
            let {sumPrice, sumBonusPrice} = this.state;
            this.setState({
                sumPrice: sumPrice + sum,
                sumBonusPrice: sumBonusPrice + sumBonus
            })
        }
    }

    onDeleteItem(id) {
        this.props.deleteFromBasket(id)
    }

    onAddToBasket(product) {
        this.props.addToBasket(product)
    }

    renderList() {
        const {
            imageStyle,
            imageContainer,
            textContainer,
            componentStyle} = styles;
        if (this.props.basket[this.props.basket.length-1]) {
            return this.props.basket.map(product => {
console.log(product[0]);
                return (
                    <CardComponent
                        key={product[0].id}
                        style={componentStyle}
                    >
                        <View style={imageContainer}>
                            <Image
                                resizeMode={'contain'}
                                style={imageStyle}
                                source={{uri: product[0].photo}}
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
                                onAdd={this.onAddToBasket.bind(this, product[0])}
                                onDelete={this.onDeleteItem.bind(this, product[0].id)}
                                price={product[0].price || 0}
                                bonuses={product[0].bonus_price || 0}
                            />
                        </View>
                    </CardComponent>
                )
            })
        }
    }

    renderFooter() {
        const {
            fixedFooterStyle,
            priceText,
            bonusText,
            buttonText} = styles;
        if (this.props.basket[this.props.basket.length-1]) {
            return (
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
                            style={{
                                backgroundColor: '#ffc200',
                                borderColor: '#ffc200',
                            }}
                            textStyle={buttonText}
                        >
                            Купить
                        </ButtonRoundet>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <MainCard>
                <Header burger >
                    корзина
                </Header>
                <ScrollView style={{
                    paddingLeft: 13,
                    paddingRight: 14,
                    marginTop: 21,
                    marginBottom: 60,
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
                { this.renderFooter()}
            </MainCard>
        )
    }
}

const styles = {
    componentStyle: {
        // backgroundColor: '#9f9f96',
        // maxheight: 111,
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

export default connect(mapStateToProps, {deleteFromBasket, addToBasket})(ListComponent);