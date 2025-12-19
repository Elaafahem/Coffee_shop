import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
// import SplashScreen from 'react-native-splash-screen';
import BootSplash from "react-native-bootsplash";
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
    BootSplash.hide({ fade: true });
    // Debug: vérifier le type du composant WelcomeScreen
    // eslint-disable-next-line no-console
    console.log('WelcomeScreen type:', typeof WelcomeScreen, WelcomeScreen);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
