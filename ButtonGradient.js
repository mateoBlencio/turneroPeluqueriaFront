import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient (texto) {
    return(
        <TouchableOpacity style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#ffff', "#f4f9fd"]}
                style={styles.button}>
                <Text style={styles.text}>{texto.mensaje}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({ 
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 20,
    },
    text: {
        fontSize: 14,
        color: '"#c7cccf"',
        fontWeight: 'bold',
    },
    button: {
        height: 50,
        width: '80%',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 15,
       
    }
});