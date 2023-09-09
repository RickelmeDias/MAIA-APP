import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';

const TextInputWithLabel = (props) => {
  return (
    <SafeAreaView>
        <Text style={styles.inputLabelText}>{props.label}</Text>
        <TextInput  style={styles.input}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.secureTextEntry || false}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#005C56',
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005C56'
  },
});

export default TextInputWithLabel;