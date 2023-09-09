import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Register from './src/pages/Register';

const App = () => {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  }
});

export default App;