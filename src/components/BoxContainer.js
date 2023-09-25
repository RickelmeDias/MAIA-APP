import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

const BoxContainer = (props) => {
    return (
        <SafeAreaView style={{...styles.container, ...props.style}}>
            {props.children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 48,
      paddingHorizontal: 32,
      gap: 18
    },
});

export default BoxContainer;