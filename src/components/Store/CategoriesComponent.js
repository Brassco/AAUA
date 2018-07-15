import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    Spiner
} from '../common';
import Item from './Item';
import {Actions} from 'react-native-router-flux';
import {getCategories} from '../../Actions/StoreAction';
import {connect} from 'react-redux';
import {getImageByStoreCategoryId} from '../../Helpers/ImageHelper';

class CategoriesComponent extends Component {

    componentWillMount() {
        let {phone, token} = this.props;
        this.props.getCategories(token, phone)
    }

    openStoreCategories(category) {
        Actions.goods({category: category})
    }

    renderRowItems(row) {
        return row.map( (item, index) => {
            return (
                <Item
                    key={item.id}
                        onPress={() => this.openStoreCategories(item)}
                        imageSrc={getImageByStoreCategoryId(item.id)}
                    >
                        {
                            item.name
                        }
                    </Item>
            )
        })
    }

    renderRows() {
console.log(this.props.categories)
        const categories = [...this.props.categories];
        var i=0;
        var rows = [];
        while (i < categories.length) {
            rows.push(categories.slice(i, i+3))
            i = i+3;
        }
        return rows.map( (row, index) => {
console.log(row[0]);
            return (
                <CardItem
                    key={row[0].id}
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
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
                <Header burger basket>
                    Магазин
                </Header>
                {/*<ScrollView>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={Actions.specialOffer}
                            imageSrc={require('../../images/icons/special_offers.png')}
                        >
                            Спецпредложение AAUA
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={
                                require('../../images/icons/advokat.png')
                            }
                        >
                            Пакет юридических{"\n"} услуг
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/tech_support.png')}
                        >
                            Пакет технической{"\n"} поддержки в дороге
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/fuel.png')}
                        >
                            Топливо
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/mobil.png')}
                        >
                            Мобильная связь
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/auto_goods.png')}
                        >
                            Товары для авто
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>

                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/tyres.png')}
                        >
                            Шины
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/disks.png')}
                        >
                            Диски
                        </Item>
                        <Item
                            onPress={Actions.goods}
                            imageSrc={require('../../images/icons/auto_oils.png')}
                        >
                            Автомасла
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>

                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/auto_cleaning.png')}
                        >
                            Автохимия
                        </Item>
                    </CardItem>
                </ScrollView>*/}
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const mapStateToProps = ({auth, store}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        categories: store.categories
    }
}

export default connect(mapStateToProps, {getCategories})(CategoriesComponent);