import React from 'react'
import {StyleSheet, Image, SafeAreaView, View} from 'react-native'

const Header = () => {
 
    const styles = StyleSheet.create({
        header: {
            width: '100%',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            padding: 0,
            marginTop:10
        }
    })

    return(
        <SafeAreaView style={styles.header}>
            <Image 
            source={require('../assets/brewedup.png')}
            resizeMode="contain"
            style={{ height:150 }} />
        </SafeAreaView>
    )
}



export default Header;