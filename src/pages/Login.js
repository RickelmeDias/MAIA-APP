import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import MaiaLogo from '../components/MaiaLogo';
import TextInputWithLabel from '../components/TextInputWithLabel';

const Login = () => {
  const [userRA, setUserRA] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleGoRegister() {
    // Function to redirect user to register page
    console.log("Redirecionar para tela de cadastro")
  }

  function handleSubmitLogin() {
    // Function to send the login data to back-end
    console.log({ userRA, userPassword })
  }

  return (
    <View style={styles.container}>
      <MaiaLogo />
      <Text style={styles.informationText}>Bem-Vindo Aluno, Informe seu acesso.</Text>
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
      <View>
        <Button title="ENTRAR" color="#005C56" onPress={handleSubmitLogin} />
        <Pressable onPress={handleGoRegister}>
          <Text style={styles.wantRegisterText}>Quero me cadastrar!</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 18
  },
  loginInputsContainer: {
    gap: 16,
    marginVertical: 12
  },
  informationText: {
    fontSize: 32,
    fontWeight: '500',
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