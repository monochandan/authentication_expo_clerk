import { Stack } from "expo-router";
import { AuthProvider } from "./providers/AuthProviders";

export default function RootLayout() {
  console.log("Root Layout")
  return(
     <AuthProvider>
        <Stack screenOptions={{headerShown: false}}/>
    </AuthProvider>
  )
}
