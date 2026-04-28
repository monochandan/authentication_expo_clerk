import { Text, 
  // TextInput, 
  View, 
  // Button, 
  // Pressable, 
  Platform,
KeyboardAvoidingView, StyleSheet, 
Alert} from "react-native";


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

import { isClerkAPIResponseError, useSignUp, useAuth } from "@clerk/expo";

const signUpSchema = z.object({
  email: z.string(
    {message:"email is required."})
    .email("email is invalid"),

  password: z.string(
      {message:"password is required."})
      .min(8, 'password should be atleast 8 characters long'),
});

type SignUpFields = z.infer<typeof signUpSchema>;

const mapClerkErrorToFormField = (error: any) => {
    switch(error.meta?.paramName){
        case 'email_address':
            return 'email';
        case 'password':
            return 'password';
        default:
            return 'root';
    }
}

export default function SignUp() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const route = useRouter();
  const {isLoaded} = useAuth();
  const {control, handleSubmit, setError, formState: {errors}, } = useForm<SignUpFields>({
    defaultValues:{
      // email: 'abc@gmail.com',
    },  
    resolver:zodResolver(signUpSchema),
  });

  console.log("Root errors: ", JSON.stringify(errors, null, 2));

  const {signUp} = useSignUp();

  // console.log("Sign up Object: ", signUp);

  const onSignUp = async (data: SignUpFields) => {
    
    try{

        if (!isLoaded){
            console.log("Sign Up not loaded");
            return;
        }
        const res = await signUp.create({
                emailAddress: data.email,
                password: data.password,
        });

        console.log("Sign up status signUp.status: ", signUp.status);
        // console.log("Email:", res.emailAddress);
        console.log("Sign up res.error: ", res.error);
        // if(signUp.status === "complete"){

        //  LOG  Sign up status signUp.status:  missing_requirements
        // LOG  Sign up res.error: null  or  [e: That email address is taken. Please try another.]

        if(res.error){
            setError("email", {message: "Email already exists!"});
        }
        else //(signUp.status === "missing_requirements"){
        {
            await signUp.verifications.sendEmailCode();
            Alert.alert("Check your email.", "Copy and past the 6 digit code within 30 second.");
            route.push('/verify');
        }
        

    }catch(error: any){
        console.error("Sign Up Error: ",JSON.stringify(error, null, 2))
        if(isClerkAPIResponseError(error)){
            error.errors.forEach((error) => {
                const fieldName = mapClerkErrorToFormField(error) 
                setError(
                    fieldName,
                    {
                        type:"manual",
                        message: error.longMessage,
                    });
            });
            
        }
        else{
            setError('root', {message: 'Unknown Error!'});
        }
    }
    // console.log("Sign Up: ", data.email, data.password);
    // console.log("End function");
   
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

                {errors.root && (
                <Text style={{color: 'crimson'}}>{errors.root.message}</Text>
            )}

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
