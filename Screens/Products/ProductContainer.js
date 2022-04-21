import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import ProductList from './ProductList'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
const data = require('../../assets/products.json')

const ProductContainer = () => {

    const styles =  StyleSheet.create({
        container: {
            flexWrap: 'wrap',
            backgroundColor: 'gainsboro',
        },
        listContainer: {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            backgroundColor: 'gainsboro'
        }
    })

const [products, setProducts] = useState([]);
useEffect(() => {
    setProducts(data);
return () => {
    setProducts([])
}
}, [])

return (
    <View styles={styles.container}>
        <Text>Produkty dla Ciebie</Text>
       <View style={styles.listContainer}> 
        <FlatList numColumns={2}
            data = {products} 
            renderItem = {({item}) => <ProductList key={item.id} 
            item={item} />}
            keyExtractor = {item => item.name}/>
        </View>
    </View>

)
}

export default ProductContainer