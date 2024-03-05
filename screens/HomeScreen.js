import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [flag, setFlag] = useState(false);

  const handleSubmit = () => {
    setFlag(!flag);
  };

  alert("Estamos en homeScreen")

  return (
    <View style={styles.container}>
      <Text style={styles.headerText1}>Mis turnos</Text>
      <View>
        
        {!flag && 
        <Text> Agendar nuevo turno <Button title="+" onPress={() => setFlag(!flag)} /> </Text> 
        }
        {flag && (
          <View>
            <Text> Agendar nuevo turno <Button title="-" onPress={() => setFlag(!flag)} /> </Text>
            <Text>Calendario: </Text>
            <Text>Hora: </Text>
          </View>
        )}
      </View>
      <Text>Turnos recientes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253a55',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerText1: {
    fontSize: 50,
    fontWeight: "bold",
    color: '#ffff',

  }})

export default HomeScreen;
