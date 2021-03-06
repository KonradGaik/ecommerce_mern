import React, { useEffect, useState, useContext} from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { Item, Picker, Toast } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'

const countries = require("../../../assets/countries.json");

const Checkout = (props) => {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage('pl');
    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ zip, setZip ] = useState();
    const [ country, setCountry ] = useState();
    const [ phone, setPhone ] = useState();
    const [ user, setUser ] = useState();

    useEffect(() => {
        setOrderItems(props.cartItems)
        let isMounted = true
        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            zip,
        }
        props.navigation.navigate("Zapłać", {order: order })
    }

    return (
        <KeyboardAwareScrollView
             viewIsInsideTabBar={true}
             extraHeight={200}
             enableOnAndroid={true}
        >
            <FormContainer title={"Adres dostawy"}>
                <Text>{t('phoneNumber')}</Text>
                <Input
                    placeholder={"Numer telefonu"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                 <Text>{t('address1')}</Text>
                   <Input
                    placeholder={"Adres dostawy 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                 <Text>{t('address1')}</Text>
                   <Input
                    placeholder={"Adres dostawy 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                 <Text>{t('city')}</Text>
                   <Input
                    placeholder={"Miasto"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                 <Text>{t('zipcode')}</Text>
                   <Input
                    placeholder={"Kod pocztowy"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                        style={{ width: undefined }}
                        selectedValue={country}
                        placeholder="Wybierz swoj kraj"
                        placeholderStyle={{ color: '#007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setCountry(e)}
                    >
                        {countries.map((c) => {
                            return <Picker.Item 
                                    key={c.code} 
                                    label={c.name}
                                    value={c.name}
                                    />
                        })}
                    </Picker>
                </Item>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Potwierdź" onPress={() => checkOut()}/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout)