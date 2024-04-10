import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { getTurnosCancelados } from "../api/apisFunctions";
import styles from "../StylesFolder/styles";

function TurnosCancelados() {
  const [turnosCancelados, setTurnosCancelados] = useState([]);
  const [hayTurnosCancelados, setHayTurnosCancelados] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnosCanceladosData = await getTurnosCancelados();
        if (turnosCanceladosData != null && turnosCanceladosData.length > 0) {
            setHayTurnosCancelados(true);
            setTurnosCancelados(turnosCanceladosData)
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.turnosCanceladosContainer}>
      {hayTurnosCancelados ? (
            <FlatList 
                data={turnosCancelados}
                renderItem={({item}) => 
                    <View style={styles.turnoContainer}>
                        <Text style={styles.normalText}>
                            Peluquero: {item.nombrePeluquero}
                        </Text>
                        <Text style={styles.normalText}>
                            Fecha: {item.fechaTurno}
                        </Text>
                        <Text style={styles.normalText}>
                            Hora: {item.horaTurno}
                        </Text>
                        <Text style={styles.normalText}>
                            Tipo de turno: {item.nombreTipoTurno}
                        </Text>
                    </View>
                    }
            />
      ) : (
        <View style={{flex:1, justifyContent:'center'}}>
            <Text style={styles.centerGiantText}>No hay turnos cancelados</Text>
        </View>
      )}
    </View>
  );
}

export default TurnosCancelados;
