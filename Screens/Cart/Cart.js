import React from "react";
import { Text, View } from 'react-native';

import {connect} from 'react-redux'
import cartItems from "../../Redux/Reducers/cartItem";

const Cart = (props) => {
    return(
        <View style={{flex: 1}}>
       {props.cartItems.map(x => {
           return(
               <Text>
                   {x.product.name}
               </Text>
           )
       })}
       </View>
    )
}

const mapStateToProps = (state) => {
    const {cartItems} = state;
    return{
        cartItems: cartItems
    }
}

export default connect(mapStateToProps, null)(Cart);