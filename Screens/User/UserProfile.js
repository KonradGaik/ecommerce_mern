import React, {useContext, useState, useCallback, useEffect} from 'react'
import {View,Text, ScrollView, StyleSheet, Button} from 'react-native'
import { Container } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import axios from 'axios'
import baseURL from '../../assets/common/baseUrl'
import AuthGlobal from '../../Context/store/AuthGlobal'
import { logout } from "../../Context/actions/Auth.actions"

const UserProfile = (props) => {

    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState() 

    useEffect(()=> {
        if(context.stateUser.isAuthenticated === false ||
           context.stateUser.isAuthenticated === null ){
            props.navigation.navigate("Logowanie")
        }

        AsyncStorage.getItem("jwt").then((res)=> {
            axios.get(`${baseURL}users/${context.stateUser.user.sub}`,{
            headers: {
                Authorization: `Uzytkownik: ${res}`
            }}
            ).then((user)=> setUserProfile(user.data))
        }).catch((error)=>{
            console.log(error)
        })

        return() => {
            setUserProfile()
        }

    }, [context.stateUser.isAuthenticated])
    return(
        <Container>
            <ScrollView>
                <Text>
                    
                </Text>
            </ScrollView>
        </Container>
    )
}

export default UserProfile;