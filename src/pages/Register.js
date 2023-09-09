import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import MaiaLogo from '../components/MaiaLogo';
import TextInputWithLabel from '../components/TextInputWithLabel';

const Register = () => {
  const [userTeam, setUserTeam] = useState("");
  const [userRA, setUserRA] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleGoLogin() {
    // Function to redirect user to lgoin page
    console.log("Redirecionar para tela login");
  }

  function handleSubmitRegister() {
    // Function to send the register data to backend
    console.log({ userTeam, userRA, userPassword });
  }

  return (
    <View style={styles.container}>
      <MaiaLogo />
      <Text style={styles.informationText}>Partiu se cadastrar? Preencha abaixo:</Text>
      <View style={styles.registerInputsContainer}>
        <View style={styles.onSideTwoInputs}>
          <View style={{flex:1}}>
            <TextInputWithLabel label="EQUIPE" value={userTeam} 
                                onChangeText={setUserTeam} 
                                placeholder="EQUIPE" />
          </View>
          <View style={{flex:1}}>
            <TextInputWithLabel label="RA" value={userRA} 
                                onChangeText={setUserRA} 
                                placeholder="RA" />
          </View>
        </View>
        <TextInputWithLabel label="SENHA" value={userPassword} 
                            onChangeText={setUserPassword} 
                            placeholder="SENHA"
                            secureTextEntry={true}
        />
      </View>
      <View>
        <Button title="FINALIZAR CADASTRO" color="#005C56" onPress={handleSubmitRegister}/>
        <Pressable onPress={handleGoLogin}>
          <Text style={styles.backToLoginText}>Voltar para tela de login</Text>
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
  registerInputsContainer: {
    gap: 16,
    marginVertical: 12
  },
  onSideTwoInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  informationText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#005C56'
  },
  backToLoginText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#005C56'
  }
});

export default Register;