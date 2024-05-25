import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  getPeluqueros,
  getTiposTurnos,
  getHorasLibre,
  createTurno,
} from "../api/apisFunctions";
import { Calendar } from "react-native-calendars";
import Spinner from "react-native-loading-spinner-overlay";

// icons
import { AntDesign } from "@expo/vector-icons";

function NuevoTurno({ refreshPadre, onNuevoTurnoGenerado }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [loadingPeluqueros, setLoadingPeluqueros] = useState(true);
  const [loadingTiposTurnos, setLoadingTiposTurnos] = useState(true);
  const [casilleroHabilitado, setCasilleroHabilitado] = useState(0);
  const [mostrarCalendario, setMostrarCalenario] = useState(false);
  const [yaSeMostroCalendario, setYaSeMostroCalendario] = useState(false);

  // Variables responsables de refrescar views
  const [refresh, setRefresh] = useState(false);
  const [primeraCarga, setPrimeraCarga] = useState(true);

  // Variable que luego se utilizan para enviarlas al backend
  const [dniPeluquero, setDniPeluquero] = useState();
  const [nroTipoTurno, setNroTipoTurno] = useState();
  const [fechaFormatoFecha, setFechaFormatoFecha] = useState(Date);
  const [horaTurno, setHoraTurno] = useState();

  // Variables que se utilizan en la obtención de datos
  const [peluqueros, setPeluqueros] = useState([]);
  const [tiposTurnos, setTiposTurnos] = useState([]);
  const [horasLibres, setHorasLibres] = useState([]);

  // Variables para volver null las elecciones
  const [selectedPeluqueroValue, setSelectedPeluqueroValue] = useState(null);
  const [selectedTipoTurnoValue, setSelectedTipoTurnoValue] = useState(null);
  const [selectedHorarioValue, setSelectedHorarioValue] = useState(null);

  // calcula el tamaño
  const windowWidth = Dimensions.get("window").width;
  const calendarWidth = windowWidth * 0.8;

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
    if (primeraCarga || refresh || refreshPadre) {
      fetchData();
      setPrimeraCarga(false);
      setRefresh(false);
    }
  }, [refresh, primeraCarga, refreshPadre]);

  const cargarPeluquero = (value) => {
    setSelectedPeluqueroValue(value);
    setDniPeluquero(value);
    if (casilleroHabilitado == 0 && value != null) {
      setCasilleroHabilitado(casilleroHabilitado + 1);
    }
  };

  const cargarTipoTurno = (value) => {
    setSelectedTipoTurnoValue(value);
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
      setFechaFormatoFecha(date);

      try {
        const horasLibresData = await getHorasLibre(
          dniPeluquero,
          nroTipoTurno,
          date.day,
          date.month,
          date.year
        );
        setHorasLibres(horasLibresData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setYaSeMostroCalendario(true);
        setCasilleroHabilitado(casilleroHabilitado + 1);
      }
    }
  };

  const cargarHoraTurno = (value) => {
    setSelectedHorarioValue(value);
    setHoraTurno(value);
    if (casilleroHabilitado >= 3 && value != null) {
      setCasilleroHabilitado(casilleroHabilitado + 1);
    }
  };

  const generarTurno = async () => {
    if (
      dniPeluquero != null &&
      nroTipoTurno != null &&
      fechaFormatoFecha != null &&
      horaTurno != null
    ) {
      try {
        await createTurno(
          dniPeluquero,
          nroTipoTurno,
          fechaFormatoFecha,
          horaTurno
        );
        setSelectedPeluqueroValue(null);
        setSelectedTipoTurnoValue(null);
        setSelectedHorarioValue(null);
        setRefresh(true);
        setCasilleroHabilitado(0);
        onNuevoTurnoGenerado();
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  return (
    <View>
      {loadingPeluqueros || loadingTiposTurnos ? (
        <View style={styles.spinnerStyleContainer}>
          <Spinner textContent={"Loading..."} textStyle={{ color: "#FFF" }} />
        </View>
      ) : (
        <View style={styles.Box}>
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
                value={selectedPeluqueroValue}
              />
            )}
          </View>

          <View style={styles.nuevoTurnoTematicaContainer}>
            <Text style={styles.normalText}>Seleccionar tipo de servicio:</Text>

            <RNPickerSelect
              placeholder={{
                label: "Seleccione un servicio",
                value: null,
              }}
              onValueChange={(value) => cargarTipoTurno(value)}
              items={tiposTurnos.map((tipoTurno) => ({
                label: `${tipoTurno.nombre} - $${tipoTurno.precio}`,
                value: tipoTurno.numero,
              }))}
              value={selectedTipoTurnoValue}
              disabled={casilleroHabilitado == 0}
            />
          </View>

          <View style={styles.nuevoTurnoTematicaContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.normalText}>Horarios disponibles</Text>
                {horasLibres != [] &&
                casilleroHabilitado >= 3 &&
                yaSeMostroCalendario ? (
                  <Text style={styles.normalText}>
                    Fecha seleccionada: {fechaFormatoFecha.day}/{fechaFormatoFecha.month}/{fechaFormatoFecha.year}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() => setMostrarCalenario(!mostrarCalendario)}
                disabled={casilleroHabilitado <= 1}
                style={{
                  marginVertical: 10,
                  marginRight: 8,
                  backgroundColor: "lightgray",
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: "lightgray",
                }}
              >
                <AntDesign name="calendar" size={28} color="black" />
              </TouchableOpacity>
            </View>
            {mostrarCalendario && (
              <View>
                <Calendar
                  onDayPress={(date) => {
                    onDateChange(date);
                  }}
                  minDate={new Date()}
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                  }}
                  theme={{
                    selectedDayBackgroundColor: "blue",
                    selectedDayTextColor: "blue",
                    todayTextColor: "black",
                  }}
                />
                <View>
                  <Button
                    color={"blue"}
                    title="OK"
                    onPress={() => setMostrarCalenario(false)}
                  />
                </View>
              </View>
            )}
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
              value={selectedHorarioValue}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#404040",
  },
  normalText: {
    marginTop: 1,
    fontSize: 15,
    color: "#404040",
  },
  nuevoTurnoTematicaContainer: {
    borderColor: "lightgray",
    borderRadius: 5,
    borderWidth: 1,

    marginVertical: 4,
    paddingHorizontal: 10,
  },
  calendarioContainer: {
    backgroundColor: "lightgray",
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 5,
    marginHorizontal: 10,
  },

  spinnerStyleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
});

export default NuevoTurno;
