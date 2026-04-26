import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '../providers/AuthProviders'

export default function AuthLayout() {

    const {isAuthenticated} = useAuth();

    console.log("Protected Layout");

    if(!isAuthenticated){
        return <Redirect href='/sign-in' />
    }
  return (
    <Slot />
  );
}