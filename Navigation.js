import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";


// screens
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Ionicons } from '@expo/vector-icons';

const homeName = 'Mis Turnos';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        }  else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#7f7bc6',
                    inactiveTintColor: '#262554',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: {padding: 10, hight: 70}
                } }
            >
                <Tab.Screen 
                    name="Inicio" 
                    component={HomeScreen} 
                />
                <Tab.Screen 
                    name="Configuraciones" 
                    component={Settings} 
                />
            </Tab.Navigator>
            
        </NavigationContainer>
    )
}

