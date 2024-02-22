import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// screens
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function MyTabs () {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
        >
            <Tab.Screen 
                name="Inicio" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ) 
                }}
            />
            <Tab.Screen 
                name="Configuraciones" 
                component={Settings} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ) 
                }}
            />
        </Tab.Navigator>
    )
}


export default function Navigator(){
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}