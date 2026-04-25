import { Text, 
  // TextInput, 
  View, 
  // Button, 
  // Pressable, 
  Platform,
KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";

import CustomeInput from "./components/customInput";
import CustomeButton from "./components/customeButton";
// import { useEffect, useState } from "react";
import {useForm, 
        // Controller
      } from 'react-hook-form';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';


const signInSchema = z.object({
  email: z.string(
    {message:"email is required."})
    .email("email is invalid"),

  password: z.string(
      {message:"password is required."})
      .min(8, 'password should be atleast 8 characters long'),
});

type SignInFields = z.infer<typeof signInSchema>;
 
export default function Index() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const {control, handleSubmit, formState: {errors}, } = useForm({
    defaultValues:{
      // email: 'abc@gmail.com',
    },
    resolver:zodResolver(signInSchema),
  });

  console.log(errors)
  const onSignIn = (data: SignInFields) => {
    // manual validation -  email is provided or not, rejected or not 
    console.log("sign in: ", data.email, data.password);
  };

  // useEffect(() =>{
  //     setEmail('')
  //     setPassword('')
  // },[])

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Sign In</Text>

      {/* <TextInput placeholder="Email" 
                style={styles.input} 
                autoCapitalize={'none'} 
                keyboardType={'email-address'}
                autoCorrect={false}/> */}

      {/* <Controller name='email' control={control} render={({field: {value, onChange, onBlur}}) =>
        <TextInput placeholder="controller input" 
                style={{backgroundColor: 'snow'}}
                value = {value}
                onChangeText={onChange}
                onBlur={onBlur}
        />
      }/> */}
      <View style={styles.form}>

            <CustomeInput placeholder="Email" 
                  control={control}
                  name='email'
                  onPress={onSignIn}
                  // value={email}
                  // onChangeText={setEmail}
                  autoCapitalize={'none'} 
                  keyboardType={'email-address'}
                  autoCorrect={false}
                  style={{borderColor:'red'}}
        />

        <CustomeInput placeholder="Password" 
                      control={control}
                      name="password"
                      // value={password}
                      // onChangeText={setPassword}
                      secureTextEntry={true}
                      style={{borderColor:'green'}}
        />

      </View>
      


     <CustomeButton 
        text="Sign In"
        onPress={handleSubmit(onSignIn)}
      />

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
  },
  form:{
    gap:2,
  }
  
})
