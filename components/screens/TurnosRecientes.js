import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { getTurnosAnteriores } from "../api/apisFunctions";
import styles from "../StylesFolder/styles";

function TurnosRecientes() {
  const [hayAnteriorTurno, setHayAnteriorTurno] = useState(false);
  const [turnosAnteriores, setTurnosAnteriores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnosAnterioresData = await getTurnosAnteriores();
        if (turnosAnterioresData != null && turnosAnterioresData.length > 0) {
          setHayAnteriorTurno(true);
          setTurnosAnteriores(turnosAnterioresData);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.turnosCanceladosContainer}>
      {hayAnteriorTurno ? (
        
        <FlatList
          data={turnosAnteriores}
          renderItem={({ item }) => (
            <View style={styles.turnoContainer}>
              <Text style={styles.normalText}>
                Peluquero: {item.nombrePeluquero}
              </Text>
              <Text style={styles.normalText}>Fecha: {item.fechaTurno}</Text>
              <Text style={styles.normalText}>Hora: {item.horaTurno}</Text>
              <Text style={styles.normalText}>
                Tipo de turno: {item.nombreTipoTurno}
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={styles.centerGiantText}>No hay turnos recientes</Text>
        </View>
      )}
    </View>
  );
}



export default TurnosRecientes;
