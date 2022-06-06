import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base';
import { useTranslation } from 'react-i18next';
let { width } = Dimensions.get("window")

const SearchedProduct = props => {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage('pl');
    const { productsFiltered } = props;
    return(
        <Content style={{width: width}}>
            { productsFiltered.length > 0 ? (
                productsFiltered.map( item => (
                    <ListItem
                    onPress={() => {
                        props.navigation.navigate("Product Detail", {item: item})
                    }}
                    key={item._id.$oid}
                    avatar>
                    <Left>
                        <Thumbnail 
                        source={{uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                        />
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.description}</Text>
                    </Body>

                    </ListItem>
                ))
            ): (
                <View>
                    <Text style={{alignSelf: 'center'}}>{t('weDidntFind')}</Text>
                </View>
            )}
        
        </Content>
    )}

    const styles = StyleSheet.create({
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

export default SearchedProduct;