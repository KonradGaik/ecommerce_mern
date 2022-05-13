import jwt_decode from 'jwt-decode'
import Toast from 'react-native-toast-message'
import baseURL from '../../assets/common/baseUrl'
import { AsyncStorage } from 'react-native';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (login, dispatch) => {
    fetch(`${baseURL}users/login`,{
    method: "POST",
    body: JSON.stringify(user),
    header: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
    }).then((res)=> res.json()).then((data)=> {
    if(data){
        const token = data.token;
        AsyncStorage.setItem("jwt", token)
        const decoded = jwt_decode(token)
        dispatch(setCurrentUser(decoded, user))
    }else{
        logoutUser(dispatch)
    }
    }).catch((err)=> {
        Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Wprowadź poprawne dane',
            text2: ''
        })
        logoutUser(dispatch)
    })
}

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then((res)=> {
        res.json()
    }).then((data)=> console.log(data))
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt")
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}