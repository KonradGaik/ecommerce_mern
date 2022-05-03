import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import HomeNavigatior from './HomeNavigator'
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
            name="Home"
            component={HomeNavigatior}
            options={{
                tabBatIcon: ({color}) => {
                    // <Icon 
                    // name="Home"
                    // style={{position: 'relative'}}
                    // color={color}
                    // size={30}
                    // />
                }
            }} />
            <Tab.Screen
            name="cart"
            component={HomeNavigatior}
            options={{
                tabBarIcon: ({color}) => {
                    <Icon
                    name="shoppingcart"
                    style={{position: 'relative'}}
                    color={color}
                    size={30}
                    />
                }
            }}
            />

            <Tab.Screen
            name="Admin"
            component={HomeNavigatior}
            options={{
                tabBarIcon: ({color}) => {
                    <Icon
                    name="cog"
                    color={color}
                    size={30}
                    />
                }
            }}
            />

            <Tab.Screen
            name="User"
            component={HomeNavigatior}
            options={{
                tabBarIcon: ({color}) => {
                    <Icon
                    name="user"
                    color={color}
                    size={30}
                    />
                }
            }}
            />

<Tab.Screen
        name="Cart"
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