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
import { type Href, Link } from "expo-router";
import {isClerkAPIResponseError, useClerk, useSignIn, useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";


const signInSchema = z.object({
  email: z.string(
    {message:"email is required."})
    .email("email is invalid"),

  password: z.string(
      {message:"password is required."})
      .min(8, 'password should be atleast 8 characters long'),
});

type SignInFields = z.infer<typeof signInSchema>;



// errors:[{
//  "code": "form_identification not found",
// "message": "could not find your account",
// "longMessage": "could not find your account",
// "meta": {
//      "paramName": "identifier"
// }
//}]

// which field is giving the errors. in clerk the error list contain a meta object, 
// which containe which form is giving the error.
// const clerkErrorToFormField = {
//     identifier: 'email',
//     password: 'password',
// };

const mapClerkErrorToFormField = (error: any) => {
    switch(error.meta?.paramName){
        case 'identifier':
            return 'email';
        case 'password':
            return 'password';
        default:
            return 'root';
    }
}
 
export default function SignIn() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const route = useRouter();
  const {isLoaded} = useAuth();

  const {setActive} = useClerk();
  // setError : set errors manually in our form

  const {control, handleSubmit, setError, formState: {errors} } = useForm<SignInFields>({
    defaultValues:{
      // email: 'abc@gmail.com',
    },  
    resolver:zodResolver(signInSchema),
  });

console.log("errors from sign in:",JSON.stringify(errors, null, 2));

  const {signIn} = useSignIn();

  const onSignIn = async (data: SignInFields) => {
    // manual validation -  email is provided or not, rejected or not 
    console.log("sign in: ", data.email, data.password);
    try{
        if (!isLoaded){
            console.log("Sign Up not loaded");
            return;
        }

        await signIn.create({
            identifier: data.email,
            password: data.password
        })

        if(signIn.status === 'complete'){
            await signIn.finalize({
                navigate: ({session, decorateUrl}) =>{

                    // when user will sign in later ((if he logged out by any chance))
                    setActive({
                        session: session?.id,
                    })
                    Alert.alert("Sign In Successfull!");
                    route.push(decorateUrl("/") as Href);
                }
            })
        }
        else{
            // sometime not error, its loading state or on the way (e.g - MFA)
            // so need additional check , if required.
            setError("root", {message: 'Invalid credentials!'});
        }
    }
    catch(error: any){
        console.error("Sign In Error: ",JSON.stringify(error, null, 2))
        if(isClerkAPIResponseError(error)){
            error.errors.forEach((error) => {
                const fieldName = mapClerkErrorToFormField(error) 
                setError(
                    //clerkErrorToFormField[error.meta?.paramName ?? 'identifier'],
                    fieldName,
                    //error.meta.paramName === 'identifier' ? 'email' : 'password',
                    {
                        message: error.longMessage
                    });
            });
            
        }
        else{
            setError('root', {message: 'Unknown Error!'});
        }
    }
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

            {errors.root && (
                <Text style={{color: 'crimson'}}>{errors.root.message}</Text>
            )}

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
