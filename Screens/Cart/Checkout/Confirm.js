import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView,Button } from 'react-native';
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'

let {width, height} = Dimensions.get('window')
const Confirm = (props) => {

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Strona główna");
          }, 500);
    }

const confirm = props.route.params

    return(
        <ScrollView contentContainerStyle={styles.conatiner}>
            <View style={styles.titleContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Potwierdź zamówienie
                </Text>
                {props.route.params ?
                <View style={{borderWidth:1, borderColor: 'orange'}}>
                    <Text style={styles.title}>
                        Adres dostawy:
                    </Text>
                    <View style={{padding:8}}>
                        <Text>Adres 1: {confirm.order.order.shippingAddress1}</Text>
                        <Text>Adres 2: {confirm.order.order.shippingAddress2}</Text>
                        <Text>Numer telefonu: {confirm.order.order.phone}</Text>
                        <Text>Miasto: {confirm.order.order.city}</Text>
                        <Text>Kod pocztowy: {confirm.order.order.zip}</Text>
                        <Text>Kraj: {confirm.order.order.country}</Text>
                    </View>
                    <Text style={styles.shipping}>
                        Produkty
                    </Text>
                    {confirm.order.order.orderItems.map((x)=> {
                        return <ListItem
                        style={styles.listItem}
                        key={x.product.name}
                        avatar
                        >
                            <Left>
                                <Thumbnail source={{uri: x.product.image}}/>
                            </Left>
                            <Body style={styles.body}>
                                <Left>
                                    <Text>
                                        {x.product.name}
                                    </Text>
                                </Left>
                                <Right>
                                    <Text>
                                        {x.product.price} PLN
                                    </Text>
                                </Right>
                            </Body>
                        </ListItem>
                    })}
                </View> : null}
                <View style={{alignItems:'center', margin: 20}}>
                    <Button title={'Potwierdź zamówienie'} onPress={confirmOrder} />
                </View>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    conatiner: {
        height: height,
        padding: 8 ,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    shipping: {},
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default connect(null, mapDispatchToProps)(Confirm);