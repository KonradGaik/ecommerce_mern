import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import HomeNavigatior from './HomeNavigator'
import CartNavigator from './CartNavigator'
import UserNavigator from './UserNavigator';
import { View } from 'native-base';
import cartItems from '../Redux/Reducers/cartItem';
import CartIcon from '../Shared/CartIcon';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator()

const Main = () => {
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
          

          <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />

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