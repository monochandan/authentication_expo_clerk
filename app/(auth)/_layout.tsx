import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../providers/AuthProviders'

export default function AuthLayout() {
    console.log("Auth Layout")

    const {isAuthenticated} = useAuth();
    
    if(isAuthenticated){
        return <Redirect href='/'/>
    }
  return (
    <Stack>
        <Stack.Screen name='sign-in' options={{headerShown: false, title: 'Sign In'}}/>
        <Stack.Screen name='sign-up' options={{ headerShown: false, title: 'Sign Up'}}/>
    </Stack>
  );
}
