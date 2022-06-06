import React, {useState} from 'react';
import { View, Button } from 'react-native';
import { Text, Container, ListItem, Header, Radio, Right, Left, Content, Picker, Icon, Body, Title } from 'native-base'
import { useTranslation } from 'react-i18next';
const methods = [
    { name: 'Gotówka przy odbiorze', value: 1},
    { name: 'Przelew', value: 2},
    { name: 'Płatność kartą', value: 3},
    
]

const paymentCards = [
 {name: 'Apple Pay/Google Pay', value: 1},
 {name: 'Visa', value: 2},
 {name: 'MasterCard', value: 3},
 {name: 'Inne', value: 4},
]
const Payment = (props) => {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage('pl');
    const order = props.route.params;
    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    return(
        <Container>
            <Header>
                <Body>
                    <Title>
                        {t('setPaymentMethod')}
                    </Title>
                </Body>
            </Header>

            <Content>
                {methods.map((item, index)=> {
                    return(
                        <ListItem key={item.nam} onPress={()=> setSelected(item.value) }>
                            <Left>
                                <Text>
                                    {item.name}
                                </Text>
                            </Left>
                            <Right>
                                <Radio selected={selected==item.value} />
                                  
                            </Right>
                        </ListItem>
                    )
                })}
                {selected == 3 ? (
                   <Picker
                    mode="dropdown"
                    iosIcon={<Icon name={"arrow-down"} />}
                    headerStyle={{ backgroundColor: 'brown' }}
                    headerBackButtonTextStyle={{ color: '#fff' }}
                    headerTitleStyle={{ color: '#ccc' }}
                    selectedValue={card}
                    onValueChange={(x) => setCard(x)}
                   >
                       {paymentCards.map((c, index) => {
                           return <Picker.Item 
                           key={c.name} 
                           label={c.name} 
                           value={c.name} />
                       })}
                   </Picker>
               ) : null }
               <View style={{marginTop:60, alignSelf: 'center'}}>
                       <Button title={'Potwierdź'} onPress={()=> props.navigation.navigate('Potwierdź',{ order })} />
               </View>
            </Content>
        </Container>
    )
}

export default Payment;