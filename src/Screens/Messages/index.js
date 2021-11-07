import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ListView,
  Platform,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {MainCard, Spiner, CardItem, Header} from '@aaua/components/common';
import ListItem from './ListItem';

import {loadMessages} from '@aaua/actions/MessagesActions';

import I18n from '@aaua/i18n';

let listener = null;

const MessagesList = () => {
  const dispatch = useDispatch();

  const {
    auth: {
      user: {token},
    },
    messages: {messages, loading, error},
  } = useSelector(state => state);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    dispatch(loadMessages(token));
    if (Platform.OS == 'android' && listener == null) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (Actions.currentScene == 'messagesList') {
          Actions.mainScreen();
          return true;
        }
      });
    }
    return () => {
      listener = null;
    };
  }, []);

  const timeConverter = UNIX_timestamp => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
    return time;
  };

  const handleRefresh = () => {
    console.log('handleRefresh messages');

    setSeed(seed + 1);
    setIsRefreshing(true);
    dispatch(loadMessages(token, 5));
  };

  const renderRow = item => {
    console.log('---renderRow messages ---', item);
    return (
      <ListItem
        key={item.item.id}
        phone={''}
        date={timeConverter(item.item.title.created_at)}
        viewed={item.item.title.viewed}
        id={item.item.title.id}>
        {item.item.title.text}
      </ListItem>
    );
  };

  const renderFlatList = () => {
    
    return (
      <CardItem>
        <FlatList
          style={{
            marginTop: 15,
          }}
          initialNumToRender={6}
          data={messages}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRow}
          onEndThreshold={0}
        />
      </CardItem>
    );
  };

  return (
    <MainCard>
      <Header burger>{I18n.t('messages_screen.header')}</Header>
      {loading ? renderFlatList() : <Spiner />}
    </MainCard>
  );
};

export default MessagesList;
