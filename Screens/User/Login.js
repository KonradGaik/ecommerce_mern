import React, {useEffect, useState, useContext} from 'react'
import {View,Text, StyleSheet,Button} from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

import AuthGlobal from '../../Context/store/AuthGlobal'
import { loginUser } from '../../Context/actions/Auth.actions'
import Auth from '../../Context/store/Auth'

const Login = (props) => {

    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    
    useEffect(() => {
        if(context.stateUser.isAuthenticated === true){
            props.navigation.navigate("Uzytkownik")
        }
    }, [context.stateUser.isAuthenticated])
    const handleSubmit = () => {
        const user = {
            email,
            password
        }

        if(email === "" || password === "" ){
            setError("Proszę uzupełnić informacje.")
        }else{
            loginUser(user, context.dispatch)
        }

    }
    return(
        <FormContainer title={"Login"}>
            <Input 
            placeholder={"Podaj e-mail"}
            name={"email"}
            id={"email"}
            value={email}
            onChangeText= {(text)=> setEmail(text.toLowerCase())} />

            <Input
            placeholder={"Wprowadź hasło"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            value={password}
            onChangeText={(text)=> setPassword(text)} />
        <View style={styles.buttonGroup}>
            {error ? <Error message={error}/> : null}
                <Button title="Zaloguj" onPress={()=> handleSubmit()} />
        </View>
        <View style={[{ marginTop: 40}, styles.buttonGroup]}>
        <Text style={styles.middleText}>Nie masz konta?</Text>
        <Button title="Zarejestruj się" 
        onPress={()=> props.navigation.navigate("Rejestracja")} />
        </View>
        </FormContainer>
            
    )
}

const styles= StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center"
    }
})

export default Login;