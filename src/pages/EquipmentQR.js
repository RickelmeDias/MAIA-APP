import { useState } from 'react';
import { StyleSheet, Button, View, Modal, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from 'expo-image';
import BoxContainer from '../components/BoxContainer';
import Scanner from '../components/Scanner';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const EquipmentQR = () => {
    const [equipment, setEquipment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [type, setType] = useState("");
    const [data, setData] = useState("");

    const onCodeScanned = (type, data) => {
        setType(type);
        setData(data);
        setModalVisible(false);

        if (data=='ebf496d3') {
            setEquipment({
                name: 'Multimetro Digital DT4300A',
                imgsrc: 'https://github.com/RickelmeDias/MAIA-APP/assets/43411893/b19f6ac2-a6cf-4628-aa0b-d35c5525fac2'
            })
        }
    };
    
    const handleGetEquipment = () => {
        console.log("Pegar Equipamento API");
    }

    const handleReturnEquipment = () => {
        console.log("Devolver Equipamento API");
    }

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