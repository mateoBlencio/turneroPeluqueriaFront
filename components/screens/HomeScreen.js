import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  getPeluqueros,
  getTiposTurnos,
  getHorasLibre,
  createTurno,
} from "../api/apisFunctions";
import { SafeAreaView } from "react-native-safe-area-context";
import ProximoTurno from "./ProximoTurno";
import TurnosAnteriores from "./TurnosAnteriores";
import NuevoTurno from "./NuevoTurno";

function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>

      <SafeAreaView style={styles.container}>
        
          <View>
            
            <View style={styles.misTurnosContainer}>
              <Text style={styles.title}>Proximos turnos</Text>
              <ProximoTurno />
            </View>

            <View style={styles.nuevoTurnoContainer}>
              <Text style={styles.title}>Nuevo turno </Text>
              <NuevoTurno />
            </View>
              
            <View style={styles.turnosAnterioresContainer}>
              <Text style={styles.title}>Turnos recientes</Text>
              <TurnosAnteriores />
            </View>

          </View>
        
      </SafeAreaView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  misTurnosContainer: {
    
  },
  nuevoTurnoContainer: {
    marginVertical: 10,
  },
  turnosAnterioresContainer: {
    marginVertical: 10,
  },
  spinnerStyleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default HomeScreen;
