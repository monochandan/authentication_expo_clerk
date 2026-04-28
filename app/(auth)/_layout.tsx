import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import {useAuth} from '@clerk/expo'

export default function AuthLayout() {
    console.log("Auth Layout")

    const {isSignedIn, isLoaded} = useAuth();
    if(isSignedIn){
        return <Redirect href='/'/>
    }
  return (
    <Stack>
        <Stack.Screen name='sign-in' options={{headerShown: false, title: 'Sign In'}}/>
        <Stack.Screen name='sign-up' options={{ headerShown: false, title: 'Sign Up'}}/>
    </Stack>
  );
}
