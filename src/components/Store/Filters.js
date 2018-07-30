import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

class Filters extends React.Component {

    render() {

        let {container, component} = styles;
        return (
            <View>
                <View style={container}>
                    <TouchableOpacity
                        onPress={this.props.showOrders}
                        style={component}>
                        <View>
                            <Image />
                            <Text>
                                Сортировка
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.props.showFilters}
                        style={component}>
                        <View>
                            <Image />
                            <Text>
                                Фильтры
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    component: {
        flex: 1,
        // backgroundColor:'#279',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}

export default Filters;