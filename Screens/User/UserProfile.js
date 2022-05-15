import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from'@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
import { useEffect } from 'react/cjs/react.development';
 
const UserProfile = (props) => {
 
    const context = useContext(AuthGlobal);
 
    const [userProfile, setUserProfile] = useState()
 
    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Logowanie")
        }
        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Uzytkownik: ${res}` },
                    }).then((user) => setUserProfile(user.data))
                    //.then((user) =>console.log(user.data));
            })
            .catch((error) => console.log(error));
        return () => {
            setUserProfile();
        }
    }, [context.stateUser.isAuthenticated])
 
    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email:{userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Numer telefonu:{userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title={"Wyloguj"}
                        onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)
 
                        ]} />
                </View>
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    subContainer:{
        alignItems:'center',
        marginTop:60
    }
})
 
export default UserProfile;
