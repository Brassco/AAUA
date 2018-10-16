import React, {Component} from 'react';
import {View, WebView, FlatList, Platform} from 'react-native';
import {
    MainCard,
    CardItem,
    Header
} from './common';
import {WIDTH, HEIGHT} from '../styles/constants';
import Swiper from 'react-native-swiper';

export default class ImageContent extends Component {


    renderContent() {

        return this.props.images.map( image => {
            const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
            return (
                <View
                    key={image.id}
                    style={{
                        flex:1,
                        alignSelf: 'stretch',
                        width: WIDTH,
                        height: HEIGHT,
                    }}
                >
                    <WebView
                        style={{
                            width: WIDTH,
                            height: HEIGHT,
                        }}
                        scalesPageToFit={Platform.OS == 'android' ? false : true}
                        injectedJavaScript={INJECTEDJAVASCRIPT}
                        automaticallyAdjustContentInsets = {false}
                        source={{ html: image.content, baseUrl:'' }}
                    />
                </View>
            )
        })

    }

    render() {
console.log(this.props);
        return (
            <MainCard>
                <Header back/>
                <CardItem>
                    <Swiper
                        index={this.props.index}
                        style={{flex:1}}
                        showsPagination={false}
                        showsButtons={false}>
                        {
                            this.renderContent()
                        }
                    </Swiper>
                </CardItem>
            </MainCard>
        )
    }
}