import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MaiaLogo from '../components/MaiaLogo';
import TextInputWithLabel from '../components/TextInputWithLabel';
import BoxContainer from '../components/BoxContainer';
import AuthContext from '../core/context/authContext';

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const [userRA, setUserRA] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = () => {
    if (userRA != undefined && userRA != null && userPassword != undefined && userPassword != null) {
      signIn({userRA, userPassword});
    }
  }

  return (
    <BoxContainer>
      <MaiaLogo />
      <View>
        <Text style={styles.informationText}>Acesse a conta</Text>
        <Text style={styles.descriptionText}>Entre na sua conta para poder ter acesso aos equipamentos do maia.</Text>
      </View>    
      <View style={styles.loginInputsContainer}>
        <TextInputWithLabel label="RA" value={userRA} 
                            onChangeText={setUserRA} 
                            placeholder="RA" 
        />
        <TextInputWithLabel label="SENHA" value={userPassword} 
                            onChangeText={setUserPassword} 
                            placeholder="SENHA"
                            secureTextEntry={true}
        />
      </View>
      <Button title="ENTRAR" color="#005C56" onPress={handleLogin} />
    </BoxContainer>
  );
}

const styles = StyleSheet.create({
  loginInputsContainer: {
    gap: 16,
    marginVertical: 12
  },
  informationText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#005C56'
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#005C56'
  },
  wantRegisterText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#005C56'
  }
});

export default Login;