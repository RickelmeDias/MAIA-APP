import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ItemReportList = (props) => {
    console.log(props)
  return (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={{uri: props.item.equipment.imgsrc}}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
        />
        <View>
            <Text style={styles.textTitle}>{props.item.equipment.name}</Text>
            <Text style={styles.textTitle}>{props.item.reservedByUser.name} ({props.item.reservedByUser.ra})</Text>
            <Text style={styles.textTitle}>{new Date(props.item.reservedDate*1000).toLocaleDateString()} - {new Date(props.item.returnedDate*1000).toLocaleDateString()}</Text>
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