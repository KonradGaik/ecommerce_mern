import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//redux
import { Provider } from 'react-redux';
import store from './Redux/store'

//NAVIGATORS
import Main from './Navigators/Main'


//SCREENS
import Header from '../ecommerce_mern/Shared/Header'
import ProductContainer from './Screens/Products/ProductContainer'
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Header />
      <Main />
    </NavigationContainer>
    </Provider>
  );
}


