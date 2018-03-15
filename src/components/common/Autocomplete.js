import React, {Component} from 'react';
import {View, Text, TextInput, ListView, TouchableOpacity} from 'react-native';
import {Spiner} from './'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let listHeight = 0;

class Autocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchedItems: []
        };
    };

    renderItem = (item) => {

        return (
            <View style={{
                height: 18
            }}>
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.onSelect(item)
                            // containerHeight = 65;
                            this.setState({searchedItems: []});
                        }
                    }
                >
                    <Text
                        numberOfLines={1}
                        style={{flexWrap: 'wrap'}}
                    >
                        {item.id}, {item.title}
                        </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderList() {

console.log('render list', this.props.data);

        let listHeight = 0;
        if (this.props.data.length >= 1) {
            const renderedList = this.props.data.slice(0, 30)
            listHeight = renderedList.length <= 10 ? renderedList.length * 20 : 200;

            return (
                <View style={{
                    maxHeight: 200,
                    height: listHeight
                }}
                >
                    <ListView
                        style={{
                            height: listHeight,
                            flex: 1
                        }}
                        enableEmptySections
                        dataSource={ds.cloneWithRows(this.props.data)}
                        renderRow={this.renderItem}/>
                </View>
            )
        }
    }

    render() {
console.log(this.props.data);
        const {inputStyle, labelStyle, containerStyle} = styles;
        const {label, placeholder, value} = this.props;
        return (
            <View style={[containerStyle]}>
                <Text style={[labelStyle, this.props.labelStyle]}>
                    {label}
                </Text>
                <View style={{
                    minHeight: 43,
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <TextInput
                        {...this.props}
                        placeholderTextColor='#b6b9bf'
                        multiline={false}
                        onSubmitEditing={() => {console.log('enter pressed')}}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={this.props.onChangeText}
                        onFocus={this.props.onFocus}
                        style={inputStyle}/>
                </View>
                {
                    this.renderList()
                }
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        marginLeft: 45,
        marginRight: 45,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // position: 'absolute',
        zIndex: 999
    },
    inputStyle: {
        // placeholderTextColor: '#b6b9bf',
        fontFamily:'SFUIText-Regular',
        color: '#b6b9bf',
        fontSize: 15,
        lineHeight: 25,
        flex:1
    },
    labelStyle: {
        marginLeft: 4,
        marginBottom: 2,
        paddingTop:0,
        height: 20,
        fontFamily: 'SFUIText-Regular',
        fontSize: 14,
        alignSelf:'stretch',
        color: '#3d3e40',
    },

}

export {Autocomplete};