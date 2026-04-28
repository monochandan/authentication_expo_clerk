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
import { type Href, Link } from "expo-router";

import {  useSignIn } from '@clerk/expo'
import {useRouter} from  'expo-router';


const signInSchema = z.object({
  email: z.string(
    {message:"email is required."})
    .email("email is invalid"),

  password: z.string(
      {message:"password is required."})
      .min(8, 'password should be atleast 8 characters long'),
});

type SignInFields = z.infer<typeof signInSchema>;
 
export default function SignIn() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const router = useRouter();

  const {control, handleSubmit, formState: {errors}, } = useForm<SignInFields>({
    defaultValues:{
      // email: 'abc@gmail.com',
    },  
    resolver:zodResolver(signInSchema),
  });

    // console.log("errors from sign in:",errors)

// const {signIn} = useAuth();
  const {signIn} = useSignIn();

  const onSignIn = async (data: SignInFields) => {
    // manual validation -  email is provided or not, rejected or not
    console.log("Sign in to Account");
    // console.log("Sign in values: ", signIn);
    

    try{
        if(!signIn){
        return;
        }
        await signIn.create({
            identifier: data.email,
            password: data.password,

        });

        console.log("Sign In attempt: ", signIn.status);
        if(signIn.status === 'complete'){
            console.log("Sign in successfull");

            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    console.log("Session: ", session)
                    router.push(decorateUrl('/') as Href)
                }
            })
        }
        else{
            console.log("Sign In failed");
        }
    }catch(error: any){
        console.error(JSON.stringify(error, null, 2))
    }
    console.log("Sign In: ", data.email, data.password);
    console.log("End function");
    // signIn();
    // router.replace('/');
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
                text="Sign In"
                onPress={handleSubmit(onSignIn)}
            />

            <Link href='/sign-up' style={styles.link}>Do not have an account? Sign Up</Link>

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
  },
  link:{
    color:"#4353FD",
    fontWeight:'600',
  }
  
})
