import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {
  changeYear,
  changeCar,
  changeCarBrand,
  orderKasko,
  selectBrand,
  getCarModel,
  selectModel,
  changeOsagoCity,
  selectOsagoCity,
} from '@aaua/actions/InsuranceAction';
import {MainCard, CardItem, Header, Spiner} from '@aaua/components/common';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

const CarModels = (props) => {

  const [filteredModels, setFilteredModels] = useState([]);
  const [carModel, setCarModel] = useState('');

  const {insurance: {carModels}} = useSelector( state => state);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     searchedCars: [],
  //   };
  // }

  // componentDidMount() {
  //   console.log('car models ', this.props.brandId);
  //   this.props.getCarModel(this.props.brandId);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('FDFDFD - componentDidUpdate', this.state.searchedCars.length);
  //   if (this.state.searchedCars.length < 1) {
  //     this.setState({
  //       searchedCars: this.props.carModels.slice(0, 5),
  //     });
  //   }
  // }

  useEffect( () => {
    if (carModels) {
      setFilteredModels(carModels.slice(0, 5));
    }
  }, [carModels])

  const onSearchModels = searchedText => {
    var searchedItems = carModels.filter(function (item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      setFilteredModels([]);
    }
    // carModels.some(e => {
    //   if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
    //     // this.onSelectCity(e)
    //     setFilteredModels([]);
    //   }
    // });
    setFilteredModels(searchedItems.slice(0, 5));
    // setState({searchedCars: searchedItems.slice(0, 5)});
  };

  const onChangeModelName = title => {
    if (title.length >= 1) {
      onSearchModels(title);
    }
    setCarModel(title);
  };

  const onChangeCarModel = model => {
    props.onChangeCarModel(model);
    Actions.pop();
  };

  // const onSelectCar = brandObj => {
  //   this.setState({searchedCars: []});
  //   this.props.selectBrand(brandObj);
  //   Actions.pop();
  // };

  const renderList = () => {
    if (filteredModels.length) {
      return filteredModels.slice(0, 5).map(model => {
        return (
          <TouchableWithoutFeedback
            key={model.title}
            onPress={() => onChangeCarModel(model)}>
            <View
              style={{
                height: 50,
                width: '100%',
                paddingHorizontal: 15,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#333',
              }}>
              <Text
                style={{
                  width: '100%',
                  fontFamily: 'SFUIText-Medium',
                  fontSize: 14,
                  color: '#222',
                }}>
                {model.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      });
    }
  };

  return (
    <MainCard>
      <Header goToMain={DEVICE_OS == iOS ? true : false}>Модель авто</Header>
      <CardItem
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            paddingHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#189"
          }}>
          <TextInput
            style={{
              width: '100%',
              borderBottomColor: '#414244',
              borderBottomWidth: 1,
            }}
            placeholder={'Введите модель авто'}
            onChangeText={onChangeModelName}
            value={carModel}
          />
        </View>
        {renderList()}
      </CardItem>
    </MainCard>
  );
};

// const mapStateToProps = ({insurance}) => {
//   return {
//     carModels: insurance.carModels,
//     carModel: insurance.carModel,
//   };
// };

// export default connect(mapStateToProps, {
//   getCarModel,
//   changeCarBrand,
//   selectBrand,
//   selectModel,
// })(CarsModelsScreen);
export default CarModels
