import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import BoxContainer from '../components/BoxContainer';
import ItemReportList from '../components/ItemReportList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Report = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getLogs = async () => {
    userToken = await AsyncStorage.getItem('access_token');
    const currentDate = new Date();
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
    const endOfDayUnixTimestamp = Math.floor(endOfDay.getTime() / 1000);
    
    const response = await fetch(`http://192.168.15.57:3000/logs/equipment/?page=${page}&pageSize=10&from=${0}&to=${endOfDayUnixTimestamp}&equipmentName&userRa`, {
      method: 'GET',      
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      }
    });

    if (response.ok) {
      const newData = await response.json();
      setData((prevData) => {
        return [...prevData, ...newData[0]];
      });
    }
  }

  useEffect(() => {
    getLogs();
  }, [page])

  return (
    <BoxContainer>
      <FlashList 
        data={data}
        renderItem={({ item, index }) => <ItemReportList item={item} />}
        estimatedItemSize={200}
        onEndReachedThreshold={0.5}
        onEndReached={()=>setPage(page+1)}
      />
    </BoxContainer>
  );
}

const styles = StyleSheet.create({
  onSideTwoInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  informationText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#005C56'
  },
  userInformationText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#005C56'
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005C56'
  },
  inputsContainer: {
    gap: 12,
    justifyContent: 'space-between',
    paddingBottom: 24,
    borderColor: '#005C56',
    borderBottomWidth: 1,
    marginBottom: 12
  },
  dateCustomText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#005C56'
  },
  datePickerPressableCustom: {
    display: 'flex', 
    flexDirection: 'row', 
    gap: 8, 
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#005C56',
    borderRadius: 8
  }
});

export default Report;