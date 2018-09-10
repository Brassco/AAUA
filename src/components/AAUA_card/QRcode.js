import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {MainCard, CardItem} from '../common';
import QRCode from 'react-native-qrcode';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import DeviceBrightness from 'react-native-device-brightness';
import {WIDTH, HEIGHT} from '../../styles/constants';

class QRcode extends Component {
    state = {
        luminous: 0.5
    }

    componentDidMount() {
        DeviceBrightness.setBrightnessLevel(0.8);
    }

    componentWillUnmount() {
        DeviceBrightness.setBrightnessLevel(this.state.luminous);
    }

    render() {
console.log(WIDTH)
        const {container, text} = styles;
        const {card} = this.props;
        return (
            <MainCard style={
                container
            }>
                <CardItem
                    style={{
                        backgroundColor: '#FFF',
                        flex: 1
                    }}
                >
                    <TouchableOpacity onPress={Actions.mainScreen}>
                        <Text
                            style={{
                                fontSize: 30,
                                color: '#1b1b1b'
                            }}
                        >
                            X
                        </Text>
                    </TouchableOpacity>
                </CardItem>
                <CardItem
                    style={{
                        backgroundColor: '#FFF',
                        justifyContent: 'center',
                        flex: 2
                    }}
                >
                    <Text
                        style={text}
                    >
                        Это Ваша карта “AAUA”. Чтобы ею воспользоваться, покажите этот экран кассиру
                    </Text>
                </CardItem>
                <CardItem
                    style={{
                        backgroundColor:'#FFF',
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            borderColor: '#ffc200',
                            borderWidth: 5
                        }}
                    >
                        <View
                            style={{
                                borderColor: '#fff',
                                borderWidth: 5
                            }}
                        >
                            <QRCode
                                value={card}
                                size={WIDTH*0.65}
                                bgColor='#000'
                                fgColor='white'/>
                        </View>
                    </View>
                </CardItem>
                <CardItem
                    style={{
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 0,
                        height: 22
                    }}
                >
                    <Text
                        style={[text, {fontSize: 22}]}
                    >
                        {card}
                    </Text>
                </CardItem>
                <View
                    style={{
                        // backgroundColor: '#758',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        flex: 2,
                    }}>
                    <View style={{
                        flex:1,
                        // backgroundColor: '#158',
                        width: WIDTH*0.65
                    }}>
                        <Text style={[text, {
                            fontSize: 16
                        }]}>
                            В данный момент QR код не работает по техническим причинам. Мы скоро исправим эту проблему
                        </Text>
                    </View>
                </View>
            </MainCard>
        )
    }
}

const mapStateToProps = ({AAUA_Card}) => {
    return {
        card: AAUA_Card.myCards
    }
}

export default connect(mapStateToProps)(QRcode)

const styles = {
    container: {
        backgroundColor: '#FFF',
        paddingLeft: 30,
        paddingRight: 30,
    },
    text: {
        // backgroundColor: '#294',
        color: '#1b1b1b',
        fontSize: 18,
        alignSelf: 'center'
    }
}