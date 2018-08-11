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
        console.log('***STORE CATEGORIES componentWillMount')
        let {phone, token} = this.props;
        this.props.getCategories(token, phone)
    }

    openStoreCategories(category) {
        console.log(category);
        if (category.id == 17) { // if this is Specail offers category
            Actions.specialOffer({subcategories: category.sub_categories})
        } else {
            Actions.goods({category: category})
        }
    }

    renderRowItems(row) {
        return row.map( (item, index) => {
            return (
                <View
                    key={item.id}
                    style={{
                        flex: 1,
                        margin: 1,
                    }}
                >
                    <Item
                        onPress={() => this.openStoreCategories(item)}
                        imageSrc={{uri: item.image}}
                    >
                        {
                            item.name
                        }
                    </Item>
                </View>
            )
        })
    }

    renderRows() {
        const categories = [...this.props.categories];
        var i=0;
        var rows = [];
        while (i < categories.length) {
            rows.push(categories.slice(i, i+3))
            i = i+3;
        }
        return rows.map( (row, index) => {

            return (
                <CardItem
                    key={row[0].id}
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start'
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
        console.log('***STORE CATEGORIES RENDER')
        return (
            <MainCard>
                <Header burger basket countBasket={this.props.countBasket}>
                    Магазин
                </Header>
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const mapStateToProps = ({auth, store, basket}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        categories: store.categories,
        countBasket: basket.countBasket,
    }
}

export default connect(mapStateToProps, {getCategories})(CategoriesComponent);