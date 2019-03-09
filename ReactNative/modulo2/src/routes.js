import {createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Welcome from './pages/Welcome';
import Repositories from './pages/Repositories';
import Organizations from './pages/Organizations';
import Readme from './pages/Readme';
import {colors} from './styles';

const Routes = (userLogin = false) => createAppContainer(createSwitchNavigator({
  Welcome,
  Readme,
  User: createBottomTabNavigator({
    Repositories,
    Organizations,
  }, {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.white,
      inactiveTintColor: colors.whiteTransparent,
      style: {
        backgroundColor: colors.secondary,
      },
    },
  }),
},
{
  initialRouteName: userLogin ? 'User' : 'Welcome',
}
));

export default Routes;


