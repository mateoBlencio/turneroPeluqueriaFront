import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function HomeScreen() {
  const [flag, setFlag] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.misTurnosContainer}>
        <Text style={styles.title}>Mis turnos</Text>
        <Text>Aca va a haber una lista de los turnos</Text>
      </View>

      <View style={styles.nuevoTurnoContainer}>
        <Text style={styles.title}>Nuevo turno </Text>
        {!flag && <Button title="+" onPress={() => setFlag(!flag)} />}
        {flag && (
          <View>
            <Button title="-" onPress={() => setFlag(!flag)} />
            <Text>Calendario: </Text>
            {/* <Calendar
              onDayPress={(day) => {
                console.log("selected day", day);
              }}
            /> */}
            <Text>Hora: </Text>
          </View>
        )}
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
    backgroundColor: "blue",
    marginHorizontal: 5,
    marginBottom: 5,
  },
  nuevoTurnoContainer: {
    backgroundColor: "blue",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  turnosAnterioresContainer: {
    backgroundColor: "blue",
    marginHorizontal: 5,
    marginVertical: 10,
  },
});

export default HomeScreen;
