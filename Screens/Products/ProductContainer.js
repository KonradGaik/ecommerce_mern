import React, {useState, useCallback} from 'react'
import {View, StyleSheet, ActivityIndicator,ScrollView, FlatList, Dimensions} from 'react-native'
import ProductList from './ProductList'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
import SearchedProduct from './SearchedProduct'
import { useFocusEffect } from '@react-navigation/native'
import Banner from '../../Shared/Banner'
import CategoryFilter from './CategoryFilter'
const data = require('../../assets/products.json')


import baseURL from '../../assets/common/baseUrl'
import axios from 'axios'


const ProductContainer = (props) => {

    const styles =  StyleSheet.create({
        container: {
            flexWrap: 'wrap',
            backgroundColor: 'gainsboro',
        },
        listContainer: {
            height: height,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            backgroundColor: 'gainsboro'
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    }) 

    let {height} = Dimensions.get('window')
    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [focus, setFocus] = useState([])
    const [categories, setCategories] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const [active, setActive] = useState()
    const [initialState, setInitialState] = useState([])
    const [loading, setLoading] = useState(true)

useFocusEffect((
useCallback(
    () => {
        setFocus(false)
        setActive(-1)
    
        axios.get(`${baseURL}products`).then((res)=>{
        setProducts(res.data)
        setProductsFiltered(res.data)
        setProductCategory(res.data)
        setInitialState(res.data)
        setLoading(false)
        }).catch((err)=>{
            console.log('Blad API produkty',err)
        })
    
        axios.get(`${baseURL}categories`).then((res)=>{
            setCategories(res.data)
        }).catch((err)=>{
            console.log('Blad API kategorie',err)
        })
    
    return () => {
        setProducts([])
        setProductsFiltered([])
        setFocus()
        setCategories([])
        setActive()
        setInitialState()
        
    }
    
},
[],
)
))
    


const searchProduct = (text) => {
    setProductsFiltered(
        products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
}

const openList = () => {
    setFocus(true);
}

const onBlur = () => {
    setFocus(false);
}

//CATEGORIES
const changeCategory = (category) => {
    {
      category === "all"
        ? [setProductCategory(initialState), setActive(true)]
        : [
            setProductCategory(
              products.filter((i) => i.category._id === category),
              setActive(true)
            ),
          ];
    }
  };


return (
<>
 {loading == false ? (
      <Container> 
      <Header searchBar rounder>
  <Item rounded>
      <Icon name="ios-search" />
      <Input placeholder='Wyszukaj produkt' 
      onFocus={openList}
      onChangeText={(text) => searchProduct(text)}
      />
      {focus == true  ? (
          <Icon onPress={onBlur} name="ios-close" />
      ): null}
  </Item>
      </Header>
      {focus == true ? (
      <SearchedProduct 
      navigation={props.navigation}
      productsFiltered={productsFiltered} />
      ): (
          <ScrollView>
      <View>
         <View>
             <Banner />
         </View>
         <View>
              <CategoryFilter
              categories={categories} 
              CategoryFilter={changeCategory}
              productCategory={productCategory}
              active={active}
              setActive={setActive}/>
         </View>
         {productCategory.length > 0 ? (
          <View style={styles.listContainer}> 
              {productCategory.map((item)=>{
                  return(
                      <ProductList 
                      navigation={props.navigation}
                      key={item._id.$oid}
                      item={item}
                      />
                  )
              })}
          </View>
         ) : (
             <View style={[styles.center,{height: height/2}]}>
                 <Text>Nie znaleziono produktów</Text>
              </View>
         )}
         
      </View>
      </ScrollView>
      )}
      </Container>
  ): (
     //LOADING 
     <Container style={[styles.center, {backgroundColor: "#f2f2f2"}]}>
         <ActivityIndicator size="large" 
         color= "blue"
         />
     </Container>
  )}
  </>
)}
   

export default ProductContainer