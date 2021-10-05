import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import {ModalCard, MapButton} from '@aaua/components/common';

import styles from './styles';

const MapFiltersComponent = ({
  selectedCategory,
  selectCategory,
  onCloseModal,
}) => {
  const [category, setCategory] = useState(selectedCategory);

  const {
    discounts: {categories: categoriesList},
  } = useSelector(state => state);

  const onSelectCategory = cat => {
    setCategory(cat);
  };

  const applyFilters = () => {
    selectCategory(category);
    onCloseModal();
  };

  const renderRows = () => {
    const categories = [...categoriesList];
    var i = 0;
    var rows = [];
    while (i < categories.length) {
      rows.push(categories.slice(i, i + 3));
      i = i + 3;
    }
    return categories.map((row, index) => {
      return (
        <MapButton
          key={index}
          style={{
            backgroundColor: category.id == row.id ? '#ffc200' : '#ffffff',
          }}
          onPress={() => onSelectCategory(row)}>
          {row.title}
        </MapButton>
      );
    });
  };

  const {modalCard, modalRow} = styles;
  
  return (
    <ModalCard style={modalCard}>
      <View style={styles.modalRow}>{renderRows()}</View>

      <View
        style={[
          modalRow,
          {
            flex: 2,
            marginBottom: 12,
          },
        ]}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onCloseModal}>
          <Text
            style={{
              fontFamily: 'SFUIText-Regular',
              color: '#423486',
              fontSize: 16,
            }}>
            Закрыть
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={applyFilters}>
          <Text
            style={{
              fontFamily: 'SFUIText-Semibold',
              color: '#423486',
              fontSize: 16,
            }}>
            Применить
          </Text>
        </TouchableOpacity>
      </View>
    </ModalCard>
  );
};

export default MapFiltersComponent;
