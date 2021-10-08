import React, {useState, useEffect} from 'react';
// import {View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {useTranslation} from 'react-i18next';

import {
  MainCard,
  CardItem,
  ButtonRoundet,
  //   LabelOnInput,
  Header,
  Autocomplete,
  DropDown,
  ClickableTextRow,
} from '@aaua/components/common';
import TextInput from '@aaua/components/common/Inputs/TextInput';
import {
  changeYear,
  changeCar,
  changeCarBrand,
  orderKasko,
  selectBrand,
  getCarModel,
  selectModel,
  resetData,
} from '@aaua/actions/InsuranceAction';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';
import {getBrands} from '@aaua/actions/CitiesBrands';
import {showAlert} from '@aaua/components/Modals';

import styles from './styles';

const Kasko = props => {
  const {t} = useTranslation();
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       enableScrollViewScroll: true,
  //       searchedCities: [],
  //       searchedBrands: [],
  //       rowHeight: DEVICE_OS == iOS ? 1 : 2,
  //       carPrice: 0,
  //     };

  //     this.onChangeCarPrice = this.onChangeCarPrice.bind(this);
  //     this.onOrder = this.onOrder.bind(this);
  //   }

  const {
    auth: {
      user: {token},
    },
    insurance: {
    //   car,
      //   carBrand,
    //   carBrandId,
    //   year,
    //   carModels,
    //   carModel,
      kaskoOrderSuccess,
    },
    citiesBrands: {brands},
    // carPrice: insurance.carPrice,
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const {textInputWrapper, buttonStyle} = styles;

  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true);
  const [carPrice, setCarPrice] = useState('0');
  const [carBrand, setCarBrand] = useState('');
  const [carYear, setCarYear] = useState();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);

  useEffect(() => {
    if (kaskoOrderSuccess) {
      showAlert('Спасибо', 'Ваша заявка принята', 'Закрыть', () => {
        resetData();
        Actions.insuranceCategories();
      });
    }
  }, [kaskoOrderSuccess]);

  useEffect(() => {
    if (selectedBrand) {
      setCarBrand(selectedBrand.title);
    }
  }, [selectedBrand]);

//   const onChangeCar = itemValue => {
//     changeCar(itemValue);
//   };

  const onSelectBrand = brand => {
    // this.setState({searchedBrands: [], rowHeight: 2});
    // setSearchedBrands([]);
    // selectBrand(brand);
    // console.log('----onSelectBrand----', brand);
    setSelectedBrand(brand);
    dispatch(getCarModel(brand.id));
  };

//   const onChangeYear = year => {
//     changeYear(year);
//   };

  const onChangeCarModel = model => {
    console.log('--- KASKO onChangeCarModel', model);
    setSelectedCarModel(model);
  };

  const onChangeCarPrice = price => {
    setCarPrice(Number(price));
  };

  const onOrder = () => {
    const orderData = {
      token: token,
      bid: {
        brand_id: carBrand.id,
        modela_id: selectedCarModel.id,
        year: carYear,
        price: carPrice,
      },
    };
    dispatch(orderKasko(orderData));
  };

  const renderCarModel = () => {
    if (carBrand) {
      return (
        <ClickableTextRow
          onPress={() =>
            Actions.InsuranceCarsModelsScreen({
              brandId: carBrand.id,
              onChangeCarModel: onChangeCarModel,
            })
          }
          label={t('insurance_screen.kasko.car_model.title')}
          value={selectedCarModel ? selectedCarModel.title : null}
          placeholder={t('insurance_screen.kasko.car_model.placeholder')}
        />
      );
    } else {
      return (
        <TextInput
          label={t('insurance_screen.kasko.car_model.title')}
          placeholder={t('insurance_screen.kasko.car_model.placeholder')}
          editable={false}
        />
      );
    }
  };

  return (
    <MainCard>
      <Header back>КАСКО</Header>
      <CardItem style={textInputWrapper}>
        <TextInput
          label={t('insurance_screen.kasko.car_price')}
          placeholder={'0'}
          keyboardType="numeric"
          onChangeText={onChangeCarPrice}
          value={carPrice}
        />
      </CardItem>
      <CardItem style={textInputWrapper}>
        <ClickableTextRow
          onPress={() =>
            Actions.InsuranceCarsScreen({onSelectBrand: onSelectBrand})
          }
          label={t('insurance_screen.kasko.car_brand.title')}
          value={carBrand ? carBrand : null}
          placeholder={t('insurance_screen.kasko.car_brand.placeholder')}
        />
      </CardItem>
      <CardItem style={textInputWrapper}>{renderCarModel()}</CardItem>
      <CardItem style={textInputWrapper}>
        <TextInput
          label={t('insurance_screen.kasko.car_year.title')}
          placeholder={'0000'}
          maxLength={4}
          keyboardType="numeric"
          onChangeText={setCarYear}
          value={carYear}
        />
      </CardItem>
      <CardItem
        style={{
          flex: DEVICE_OS == iOS ? 4 : 6,
          marginTop: 22,
        }}>
        <ButtonRoundet
          style={buttonStyle}
          textStyle={{color: '#1B1B1B'}}
          onPress={onOrder}>
          {t('insurance_screen.get_proposal')}
        </ButtonRoundet>
      </CardItem>
    </MainCard>
  );
};

export default Kasko;
