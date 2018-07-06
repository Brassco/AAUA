import React, {Component} from 'react';
import {View, Text, CheckBox, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    LabelOnInput,
    DropDown,
    ButtonRoundet,
    PhoneInput,
    Icon,
    Header,
    Autocomplete
} from '../common'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {CITIES} from '../../Actions/constants';
import {DELIVERY_CURIER,
    DELIVERY_NP
} from '../../Actions/types';
import {connect} from 'react-redux';
import {
    makeOrder,
    changeDelivery,
    changeAddress,
    changeCity,
    changeNPCity,
    changeNPSkald,
    selectCity,
    changeComment
} from '../../Actions/StoreAction';
import {getCities, getNPCities, getNPsklads} from '../../Actions/CitiesBrands';

let listHeight = 0;

class OrderingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchedItems: []
        };
    };

    onChangeDelivery (value) {

console.log('onChangeDelivery', value);

        this.props.changeDelivery(value);
    }

    onPhoneChange(phone) {
        this.props.changePhone(phone)
    }

    onChangeComment(text) {
        this.props.changeComment(text);
    }

    searchedItems = (searchedText) => {
        var searchedItems = this.props.cities.filter(function(item) {
            return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
        });
        if (searchedText.length <= 0) {
            searchedItems = []
        }
        if (searchedItems.length > 0 ) {
            listHeight = searchedItems.length * 20;
        }
        if (searchedItems.length == 1) {
            this.onSelectCity(searchedItems[0])
            this.setState({searchedItems: []});
        }
        this.props.cities.some(e => {
            if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
                this.onSelectCity(e)
                this.setState({searchedItems: []});
            }
        })
        this.setState({searchedItems: searchedItems.slice(0, 30)});
    };

    onChangeCity(title){
        if (title.length >= 2) {
            if (this.props.delivery == DELIVERY_NP) {
                this.props.getNPCities(title);
            } else {
                this.searchedItems(title);
            }
        }
        this.props.changeCity(title);
        // this.refs._scrollView.scrollToEnd({animated: true})
    }

    onSelectCity(cityObj){
        this.setState({searchedItems: []});
        this.props.getNPCities('.');
        if (this.props.delivery == DELIVERY_NP) {
            this.props.selectCity(cityObj.id);
            this.props.getNPsklads(cityObj.id);
        } else {
            this.props.selectCity(cityObj.title);
        }
    }

    onChangeAddress(address) {
        this.props.changeAddress(address);
    }

    onSubmit() {
        let productIds = []
        this.props.basket.map(product => {
            productIds.push(product.id)
        });
        let {user, makeOrder} = this.props;
        makeOrder(user, productIds);
    }

    setDefaultSkladToStore(address) {
        this.props.changeNPSkald(address.title);
    }

    renderAddresses () {
        console.log(this.props.delivery, this.props.city, this.props.NPsklads);
        if (this.props.delivery == DELIVERY_NP && this.props.city && this.props.NPsklads.length) {
            return (
                <DropDown
                    label="Адрес"
                    elements={this.props.NPsklads}
                    onValueChange={this.onChangeAddress.bind(this)}
                    selected={this.props.address}
                    valueExtractor={ (value) => value.title}
                    setDefaultValueToStore={this.setDefaultSkladToStore.bind(this)}
                />
            )
        }
        return (
            <LabelOnInput
                label={'Адрес'}
                placeholder={'введите адрес'}
                onChangeText={this.onChangeAddress.bind(this)}
                value={this.props.address}
            />
        )
    }

//     componentWillMount() {
// console.log('ordering component will mount');
//         this.props.getCities();
//         this.props.getNPCities();
//     }

    render() {
console.log('render ordering component', this.props.delivery);
        const {textStyle, radiobuttonContainer, amountText} = styles;
        return (
            <MainCard>
                <Header back>
                    ОФОРМЛЕНИЕ ЗАКАЗА
                </Header>
                <ScrollView
                    ref='_scrollView'
                >
                <CardItem
                    style={{
                        marginTop: 33,
                        flex:0,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}
                >
                    <LabelOnInput
                        editable={false}
                        selectTextOnFocus={false}
                        label={'Страна'}
                        placeholder={'Украина'}
                        onChangeText={() => []}
                        value={this.props.county}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop: 21,
                    flex:0,
                    height: 85,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <DropDown
                        label="Способ доставки"
                        elements={[
                            {title: 'Курьер', id: DELIVERY_CURIER},
                            {title: 'Новая почта', id: DELIVERY_NP}
                        ]}
                        valueExtractor={ (value) => value.id}
                        selected={this.props.delivery}
                        onValueChange={this.onChangeDelivery.bind(this)}
                    />

                </CardItem>

                <CardItem
                    display={this.props.showCities}
                    style={{
                        marginTop: 22,
                        flex:11,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                    <Autocomplete
                        label={'Город'}
                        placeholder={'Введите город'}
                        onChangeText={this.onChangeCity.bind(this)}
                        onSelect={this.onSelectCity.bind(this)}
                        data={
                            this.props.delivery == DELIVERY_CURIER ?
                                this.state.searchedItems : this.props.NPcities}
                        value={this.props.city}
                        listHeight={{height: listHeight}}
                    />
                </CardItem>
                <CardItem
                    style={{
                        flex:15,
                        // height: 65,
                        // marginTop:22,
                    }}>

                    {this.renderAddresses()}
                </CardItem>
                <CardItem
                    style={{
                        flex:11,
                        height: 65,
                        marginTop:22,
                    }}>
                    <LabelOnInput
                        label={'Коментарий'}
                        placeholder={'введите Коментарий'}
                        onChangeText={this.onChangeComment.bind(this)}
                        value={this.props.comment}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 0,
                    height: 65,
                    marginTop:22,
                }}>
                    <PhoneInput
                        label={'Номер телефона'}
                        placeholder={'+380'}
                        value={this.props.phone}
                        onChangeText={this.onPhoneChange.bind(this)}
                    />
                </CardItem>
                <CardItem style={{
                    flex:0,
                    height: 125 * RATIO,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    paddingBottom: 20
                }}>
                    <View style={{
                        paddingLeft: 45,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginBottom: 10
                    }}>
                        <Text style={[
                            textStyle,
                            {marginRight: 100 * WIDTH_RATIO}
                            ]}>
                            Тип оплаты:
                        </Text>
                        <Text style={textStyle}>
                            Тип оплаты:
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#fafafa',
                        height:80,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingLeft: 38 * WIDTH_RATIO,
                        // backgroundColor: '#289',
                    }}>
                        <RadioGroup
                            selectedIndex={0}
                            color='#423486'
                            style={{
                                marginRight: 47 * WIDTH_RATIO,
                                marginBottom: 8
                            }}
                            onSelect = {(index, value) => this.onSelect(index, value)}
                        >
                            <RadioButton value={'1'} >
                                <Icon
                                    style={{
                                        width: 69,
                                        height: 14
                                    }}
                                    imageSrc={require('../../images/liqpay.png')}
                                />
                            </RadioButton>

                            <RadioButton value={'2'}>
                                <Text >Бонусы</Text>
                            </RadioButton>
                        </RadioGroup>
                        <View style={{flex:1}}>
                            <Text style={amountText}>
                                1785 грн.
                            </Text>
                            <View style={{
                                marginTop: 17,
                                flexDirection: 'row',
                                alignItems:'flex-end'
                            }}>
                                <Text style={amountText}> 1785 </Text>
                                <Text style={[amountText, {fontSize: 14}]}>
                                    бонусов
                                </Text>
                            </View>
                        </View>
                    </View>
                </CardItem>
                    <CardItem style={{
                    flex:0,
                    height: 75 * RATIO,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    paddingLeft: 83,
                    paddingRight: 83,
                    paddingBottom: 16 *RATIO,
                    paddingTop: 18 *RATIO,
                }}>
                    <ButtonRoundet
                        style={{
                            backgroundColor: '#ffc200',
                            borderColor: '#ffc200'
                        }}
                        textStyle={{
                            fontFamily: 'SFUIText-Medium',
                            color: '#1b1b1b'
                        }}
                        onPress={this.onSubmit.bind(this)}
                    >
                        Оплатить
                    </ButtonRoundet>
                </CardItem>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 12,
        color: '#3d3e40'
    },
    radiobuttonContainer: {
        backgroundColor: '#289',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    amountText: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 19,
        color: '#423486'
    },
    footerWrapper: {
        height: 40,
        // marginLeft: 45,
        // marginRight: 45,
    }
}

const mapStateToProps = ({ordering, citiesBrands, store}) => {
    return {
        showCities: ordering.showCities,
        showNPCities: ordering.showNPCities,
        showNPSklads: ordering.showNPSklads,
        showAdress: ordering.showAdress,
        npCity: store.npCity,
        delivery: store.delivery,
        NPskald: store.NPskald,
        phone: store.phone,
        comment: store.comment,
        address: store.address,
        city: store.city,

        NPsklads: citiesBrands.NPsklads,
        NPcities: citiesBrands.NPcities,
        cities: citiesBrands.cities,

        basket: store.basket
    }
}

export default connect(
    mapStateToProps,
    {
        changeDelivery,
        getNPCities,
        getCities,
        changeNPCity,
        changeCity,
        changeAddress,
        getNPsklads,
        changeComment,
        makeOrder,
        selectCity,
        changeNPSkald
    })(OrderingComponent);
