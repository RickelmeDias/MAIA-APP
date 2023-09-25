import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import BoxContainer from '../components/BoxContainer';
import ItemReportList from '../components/ItemReportList';
import TextInputWithLabel from '../components/TextInputWithLabel';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome";

const Report = () => {
  const [data, setData] = useState([
    {
      equipment: {
        name: 'Multimetro Digital DT4300A',
        imgsrc: 'https://github.com/RickelmeDias/MAIA-APP/assets/43411893/b19f6ac2-a6cf-4628-aa0b-d35c5525fac2'
      },
      reservedByUser: {
        name: 'Jose Afonso',
        team: 'MAIA',
        ra: '210650'
      },
      reservedDate: '1579335602',
      returnedDate: '1695667202'
    },
    {
      equipment: {
        name: 'Multimetro Digital DT4300A',
        imgsrc: 'https://github.com/RickelmeDias/MAIA-APP/assets/43411893/b19f6ac2-a6cf-4628-aa0b-d35c5525fac2'
      },
      reservedByUser: {
        name: 'Jose Afonso',
        team: 'MAIA',
        ra: '210650'
      },
      reservedDate: '1579335602',
      returnedDate: '1695667202'
    },
    {
      equipment: {
        name: 'Multimetro Digital DT4300A',
        imgsrc: 'https://github.com/RickelmeDias/MAIA-APP/assets/43411893/b19f6ac2-a6cf-4628-aa0b-d35c5525fac2'
      },
      reservedByUser: {
        name: 'Jose Afonso',
        team: 'MAIA',
        ra: '210650'
      },
      reservedDate: '1579335602',
      returnedDate: '1695667202'
    },
    {
      equipment: {
        name: 'Multimetro Digital DT4300A',
        imgsrc: 'https://github.com/RickelmeDias/MAIA-APP/assets/43411893/b19f6ac2-a6cf-4628-aa0b-d35c5525fac2'
      },
      reservedByUser: {
        name: 'Jose Afonso',
        team: 'MAIA',
        ra: '210650'
      },
      reservedDate: '1579335602',
      returnedDate: '1695667202'
    },
    {
      equipment: {
        name: 'Multimetro Digital DT4300A',
        imgsrc: 'https://github.com/RickelmeDias/MAIA-APP/assets/43411893/b19f6ac2-a6cf-4628-aa0b-d35c5525fac2'
      },
      reservedByUser: {
        name: 'Jose Afonso',
        team: 'MAIA',
        ra: '210650'
      },
      reservedDate: '1579335602',
      returnedDate: '1695667202'
    },
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [endtDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    switch (mode) {
      case 'start':
        setStartDate(currentDate);
        break;
      case 'end':
        setEndDate(currentDate);
        break;    
      default:
        break;
    }
  };

  const handleMode = (mode) => {
    setMode(mode);
    setShow(true);
  }

  const [keyword, setKeyword] = useState("");
  const [userRa, setUserRa] = useState("");

  return (
    <BoxContainer>
      <View style={styles.inputsContainer}>
        <TextInputWithLabel label="EQUIPAMENTO" value={keyword} 
                              onChangeText={setKeyword} 
                              placeholder="DIGITE PALAVRAS CHAVE DO EQUIPAMENTO"
                              
        />
        <TextInputWithLabel label="RA" value={userRa} 
                              onChangeText={setUserRa} 
                              placeholder="DIGITE O RA DE ALGUM ALUNO"
                              
        />
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Pressable onPress={()=>handleMode('start')} style={{alignItems: 'flex-start'}}>
            <Text style={styles.inputLabelText}>DATA INICIAL</Text>
            <Text style={styles.inputLabelText}>DE RETIRADA</Text>
            <View style={styles.datePickerPressableCustom}>
              <Icon name="calendar" size={24} color='#005C56'/>
              <Text style={styles.dateCustomText} >{startDate.toLocaleDateString()}</Text>
            </View>
          </Pressable>
          <Pressable onPress={()=>handleMode('end')} style={{alignItems: 'flex-start'}}> 
            <Text style={styles.inputLabelText}>DATA FINAL</Text>
            <Text style={styles.inputLabelText}>DE RETIRADA</Text>
            <View style={styles.datePickerPressableCustom}>
              <Icon name="calendar" size={24} color='#005C56'/>
              <Text style={styles.dateCustomText} >{endtDate.toLocaleDateString()}</Text>
            </View>
          </Pressable>
        </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mode=='start'?startDate:endtDate}
          mode='date'
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Button title="BUSCAR" color="#005C56" />
      </View>
      <FlashList
        data={data}
        renderItem={({ item }) => <ItemReportList item={item}/>}
        estimatedItemSize={200}
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