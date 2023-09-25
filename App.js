import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Account from "./src/pages/Account"; 

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import EquipmentQR from "./src/pages/EquipmentQR";
import Report from "./src/pages/Report";

const Tab = createBottomTabNavigator();

const App = () => {
  // const [isSignedIn, setIsSignedIn] = useState(null);
  
  // const [isSignedIn, setIsSignedIn] = useState({
  //   name: 'Rickelme Dias',
  //   ra: '001122',
  //   role: 'USER'
  // });

  const [isSignedIn, setIsSignedIn] = useState({
    name: 'Rickelme Dias',
    ra: '001122',
    role: 'ADMIN'
  });

  // Relatorio de peça

  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator screenOptions={{ tabBarActiveBackgroundColor: "#C5D7CE65" }} >
        {isSignedIn!=null ? (
        <>
          <Tab.Screen name="Home" component={Home} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="home" size={30} />, headerShown: false,}} />
          <Tab.Screen name="Camera" component={EquipmentQR} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="camera" size={30} />, headerShown: false,}} />
          {isSignedIn.role=='ADMIN' && (<Tab.Screen name="Report" component={Report} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="reader-sharp" size={30} />, headerShown: false,}} />)}
          <Tab.Screen name="Account" component={Account} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="user" size={30} />, headerShown: false,}} />
        </>
        ) : (
        <>          
          <Tab.Screen name="Login" component={Login} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="enter-outline" size={30} />, headerShown: false }} />
          <Tab.Screen name="Register" component={Register} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="create-outline" size={30} />, headerShown: false }} />
        </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 42
  },
});

export default App;
