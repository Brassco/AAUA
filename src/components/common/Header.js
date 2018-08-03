import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Icon} from './'

class Header extends Component{

    renderLeftButton() {
        if (this.props.back) {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop:25,
                        paddingBottom: 15,
                        // backgroundColor: '#382'
                    }}
                    onPress={this.props.onPressBack || Actions.pop}
                >
                    <Icon
                        style={{
                            width: 18,
                            height: 12
                        }}
                        imageSrc={require('../../images/icons/backButton.png')}
                        />
                </TouchableOpacity>
            )
        }
        if (this.props.burger) {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        paddingTop:25,
                        // paddingRight:25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 15,
                        // backgroundColor: '#382'
                    }}
                    onPress={Actions.drawerOpen}
                >
                    <Icon
                        style={{
                            width: 17,
                            height: 17
                        }}
                        imageSrc={require('../../images/icons/bar.png')}
                    />
                </TouchableOpacity>
            )
        }
    }

    renderRightButton() {
        if (this.props.wallet) {
            return (
                <TouchableOpacity
                    style={{
                        paddingTop:25,
                        paddingRight:25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={Actions.drawerOpen}
                >
                    <Icon
                        imageSrc={require('../../images/icons/wallet_header.png')}
                    />
                </TouchableOpacity>
            )
        }
        if (this.props.basket) {
            return (
                <TouchableOpacity
                    style={{
                        width:75,
                        height:55,
                        paddingBottom: 15,
                        paddingRight: 15,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                    }}
                    onPress={Actions.basketList}
                >
                    <Icon
                        imageSrc={require('../../images/icons/basket.png')}
                    />
                    {this.renderCounter()}
                </TouchableOpacity>
            )
        }

        if (this.props.goToMain) {
            return (
                <TouchableOpacity
                    style={{
                        paddingTop:25,
                        paddingRight:25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={Actions.mainScreen}
                >
                    <Icon
                        imageSrc={require('../../images/icons/iconBarHome.png')}
                    />
                </TouchableOpacity>
            )
        }

        return (
            <View></View>
        )
    }

    renderCounter() {
        if (this.props.countBasket > 0) {
            return (
                <View style={{
                    width: 15,
                    height: 15,
                    borderRadius: 7,
                    backgroundColor: '#e1a700',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 2,
                    left: 22
                }}>
                    <Text style={{
                        fontFamily: 'SFUIText-Medium',
                        color: '#1b1b1b',
                        fontSize: 10,
                        marginLeft: 2,
                        marginRight: 2,
                        marginTop: 1,
                        minWidth: 12
                    }}>
                        { this.props.countBasket > 0 ? this.props.countBasket : 15}
                    </Text>
                </View>
            )
        }
    }

    render() {
        const {textStyle, viewStyle, buttonContainer} = style;
        return (
            <View style={viewStyle}>
                <View style={buttonContainer}>
                    {this.renderLeftButton()}
                </View>
                <View>
                    <Text style={textStyle}>
                        {
                            this.props.children ? this.props.children.toUpperCase() : ''
                        }
                    </Text>
                </View>
                <View style={buttonContainer}>
                    {this.renderRightButton()}
                </View>
            </View>
        )
    }
}

const style = {
    textStyle: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 13,
        color:'#1b1b1b',
        paddingBottom: 15,
    },
    buttonContainer: {
        // backgroundColor: '#9f9f96',
        width: 70,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    viewStyle: {
        elevation:5,
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 56,
        // paddingBottom: 15,
        marginBottom:1,
        borderBottomWidth:1,
        borderColor: '#fafafa',
        shadowColor: '#fafafa',
        shadowOffset: {width:2, height: 2},
        shadowOpacity: 0.2
    }
}

export {Header};
