import React from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

import {StyleSheet, View} from 'react-native';
import {Spiner} from '@aaua/components/common';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const CustomCallout = props => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.bubble}>
        <WebView
          startInLoadingState={true}
          renderLoading={() => <Spiner />}
          style={{height: 100, width: 230}}
          source={{uri: props.uri}}
        />
      </View>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />
    </View>
  );
};

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    height: 140,
    borderRadius: 70,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // paddingVertical: 12,
    // borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 0.2,
    overflow: 'hidden',
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -1.2,
  },
});

export default CustomCallout;
