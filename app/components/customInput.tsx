import { TextInput, StyleSheet, TextInputProps, Text, View } from "react-native"
import {Controller} from 'react-hook-form';
type CustomeInputProps={

    control: any;
    name: string;
    // custome field
} & TextInputProps

export default function CustomeInput({control, name, ...props}: CustomeInputProps){
    return (

                <Controller 
                    control={control} 
                    name={name} 
                    rules={{required: "This field is required!"}} 
                    render={({
                        field: {value, onChange, onBlur},
                        fieldState:{error}
                        }) => (

                        <View style={styles.container}>

                            <TextInput 
                                        {...props}
                                        style={[styles.input, props.style]}
                                        value = {value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                />
                            
                            <Text style={styles.error}>{error?.message}</Text>
                        </View>
                )}/>

        
    )
}

const styles = StyleSheet.create({

    container:{
        gap:2,
    },

    input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',

  },
  error:{
    color:"crimson",
  }
})