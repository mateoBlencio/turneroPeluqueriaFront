import React from "react";
import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [flag, setFlag] = useState(false);

  const handleSubmit = () => {
    setFlag(!flag);
  };

  return (
    <View>
      <Text>Mis turnos</Text>
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

export default HomeScreen;
