import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import { View, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from "native-base";
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as actions from '../../Redux/Actions/cartActions'
import { useTranslation } from 'react-i18next';
let { height, width } = Dimensions.get('window')

const Cart = (props) => {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage('pl');
    let total = 0;
props.cartItems.forEach(cart => {
    return (total += cart.product.price)
})
 

return(
    <>
    {props.cartItems.length ? (
        <Container>
            <H1 style={{alignSelf: 'center'}}> {t('basket')} </H1>
            <SwipeListView data={props.cartItems}
             renderItem={(data) => <CartItem item={data} />} 
             renderHiddenItem={(data) => (
                 <View style={styles.hiddenContainer}>
                     <TouchableOpacity style={styles.hiddenButton}
                     onPress={()=> props.removeFromCart(data.item)}>
                         <Icon name="trash" color={"white"} size={30} />
                     </TouchableOpacity>
                 </View>
             )}
             disableRightSwipe={true}
             previewOpenDelay={3000}
             friction={1000}
             tension={40}
             leftOpenValue={75}
             stopLeftSwipe={75}
             rightOpenValue={-75}
             />

            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>
                        {total.toFixed(2)} PLN
                    </Text>
                </Left>
                <Right>
                    <Button title="Wyczyść"
                    onPress={()=> props.clearCart() } />
                </Right>
                <Right>
                    <Button title="Zapłać" onPress={()=>{
                        props.navigation.navigate('Checkout')
                    }} />
                </Right>
            </View>
        </Container>
    ):(
        <Container style={styles.emptyContainer}>
            <Text> {t('yourBasketIsEmpty')} </Text>
        </Container>
    )}
    </>
)
}

const mapToDispatchToProps = (dispatch) => {
return{
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
}
}

const mapStateToProps = (state) => {
    const {cartItems} = state;
    return{
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
})

export default connect(mapStateToProps, mapToDispatchToProps)(Cart);

