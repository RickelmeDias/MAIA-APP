import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MaiaLogo from '../components/MaiaLogo';
import TextInputWithLabel from '../components/TextInputWithLabel';
import BoxContainer from '../components/BoxContainer';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_HOST } from '../core/environment/host';

const REGISTER = `http://${BACKEND_HOST}:3000/user`;

const Register = () => {
  const navigation = new useNavigation();

  const [userTeam, setUserTeam] = useState("");
  const [userRA, setUserRA] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  
  const handleSubmitCreateUser = async () => {
    try {
      const response = await fetch(REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ra: userRA,
          password: userPassword,
          name: userName,
          team: userTeam,
        }),
      });
      if (response.status==201) {
        navigation.navigate('Login');
      }
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      // const data = await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

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
            <TextInputWithLabel label="NOME" value={userName} 
                                onChangeText={setUserName} 
                                placeholder="NOME" />
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
      <Button title="FINALIZAR CADASTRO" color="#005C56" onPress={handleSubmitCreateUser}/>
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