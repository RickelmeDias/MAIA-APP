import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 8,
        marginVertical: 18, 
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005C56'
    },
    sizeLogo: {
        width: 120,
        height: 120,
    },
});

const MaiaLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.sizeLogo}
        source={require('../../assets/maia.png')}
      />
      <Text style={styles.textTitle}>Controle de Acesso e Inventário</Text>
    </View>
  );
};

export default MaiaLogo;