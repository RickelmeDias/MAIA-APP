import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import MaiaLogo from '../components/MaiaLogo';
import TextInputWithLabel from '../components/TextInputWithLabel';
import BoxContainer from '../components/BoxContainer';

const Register = () => {
  const [userTeam, setUserTeam] = useState("");
  const [userRA, setUserRA] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleSubmitRegister() {
    // Function to send the register data to backend
    console.log({ userTeam, userRA, userPassword });
  }

  return (
    <BoxContainer>
      <MaiaLogo />
      <View>
        <Text style={styles.informationText}>Registre-se!</Text>
        <Text style={styles.descriptionText}>Faça o cadastro no aplicativo para começar a usar.</Text>
      </View>
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
      <Button title="FINALIZAR CADASTRO" color="#005C56" onPress={handleSubmitRegister}/>
    </BoxContainer>
  );
}

const styles = StyleSheet.create({
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
  descriptionText: {
    fontSize: 18,
    fontWeight: '300',
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