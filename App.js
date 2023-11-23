import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './src/core/context/authContext';
import Register from './src/pages/Register';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Account from './src/pages/Account';
import EquipmentQR from './src/pages/EquipmentQR';
import Report from './src/pages/Report';
import { BACKEND_HOST } from './src/core/environment/host';
import CreateEquipmentQR from './src/pages/CreateEquipmentQR';

const PROFILE_URL = `http://${BACKEND_HOST}:3000/profile`;
const LOGIN_URL = `http://${BACKEND_HOST}:3000/auth/login`;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

const SplashScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const App = () => {  
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
  
      try {
        userToken = await AsyncStorage.getItem('access_token');
        if (userToken) {
          setIsSignedIn(true);
          const response = await fetch(PROFILE_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userToken
            },
          });  
          const data = await response.json();
          // const userStorage = await AsyncStorage.getItem('user');
          await AsyncStorage.setItem('user', JSON.stringify(data));
          setAdmin(isAdmin(data));          
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
  
    bootstrapAsync();
  }, [token]);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({userRA, userPassword}) => {
        try {
          const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ra: userRA,
              password: userPassword,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to login user');
          }
          const data = await response.json();  
          if (data['access_token']) {
            await AsyncStorage.setItem('access_token', data['access_token']);
            const token = await AsyncStorage.getItem('access_token');
            setToken(token);
            dispatch({ type: 'SIGN_IN', token});
          }
        } catch (error) {
          console.error('Error signing in:', error);
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        try {
          // Se necessário poderá criar um fetch para já fazer o login automatico ao se cadastrar:
          // const response = await fetch(apiUrl, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(data),
          // });
          // const result = await response.json();
          // const token = 'your-real-auth-token';
          dispatch({ type: 'SIGN_IN', token });
        } catch (error) {
          console.error('Error signing up:', error);
          // Handle sign-up error, maybe show an error message to the user
        }
      },
    }),
    []
  );
  
  const isAdmin = (user) => {
    if (user) {
      for (let role of user.roles) {
        if (role==='admin') {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer style={styles.container}>
        <Tab.Navigator screenOptions={{ tabBarActiveBackgroundColor: "#C5D7CE65" }} >
        { 
          state.isLoading ? ( <Stack.Screen name="Splash" component={SplashScreen} /> ) :
          state.userToken == null ? (
            <>          
              <Tab.Screen name="Login" component={Login} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="enter-outline" size={30} />, headerShown: false }} />
              <Tab.Screen name="Register" component={Register} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="create-outline" size={30} />, headerShown: false }} />
            </> ) : (
            <>
              <Tab.Screen name="Home" component={Home} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="home" size={30} />, headerShown: false,}} />
              <Tab.Screen name="Camera" component={EquipmentQR} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="camera" size={30} />, headerShown: false,}} />
              {admin && (<Tab.Screen name="CreateEquipmentQR" component={CreateEquipmentQR} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="add" size={30} />, headerShown: false,}} />)}
              {admin && (<Tab.Screen name="Report" component={Report} options={{ tabBarShowLabel: false, tabBarIcon: () => <IonIcon name="reader-sharp" size={30} />, headerShown: false,}} />)}
              <Tab.Screen name="Account" component={Account} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="user" size={30} />, headerShown: false,}} />
            </>
          )
        }
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 42
  },
});

export default App;