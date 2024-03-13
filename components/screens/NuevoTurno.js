import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
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
import CalendarPicker from "react-native-calendar-picker";
import Spinner from "react-native-loading-spinner-overlay";

// icons
import { AntDesign } from "@expo/vector-icons";

function NuevoTurno() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [loadingPeluqueros, setLoadingPeluqueros] = useState(true);
  const [loadingTiposTurnos, setLoadingTiposTurnos] = useState(true);
  const [casilleroHabilitado, setCasilleroHabilitado] = useState(0);
  const [mostrarCalendario, setMostrarCalenario] = useState(false);

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
    if (primeraCarga || refresh) {
      fetchData();
      setPrimeraCarga(false);
      setRefresh(false);
    }
  }, [refresh, primeraCarga]);

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
      casilleroHabilitado == 2 &&
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
      } catch (error) {
        console.error(error.message);
      } finally {
        setCasilleroHabilitado(casilleroHabilitado + 1);
      }
    }
  };

  const cargarHoraTurno = (value) => {
    setSelectedHorarioValue(value);
    setHoraTurno(value);
    if (casilleroHabilitado == 3 && value != null) {
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
        setSelectedPeluqueroValue(null);
        setSelectedTipoTurnoValue(null);
        setSelectedHorarioValue(null);
        setRefresh(true);
        setCasilleroHabilitado(0);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // deberia refrescarse el homeScreen una vez que se genere un nuevo turno
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
                label: tipoTurno.nombre,
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
              <Text style={styles.normalText}>Horarios disponibles</Text>
              <TouchableOpacity
                onPress={() => setMostrarCalenario(!mostrarCalendario)}
                disabled={casilleroHabilitado <= 1}
              >
                <View
                  style={{
                    marginBottom: 5,
                    marginRight: 30,
                    backgroundColor: "blue",
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: "blue",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="calendar" size={28} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            {mostrarCalendario && (
              <View style={styles.calendarioContainer}>
                <CalendarPicker
                  onDateChange={onDateChange}
                  minDate={new Date()}
                  width={calendarWidth}
                  height={calendarWidth} // 450
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
  misTurnosContainer: {},
  nuevoTurnoContainer: {
    marginVertical: 10,
  },
  nuevoTurnoTematicaContainer: {
    marginVertical: 4,
  },
  calendarioContainer: {
    backgroundColor: "lightgray",
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
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

export default NuevoTurno;
