import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { getTurnosPorPeluquero } from "../api/apisFunctions";
import styles from "../StylesFolder/styles";

const PeluqueroHome = () => {
  const [hayTurnos, setHayTurnos] = useState(false);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnosData = await getTurnosPorPeluquero();
        if (turnosData != null && turnosData.length > 0) {
          setHayTurnos(true);
          setTurnos(turnosData);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.turnosCanceladosContainer}>
      {/* <Text style={styles.centerGiantText}>Turnos de: JUAN </Text> */}
      {hayTurnos ? (
        <FlatList
          data={turnos}
          renderItem={({ item }) => (
            <View style={styles.turnoContainer}>
              <Text style={styles.normalText}>Cliente: {item.nombreCliente}</Text>
              <Text style={styles.normalText}>Fecha: {item.fechaTurno}</Text>
              <Text style={styles.normalText}>Hora: {item.horaTurno}</Text>
              <Text style={styles.normalText}>Tipo de turno: {item.nombreTipoTurno}</Text>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.centerGiantText}>No hay Turnos</Text>
        </View>
      )}
    </View>
  );
};

export default PeluqueroHome;
