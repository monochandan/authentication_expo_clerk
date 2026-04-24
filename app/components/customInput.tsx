import { TextInput, StyleSheet, TextInputProps } from "react-native"

type CustomeInputProps={
    // custome field
} & TextInputProps

export default function CustomeInput(props: CustomeInputProps){
    return (
        <TextInput
        {...props}
        style={[styles.input, props.style]}
        />
    )
}

const styles = StyleSheet.create({

    input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',

  }
})