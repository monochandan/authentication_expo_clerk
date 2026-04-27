import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../providers/AuthProviders'
// import { useAuth } from '@clerk/expo'

export default function AuthLayout() {
    console.log("Auth Layout")

    const {isAuthisenticated} = useAuth();

    if(isAuthenticated){
        // redirect to app/index.tsx
        return <Redirect href='/'/>
    }
  return (
    <Stack>
        <Stack.Screen name='sign-in' options={{headerShown: false, title: 'Sign In'}}/>
        <Stack.Screen name='sign-up' options={{ headerShown: false, title: 'Sign Up'}}/>
    </Stack>
  );
}
