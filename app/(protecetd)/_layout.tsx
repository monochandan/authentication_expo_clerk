import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@clerk/expo'

export default function AuthLayout() {

    const {isSignedIn} = useAuth();

    console.log("Protected Layout");

    if(!isSignedIn){
        return <Redirect href='/sign-in' />
    }
  return (
    <Slot />
  );
}