import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProximoTurno from "./ProximoTurno";
import TurnosAnteriores from "./TurnosAnteriores";
import NuevoTurno from "./NuevoTurno";


function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const LogOut = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Desea salir?',
          'Si desea salir se cerrara su sesion!',
          [
            { text: "No salir", style: 'cancel', onPress: () => {} },
            {
              text: 'Si, cerrar sesion',
              style: 'destructive',
              onPress: () => LogOut()
            },
          ]
        );
      }),
    [navigation]
  );


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollViewContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        <View>
          <View style={styles.proximosTurnos}>
            <Text style={styles.title}>Proximos turnos</Text>
            <ProximoTurno refreshPadre={refreshing}/>
          </View>

          <View style={styles.nuevoTurnoContainer}>
            <Text style={styles.title}>Nuevo turno </Text>
            <NuevoTurno onNuevoTurnoGenerado={onRefresh} refreshPadre={refreshing} />
          </View>

          <View style={styles.turnosAnterioresContainer}>
            <Text style={styles.title}>Turnos recientes</Text>
            <TurnosAnteriores />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  proximosTurnos:{},
  nuevoTurnoContainer:{marginVertical:15},
  turnosAnterioresContainer:{marginBottom:10},
  spinnerStyleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default HomeScreen;
