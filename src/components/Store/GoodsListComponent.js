import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    CardComponent,
    Icon,
    CheckBox} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';
import GoodsComponent from './GoodsComponent';
import {Actions} from 'react-native-router-flux';
import {getProductsByCategoriesId, addToBasket, checkFilters, getFilteredProduct} from '../../Actions/StoreAction';
import {connect} from 'react-redux';
import Filters from './Filters';
import Modal from 'react-native-modalbox';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import FiltersModal from './modals/FiltersModal';
import OrderingModal from "./modals/OrderingModal";

class GoodsListComponent extends Component {

    state = {
        isFiltersOpen: false,
        isOrdersOpen: false,
    };

    componentWillMount() {
        let {token, phone, category} = this.props;
        this.props.getProductsByCategoriesId(token, phone, category.id)
    }

    addToBasket(product) {
        let {addToBasket} = this.props;
        addToBasket(product);
    }

    onSorting(filterName) {
        let {token, phone, category} = this.props;
        this.props.getProductsByCategoriesId(token, phone, category.id, filterName)
        this.setState({isOrdersOpen: false});
    }

    onFiltering() {
        let {token, phone, checkedBrands} = this.props;
        console.log('onFiltering', token, phone, checkedBrands);
        this.props.getFilteredProduct(token, phone, checkedBrands)
        this.setState({isFiltersOpen: false})
    }

    showFilters() {
        this.setState({isFiltersOpen: true})
    }

    showOrders() {
        this.setState({isOrdersOpen: true})
    }

    renderRowItems(row) {
        return row.map( (item, index) => {
            return (
                <GoodsComponent
                    key={item.id+item.name}
                    onPress={() => Actions.detail({productId: item.id, category: this.props.category})}
                    addToBasket={this.addToBasket.bind(this, item)}
                    imageSrc={{uri:item.photo}}
                    price={item.price}
                    bonus_price={item.bonus_price}
                    isPresent={item.status == "instock"}
                >
                    {
                        item.name
                    }
                </GoodsComponent>
            )
        })
    }

    renderRows() {
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
                <Header back basket countBasket={this.props.countBasket}>
                    {this.props.category.name}
                </Header>
                <Filters
                    showFilters={this.showFilters.bind(this)}
                    showOrders={this.showOrders.bind(this)}
                />
                {
                    this.renderContent()
                }
                <FiltersModal
                    isOpen={this.state.isFiltersOpen}
                    closeModal={() => this.setState({isFiltersOpen: false})}
                    checkFilters={this.props.checkFilters}
                    filters={this.props.filters}
                    onFiltering={this.onFiltering.bind(this)}
                />
                <OrderingModal
                    isOpen={this.state.isOrdersOpen}
                    closeModal={() => this.setState({isOrdersOpen: false})}
                    checkFilters={this.props.checkFilters}
                    filters={this.props.filters}
                    sortingProducts={this.onSorting.bind(this)}
                />
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
    },
    modal: {
        height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    labelStyle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 16
    }
}

const mapStateToProps = ({auth, store}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        products: store.products,
        filters: store.filters,
        checkedBrands: store.checkedBrands,
        countBasket: store.countBasket
    }
}

export default connect(mapStateToProps, {getProductsByCategoriesId, addToBasket, checkFilters, getFilteredProduct})(GoodsListComponent);