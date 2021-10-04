import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {CardItem, Spiner} from '@aaua/components/common';
import Item from '@aaua/components/Discounts/Item';

import {loadCategories, selectCategory} from '@aaua/actions/DiscountsAction';

import {getImageByCategoryId} from '@aaua/helpers/ImageHelper';

const CategoriesScreen = props => {

  const dispatch = useDispatch();

  const {auth, discounts} = useSelector(state => state);
  const {token} = auth.user;
  const {categories, loadingCategories: loading} = discounts;

  useEffect(() => {
    if (token) {
      console.log('----CategoriesScreen', token);
      dispatch(loadCategories(token));
    }
  }, []);

  const openDiscountCategory = category => {
    selectCategory(token, category);
  };

  const renderRows = () => {
    const categoriesList = [...categories];
    var i = 0;
    var rows = [];
    while (i < categoriesList.length) {
      rows.push(categoriesList.slice(i, i + 3));
      i = i + 3;
    }
    return rows.map((row, index) => {
      return (
        <CardItem
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          key={index}>
          <Item
            onPress={() => openDiscountCategory(row[0])}
            imageSrc={getImageByCategoryId(row[0].id)}>
            {row[0].title}
          </Item>
          {row[1] !== undefined && (
            <>
              <Item
                onPress={() => openDiscountCategory(row[1])}
                imageSrc={getImageByCategoryId(row[1].id)}>
                {row[1].title}
              </Item>
              <Item
                onPress={() => openDiscountCategory(row[2])}
                imageSrc={getImageByCategoryId(row[2].id)}>
                {row[2].title}
              </Item>
            </>
          )}
        </CardItem>
      );
    });
  };

  const renderContent = () => {
    if (!loading) {
      return (
        <ScrollView
          style={{
            paddingLeft: 22,
            paddingRight: 22,
          }}>
          {renderRows()}
        </ScrollView>
      );
    } else {
      return <Spiner />;
    }
  };

  return renderContent();
};

// const mapStateToProps = ({ auth, discounts }) => {
//   return {
//     token: auth.user.token,
//     categories: discounts.categories,
//     loading: discounts.loadingCategories,
//   };
// };

// export default connect(mapStateToProps, { loadCategories, selectCategory })(
//   CategoriesScreen
// );

export default CategoriesScreen;
