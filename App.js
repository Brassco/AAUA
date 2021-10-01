import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {I18nextProvider} from 'react-i18next';

import i18n from './src/i18n';

import reducers from './src/reducers';

import Router from './src/Router';

export default class App extends Component<{}> {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider
          store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Router />
        </Provider>
      </I18nextProvider>
    );
  }
}
