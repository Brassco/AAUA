import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {useTranslation} from 'react-i18next';

import {
  MainCard,
  CardItem,
  Header,
  Autocomplete,
} from '@aaua/components/common';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

import styles from './styles';

const CarsScreen = ({onSelectBrand}) => {
  
  const {t} = useTranslation();

  const defaultSearchedCars = [
    {id: '7', title: 'Audi'},
    {id: '10', title: 'BMW'},
    {id: '19', title: 'Chevrolet'},
    {id: '25', title: 'Daewoo'},
    {id: '37', title: 'Ford'},
  ];

  const [filteredCars, setFilteredCars] = useState(defaultSearchedCars);
  const [carBrand, setCarBrand] = useState('');

  const {
    citiesBrands: {brands},
  } = useSelector(state => state);

  const {itemContainer, itemText, textInputContainer, textInputStyle} = styles;

  const searchCars = searchedText => {
    var searchedItems = brands.filter(item => {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      setFilteredCars([]);
    }
    brands.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        setFilteredCars([]);
      }
    });
    setFilteredCars(searchedItems.slice(0, 5));
  };

  const onChangeCar = title => {
    if (title.length >= 2) {
      searchCars(title);
    }
    setCarBrand(title);
  };

  const onSelectCar = brandObj => {
    setFilteredCars([]);

    onSelectBrand(brandObj);
    Actions.pop();
  };

  const renderList = () => {
    return filteredCars.map(car => {
      return (
        <TouchableWithoutFeedback
          key={car.title}
          onPress={() => onSelectCar(car)}>
          <View style={itemContainer}>
            <Text style={itemText}>{car.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <MainCard>
      <Header goToMain={DEVICE_OS == iOS ? true : false}>
        {t('insurance_screen.kasko.select_car_brand_header')}
      </Header>
      <CardItem
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={textInputContainer}>
          <TextInput
            style={textInputStyle}
            autoCorrect={false}
            placeholderTextColor={'#414244'}
            placeholder={t('insurance_screen.kasko.select_car_brand')}
            onChangeText={onChangeCar}
            value={carBrand}
          />
        </View>
        {renderList()}
      </CardItem>
    </MainCard>
  );
};

// const mapStateToProps = ({citiesBrands}) => {
//   return {
//     brands: citiesBrands.brands,
//   };
// };

// export default connect(mapStateToProps, {
//   changeCarBrand,
//   selectBrand,
// })(CarsScreen);

export default CarsScreen;
