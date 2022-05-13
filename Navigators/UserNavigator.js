import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'


const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Logowanie"
            component={Login}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="Rejestracja"
            component={Register}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="Panel uzytkownika"
            component={UserProfile}
            options={{
                headerShown: false
            }}
            />

        </Stack.Navigator>
    )
}

export default function(){
    return <MyStack />
}