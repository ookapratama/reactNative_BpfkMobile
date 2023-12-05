import * as React from 'react';
import {View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';

import {RootStackParamList} from './navigation-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'screens/SplashScreen';
import Login from 'screens/Login';
import Dashboard from 'screens/Dashboard';
import Permohonan from 'screens/Permohonan';
import DetailPermohonan from 'screens/DetailPermohonan';
import UpdatePermohonan from 'screens/UpdatePermohonan';
import Tracking from 'screens/Tracking';
import {navigationRef} from './RootNavigation';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  const themes = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <View
        style={{backgroundColor: themes['background-basic-color-1'], flex: 1}}>
        <Stack.Navigator
          initialRouteName={'Login'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Permohonan" component={Permohonan} />
          <Stack.Screen name="DetailPermohonan" component={DetailPermohonan} />
          <Stack.Screen name="UpdatePermohonan" component={UpdatePermohonan} />
          <Stack.Screen name="Tracking" component={Tracking} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
