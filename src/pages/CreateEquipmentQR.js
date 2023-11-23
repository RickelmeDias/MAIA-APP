import { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Modal, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from 'expo-image';
import BoxContainer from '../components/BoxContainer';
import Scanner from '../components/Scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BACKEND_HOST } from '../core/environment/host';
import TextInputWithLabel from '../components/TextInputWithLabel';

const EQUIPMENT_API = `http://${BACKEND_HOST}:3000/equipment`;

const CreateEquipmentQR = () => {
    const [equipment, setEquipment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [type, setType] = useState("");
    const [data, setData] = useState("");

    const handleClose = () => {
        setType("");
        setData("");
        setEquipment(null);
        setModalVisible(false);
    };

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
    
    const handleCreateEquipment = async () => {
        let userToken;
        try {
            userToken = await AsyncStorage.getItem('access_token');
            const response = await fetch(EQUIPMENT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                qrCode: data,
                name: equipmentName,
                imgsrc: imgSrc || "",
                description: desc || ""
            }),
            });
            if (response.ok || response.status === 201) {
                const result = await response.json();
                console.log('Equipment created successfully:', result);
            } else {
            console.error('Failed to create equipment:', response.status, await response.text());
            }
        } catch (error) {
            console.error('Error during fetch:', error.message);
        }
    }

    const [equipmentName, setEquipmentName] = useState();
    const [imgSrc, setImgSrc] = useState();
    const [desc, setDesc] = useState();

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
                (equipment==null && data=="") || (equipment!=null) ? (
                    <View>
                        <Text style={styles.informationText}>Novo Equipamento</Text>
                        {equipment==null && <Text style={styles.descriptionText}>Ao ler o QRCode você irá poder criar um equipamento a partir daquele codigo.</Text>}
                        {equipment!=null && <Text style={styles.errorMessage}>Erro, escaneie novamente, esse QR Code ja foi cadastrado!</Text> }
                    </View>
                ) : (                    
                    <View style={styles.equipmentContainer}>
                        <View style={{flex:1, width: '100%'}}>
                            <View style={{flex:1, width: '100%'}}>
                            <TextInputWithLabel label="NOME" value={equipmentName} 
                            onChangeText={setEquipmentName} 
                            placeholder="NOME" />
                            </View>
                            <View style={{flex:1, width: '100%'}}>
                            <TextInputWithLabel label="URL Imagem" value={imgSrc} 
                            onChangeText={setImgSrc} 
                            placeholder="URL Imagem" />
                            </View>
                            <View style={{flex:1, width: '100%'}}>
                            <TextInputWithLabel label="DESCRICAO" value={desc} 
                            onChangeText={setDesc} 
                            placeholder="DESCRICAO" />
                            </View>
                        </View>
                        <View style={styles.equipmentButtonContainer}>
                            <Button title="CRIAR" color="#005C56" onPress={handleCreateEquipment} />
                            <Button title="CANCELAR" color="#5C0021" onPress={handleClose} />
                        </View>
                    </View>
                )
            }

            <Button title={equipment==null&&data==""?"ESCANEAR":"ESCANEAR NOVAMENTE"} color={equipment==null&&data==""?"#005C56":"#8D8D8D"} onPress={() => setModalVisible(true)} />
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
    errorMessage: {
        fontSize: 18,
        fontWeight: '400',
        color: '#D50000'
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
        fontWeight: '400',
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

export default CreateEquipmentQR;