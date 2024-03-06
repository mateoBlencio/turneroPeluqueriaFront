import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from 'react-native-picker-select';

function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dniPeluquero, setDniPeluquero] = useState();
  const [horaTurno, setHoraTurno] = useState("");

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.misTurnosContainer}>
        <Text style={styles.title}>Mis turnos</Text>
        <Text>Aca va a haber una lista de los turnos</Text>
      </View>

      <View style={styles.nuevoTurnoContainer}>
        <Text style={styles.title}>Nuevo turno </Text>

        <View>
          <Text>Seleccionar peluquero</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Seleccione un peluquero',
              value: null}}
            onValueChange={(value) => setDniPeluquero(value)}
            items={[
              { label: "peluquero1", value: "dni1" },
              { label: "peluquero2", value: "dni2" },
              { label: "peluquero3", value: "dni3" },
            ]}
          />
        </View>

        <View>
          <Text>Ingrese una fecha: </Text>
          <Button onPress={showDatepicker} title="Seleccionar fecha" />
          {showPicker && (
            <DateTimePicker
              minimumDate={new Date()}
              value={date}
              mode="date"
              onChange={onChange}
            />
          )}
          <Text>
            Fecha seleccionada: {day}/{month}/{year}{" "}
          </Text>
        </View>

        <View>
          <Text>Horarios disponibles</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Seleccione un horario',
              value: null}}
            onValueChange={(value) => setHoraTurno(value)}
            items={[
              { label: "08:00", value: "08:00" },
              { label: "08:30", value: "08:30" },
              { label: "09:00", value: "09:00" },
            ]}
          />
        </View>
      
      </View>

      <View style={styles.turnosAnterioresContainer}>
        <Text style={styles.title}>Turnos recientes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
  },
  misTurnosContainer: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
  nuevoTurnoContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  turnosAnterioresContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
});

export default HomeScreen;
