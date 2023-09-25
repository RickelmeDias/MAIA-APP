import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import BoxContainer from '../components/BoxContainer';

const Account = () => {
  const [isSignedIn, setIsSignedIn] = useState({
    name: 'Rickelme Dias',
    ra: '001122',
  });

  function handleLogout() {
    // Function to send the Home data to backend
    console.log("logout");
  }

  return (
    <BoxContainer>
        <View>
          <Text style={styles.informationText}>Usuario Logado </Text>
          <Text style={styles.userInformationText}>{isSignedIn.name}  -  {isSignedIn.ra}</Text>
        </View>
        <Pressable onPress={handleLogout}>
          <Text style={styles.wantRegisterText}>Sair da Conta</Text>
        </Pressable>
    </BoxContainer>
  );
}

const styles = StyleSheet.create({
  onSideTwoInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  informationText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#005C56'
  },
  userInformationText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#005C56'
  },
  wantRegisterText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#005C56'
  }
});

export default Account;