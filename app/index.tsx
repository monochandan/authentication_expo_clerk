import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "./providers/AuthProviders";

// splash screen
export default function Index(){
  
  const {isAuthenticated, signOut} = useAuth();

  console.log("From auth provider: ", isAuthenticated, signOut)

  return (
      <View style={styles.container}>
            <Text style={styles.title}>Wlecome to the world!</Text>
            <Link href='/(auth)/sign-in'>Go to Sign In</Link>
            {/* <Link href='/(auth)/sign-up'>Go to Sign In</Link> */}
            <Link href='/(protecetd)/homeScreen'>Go to protected screens</Link>
            <Text>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Text>
            <Button title='Sign Out' onPress={signOut}/>
      </View>
  )
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap: 20,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
  }

});