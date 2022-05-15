import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import HomeNavigatior from './HomeNavigator'
import CartNavigator from './CartNavigator'
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import { View } from 'native-base';
import cartItems from '../Redux/Reducers/cartItem';
import CartIcon from '../Shared/CartIcon';
import HomeNavigator from './HomeNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator()

const Main = () => {

  const context = useContext(AuthGlobal)
    return(
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
            keyboardHidesTabBar: true,
            showLabel: false,
            activeTintColor: '#e91e63',
            "tabBarHideOnKeyboard": true,
            "tabBarActiveTintColor": "#e91e63",
            "tabBarShowLabel": false,
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ]
        }}
        >
            <Tab.Screen
        name="Strona główna"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
            {context.stateUser.user.isAdmin === true ? (
  <Tab.Screen
  name="Admin"
  component={AdminNavigator}
  options={{
    tabBarIcon: ({ color }) => (
      <Icon name="cog" color={color} size={30} />
    ),
  }}
/>
            ): null}
        

<Tab.Screen
        name="Uzytkownik"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />

<Tab.Screen
        name="Koszyk"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />

        </Tab.Navigator>
    )
}

export default Main;