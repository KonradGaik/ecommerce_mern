import React, {useState} from 'react';
import { View, Button } from 'react-native';
import { Text, Container, ListItem, Header, Radio, Right, Left, Content, Picker, Icon, Body, Title } from 'native-base'

const methods = [
    { name: 'Gotówka przy odbiorze', value: 1},
    { name: 'Płatność kartą', value: 2},
    { name: 'Przelew', value: 3}
]

const paymentCards = [
 {name: 'Apple Pay/Google Pay', value: 1},
 {name: 'Visa', value: 2},
 {name: 'MasterCard', value: 3},
 {name: 'Inne', value: 4},
]
const Payment = (props) => {
    const order = props.route.params;
    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    return(
        <Container>
            <Header>
                <Body>
                    <Title>
                        Wybierz metodę płatności
                    </Title>
                </Body>
            </Header>

            <Content>
                {methods.map((item, index)=> {
                    return(
                        <ListItem onPress={()=> setSelected(item.value) }>
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
                    <Picker mode="dropdown"
                    iosIcon={<Icon name={"arrow-down"}
                    headerStyle={{backgroundColor: 'orange'}}
                    headerBackButtonTextStyle={{color:'#fff'}} />}>

                    </Picker>
                )}
            </Content>
        </Container>
    )
}

export default Payment;