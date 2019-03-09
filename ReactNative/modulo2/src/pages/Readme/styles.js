import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
  },

  header: {
    height: 54 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    backgroundColor: colors.white,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darker,
    justifyContent: 'center',
    // alignContent: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  infoText: {
    color: colors.dark,
    fontSize: 12,
    marginLeft: metrics.baseMargin / 2,
  },

  md: {
    fontSize: 8,
  },

  icon: {
    color: colors.darker,
  },
});

export default styles;
