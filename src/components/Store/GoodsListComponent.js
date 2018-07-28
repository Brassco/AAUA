import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    CardComponent,
    Icon,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';
import GoodsComponent from './GoodsComponent';
import {Actions} from 'react-native-router-flux';
import {getProductsByCategoriesId, addToBasket} from '../../Actions/StoreAction';
import {connect} from 'react-redux';

class GoodsListComponent extends Component {

    componentWillMount() {
        let {token, phone, category} = this.props;
        this.props.getProductsByCategoriesId(token, phone, category.id)
    }

    addToBasket(product) {
        let {addToBasket} = this.props;
        addToBasket(product);
        // Actions.basketList();
    }

    renderRowItems(row) {
        return row.map( (item, index) => {
            console.log(item);
            return (
                <GoodsComponent
                    key={item.id+item.name}
                    onPress={() => Actions.detail({productId: item.id})}
                    addToBasket={this.addToBasket.bind(this, item)}
                    imageSrc={{uri:item.photo}}
                    price={item.price}
                    bonus_price={item.bonus_price}
                    isPresent
                >
                    {
                        item.name
                    }
                </GoodsComponent>
            )
        })
    }

    renderRows() {
        console.log(this.props.products)
        const products = [...this.props.products];
        var i=0;
        var rows = [];
        while (i < products.length) {
            rows.push(products.slice(i, i+2))
            i = i+2;
        }
        return rows.map( (row, index) => {
            console.log(row.length);
            return (
                <CardItem
                    key={row[0].id}
                    style={[styles.cardItemStyle, {justifyContent: row.length == 1 ? 'flex-start' : 'space-around'}]}>
                    {
                        this.renderRowItems(row)
                    }
                </CardItem>
            )
        })
    }

    renderContent() {
console.log(this.props);
        const {loading} = this.props
        if (!loading) {
            return (
                <ScrollView style={{
                    paddingLeft: 22,
                    paddingRight: 22,
                }}>
                    {this.renderRows()}
                </ScrollView>
            )
        } else {
            return (
                <Spiner />
            )
        }
    }

    render() {
        return (
            <MainCard>
                <Header back basket>
                    автомасла
                </Header>
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const styles = {
    cardItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    componentStyle: {
        marginRight: WIDTH_RATIO < 1 ? 3 : 6 * WIDTH_RATIO
    },
    iconStyle: {
        marginLeft: 24 * WIDTH_RATIO,
        marginRight: 22 * WIDTH_RATIO,
        marginTop: 19 * RATIO,
        width: 114 * WIDTH_RATIO,
        height: 114 * RATIO
    },
    titleContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#282',
        maxWidth: 160 * WIDTH_RATIO
    },
    titleStyle: {
        alignSelf: 'center',
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
        color: '#1b1b1b'
    },
    isPresentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    isPresentText: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 10,
        color: '#2fc047'
    }
}

const mapStateToProps = ({auth, store}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        products: store.products
    }
}

export default connect(mapStateToProps, {getProductsByCategoriesId, addToBasket})(GoodsListComponent);