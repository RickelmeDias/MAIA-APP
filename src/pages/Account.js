import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BoxContainer from '../components/BoxContainer';
import AuthContext from '../core/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const [user, setUser] = useState(null)
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    async function getUser() {
      try {
        const userStorage = await AsyncStorage.getItem('user');
        const user = JSON.parse(userStorage);
        setUser(user);
      } catch (error) {
        console.error('Error to get user accont:', error);
      }
    }
    getUser();
  }, []);

  const handleSignOut = () => {
    signOut();
  }
  
  return (
    <BoxContainer>
        <View>
          <Text style={styles.informationText}>Usuario Logado </Text>
          <Text style={styles.userInformationText}>{user ? user.name : ''}  -  {user ? user.ra : ''}</Text>
        </View>
        <Pressable onPress={handleSignOut}>
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


