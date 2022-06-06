import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView,Button } from 'react-native';
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import baseURL from '../../../assets/common/baseUrl'
import { useTranslation } from 'react-i18next';
let {width, height} = Dimensions.get('window')
const Confirm = (props) => {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage('pl');
    const finalOrder = props.route.params
    const confirmOrder = () => {
        
        const order = finalOrder.order.order
        console.log(order)
        axios.post(`${baseURL}orders`,order)
        .then((res)=>{
            if(res.status == 200 || res.status == 201){
                Toast.show({
                    topOffset: 60,
                    type: 'success',
                    text1: 'Zamówienie złozono',
                    text2: 'Gratulacje'
                })
                setTimeout(() => {
                    props.clearCart();
                    props.navigation.navigate("Koszyk");
                  }, 500);
            }
           
        }).catch(()=>{
            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: 'Błąd zamówienia',
                text2: 'Sprawdz czy uzupelniles wszystkie dane'
            })
        })

    }

// const confirm = props.route.params

    return(
        <ScrollView contentContainerStyle={styles.conatiner}>
            <View style={styles.titleContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {t('confirmOrder')}
                </Text>
                {props.route.params ?
                <View style={{borderWidth:1, borderColor: 'orange'}}>
                    <Text style={styles.title}>
                    {t('shippingAddress')}
                    </Text>
                    <View style={{padding:8}}>
                        <Text> {t('address1')}: {finalOrder.order.order.shippingAddress1}</Text>
                        <Text>{t('address2')}: {finalOrder.order.order.shippingAddress2}</Text>
                        <Text>{t('phoneNumber')}: {finalOrder.order.order.phone}</Text>
                        <Text>{t('city')}: {finalOrder.order.order.city}</Text>
                        <Text>{t('zipcode')}: {finalOrder.order.order.zip}</Text>
                        <Text>{t('country')}: {finalOrder.order.order.country}</Text>
                    </View>
                    <Text style={styles.shipping}>
                    {t('products')}
                    </Text>
                    {finalOrder.order.order.orderItems.map((x)=> {
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