import { Stack } from "expo-router";
import { AuthProvider } from "./providers/AuthProviders";
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'

const publishablekey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if(!publishablekey){
  throw new Error('Add your Clerk Publishable Key to the .env file');
}
export default function RootLayout() {
  // console.log("publishable key: ", publishablekey);
  console.log("Root Layout")
  return(

     <AuthProvider>
      <ClerkProvider publishableKey={publishablekey} tokenCache={tokenCache}>
          <Stack screenOptions={{headerShown: false}}/>
      </ClerkProvider>   
    </AuthProvider>
  )
}
