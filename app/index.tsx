import { Text, 
  TextInput, 
  View, 
  Button, 
  Pressable, 
  Platform,
KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";


export default function Index() {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Sign In</Text>

      <TextInput placeholder="Email" 
                style={styles.input} 
                autoCapitalize={'none'} 
                keyboardType={'email-address'}
                autoCorrect={false}/>


      <TextInput placeholder="Password" style={styles.input} secureTextEntry={true}/>

      {/* <Button title="Sign in" onPress={() => {}} style={}/> */}

      <Pressable onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    margin: 50,
    borderRadius: 10,
  }
  ,
  title:{
    fontSize: 24,
    fontWeight: '600',
  }
  ,
  input: {

    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',

  }
  ,
  button:{
    borderRadius: 10,
    backgroundColor:'#4353FD',
    padding: 15,
    alignItems:'center',
  }
  ,
  buttonText:{
    color:'white',
    fontSize:16,
    fontWeight:'600',
  }
})
