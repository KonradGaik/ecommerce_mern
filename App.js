import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, LogBox, View } from 'react-native';
//redux
import { Provider } from 'react-redux';
import store from './Redux/store'

//context
import Auth from './Context/store/Auth';


//NAVIGATORS
import Main from './Navigators/Main'


//SCREENS
import Header from '../ecommerce_mern/Shared/Header'
import ProductContainer from './Screens/Products/ProductContainer'

LogBox.ignoreAllLogs(true)

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast refs={(ref)=> Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
   
  );
}


