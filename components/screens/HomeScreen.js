import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from 'react-native-picker-select';
import { getPeluqueros, getTiposTurnos } from "../api/apisFunctions";


function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dniPeluquero, setDniPeluquero] = useState();
  const [seleccionoFecha, setSeleccionoFecha] = useState(false);
  const [peluqueros, setPeluqueros] = useState([]);
  const [tiposTurnos, setTiposTurnos] = useState([]);


  useEffect(async () => {
    const fetchData = async () => {
      try {
        const peluquerosData = await getPeluqueros();
        setPeluqueros(peluquerosData);
      } catch (error) {
        console.error(error.message);
      }

      try {
        const tiposTurnosData = await getTiposTurnos();
        setTiposTurnos(tiposTurnosData);
      } catch (error) {
        console.error(error.message);
      }

      try {
        const tiposTurnosData = await getTiposTurnos();
        setTiposTurnos(tiposTurnosData);
      } catch (error) {
        console.error(error.message);
      }

    };
    fetchData();
  }, []);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    

    // Extraer día, mes y año de la fecha seleccionada
    const selectedDay = currentDate.getDate();
    const selectedMonth = currentDate.getMonth() + 1; // Los meses comienzan desde 0
    const selectedYear = currentDate.getFullYear();

    // Guardar los valores en el estado
    setDay(selectedDay.toString());
    setMonth(selectedMonth.toString());
    setYear(selectedYear.toString());
  };

  const showDatepicker = () => {
    setShowPicker(true);
    setSeleccionoFecha(true);
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.misTurnosContainer}>
        <Text style={styles.title}>Mis turnos</Text>
        <Text style={styles.normalText} >Aca va a haber una lista de los turnos</Text>
      </View>

      <View style={styles.nuevoTurnoContainer}>
        <Text style={styles.title}>Nuevo turno </Text>

        <View style={styles.nuevoTurnoTematicaContainer}>
          <Text style={styles.normalText} >Seleccionar peluquero</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Seleccione un peluquero',
              value: null}}
            onValueChange={(value) => setDniPeluquero(value)}
            items={peluqueros.map((peluquero) => ({
              label: peluquero.nombre,
              value: peluquero.dni
            }))}
          />
        </View>

        <View style={styles.nuevoTurnoTematicaContainer}>
          <Text style={styles.normalText} >Seleccionar tipo de servicio:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Seleccione un servicio',
              value: null}}
            onValueChange={(value) => setDniPeluquero(value)}
            items={tiposTurnos.map((tipoTurno) => ({
              label: tipoTurno.nombre,
              value: tipoTurno.numero
            }))}
          />
        </View>

        <View style={styles.nuevoTurnoTematicaContainer}>
          <Text style={styles.normalText} >Fecha de turno:    
        
          {seleccionoFecha &&
            <Text style={{fontSize:styles.normalText.fontSize, fontStyle: "italic"}} >
              {day}/{month}/{year}
            </Text>
          }
        
          </Text>
          <Button onPress={showDatepicker} title={"Seleccionar fecha"} />
          {showPicker && (
            <DateTimePicker
              minimumDate={new Date()}
              value={date}
              mode="date"
              onChange={onChange}
            />
          )}
          
        </View>

        <View style={styles.nuevoTurnoTematicaContainer}>
          <Text style={styles.normalText} >Horarios disponibles</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Seleccione un horario',
              value: null}}
            onValueChange={(value) => setHoraTurno(value)}
            items={horarios.map((horario) => ({
              label: horario.horaData,
              value: horario.hora
            }))}
          />
        </View>
            
        <View>
          <Button title="Pedir turno" color={"green"}/>
        </View>
      </View>

      <View style={styles.turnosAnterioresContainer}>
        <Text style={styles.title}>Turnos recientes</Text>
        <Text style={styles.normalText}>Aca va a haber una lista de los ultimos 3 turnos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  normalText: {
    fontSize: 15,
    
  },
  misTurnosContainer: {
    marginVertical: 15,
  },
  nuevoTurnoContainer: {
    marginVertical: 20,
  },
  nuevoTurnoTematicaContainer:{
    marginVertical: 5,
  },
  turnosAnterioresContainer: {
    marginVertical: 20,
  },
});

export default HomeScreen;
