import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  linksContainer: {
    flex: 1,
    marginLeft: 29,
  },
  rightContainer: {
    width: 59,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imageContainer: {
    paddingTop: 21,
    alignSelf: 'stretch',
    // height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    // marginBottom: 8,
    fontSize: 16,
    color: '#423485',
    fontFamily: 'Roboto-Bold',
  },
});
