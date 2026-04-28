import { Text, 
  // TextInput, 
  View, 
  // Button, 
  // Pressable, 
  Platform,
KeyboardAvoidingView, StyleSheet } from "react-native";


import CustomeInput from "../components/customInput"
import CustomeButton from "../components/customeButton";
// import { useEffect, useState } from "react";
import {useForm, 
        // Controller
        // FieldValues,
      } from 'react-hook-form';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Link, useRouter } from "expo-router";

import { useSignUp } from "@clerk/expo";

const signUpSchema = z.object({
  email: z.string(
    {message:"email is required."})
    .email("email is invalid"),

  password: z.string(
      {message:"password is required."})
      .min(8, 'password should be atleast 8 characters long'),
});

type SignUpFields = z.infer<typeof signUpSchema>;
 
export default function SignUp() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const route = useRouter();
  const {control, handleSubmit, formState: {errors}, } = useForm<SignUpFields>({
    defaultValues:{
      // email: 'abc@gmail.com',
    },  
    resolver:zodResolver(signUpSchema),
  });

  console.log(errors)

  const {signUp} = useSignUp();

  // console.log("Sign up Object: ", signUp);

  const onSignUp = async (data: SignUpFields) => {
    // manual validation -  email is provided or not, rejected or not
     // console.log("sign up: ", data.email, data.password); 
    // clerk strating point
    // https://clerk.com/docs/guides/development/custom-flows/authentication/email-password
    // https://clerk.com/docs/expo/reference/objects/sign-up-future#create
    // if(!isLoaded) return;
    console.log("Create Account");
    console.log("Sign Up values: ", signUp);
    try{

        if (!signUp){
            console.log("Sign Up not loaded");
            return;
        }
        await signUp.create({
                emailAddress: data.email,
                password: data.password,
        });

        console.log("Sign up result: ", signUp.status);
        // if(signUp.status === "complete"){
        route.push('/verify');
        // }

        // else{
            // console.log("Error");
        // }

    }catch(error: any){
        console.error(JSON.stringify(error, null, 2))
        // console.log("Error from signup hook: ", errors)
    }
    console.log("Sign Up: ", data.email, data.password);
    console.log("End function");
   
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
            <Text style={styles.title}>Create an account</Text>

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

                    <CustomeInput
                        placeholder="Email" 
                        control={control}
                        name='email' // name: Path<T>; from customeInput
                        // onPress={onSignIn}
                        // value={email}
                        // onChangeText={setEmail}
                        autoFocus
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
                text="Sign Up"
                onPress={handleSubmit(onSignUp)}
            />
            <Link href='/sign-in' style={styles.link}>Sign In to your account</Link>
    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop:5,
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
  },
  link:{
    color:"#4353FD",
    fontWeight:'600',
  }
  
})
