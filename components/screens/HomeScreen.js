import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  getPeluqueros,
  getTiposTurnos,
  getHorasLibre,
  createTurno,
} from "../api/apisFunctions";
import CalendarPicker from "react-native-calendar-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";
import ProximoTurno from "./ProximoTurno";

function HomeScreen() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [loadingPeluqueros, setLoadingPeluqueros] = useState(true);
  const [loadingTiposTurnos, setLoadingTiposTurnos] = useState(true);
  const [casilleroHabilitado, setCasilleroHabilitado] = useState(0);


  // Variable que luego se utilizan para enviarlas al backend
  const [dniPeluquero, setDniPeluquero] = useState();
  const [nroTipoTurno, setNroTipoTurno] = useState();
  const [fechaFormatoFecha, setFechaFormatoFecha] = useState(Date);
  const [horaTurno, setHoraTurno] = useState();

  // Variables que se utilizan en la obtención de datos
  const [peluqueros, setPeluqueros] = useState([]);
  const [tiposTurnos, setTiposTurnos] = useState([]);
  const [horasLibres, setHorasLibres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peluquerosData = await getPeluqueros();
        setPeluqueros(peluquerosData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoadingPeluqueros(false);
      }

      try {
        const tiposTurnosData = await getTiposTurnos(
          dniPeluquero,
          nroTipoTurno
        );
        setTiposTurnos(tiposTurnosData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoadingTiposTurnos(false);
      }
    };
    fetchData();
  }, []);

  const cargarPeluquero = (value) => {
    setDniPeluquero(value);
    if (casilleroHabilitado == 0 && value != null) {
      setCasilleroHabilitado(casilleroHabilitado + 1);
    }
  };

  const cargarTipoTurno = (value) => {
    setNroTipoTurno(value);
    if (casilleroHabilitado == 1 && value != null) {
      setCasilleroHabilitado(casilleroHabilitado + 1);
    }
  };

  const onDateChange = async (date) => {
    if (
      casilleroHabilitado >= 2 &&
      dniPeluquero != null &&
      nroTipoTurno != null
    ) {
      setSelectedStartDate(date);
      const fechaNueva = new Date(date);
      setFechaFormatoFecha(fechaNueva);

      try {
        const horasLibresData = await getHorasLibre(
          dniPeluquero,
          nroTipoTurno,
          fechaNueva.getDate(),
          fechaNueva.getMonth() + 1,
          fechaNueva.getFullYear()
        );
        setHorasLibres(horasLibresData);
        setCasilleroHabilitado(casilleroHabilitado + 1);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const cargarHoraTurno = (value) => {
    setHoraTurno(value);
    if (casilleroHabilitado == 2 && value != null) {
      setCasilleroHabilitado(casilleroHabilitado + 1);
    }
  };

  const generarTurno = async () => {
    if (
      dniPeluquero != null &&
      (nroTipoTurno != null) & (fechaFormatoFecha != null) &&
      horaTurno != null
    ) {
      try {
        await createTurno(
          dniPeluquero,
          nroTipoTurno,
          fechaFormatoFecha,
          horaTurno
        );
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <SafeAreaView style={styles.container}>
        {loadingPeluqueros || loadingTiposTurnos ? (
          <View style={styles.spinnerStyleContainer}>
            <Spinner textContent={"Loading..."} textStyle={{ color: "#FFF" }} />
          </View>
        ) : (
          <View>
            
            <View style={styles.misTurnosContainer}>
              <Text style={styles.title}>Mis turnos</Text>
              <ProximoTurno />
            </View>

            <View style={styles.nuevoTurnoContainer}>
              <Text style={styles.title}>Nuevo turno </Text>

              <View style={styles.nuevoTurnoTematicaContainer}>
                <Text style={styles.normalText}>Seleccionar peluquero</Text>
                {peluqueros.length > 0 && (
                  <RNPickerSelect
                    placeholder={{
                      label: "Seleccione un peluquero",
                      value: null,
                    }}
                    onValueChange={(value) => cargarPeluquero(value)}
                    items={peluqueros.map((peluquero) => ({
                      label: peluquero.nombre,
                      value: peluquero.dni,
                    }))}
                  />
                )}
              </View>

              <View style={styles.nuevoTurnoTematicaContainer}>
                <Text style={styles.normalText}>
                  Seleccionar tipo de servicio:
                </Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione un servicio",
                    value: null,
                  }}
                  onValueChange={(value) => cargarTipoTurno(value)}
                  items={tiposTurnos.map((tipoTurno) => ({
                    label: tipoTurno.nombre,
                    value: tipoTurno.numero,
                  }))}
                  disabled={casilleroHabilitado == 0}
                />
              </View>

              <View style={styles.nuevoTurnoTematicaContainer}>
                <View style={styles.calendarioContainer}>
                  <CalendarPicker
                    onDateChange={onDateChange}
                    minDate={new Date()}
                    width={350}
                    height={400}
                  />
                </View>
              </View>

              <View style={styles.nuevoTurnoTematicaContainer}>
                <Text style={styles.normalText}>Horarios disponibles</Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione un horario",
                    value: null,
                  }}
                  onValueChange={(value) => cargarHoraTurno(value)}
                  items={horasLibres.map((horario) => ({
                    label: horario.horaData,
                    value: horario.hora,
                  }))}
                  disabled={casilleroHabilitado <= 2}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Pedir turno"
                  color={"blue"}
                  disabled={casilleroHabilitado <= 3}
                  onPress={() => generarTurno()}
                />
              </View>
            </View>

            <View style={styles.turnosAnterioresContainer}>
              <Text style={styles.title}>Turnos recientes</Text>
              <Text style={styles.normalText}>
                Aca va a haber una lista de los ultimos 3 turnos
              </Text>
            </View>
          </View>
        )}
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
  normalText: {
    fontSize: 15,
  },
  misTurnosContainer: {
    
  },
  nuevoTurnoContainer: {
    marginVertical: 10,
  },
  nuevoTurnoTematicaContainer: {
    marginVertical: 4,
  },
  calendarioContainer: {
    backgroundColor: "#FFFFFF",
    marginVertical: "auto",
    marginHorizontal: "auto",
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: "auto",
  },
  buttonContainer: {
    marginTop: 3,
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
