import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const homeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.secondtitle}>Only logged in users can see this.</Text>
    </View>
  )
}

export default homeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    }
    ,
    secondtitle:{
        fontSize: 16,
    }
})