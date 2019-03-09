import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin,
  },

  titleContainer: {
    flexDirection: 'row',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  infoContainer: {
    flexDirection: 'row',
    marginTop: metrics.baseMargin,
  },

  info: {
    flexDirection: 'row',
    marginRight: metrics.baseMargin,
    alignItems: 'center',
  },

  infoIcon: {
    color: colors.dark,
    fontSize: 12,
  },

  infoText: {
    color: colors.dark,
    fontSize: 12,
    marginLeft: metrics.baseMargin/2,
  },

  button: {
    marginLeft: metrics.baseMargin / 2,
  },

  iconSeta: {
    color: colors.dark,
    fontSize: 12,
    justifyContent: 'flex-end',
  },
});

export default styles;
