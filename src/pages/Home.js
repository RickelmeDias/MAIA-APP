import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';
import MaiaLogo from '../components/MaiaLogo';
import BoxContainer from '../components/BoxContainer';

const Home = () => {
  return (
    <BoxContainer>
        <MaiaLogo/>
        <Text style={styles.informationText}>Bem Vindo(a) ao Maia!</Text>
        <ScrollView>
          <Text style={styles.descriptionText}>1. Através desse aplicativo você pode reservar e pegar equipamentos, assim como também deve devolver.</Text>
          <Text style={styles.descriptionText}>2. Todos os equipamentos retirados de nosso inventário serão registrados, com informações da pessoa que retirou, data e hora.</Text>
          <Text style={styles.descriptionText}>3. Essas informações irão permitir encontrarmos a ultima pessoa que utilizou o equipamento, ajudando no nosso controle de inventário.</Text>
          <Text style={styles.descriptionText}>4. Os equipamentos do laboratório só podem se retirados com o uso do aplicativo, o uso deve ser feito de forma segura e com atenção, em caso de danos é obrigatório notificar a equipe MAIA.</Text>
          <Text style={styles.descriptionText}>5. Caso o equipamento já esteja com algum dano anterior observado, antes de reservar notifique a equipe, pois caso contrário você pode estará assumindo um equipamento danificado sem notificar.</Text>
          <Text style={styles.descriptionText}>6. Ao utilizar esse aplicativo e equipamentos do MAIA você está concordando e ciente de seus deveres, tomando devido cuidado para não danificar nada e em caso de algum dano, deve notificar a nossa equipe para que possamos entender como tratar o problema.</Text>
          <Text style={styles.descriptionText}>7. Em caso de dúvidas chame nossa equipe.</Text>
        </ScrollView>
    </BoxContainer>
  );
}

const styles = StyleSheet.create({
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
});

export default Home;