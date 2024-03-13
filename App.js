import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './components/auth/Login';
import MyTabs from './components/Tabs';
import Settings from './components/screens/Settings';
import Register from './components/auth/Register';
import HomeScreen from './components/screens/HomeScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={Login} >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Tabs" component={MyTabs} options={{headerShown:false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


