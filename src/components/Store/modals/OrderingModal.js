import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class OrderingModal extends React.Component {

    state = {
        sortingName: ''
    }

    onSelect(filterName) {
        console.log(filterName);
        // this.props.checkFilters(filterName);
        this.setState({sortingName: filterName})
    }

    onSorting() {
        this.props.sortingProducts(this.state.sortingName)
    }

    renderCheckboxes() {
        let {filters} = this.props;
        return filters.map( filter => {
            return (
                <RadioButton
                    value={filter.name}
                    key={filter.name}
                >
                    <Text>
                        {
                            filter.label
                        }
                    </Text>
                </RadioButton>
            )
        })
    }

    render() {
        let {isOpen, closeModal} = this.props;
        return (
            <Modal style={styles.modal}
                   position={"center"}
                   ref={"modal"}
                   isOpen={isOpen}
                   onClosed={closeModal}
            >
                <View style={{
                    flex: 1,
                    // minHeight: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                }}>
                    <View style={{
                        flex: 1,
                        borderRadius: 12,
                        backgroundColor: '#f1f1f1',
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                        <View style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            // backgroundColor: '#279',
                        }}>
                            <Text>
                                Сортировка
                            </Text>
                        </View>
                        <View style={{
                            flex: 8,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            alignSelf: 'stretch',
                            paddingLeft: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#1b1b1b',
                        }}>
                            <View style={{
                                flex: 1
                            }}>
                                <RadioGroup
                                    size={15}
                                    selectedIndex={0}
                                    color='#423486'
                                    style={{
                                        justifyContent: 'flex-start',
                                        // backgroundColor: '#279'
                                    }}
                                    onSelect = {(index, value) => this.onSelect(value)}
                                >
                                    {this.renderCheckboxes()}
                                </RadioGroup>
                            </View>
                        </View>
                        <View style={{
                            // backgroundColor: '#279',
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'stretch',
                                    borderRightWidth: 1,
                                    borderRightColor: '#1b1b1b',
                                }}
                            >
                                <Text>
                                    Отмена
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onSorting.bind(this)}
                                style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'stretch'
                            }}>
                                <Text>
                                    Применить
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = {
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

export default OrderingModal;