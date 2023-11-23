import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const deParaAcoes =  {
    "CREATE": 'criação',
    "RESERVE": 'reserva',
    "RETURN": 'devolução',
    "DEACTIVATE": 'desativação',
}  

const ItemReportList = (props) => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.textTitle}>Equipamento: {props.item.equipmentName}</Text>
            <Text style={styles.textTitle}>Ação: {props.item.action ? deParaAcoes[props.item.action.toUpperCase()] : ''} de equipamento</Text>
            <Text style={styles.textTitle}>Responsavel pela ação: {props.item.actionByUserName} | {props.item.actionByUserRa}</Text>
            <Text style={styles.textTitle}>Data da Acao: {new Date(props.item.createdAt).toLocaleDateString()}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 12
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#005C56'
    },
    image: {
        width: 85,
        height: 85
    }
});

export default ItemReportList;