import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Order from "../Screens/Admin/Order"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/ProductForm"
import Categories from "../Screens/Admin/Categories"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Produkty"
                component={Products}
                options={{
                    title: "Products"
                }}
            />
            <Stack.Screen name="Kategorie" component={Categories} />
            <Stack.Screen name="Zamówienia" component={Order} />
            <Stack.Screen name="Formularz produktu" component={ProductForm} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}