import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {CardItem, Spiner} from '@aaua/components/common';
import {useSelector, useDispatch} from 'react-redux';

import Card from '@aaua/components/Discounts/Card';
// import {RATIO} from '../../styles/constants';
import {loadCards, selectCard} from '@aaua/actions/DiscountsAction';
import {BASE_URL} from '@aaua/actions/constants';

const DiscontsList = () => {
  const {auth, discounts} = useSelector(state => state);
  const {loading, discountsCards} = discounts;

  useEffect(() => {
    loadCards(auth.user.token);
  }, []);

  const renderRow = items => {
    return items.map(item => {
      return (
        <Card
          key={item.id}
          onPress={() => selectCard(item)}
          imageSrc={{uri: BASE_URL + item.logo}}
        />
      );
    });
  };

  const renderRows = () => {
    if (discountsCards === undefined) {
      return null;
    }

    const cards = [...discountsCards];
    var i = 0;
    var rows = [];
    while (i < cards.length) {
      rows.push(cards.slice(i, i + 2));
      i = i + 2;
    }

    return rows.map((row, index) => {
      return (
        <CardItem
          style={{
            flexDirection: 'row',
            justifyContent: row.length > 1 ? 'space-around' : 'flex-start',
            alignItems: 'center',
            marginTop: 27 * RATIO,
            marginLeft: row.length > 1 ? 0 : '3%',
          }}
          key={index}>
          {renderRow(row)}
        </CardItem>
      );
    });
  };

  const renderContent = () => {
    if (!loading) {
      return (
        <ScrollView
          style={{
            flex: 1,
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

export default DiscontsList;
