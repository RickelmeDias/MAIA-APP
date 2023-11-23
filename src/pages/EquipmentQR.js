import { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Modal, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from 'expo-image';
import BoxContainer from '../components/BoxContainer';
import Scanner from '../components/Scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BACKEND_HOST } from '../core/environment/host';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const EQUIPMENT_API = `http://${BACKEND_HOST}:3000/equipment`;

const EquipmentQR = () => {
    const [equipment, setEquipment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [type, setType] = useState("");
    const [data, setData] = useState("");

    const onCodeScanned = (type, data) => {
        setType(type);
        setData(data);
        setModalVisible(false);
    };
    
    useEffect(() => {
        const fetchEquipmentData = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('access_token');
                const response = await fetch(`${EQUIPMENT_API}/${data}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                if (response.ok) {
                    const equipmentData = await response.json();
                    if (equipmentData.qrCode) {
                        setEquipment(equipmentData);
                    } else {
                        setEquipment(null);
                    }
                } else {
                    setEquipment(null);
                }
            } catch (error) {
                console.error('Error fetching equipment data:', error);
                setEquipment(null);
            }
        };
        if (data != null && data != undefined) {
            fetchEquipmentData();
        }
    }, [data]);
    
    const handleGetEquipment = () => {
        if (data != null && data != undefined) {
            reserveEquipment();
        }
    }

    const reserveEquipment = async () => {
        let userToken;
        try {
            userToken = await AsyncStorage.getItem('access_token');
            const response = await fetch(`${EQUIPMENT_API}/${data}/reserve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            if (response.status===400) {
                console.log("Produto já está reservado.");
            }else{
                if (response.ok) {
                    const equipmentData = await response.json();
                    if (equipmentData.reservedByUser!=null) {
                        setEquipment(equipmentData);
                    }
                    console.log("Produto reservado com sucesso para você!");
                }
            }
        } catch (error) {
            console.error('Erro ao reservar equipamento:', error);
        }
    };    

    
    const handleReturnEquipment = () => {
        if (data != null && data != undefined) {
            returnEquipment();
        }
    }

    const returnEquipment = async () => {
        let userToken;
        try {
            userToken = await AsyncStorage.getItem('access_token');
            const response = await fetch(`${EQUIPMENT_API}/${data}/return`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            if (response.status===400) {
                console.log("Produto não possui resevas ou você não é o dono da reserva.");
            }else{
                if (response.ok) {
                    const equipmentData = await response.json();
                    if (equipmentData.reservedByUser==null) {
                        setEquipment(equipmentData);
                    }
                    console.log("Requisicao de devolucao enviada!");
                }
            }
        } catch (error) {
            console.error('Erro ao reservar equipamento:', error);
        }
    };    


    return (
        <BoxContainer>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <Scanner onCodeScanned={onCodeScanned} />
                    <Button title="CANCELAR" color="#005C56" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            <StatusBar style="auto" />
            {
                equipment==null?(
                    <View>
                        <Text style={styles.informationText}>Leia o QR Code</Text>
                        <Text style={styles.descriptionText}>Clique em escanear para fazer a leitura do QR Code do Equipamento que deseja pegar ou devolver</Text>
                        <Text style={styles.descriptionText}>Em caso de leitura incorreta, você poderá repetir o procedimento+</Text>
                    </View>
                ):(
                    <View style={styles.equipmentContainer}>
                        <Text style={styles.equipmentNameText}>{equipment.name}</Text>
                        <Text style={styles.equipmentInfo}>{equipment.reservedByUser == null ? 'Equipamento não reservado' : `Reservado por ${equipment.reservedByUser.name} - RA: ${equipment.reservedByUser.ra}`}</Text>
                        <Image
                            style={styles.image}
                            source={{uri: equipment.imgsrc}}
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={1000}
                        />

                        <View style={styles.equipmentButtonContainer}>
                            <Button title="PEGAR" color="#005C56" onPress={handleGetEquipment} />
                            <Button title="DEVOLVER" color="#5C0021" onPress={handleReturnEquipment} />
                        </View>
                    </View>
                )
            }

            <Button title={equipment!=null?"ESCANEAR NOVAMENTE":"ESCANEAR"} color={equipment!=null?"#8D8D8D":"#005C56"} onPress={() => setModalVisible(true)} />
        </BoxContainer>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "lightgrey",
    },
    image: {
        width: '100%',
        height: '60%',
        backgroundColor: '#0553',
    },
    equipmentInfo: {
        fontSize: 14,
        color: '#005C56',
    },
    informationText: {
        fontSize: 32,
        fontWeight: '500',
        color: '#005C56',
    },
    descriptionText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#005C56'
    },
    equipmentContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    equipmentButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    equipmentNameText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#005C56'
    },
});

export default EquipmentQR;